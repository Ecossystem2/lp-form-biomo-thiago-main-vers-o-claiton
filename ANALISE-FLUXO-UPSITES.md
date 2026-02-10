# Analise Comparativa: UpSites vs Biomo

**URL Analisada:** https://upsites.digital/orcamentos/
**Screenshots:** `/docs/analise-upsites/`
**Ferramenta:** Landbot (chatbot conversacional)

---

## Caminhos Mapeados

### ✅ Caminho 1: PJ → Site Novo → Solução Simples → Dentro do Orçamento
**Status:** COMPLETO
**Screenshots:** upsites-01 a upsites-10

Fluxo:
1. Nome → 2. Email → 3. Telefone → 4. PJ → 5. Empresa → 6. "Não tem site"
→ 7. "Quero começar ou profissionalizar" → 8. Investimento R$3.000-4.000
→ 9. "Está dentro do esperado" → 10. Info adicional → 11. Thank You

**Preço apresentado:** R$ 3.000 a R$ 4.000 (primeiro ano)

---

### ✅ Caminho 2: PJ → Site Novo → Solução Completa
**Status:** COMPLETO
**Screenshot:** upsites-preco-completa.png

Fluxo:
1-6. (igual ao anterior)
→ 7. "Preciso de uma solução completa com funcionalidades avançadas"
→ 8. **Investimento DIFERENTE:**
  - **Soluções customizadas:** a partir de R$ 5.500
  - **E-commerce/Integrações avançadas:** a partir de R$ 11.000
  - Mesmo disclaimer: "valor final depende da complexidade e pode ser parcelado"
→ 9-11. (igual)

**Comparativo de Preços:**
| Tipo | Preço |
|------|-------|
| Solução Simples | R$ 3.000 - R$ 4.000 |
| Solução Completa | R$ 5.500+ |
| E-commerce/Avançado | R$ 11.000+ |

---

### ✅ Caminho 3: PF (Pessoa Física)
**Status:** COMPLETO
**Screenshot:** upsites-pf-pula-empresa.png

**CONFIRMADO: Pessoa Física PULA o nome da empresa!**

Fluxo:
1. Nome → 2. Email → 3. Telefone → 4. "Demanda pessoal (PF)"
→ **VAI DIRETO para Situação** (sem perguntar empresa)
→ Tipo → Investimento → Budget → Final

**Diferenças de texto:**
- PJ: "A sua **empresa** já tem um site..."
- PF: "**Você** já tem um site para o seu **projeto**..."

**Conclusão:** Fluxo PF tem 1 step a menos que PJ

---

### ✅ Caminho 4: Já Tem Site (quer novo)
**Status:** COMPLETO
**Screenshot:** upsites-ja-tem-site-pede-url.png
**Opção:** "Tem site, mas quero criar um novo"

**CONFIRMADO: Pede URL do site atual!**

Fluxo:
1-6. (igual ao anterior)
→ 7. "Tem site, mas quero criar um novo"
→ 8. **Pergunta ADICIONAL:** "Qual é o endereço do seu site atual?"
  - **Nota:** "Mesmo que ele esteja fora do ar ou inacessível, pode compartilhar."
  - **Input:** Campo com placeholder "https://"
→ 9-12. Continua fluxo normal (tipo de solução, preço, budget, etc)

**Conclusão:** Este caminho tem 1 step a MAIS que "Não tem site"

---

### 📋 Caminho 5: Já Tem Site (quer alterações)
**Status:** A TESTAR
**Opção:** "Tem site, mas quero fazer alterações"

Provavelmente igual ao caminho 4 (pede URL) mas pode ter preços diferentes para alterações.

---

### ✅ Caminho 6: Sistema/App/Plataforma
**Status:** COMPLETO
**Screenshot:** upsites-sistema-app-30k.png
**Opção:** "O que preciso é de sistema/app/plataforma"

**CONFIRMADO: Preço diferente para sistema/app!**

