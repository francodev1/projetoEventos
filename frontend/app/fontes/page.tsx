'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FontsPreview() {
  const fonts = [
    {
      name: 'Playfair Display',
      import: 'Playfair+Display:wght@400;600;700',
      className: 'font-playfair',
      description: 'Clássica e elegante, perfeita para marcas sofisticadas'
    },
    {
      name: 'Montserrat',
      import: 'Montserrat:wght@400;600;700',
      className: 'font-montserrat',
      description: 'Moderna e limpa, excelente legibilidade'
    },
    {
      name: 'Merriweather',
      import: 'Merriweather:wght@400;700;900',
      className: 'font-merriweather',
      description: 'Tradicional e confiável, ótima para textos longos'
    },
    {
      name: 'Poppins',
      import: 'Poppins:wght@400;600;700',
      className: 'font-poppins',
      description: 'Geométrica e contemporânea, muito versátil'
    },
    {
      name: 'Lora',
      import: 'Lora:wght@400;600;700',
      className: 'font-lora',
      description: 'Serifa moderna, equilibrada e amigável'
    },
    {
      name: 'Raleway',
      import: 'Raleway:wght@400;600;700',
      className: 'font-raleway',
      description: 'Elegante e minimalista, design clean'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha a Fonte para Fonte Church
          </h1>
          <p className="text-gray-600">
            Clique em "Aplicar" para usar a fonte escolhida
          </p>
        </div>

        <div className="grid gap-8">
          {fonts.map((font) => (
            <div key={font.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{font.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{font.description}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(font.name)
                      alert(`Fonte "${font.name}" copiada! Volte e me diga qual você quer aplicar.`)
                    }}
                  >
                    Escolher Esta
                  </Button>
                </div>

                <div className="space-y-6 border-t pt-6">
                  {/* Preview com a fonte */}
                  <div style={{ fontFamily: font.name.replace('+', ' ') }}>
                    <h3 className="text-5xl font-bold text-gray-900 mb-4">
                      Fonte Church
                    </h3>
                    <h4 className="text-3xl font-semibold text-primary mb-4">
                      Transforme Eventos da Sua Igreja
                    </h4>
                    <p className="text-lg text-gray-600 mb-4">
                      Plataforma completa para gestão e venda de ingressos de eventos religiosos.
                    </p>
                    <div className="flex gap-4">
                      <span className="px-6 py-3 bg-primary text-white font-semibold rounded-lg">
                        Começar Agora
                      </span>
                      <span className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg">
                        Ver Eventos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Não encontrou a fonte ideal?
          </p>
          <Button variant="outline" asChild>
            <Link href="/">
              Manter Fonte Atual (Cinzel)
            </Link>
          </Button>
        </div>
      </div>

      {/* Importar todas as fontes para preview */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@400;600;700&family=Merriweather:wght@400;700;900&family=Poppins:wght@400;600;700&family=Lora:wght@400;600;700&family=Raleway:wght@400;600;700&display=swap');
      `}</style>
    </div>
  )
}
