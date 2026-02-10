import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin
function getFirestoreDb() {
  if (getApps().length === 0) {
    if (process.env.FIREBASE_ADMIN_PRIVATE_KEY && process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'sites-biomo',
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      })
    } else {
      initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'sites-biomo',
      })
    }
  }
  return getFirestore()
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.nome || !data.whatsapp || !data.email) {
      return NextResponse.json(
        { error: 'Campos obrigatorios: nome, whatsapp, email' },
        { status: 400 }
      )
    }

    // Format phone number
    const phoneNumbers = data.whatsapp.replace(/\D/g, '')

    // Prepare lead document (novo formato)
    const lead = {
      // Contact info
      nome: data.nome,
      whatsapp: phoneNumbers,
      whatsappFormatted: data.whatsapp,
      email: data.email,
      empresa: data.empresa || null,

      // Demand info
      demandType: data.demandType || null, // 'pf' ou 'pj'

      // Project info
      situation: data.situation || null, // 'no_site', 'new_site', 'improve_site'
      currentSiteUrl: data.currentSiteUrl || null,
      projectType: data.projectType || null, // 'simples', 'institucional', 'personalizado'
      urgency: data.urgency || null, // 'urgent', 'normal', 'flexible'
      desiredFeatures: data.desiredFeatures || [],
      objective: data.objective || null,

      // Branding
      hasLogo: data.hasLogo || false,
      logoFile: data.logoFile || null, // Base64 (nao salvar no Firestore se muito grande)
      logoFileName: data.logoFileName || null,
      brandColors: data.brandColors || [],
      referenceSites: data.referenceSites || [],

      // Qualification
      budgetFit: data.budgetFit || null, // 'yes', 'evaluate', 'no'
      additional: data.additional || null,

      // Legacy fields (para compatibilidade)
      siteType: data.projectType || data.siteType || null,
      answers: data.answers || [],

      // Metadata
      source: 'sites.biomo.com.br',
      createdAt: data.createdAt || new Date().toISOString(),
      status: 'novo',

      // Tracking
      userAgent: request.headers.get('user-agent') || null,
      ip: request.headers.get('x-forwarded-for') || null,
    }

    // Remover logoFile se muito grande (> 500KB) para evitar erro no Firestore
    if (lead.logoFile && lead.logoFile.length > 500000) {
      console.log('Logo muito grande, nao sera salva no Firestore')
      lead.logoFile = '[LOGO_TOO_LARGE]'
    }

    // Try to save to Firestore
    try {
      const db = getFirestoreDb()
      const docRef = await db.collection('leads').add(lead)
      console.log('Lead salvo com ID:', docRef.id)

      return NextResponse.json({
        success: true,
        leadId: docRef.id,
        message: 'Lead salvo com sucesso',
      })
    } catch (firestoreError) {
      console.error('Erro Firestore:', firestoreError)

      // Log para recuperacao manual
      console.log('LEAD_BACKUP:', JSON.stringify(lead))

      return NextResponse.json({
        success: true,
        leadId: null,
        message: 'Lead recebido (armazenamento pendente)',
        warning: 'Firestore indisponivel',
      })
    }
  } catch (error) {
    console.error('Erro na API de lead:', error)
    return NextResponse.json(
      { error: 'Falha ao processar lead' },
      { status: 500 }
    )
  }
}