Fluxo:
1-6. (igual ao anterior)
→ 7. "O que preciso é de sistema/app/plataforma"
→ 8. **Investimento ESPECIAL:**
  - "Para sistemas, apps e plataformas customizadas, o investimento parte de R$ 30.000 para um MVP funcional."
  - "Projetos maiores podem chegar a R$ 100.000 ou mais, dependendo da complexidade."
→ 9-12. (igual)

**Comparativo Completo de Preços:**
| Tipo | Preço |
|------|-------|
| Site Simples | R$ 3.000 - R$ 4.000 |
| Site Completo | R$ 5.500+ |
| E-commerce/Avançado | R$ 11.000+ |
| **Sistema/App/MVP** | **R$ 30.000+** |
| **Projetos Maiores** | **R$ 100.000+** |

---

### ✅ Caminho 7: Budget "Avaliar melhor"
**Status:** COMPLETO
**Resposta:** "Não está fora da realidade, mas preciso avaliar melhor"

**CONFIRMADO: O fluxo CONTINUA normalmente!**

Fluxo:
→ Após selecionar "Preciso avaliar melhor"
→ "Por último, gostaria de incluir alguma informação adicional?"
→ Thank You Page normal

**Conclusão:** Não há mensagem especial ou oferta alternativa. Lead é coletado normalmente.

---

### ✅ Caminho 8: Budget "Acima do orçamento"
**Status:** COMPLETO
**Screenshots:** upsites-budget-acima-continua.png, upsites-budget-acima-final.png
**Resposta:** "Não consigo contratar, está acima do meu orçamento"

**CONFIRMADO: O fluxo CONTINUA normalmente! Sem oferta alternativa!**

Fluxo:
→ Após selecionar "Não consigo contratar, está acima do meu orçamento"
→ **Evento disparado:** "Lead Budget Alto" (para segmentação)
→ "Por último, gostaria de incluir alguma informação adicional?"
→ Thank You Page normal (GIF do The Office + "Obrigado pela confiança!")
→ Redirect para /obrigado/

**Insight:** A UpSites NÃO descarta leads que dizem que está caro. Eles:
1. Coletam os dados normalmente
2. Disparam evento de tracking para segmentação
3. Fazem follow-up depois (provavelmente com ofertas especiais)

---

## Fluxo UpSites (10 passos)

### Step 1: Nome
- **Pergunta:** "Qual e seu nome?"
- **Input:** Text field com placeholder "Digite seu nome aqui..."
- **Instrucao:** "Pressione Enter para enviar"

### Step 2: Email
- **Mensagem:** "Obrigado, {nome}!"
- **Pergunta:** "Preciso do seu e-mail para nossa equipe analisar seu projeto e criar a melhor solucao."
- **Input:** Text field para email
- **Validacao:** MUITO RIGOROSA! Valida se o email EXISTE!
  - Mensagem de erro: "⚠️Esse e-mail não parece correto, vamos tentar novamente."
  - **REJEITADOS nos testes:**
    - teste@gmail.com ❌
    - teste@hotmail.com ❌
    - teste@biomo.com.br ❌
    - testeja@yahoo.com.br ❌
  - **ACEITOS:**
    - thiagobauer@hotmail.com ✅ (email real existente)
  - **Conclusão:** Usam serviço de validação de email (ex: ZeroBounce, Hunter, NeverBounce)
  - **Benefício:** Evita leads falsos e melhora qualidade do banco de dados

### Step 3: Telefone
- **Pergunta:** "Qual e o seu telefone, {nome}? Assim, podemos ligar caso surja alguma duvida sobre o seu orcamento."
- **Input:** Campo com seletor de pais (bandeira) + numero
- **Validacao:** Verifica formato do telefone
- **Default:** Estados Unidos (+1) - precisa clicar para trocar Brasil (+55)
- **Detalhe UX:** Dropdown com bandeiras de todos os paises

### Step 4: Tipo de Demanda
- **Pergunta:** "Primeiro: e uma demanda empresarial ou pessoal?"
- **Opcoes:**
  - Demanda pessoal (Pessoa Fisica)
  - Demanda empresarial (Pessoa Juridica)

