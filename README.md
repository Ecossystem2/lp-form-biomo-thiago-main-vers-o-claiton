# LP Form Biomo

Landing page interativa com quiz para captacao de leads de criacao de sites.

## Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estatica
- **Tailwind CSS** - Estilizacao utilitaria
- **Framer Motion** - Animacoes fluidas
- **Firebase/Firestore** - Banco de dados para leads

## Funcionalidades

- Landing page de alto impacto com stats animados
- Quiz interativo de 21 etapas
- Personalizacao com nome do usuario
- 4 tipos de projeto:
  - Presenca Digital (R$ 997)
  - Site Institucional (R$ 2.497)
  - E-commerce Personalizado (R$ 4.999)
  - Solucoes Personalizadas (sob consulta)
- Micro-feedback em tempo real
- Atalhos de teclado (A-Z, Enter, Esc)
- Responsividade mobile-first
- Integracao WhatsApp
- Social proof com portfolio

## Instalacao

```bash
# Instalar dependencias
npm install

# Rodar em desenvolvimento
npm run dev

# Build para producao
npm run build
```

## Estrutura

```
src/
├── app/                    # Rotas Next.js
├── components/
│   ├── chat/              # Componentes do quiz
│   ├── landing/           # Landing page
│   ├── quiz/              # Logica do quiz
│   └── ui/                # Componentes reutilizaveis
├── hooks/                 # Custom hooks
└── lib/                   # Utilitarios
```

## Variaveis de Ambiente

```env
# Firebase (opcional - para salvar leads)
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
```

## Desenvolvido por

[Biomo](https://biomo.com.br) - Criacao de Sites e Trafego Pago
