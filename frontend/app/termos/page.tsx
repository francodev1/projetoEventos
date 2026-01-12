'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-title font-bold text-gray-900 mb-4">
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-purple max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e usar a plataforma <strong>Fonte Church</strong>, você concorda com estes Termos de Uso. 
                Se você não concorda com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-700 mb-4">
                A Fonte Church é uma plataforma digital que permite:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Criar e gerenciar eventos religiosos</li>
                <li>Vender ingressos online</li>
                <li>Processar pagamentos de forma segura</li>
                <li>Gerenciar participantes e check-in</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cadastro e Conta</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Você deve fornecer informações verdadeiras e atualizadas</li>
                <li>Você é responsável pela segurança de sua senha</li>
                <li>Não compartilhe suas credenciais de acesso</li>
                <li>Notifique-nos imediatamente sobre uso não autorizado</li>
                <li>Contas não podem ser transferidas a terceiros</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilidades do Organizador</h2>
              <p className="text-gray-700 mb-4">Ao criar eventos, você concorda em:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fornecer informações precisas sobre o evento</li>
                <li>Cumprir todas as leis e regulamentos aplicáveis</li>
                <li>Honrar a venda de ingressos e prestar o serviço prometido</li>
                <li>Não promover atividades ilegais ou prejudiciais</li>
                <li>Processar reembolsos conforme política estabelecida</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pagamentos e Taxas</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Taxas de serviço aplicáveis serão informadas claramente</li>
                <li>Pagamentos são processados por parceiros certificados</li>
                <li>Repasses financeiros seguem cronograma estabelecido</li>
                <li>Chargebacks e disputas são analisados caso a caso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Política de Reembolso</h2>
              <p className="text-gray-700">
                Reembolsos são processados de acordo com a política do organizador do evento. 
                A Fonte Church facilita o processo mas não é responsável por decisões de reembolso, 
                que cabem ao organizador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriedade Intelectual</h2>
              <p className="text-gray-700">
                Todo o conteúdo da plataforma (textos, gráficos, logos, código) é propriedade da Fonte Church 
                e protegido por leis de direitos autorais. Você mantém os direitos sobre o conteúdo que carrega 
                (fotos de eventos, descrições), mas nos concede licença para exibir na plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Conteúdo Proibido</h2>
              <p className="text-gray-700 mb-4">É estritamente proibido:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Publicar conteúdo ofensivo, difamatório ou ilegal</li>
                <li>Promover discriminação, ódio ou violência</li>
                <li>Violar direitos de terceiros</li>
                <li>Distribuir malware ou realizar ataques cibernéticos</li>
                <li>Fazer spam ou uso abusivo da plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Suspensão e Cancelamento</h2>
              <p className="text-gray-700">
                Reservamo-nos o direito de suspender ou cancelar contas que violem estes termos, 
                sem aviso prévio. Você pode cancelar sua conta a qualquer momento através das configurações do perfil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitação de Responsabilidade</h2>
              <p className="text-gray-700">
                A Fonte Church não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Qualidade ou execução dos eventos criados por terceiros</li>
                <li>Disputas entre organizadores e participantes</li>
                <li>Perdas indiretas ou lucros cessantes</li>
                <li>Interrupções temporárias do serviço por manutenção</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modificações dos Termos</h2>
              <p className="text-gray-700">
                Podemos atualizar estes termos periodicamente. Mudanças significativas serão comunicadas 
                por email ou notificação na plataforma. O uso continuado após mudanças constitui aceitação.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Lei Aplicável e Foro</h2>
              <p className="text-gray-700">
                Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro 
                da comarca de São Paulo/SP.
              </p>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                13. Contato
              </h2>
              <p className="text-gray-700">
                Dúvidas sobre estes termos? Entre em contato:
              </p>
              <ul className="list-none space-y-2 text-gray-700 mt-4">
                <li><strong>Email:</strong> suporte@fontechurch.com</li>
                <li><strong>Telefone:</strong> (11) 0000-0000</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