### Step 5: Nome da Empresa (se PJ)
- **Pergunta:** "Entendi. Qual e o nome da empresa? (Se ainda nao tem nome definido, pode escrever 'em definicao')"
- **Input:** Text field

### Step 6: Situacao do Site
- **Pergunta:** "Legal, {nome}. A sua empresa ja tem um site ou sera o primeiro site?"
- **Opcoes:**
  - O que preciso e de sistema/app/plataforma
  - Tem site, mas quero criar um novo
  - Nao tem site, sera o primeiro
  - Tem site, mas quero fazer alteracoes

### Step 7: Tipo de Solucao
- **Contexto:** "Na UpSites trabalhamos de duas formas diferentes, dependendo do momento e necessidade de cada empresa."
- **Pergunta:** "O que descreve melhor sua necessidade?"
- **Opcoes:**
  - **Quero comecar ou profissionalizar minha presenca digital!** - Site com entrega agil para colher resultados rapidamente
  - **Preciso de uma solucao completa com funcionalidades avancadas** - Site com SEO avancado, design exclusivo e gerente de projetos dedicado

### Step 8: Apresentacao do Investimento (GENIAL!)
- **Prova Social:** "Mas antes de seguir, quero te dizer que **voce esta no lugar certo**."
- **Credibilidade:** "Entregamos 160 sites por ano desde 2016, trabalhando com grandes marcas como USP, UNIMED, Exact Sales, Flow Podcast e Nestle."
- **Preco:** "Para essa necessidade de presenca digital profissional com resultados consistentes: Investimento estimado entre R$ 3.000 e R$ 4.000 no primeiro ano, incluindo desenvolvimento, infraestrutura e suporte tecnico continuado."
- **Flexibilidade:** "Vale lembrar que o valor final depende da complexidade e pode ser parcelado no boleto bancario."

### Step 9: Qualificacao de Budget (MUITO INTELIGENTE!)
- **Pergunta:** "Sobre essa estimativa de investimentos para ter seu projeto pronto, voce diria que:"
- **Opcoes:**
  - Esta dentro do esperado
  - Nao esta fora da realidade, mas preciso avaliar melhor
  - Nao consigo contratar, esta acima do meu orcamento

### Step 10: Informacao Adicional
- **Pergunta:** "Por ultimo, gostaria de incluir alguma informacao adicional?"
- **Opcoes:** Sim / Nao

### Step 11: Confirmacao + Thank You Page
- **Mensagem:** "Perfeito, {nome}! Ja encaminhei seus dados para nossa equipe. Baseado nas suas respostas, vamos definir a melhor forma de conduzir seu projeto."
- **Promessa:** "Voce recebera nosso contato em breve por email ou telefone."
- **Agradecimento:** "Obrigado pela confianca!"
- **Redirect:** Pagina /obrigado/ com contatos alternativos

---

## Pontos Fortes da UpSites

### 1. QUALIFICACAO PROGRESSIVA
- Coleta dados em ordem logica
- Cada pergunta leva a personalizacao da proxima
- Nao mostra preco ate entender a necessidade

### 2. PROVA SOCIAL FORTE
- Numeros concretos: "160 sites por ano desde 2016"
- Clientes grandes: USP, UNIMED, Nestle, Flow Podcast
- Cria confianca antes de mostrar preco

### 3. APRESENTACAO DE PRECO INTELIGENTE
- Preco so aparece APOS qualificacao
- Range de preco (R$ 3.000 a R$ 4.000) - nao assusta
- Menciona "primeiro ano" (inclui manutencao)
- Oferece parcelamento

### 4. QUALIFICACAO DE BUDGET
- Filtra leads sem dinheiro ANTES de gastar tempo
- Permite continuar mesmo quem "precisa avaliar"
- Identifica leads quentes vs frios

### 5. PERSONALIZACAO
- Usa o nome do lead em TODAS as mensagens
- Cria conexao emocional
- "Obrigado, Thiago!" em vez de "Obrigado!"

