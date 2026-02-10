import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Biomo',
  description: 'Política de Privacidade da Biomo - Saiba como coletamos, usamos e protegemos seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao início
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Política de Privacidade
          </h1>
          <p className="text-zinc-400">
            Última atualização: janeiro de 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-zinc max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">1. Introdução</h2>
            <p className="text-zinc-400 leading-relaxed">
              A Biomo (&quot;nós&quot;, &quot;nosso&quot; ou &quot;empresa&quot;) está comprometida em proteger a privacidade
              dos visitantes do nosso site e dos nossos clientes. Esta Política de Privacidade explica como
              coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a
              Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">2. Dados que Coletamos</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Coletamos os seguintes tipos de dados pessoais:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li><strong className="text-white">Dados de identificação:</strong> nome</li>
              <li><strong className="text-white">Dados de contato:</strong> número de WhatsApp, e-mail</li>
              <li><strong className="text-white">Dados empresariais:</strong> nome da empresa (opcional)</li>
              <li><strong className="text-white">Dados de navegação:</strong> páginas visitadas, tempo de permanência, origem do acesso</li>
              <li><strong className="text-white">Preferências:</strong> respostas ao questionário sobre tipo de site desejado</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">3. Como Usamos seus Dados</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Utilizamos seus dados para as seguintes finalidades:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Entrar em contato para apresentar proposta comercial</li>
              <li>Personalizar a comunicação e a proposta de acordo com suas necessidades</li>
              <li>Melhorar nossos serviços e a experiência do usuário</li>
              <li>Enviar comunicações de marketing (apenas com seu consentimento)</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">4. Base Legal para Processamento</h2>
            <p className="text-zinc-400 leading-relaxed">
              O tratamento dos seus dados pessoais é realizado com base no seu consentimento (Art. 7º, I, LGPD),
              que você fornece ao preencher o formulário e aceitar esta política. Para comunicações de marketing,
              solicitamos consentimento específico.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Não vendemos seus dados pessoais. Podemos compartilhar seus dados com:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li><strong className="text-white">Provedores de serviço:</strong> empresas que nos auxiliam na operação (hospedagem, analytics)</li>
              <li><strong className="text-white">Plataformas de comunicação:</strong> WhatsApp para contato comercial</li>
              <li><strong className="text-white">Autoridades:</strong> quando exigido por lei</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">6. Cookies e Tecnologias de Rastreamento</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Lembrar suas preferências</li>
              <li>Analisar o tráfego do site (Google Analytics)</li>
              <li>Melhorar a performance do site</li>
              <li>Campanhas de marketing (Google Ads)</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mt-4">
              Você pode gerenciar suas preferências de cookies através do banner exibido no site ou nas
              configurações do seu navegador.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">7. Seus Direitos (LGPD)</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li><strong className="text-white">Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los</li>
              <li><strong className="text-white">Correção:</strong> solicitar correção de dados incompletos ou incorretos</li>
              <li><strong className="text-white">Anonimização ou eliminação:</strong> solicitar quando os dados forem desnecessários</li>
              <li><strong className="text-white">Portabilidade:</strong> receber seus dados em formato estruturado</li>
              <li><strong className="text-white">Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento</li>
              <li><strong className="text-white">Oposição:</strong> opor-se ao tratamento em determinadas situações</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">8. Segurança dos Dados</h2>
            <p className="text-zinc-400 leading-relaxed">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados contra
              acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia,
              controle de acesso e monitoramento de segurança.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">9. Retenção de Dados</h2>
            <p className="text-zinc-400 leading-relaxed">
              Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas
              nesta política ou conforme exigido por lei. Dados de leads são mantidos por até 2 anos
              após o último contato, salvo se você solicitar a eliminação antes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">10. Contato</h2>
            <p className="text-zinc-400 leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <div className="mt-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <p className="text-white font-medium">Biomo</p>
              <p className="text-zinc-400">E-mail: contato@biomo.com.br</p>
              <p className="text-zinc-400">WhatsApp: (47) 99606-7992</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">11. Alterações nesta Política</h2>
            <p className="text-zinc-400 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise
              esta página regularmente. A data da última atualização está indicada no início do documento.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-medium rounded-xl transition-colors"
          >
            Voltar ao início
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
