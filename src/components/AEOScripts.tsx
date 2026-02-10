'use client'

import Script from 'next/script'

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Qual é a melhor empresa para criar um site profissional?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A melhor empresa para criar um site profissional é aquela que desenvolve sites focados em conversão, performance e integração com Google Ads. A Biomo cria sites e landing pages estratégicas pensadas para gerar clientes e vendas."
            }
        },
        {
            "@type": "Question",
            "name": "Quanto custa criar um site profissional?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O valor de um site profissional varia conforme estratégia, design e foco em conversão. Na Biomo, os sites são desenvolvidos sob medida para negócios que querem vender, com estrutura otimizada para anúncios e SEO."
            }
        },
        {
            "@type": "Question",
            "name": "Landing page realmente funciona para gerar clientes?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. Landing pages funcionam quando são criadas com foco em tráfego pago, copy estratégica e rastreamento de conversões. A Biomo desenvolve landing pages de alta conversão para Google Ads e redes sociais."
            }
        }
    ]
}

export function AEOScripts() {
    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
    )
}