### 6. UX CONVERSACIONAL
- Interface tipo chat (Landbot)
- Mensagens aparecem sequencialmente
- Timestamps dao sensacao de conversa real
- Botao "Voltar" em todas as etapas
- Respostas do usuario em baloes verdes (lado direito)
- Respostas do bot em baloes brancos (lado esquerdo)

### 7. FLEXIBILIDADE NAS RESPOSTAS
- "Se ainda nao tem nome definido, pode escrever 'em definicao'"
- Opcao "O que preciso e de sistema/app/plataforma" para filtrar quem nao quer site

### 8. THANK YOU PAGE
- Pagina separada para tracking (conversao no GA4/Ads)
- Mostra contatos alternativos (telefone, email)
- Nao deixa o lead "no limbo"

---

## Melhorias Sugeridas para Biomo

### 1. ORDEM DAS PERGUNTAS
**Atual Biomo:**
1. Intro com animacao
2. Nome
3. Tipo de site (com precos!)
4. Perguntas sobre o projeto
5. Contato (WhatsApp)
6. Sucesso

**Sugerido (inspirado UpSites):**
1. Intro com animacao (manter - diferencial)
2. Nome
3. Email (captura primeiro!)
4. WhatsApp (com validacao)
5. Tipo de demanda (PF/PJ)
6. Nome da empresa (se PJ)
7. Situacao atual (tem site, nao tem, etc)
8. Tipo de projeto (simples, institucional, personalizado)
9. **Prova social + Preco estimado** (DEPOIS de qualificar)
10. **Qualificacao de budget** (Esta dentro do esperado?)
11. Informacao adicional (opcional)
12. Sucesso + Redirect

### 2. REMOVER PRECOS DO INICIO
- NAO mostrar precos nas opcoes de tipo de site
- Mostrar preco DEPOIS de qualificar o lead
- Apresentar como "investimento estimado" (nao "preco")

### 3. ADICIONAR PROVA SOCIAL
Criar secao antes do preco:
- "Voce esta no lugar certo!"
- "+50 sites entregues" (ou numero real)
- Logos de clientes (se tiver)
- "98% de satisfacao"

### 4. QUALIFICACAO DE BUDGET
Adicionar pergunta apos mostrar preco:
- "Este investimento esta dentro do seu planejamento?"
  - Sim, quero avancar
  - Preciso avaliar melhor
  - Esta acima do meu orcamento

### 5. PERSONALIZACAO
- Usar o nome do lead em TODAS as mensagens subsequentes
- "Obrigado, {nome}!" em vez de "Obrigado!"
- "Perfeito, {nome}!" em vez de "Perfeito!"

### 6. THANK YOU PAGE
- Criar pagina /sucesso ou /obrigado
- Redirect apos conversao (para tracking)
- Mostrar contatos alternativos
- Proximos passos claros

### 7. BOTAO VOLTAR
- Adicionar opcao de voltar em todas as etapas
- Permite corrigir erros
- Melhora UX

### 8. CAMPO DE TELEFONE
- Adicionar seletor de pais (Brasil padrao)
- Validar formato do telefone
- Ou usar mascara para telefone brasileiro

### 9. CAMPO "EM DEFINICAO"
- Para nome da empresa: permitir "em definicao"
- Para URL do site atual: permitir "ainda nao tenho"
- Evita abandono por nao saber responder

### 10. TIMESTAMPS
- Adicionar horario nas mensagens (fake ou real)
- Da sensacao de conversa em tempo real

---

## Fluxo Proposto para Biomo (NOVO)

### Step 1: Intro (manter atual)
- Animacao de chat
- "Oi! Sou a Bia, da Biomo."
- MacBook carousel
- Botao "Vamos la!"

### Step 2: Nome
- "Qual e o seu nome?"
- Input: text
- Personalizacao comeca aqui

### Step 3: Email
- "Obrigado, {nome}! Qual e o seu melhor email?"
- Input: email com validacao
- Captura o lead CEDO

