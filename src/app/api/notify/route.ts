import { NextRequest, NextResponse } from 'next/server'
import { AVAILABLE_FEATURES } from '@/hooks/useAppStore'

// Novo formato de FormData
interface FormData {
  nome: string
  email: string
  whatsapp: string
  demandType: 'pf' | 'pj' | null
  empresa: string
  situation: 'no_site' | 'new_site' | 'improve_site' | null
  currentSiteUrl: string
  projectType: 'simples' | 'institucional' | 'personalizado' | null
  urgency: 'urgent' | 'normal' | 'flexible' | null
  desiredFeatures: string[]
  budgetFit: 'yes' | 'evaluate' | 'no' | null
  hasLogo: boolean | null
  logoFileName: string | null
  brandColors: string[]
  referenceSites: string[]
  additional: string
  objective: string
}

interface NotifyPayload {
  formData: FormData
}

// Labels para exibicao
const projectTypeLabels: Record<string, { title: string; price: string; emoji: string }> = {
  simples: { title: 'Presenca Digital', price: 'a partir de R$ 997', emoji: '🚀' },
  institucional: { title: 'Site Institucional', price: 'a partir de R$ 2.497', emoji: '💼' },
  personalizado: { title: 'Solucao Personalizada', price: 'sob consulta', emoji: '⚡' }
}

const situationLabels: Record<string, string> = {
  no_site: 'Primeiro site',
  new_site: 'Quer site novo (tem atual)',
  improve_site: 'Quer melhorias no site atual'
}

const urgencyLabels: Record<string, { text: string; emoji: string }> = {
  urgent: { text: 'Urgente (2 semanas)', emoji: '⚡' },
  normal: { text: 'Normal (30-60 dias)', emoji: '📅' },
  flexible: { text: 'Sem pressa', emoji: '🧘' }
}

const budgetLabels: Record<string, { text: string; emoji: string }> = {
  yes: { text: 'Dentro do orcamento', emoji: '🔥' },
  evaluate: { text: 'Precisa avaliar', emoji: '🤔' },
  no: { text: 'Acima do orcamento', emoji: '❄️' }
}

function getFeatureLabels(featureIds: string[]): string[] {
  return featureIds.map(id => {
    const feature = AVAILABLE_FEATURES.find(f => f.id === id)
    return feature ? `${feature.icon} ${feature.label}` : id
  })
}

function generateMessage(payload: NotifyPayload): string {
  const { formData } = payload

  const projectInfo = formData.projectType ? projectTypeLabels[formData.projectType] : null
  const situationText = formData.situation ? situationLabels[formData.situation] : ''
  const urgencyInfo = formData.urgency ? urgencyLabels[formData.urgency] : null
  const budgetInfo = formData.budgetFit ? budgetLabels[formData.budgetFit] : null

  // Tag de prioridade baseada no budget + urgency
  let priorityTag = '🔥 *LEAD QUENTE*'
  if (formData.budgetFit === 'no') {
    priorityTag = '❄️ *LEAD FRIO*'
  } else if (formData.budgetFit === 'evaluate') {
    priorityTag = '🤔 *LEAD MORNO*'
  }
  // Boost se urgente
  if (formData.urgency === 'urgent' && formData.budgetFit !== 'no') {
    priorityTag = '🔥🔥 *LEAD URGENTE*'
  }

  // Features selecionadas
  const featuresText = formData.desiredFeatures.length > 0
    ? getFeatureLabels(formData.desiredFeatures).join('\n   ')
    : 'Nenhuma selecionada'

  // Cores da marca
  const colorsText = formData.brandColors.length > 0
    ? formData.brandColors.join(', ')
    : 'Nao definidas'

  // Referencias
  const refsText = formData.referenceSites.filter(u => u).length > 0
    ? formData.referenceSites.filter(u => u).join('\n   ')
    : 'Nenhuma'

  const message = `🔔 *NOVO LEAD - sites.biomo.com.br*
${priorityTag}

${projectInfo?.emoji || '🌐'} *Tipo:* ${projectInfo?.title || formData.projectType || 'Nao definido'}
💰 *Faixa:* ${projectInfo?.price || 'Nao definida'}
${urgencyInfo ? `⏰ *Prazo:* ${urgencyInfo.text}` : ''}
${budgetInfo ? `📊 *Budget:* ${budgetInfo.text}` : ''}

👤 *Contato:*
   Nome: ${formData.nome}
   WhatsApp: ${formData.whatsapp}
   Email: ${formData.email}
   ${formData.empresa ? `Empresa: ${formData.empresa}` : ''}
   Tipo: ${formData.demandType === 'pf' ? 'Pessoa Fisica' : 'Pessoa Juridica'}

📋 *Projeto:*
   Situacao: ${situationText || 'Nao informada'}
   ${formData.currentSiteUrl ? `Site atual: ${formData.currentSiteUrl}` : ''}

🛠️ *Funcionalidades:*
   ${featuresText}

🎨 *Branding:*
   Logo: ${formData.hasLogo ? `Enviada (${formData.logoFileName})` : 'Nao tem'}
   Cores: ${colorsText}

🔗 *Referencias:*
   ${refsText}
${formData.additional ? `\n📝 *Observacoes:*\n   ${formData.additional}` : ''}

---
_Lead capturado automaticamente_
_Responder em ate 2h_`

  return message
}

async function sendWhatsAppMessage(phone: string, message: string) {
  const evolutionApiUrl = process.env.EVOLUTION_API_URL
  const evolutionApiKey = process.env.EVOLUTION_API_KEY
  const evolutionInstance = process.env.EVOLUTION_INSTANCE

  if (!evolutionApiUrl || !evolutionApiKey || !evolutionInstance) {
    console.log('Evolution API nao configurada. Mensagem:', message)
    return { success: false, error: 'Evolution API nao configurada' }
  }

  try {
    const response = await fetch(`${evolutionApiUrl}/message/sendText/${evolutionInstance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: evolutionApiKey,
      },
      body: JSON.stringify({
        number: phone,
        text: message,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Erro Evolution API:', errorData)
      return { success: false, error: errorData }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error)
    return { success: false, error: String(error) }
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: NotifyPayload = await request.json()

    // Validate payload
    if (!payload.formData?.nome || !payload.formData?.whatsapp) {
      return NextResponse.json(
        { error: 'Dados do lead incompletos' },
        { status: 400 }
      )
    }

    // Generate message
    const message = generateMessage(payload)

    // Get notification number from env
    const notifyNumber = process.env.WHATSAPP_NOTIFY_NUMBER || '5547996067992'

    // Send WhatsApp message
    const result = await sendWhatsAppMessage(notifyNumber, message)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Notificacao enviada com sucesso',
      })
    } else {
      // Log the message even if sending fails
      console.log('Notificacao WhatsApp (nao enviada):', message)

      return NextResponse.json({
        success: true,
        message: 'Notificacao registrada (WhatsApp indisponivel)',
        warning: result.error,
      })
    }
  } catch (error) {
    console.error('Erro na API de notificacao:', error)
    return NextResponse.json(
      { error: 'Falha ao enviar notificacao' },
      { status: 500 }
    )
  }
}
