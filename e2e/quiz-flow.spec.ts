import { test, expect } from '@playwright/test'

test.describe('Quiz Flow Completo', () => {
  test('deve navegar por todas as etapas sem erros visuais', async ({ page }) => {
    await page.goto('/')

    // Fechar cookie banner se aparecer
    try {
      const cookieRecusar = page.locator('button:has-text("Recusar")')
      await cookieRecusar.waitFor({ state: 'visible', timeout: 2000 })
      await cookieRecusar.click()
      await page.waitForTimeout(300)
    } catch {
      // Cookie banner não apareceu
    }

    // Etapa 1: Intro
    await page.waitForSelector('text=Comecar', { timeout: 10000 })
    await page.screenshot({ path: 'e2e/screenshots/01-intro.png', fullPage: true })
    await page.click('button:has-text("Comecar")')

    // Etapa 2: Nome
    await page.waitForSelector('text=Qual e o seu nome', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/02-nome.png', fullPage: true })
    await page.fill('input[type="text"]', 'Teste Automatizado')
    await page.press('input[type="text"]', 'Enter')

    // Etapa 3: Email
    await page.waitForSelector('text=melhor e-mail', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/03-email.png', fullPage: true })
    await page.fill('input[type="email"]', 'teste@teste.com')
    await page.press('input[type="email"]', 'Enter')

    // Etapa 4: WhatsApp
    await page.waitForSelector('text=WhatsApp', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/04-whatsapp.png', fullPage: true })
    await page.fill('input[inputmode="tel"]', '11999999999')
    await page.press('input[inputmode="tel"]', 'Enter')

    // Aguardar celebracao
    await page.waitForTimeout(1500)

    // Etapa 5: Tipo de demanda
    await page.waitForSelector('text=O site sera para', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/05-demanda.png', fullPage: true })
    await page.click('button:has-text("Empresa")')

    // Etapa 6: Nome da empresa
    await page.waitForSelector('text=nome da empresa', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/06-empresa.png', fullPage: true })
    await page.fill('input[type="text"]', 'Empresa Teste LTDA')
    await page.press('input[type="text"]', 'Enter')

    // Etapa 7: Situacao do site
    await page.waitForSelector('text=Sobre seu site atual', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/07-situacao.png', fullPage: true })
    await page.click('button:has-text("Nao tenho site ainda")')

    // Etapa 8: Tipo de projeto
    await page.waitForSelector('text=tipo de projeto', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/08-projeto.png', fullPage: true })

    // Verificar se cards de projeto estao visiveis
    const projectCards = page.locator('[class*="project"]').or(page.locator('button').filter({ hasText: /997|2.497|5.000/ }))
    await expect(projectCards.first()).toBeVisible({ timeout: 5000 })

    // Clicar no primeiro tipo de projeto
    await page.click('button:has-text("997")')

    // Aguardar celebracao
    await page.waitForTimeout(1800)

    // Etapa 9: Urgencia
    await page.waitForSelector('text=urgencia', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/09-urgencia.png', fullPage: true })

    // Verificar se nao ha sobreposicao de elementos
    const cardContainer = page.locator('[class*="rounded-3xl"]').first()
    const boundingBox = await cardContainer.boundingBox()

    if (boundingBox) {
      console.log('Etapa 9 - Card bounding box:', boundingBox)
      // Verificar se o card esta dentro da viewport
      expect(boundingBox.x).toBeGreaterThanOrEqual(0)
      expect(boundingBox.y).toBeGreaterThanOrEqual(0)
    }

    await page.click('button:has-text("Prazo normal")')

    // Etapa 10: Features
    await page.waitForSelector('text=funcionalidades', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/10-features.png', fullPage: true })

    // Fechar cookie banner se ainda estiver visivel (pode bloquear teclado)
    const cookieBanner = page.locator('text=Usamos cookies')
    if (await cookieBanner.isVisible().catch(() => false)) {
      await page.locator('button:has-text("Recusar")').click({ force: true })
      await page.waitForTimeout(500)
    }

    // Selecionar features usando atalhos de teclado (A, B, etc)
    await page.keyboard.press('A')
    await page.waitForTimeout(200)
    await page.keyboard.press('B')
    await page.waitForTimeout(200)

    // Clicar no botao Continuar (mais confiavel que Enter)
    await page.locator('button:has-text("Continuar")').click()
    await page.waitForTimeout(500)

    // Etapa 11: Budget
    await page.waitForSelector('text=orcamento', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/11-budget.png', fullPage: true })
    await page.click('button:has-text("Sim")')

    // Etapa 12: Logo
    await page.waitForSelector('text=logo', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/12-logo.png', fullPage: true })
    await page.click('button:has-text("nao tenho")')

    // Etapa 13: Referencias
    await page.waitForSelector('text=referencia', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/13-referencias.png', fullPage: true })
    await page.click('button:has-text("Nao tenho")')

    // Etapa 14: Notas adicionais
    await page.waitForSelector('text=informacao importante', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/14-notas.png', fullPage: true })
    await page.click('text=Pular')

    // Etapa 15: LGPD
    await page.waitForSelector('text=Quase la', { timeout: 5000 })
    await page.screenshot({ path: 'e2e/screenshots/15-lgpd.png', fullPage: true })

    console.log('Teste concluido com sucesso!')
  })

  test('deve verificar se etapa 9 nao tem sobreposicao', async ({ page }) => {
    await page.goto('/')

    // Fechar cookie banner se aparecer
    try {
      const cookieRecusar = page.locator('button:has-text("Recusar")')
      await cookieRecusar.waitFor({ state: 'visible', timeout: 2000 })
      await cookieRecusar.click()
      await page.waitForTimeout(300)
    } catch {
      // Cookie banner não apareceu
    }

    // Navegar rapidamente ate etapa 9
    await page.click('button:has-text("Comecar")')
    await page.waitForTimeout(500)

    await page.fill('input[type="text"]', 'Teste')
    await page.press('input[type="text"]', 'Enter')
    await page.waitForTimeout(300)

    await page.fill('input[type="email"]', 'a@a.com')
    await page.press('input[type="email"]', 'Enter')
    await page.waitForTimeout(300)

    await page.fill('input[inputmode="tel"]', '11999999999')
    await page.press('input[inputmode="tel"]', 'Enter')
    await page.waitForTimeout(1500)

    await page.click('button:has-text("Empresa")')
    await page.waitForTimeout(300)

    await page.fill('input[type="text"]', 'Empresa')
    await page.press('input[type="text"]', 'Enter')
    await page.waitForTimeout(300)

    await page.click('button:has-text("Nao tenho")')
    await page.waitForTimeout(300)

    // Etapa 8: Projeto - clicar e aguardar
    await page.click('button:has-text("997")')
    await page.waitForTimeout(2000)

    // ETAPA 9: Urgencia - verificar sobreposicao
    await page.waitForSelector('text=urgencia', { timeout: 5000 })

    // Tirar screenshot da etapa 9
    await page.screenshot({ path: 'e2e/screenshots/etapa9-urgencia-detail.png', fullPage: true })

    // Verificar elementos na pagina
    const allButtons = await page.locator('button').all()
    console.log(`Total de botoes visiveis: ${allButtons.length}`)

    // Verificar se ha elementos com z-index alto que possam estar sobrepondo
    const overlappingElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*')
      const problematic: string[] = []

      elements.forEach(el => {
        const style = window.getComputedStyle(el)
        const zIndex = parseInt(style.zIndex) || 0
        const position = style.position

        if (zIndex > 40 && position !== 'static') {
          problematic.push(`${el.tagName}.${el.className} - z-index: ${zIndex}, position: ${position}`)
        }
      })

      return problematic
    })

    console.log('Elementos com z-index alto:', overlappingElements)

    // Verificar se o card principal esta visivel e clicavel
    const urgencyOption = page.locator('button:has-text("Prazo normal")')
    await expect(urgencyOption).toBeVisible()

    // Tentar clicar
    await urgencyOption.click()

    // Se chegou aqui, nao ha sobreposicao bloqueando
    await page.waitForSelector('text=funcionalidades', { timeout: 5000 })
    console.log('Etapa 9 OK - sem sobreposicao bloqueante')
  })
})
