import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: ['/', '/lp1', '/lp2', '/lp3', '/lp4'],
}

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const response = NextResponse.next()

    // Mapeamento de rotas para variantes
    const variantMap: Record<string, string> = {
        '/lp1': 'A',
        '/lp2': 'B',
        '/lp3': 'C',
        '/lp4': 'D'
    }

    // Se for uma das rotas de LP específicas
    if (path in variantMap) {
        const variant = variantMap[path]

        // Cria a resposta de rewrite
        const rewriteResponse = NextResponse.rewrite(new URL('/', request.url))

        // Define o cookie na resposta que será retornada
        rewriteResponse.cookies.set('ab-test-variant', variant, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: '/',
        })

        return rewriteResponse
    }

    // Lógica original para a home (teste A/B aleatório)
    if (path === '/') {
        const variantCookie = request.cookies.get('ab-test-variant')

        // Se já tiver cookie, mantém
        if (variantCookie) {
            return NextResponse.next()
        }

        // Se não tiver, sorteia
        const buckets = ['A', 'B', 'C', 'D']
        const randomBucket = buckets[Math.floor(Math.random() * buckets.length)]

        response.cookies.set('ab-test-variant', randomBucket, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        })

        return response
    }

    return response
}
