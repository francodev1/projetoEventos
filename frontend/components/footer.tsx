import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <Image 
                  src="/assets/Ativo 6.png" 
                  alt="Fonte Church Logo" 
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <h5 className="font-bold text-2xl font-title">Fonte Church</h5>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-body font-bold">
              Plataforma de gestão de eventos e venda de ingressos para igrejas. 
              Simples, seguro e transparente.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@fontechurch.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h6 className="font-semibold mb-4 font-body">Produto</h6>
            <ul className="space-y-2 text-gray-400 text-sm font-body">
              <li>
                <Link href="/eventos" className="hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/precos" className="hover:text-white transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="hover:text-white transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Demonstração
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h6 className="font-semibold mb-4 font-body">Empresa</h6>
            <ul className="space-y-2 text-gray-400 text-sm font-body">
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="font-semibold mb-4 font-body">Legal</h6>
            <ul className="space-y-2 text-gray-400 text-sm font-body">
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/lgpd" className="hover:text-white transition-colors">
                  LGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left font-body">
              © {new Date().getFullYear()} Fonte Church. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right font-body">
              Desenvolvido com ❤️ para igrejas
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
