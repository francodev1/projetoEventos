'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-title font-bold text-gray-900 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: Janeiro de 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                1. Introdução
              </h2>
              <p className="text-gray-700 leading-relaxed">
                A <strong>Fonte Church</strong> está comprometida em proteger a privacidade e os dados pessoais de seus usuários. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais 
                de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                2. Dados Coletados
              </h2>
              <p className="text-gray-700 mb-4">Coletamos as seguintes informações:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Dados de Cadastro:</strong> Nome, email, senha criptografada</li>
                <li><strong>Dados de Autenticação:</strong> Tokens de sessão, histórico de login</li>
                <li><strong>Dados de Eventos:</strong> Eventos criados, ingressos comprados</li>
                <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
                <li><strong>Cookies:</strong> Cookies essenciais para funcionamento e opcionais para analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                3. Finalidade do Uso
              </h2>
              <p className="text-gray-700 mb-4">Seus dados são utilizados para:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Criar e gerenciar sua conta na plataforma</li>
                <li>Processar compras e vendas de ingressos</li>
                <li>Enviar notificações sobre eventos e transações</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais e prevenir fraudes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-blue-600" />
                4. Segurança dos Dados
              </h2>
              <p className="text-gray-700 mb-4">Implementamos medidas de segurança robustas:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Criptografia de senhas usando bcrypt</li>
                <li>Conexões HTTPS (SSL/TLS) obrigatórias</li>
                <li>Autenticação via tokens seguros (JWT)</li>
                <li>Proteção contra ataques (XSS, CSRF, SQL Injection)</li>
                <li>Rate limiting para prevenir abusos</li>
                <li>Backups regulares e redundância de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-blue-600" />
                5. Seus Direitos (LGPD)
              </h2>
              <p className="text-gray-700 mb-4">Você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Acesso:</strong> Solicitar cópia de seus dados pessoais</li>
                <li><strong>Correção:</strong> Atualizar dados incorretos ou desatualizados</li>
                <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Para exercer seus direitos, acesse a página <a href="/perfil" className="text-blue-600 hover:underline">Meu Perfil</a> ou 
                entre em contato conosco pelo email: <a href="mailto:privacidade@fontechurch.com" className="text-blue-600 hover:underline">privacidade@fontechurch.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Compartilhamento de Dados</h2>
              <p className="text-gray-700">
                <strong>Não vendemos seus dados.</strong> Compartilhamos informações apenas quando necessário:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Com processadores de pagamento (para transações)</li>
                <li>Com prestadores de serviços (hospedagem, analytics)</li>
                <li>Quando exigido por lei ou ordem judicial</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
              <p className="text-gray-700">
                Utilizamos cookies para melhorar sua experiência. Você pode gerenciar preferências de cookies 
                através do banner que aparece ao acessar o site. Consulte nossa Política de Cookies para mais detalhes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Retenção de Dados</h2>
              <p className="text-gray-700">
                Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas ou conforme 
                exigido por lei. Após a exclusão da conta, os dados são mantidos por 30 dias e depois removidos permanentemente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações nesta Política</h2>
              <p className="text-gray-700">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
                através do email cadastrado ou aviso no site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
              <p className="text-gray-700">
                Para dúvidas sobre privacidade ou exercício de direitos:
              </p>
              <ul className="list-none space-y-2 text-gray-700 mt-4">
                <li><strong>Email:</strong> privacidade@fontechurch.com</li>
                <li><strong>DPO:</strong> Encarregado de Proteção de Dados</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
