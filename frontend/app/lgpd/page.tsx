'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Download, Trash2, Lock, Eye, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LGPDPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-title font-bold text-gray-900 mb-4">
              LGPD - Seus Direitos
            </h1>
            <p className="text-gray-600">
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <a href="/perfil">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <Eye className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Acessar Dados</h3>
                <p className="text-sm text-gray-600">Veja seus dados pessoais</p>
              </div>
            </a>

            <a href="/perfil">
              <div className="p-6 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all cursor-pointer">
                <Download className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Exportar Dados</h3>
                <p className="text-sm text-gray-600">Baixe seus dados em JSON</p>
              </div>
            </a>

            <a href="/perfil">
              <div className="p-6 bg-red-50 rounded-xl border border-red-200 hover:shadow-md transition-all cursor-pointer">
                <Trash2 className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Excluir Conta</h3>
                <p className="text-sm text-gray-600">Remova seus dados permanentemente</p>
              </div>
            </a>
          </div>

          {/* Content */}
          <div className="prose prose-green max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O que é a LGPD?</h2>
              <p className="text-gray-700 leading-relaxed">
                A Lei Geral de Proteção de Dados é a legislação brasileira que regula o tratamento de dados pessoais. 
                Ela garante mais controle e transparência sobre como suas informações são coletadas, usadas e armazenadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" />
                Seus Direitos como Titular de Dados
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">1. Confirmação e Acesso</h3>
                  <p className="text-gray-700">
                    Você pode confirmar se tratamos seus dados e solicitar acesso a eles a qualquer momento.
                  </p>
                  <Button asChild className="mt-3">
                    <a href="/perfil">Acessar Meus Dados</a>
                  </Button>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">2. Correção</h3>
                  <p className="text-gray-700">
                    Você pode corrigir dados incompletos, inexatos ou desatualizados diretamente no seu perfil.
                  </p>
                  <Button variant="outline" asChild className="mt-3">
                    <a href="/perfil">Editar Perfil</a>
                  </Button>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">3. Portabilidade</h3>
                  <p className="text-gray-700">
                    Você pode solicitar seus dados em formato estruturado (JSON) para uso em outros serviços.
                  </p>
                  <Button variant="outline" asChild className="mt-3">
                    <a href="/perfil">Exportar Dados</a>
                  </Button>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">4. Eliminação</h3>
                  <p className="text-gray-700">
                    Você pode solicitar a exclusão de seus dados, exceto quando houver obrigação legal de retenção.
                  </p>
                  <Button variant="outline" asChild className="mt-3">
                    <a href="/perfil">Excluir Minha Conta</a>
                  </Button>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">5. Revogação do Consentimento</h3>
                  <p className="text-gray-700">
                    Você pode revogar o consentimento para tratamento de dados a qualquer momento, mas isso pode limitar o uso da plataforma.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">6. Informação sobre Compartilhamento</h3>
                  <p className="text-gray-700">
                    Você pode solicitar informações sobre com quem compartilhamos seus dados. Veja nossa{' '}
                    <a href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</a>.
                  </p>
                </div>

                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">7. Oposição ao Tratamento</h3>
                  <p className="text-gray-700">
                    Você pode se opor ao tratamento de dados em situações específicas, como marketing direto.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">8. Revisão de Decisões Automatizadas</h3>
                  <p className="text-gray-700">
                    Você pode solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado de dados.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-green-600" />
                Como Protegemos Seus Dados
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Criptografia de ponta a ponta em todas as comunicações</li>
                <li>Senhas protegidas com hash bcrypt</li>
                <li>Acesso restrito aos dados apenas para equipe autorizada</li>
                <li>Auditorias regulares de segurança</li>
                <li>Backups seguros e redundantes</li>
                <li>Conformidade com padrões internacionais (ISO 27001)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Bases Legais para Tratamento</h2>
              <p className="text-gray-700 mb-4">Tratamos seus dados com base em:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Consentimento:</strong> Quando você cria uma conta e aceita os termos</li>
                <li><strong>Execução de Contrato:</strong> Para fornecer os serviços solicitados</li>
                <li><strong>Obrigação Legal:</strong> Para cumprir leis tributárias e regulatórias</li>
                <li><strong>Legítimo Interesse:</strong> Para melhorar nossos serviços e prevenir fraudes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Retenção de Dados</h2>
              <p className="text-gray-700">
                Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas ou conforme 
                exigido por lei. Após a solicitação de exclusão, mantemos os dados por 30 dias antes da 
                remoção permanente, exceto dados que devem ser retidos por obrigação legal (registros fiscais por 5 anos).
              </p>
            </section>

            <section className="mb-8 bg-green-50 p-6 rounded-xl border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Encarregado de Dados (DPO)</h2>
              <p className="text-gray-700 mb-4">
                Para exercer seus direitos ou tirar dúvidas sobre proteção de dados, entre em contato com nosso DPO:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>Email:</strong> dpo@fontechurch.com</li>
                <li><strong>Formulário:</strong> <a href="mailto:dpo@fontechurch.com" className="text-green-600 hover:underline">Enviar solicitação</a></li>
                <li><strong>Prazo de resposta:</strong> Até 15 dias úteis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Direito de Reclamação</h2>
              <p className="text-gray-700">
                Se você acredita que seus direitos foram violados, pode apresentar reclamação à 
                Autoridade Nacional de Proteção de Dados (ANPD):
              </p>
              <ul className="list-none space-y-2 text-gray-700 mt-4">
                <li><strong>Website:</strong> <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.gov.br/anpd</a></li>
                <li><strong>Canal de Atendimento:</strong> disponível no site da ANPD</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