### Step 4: WhatsApp
- "E seu WhatsApp para enviarmos a proposta?"
- Input: telefone com mascara BR
- Validacao de formato

### Step 5: Tipo de Demanda
- "E para voce ou para uma empresa, {nome}?"
- Opcoes:
  - Para mim (Pessoa Fisica)
  - Para minha empresa

### Step 6: Nome da Empresa (se PJ)
- "Qual o nome da empresa?"
- Input: text
- Nota: "Se ainda nao tem nome, pode escrever 'em definicao'"

### Step 7: Situacao Atual
- "Sua empresa ja tem um site?"
- Opcoes:
  - Nao tenho site ainda
  - Tenho, mas quero um novo
  - Tenho, mas precisa de melhorias

### Step 8: Objetivo
- "O que voce espera do seu novo site?"
- Opcoes:
  - Ter presenca online profissional
  - Gerar mais vendas/leads
  - Mostrar meu portfolio/trabalhos
  - Outro (campo de texto)

### Step 9: Prova Social + Investimento
- **Prova Social:**
  - "Voce esta no lugar certo, {nome}!"
  - "+50 sites entregues"
  - "98% de satisfacao"
  - "Clientes em todo o Brasil"
- **Investimento:**
  - "Para o que voce precisa, o investimento estimado e:"
  - **Site Simples:** a partir de R$ 997
  - **Site Institucional:** a partir de R$ 2.497
  - **Site Personalizado:** sob consulta
  - "Todos incluem hospedagem por 1 ano!"

### Step 10: Qualificacao de Budget
- "Esse investimento esta dentro do seu planejamento?"
- Opcoes:
  - Sim, quero avancar!
  - Preciso avaliar melhor
  - Esta acima do meu orcamento (podemos conversar)

### Step 11: Informacao Adicional (opcional)
- "Quer adicionar algo mais sobre seu projeto?"
- Opcoes: Sim / Nao, pode enviar!

### Step 12: Sucesso
- "Perfeito, {nome}!"
- "Ja enviamos suas informacoes para nosso time."
- "Entraremos em contato em ate 24 horas pelo WhatsApp."
- **Redirect para /sucesso** (para tracking)

---

## Implementacao Tecnica

### Arquivos a Modificar:
1. `src/hooks/useAppStore.ts` - Adicionar novos steps
2. `src/components/steps/StepName.tsx` - Coletar nome primeiro
3. `src/components/steps/StepEmail.tsx` - NOVO (coletar email cedo)
4. `src/components/steps/StepPhone.tsx` - NOVO (com mascara BR)
5. `src/components/steps/StepDemandType.tsx` - NOVO (PF/PJ)
6. `src/components/steps/StepCompanyName.tsx` - NOVO (se PJ)
7. `src/components/steps/StepSituation.tsx` - NOVO (tem site?)
8. `src/components/steps/StepObjective.tsx` - NOVO (objetivo)
9. `src/components/steps/StepInvestment.tsx` - NOVO (prova social + preco)
10. `src/components/steps/StepBudget.tsx` - NOVO (qualificacao)
11. `src/components/steps/StepAdditional.tsx` - NOVO (info extra)
12. `src/components/steps/StepSuccess.tsx` - Modificar para redirect
13. `src/app/sucesso/page.tsx` - NOVO (thank you page)

### Ordem dos Steps:
```typescript
enum Step {
  INTRO = 0,
  NAME = 1,
  EMAIL = 2,
  PHONE = 3,
  DEMAND_TYPE = 4,
  COMPANY_NAME = 5, // condicional
  SITUATION = 6,
  OBJECTIVE = 7,
  INVESTMENT = 8,
  BUDGET = 9,
  ADDITIONAL = 10,
  SUCCESS = 11
}
```

### Store State:
```typescript
interface FormData {
  name: string
  email: string
  phone: string
  demandType: 'pf' | 'pj'
  companyName?: string
  situation: 'no_site' | 'new_site' | 'improve_site'
  objective: string
  budgetFit: 'yes' | 'evaluate' | 'no'
  additional?: string
}
```
