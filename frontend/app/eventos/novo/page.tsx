'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function NovoEventoPage() {
  function handleSave() {
    // placeholder: aqui você chamaria a API para salvar o evento
    toast.success('Evento salvo com sucesso!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">Criar Evento</h1>
              <p className="text-gray-600 mt-1 font-body">Configure seu evento e comece a vender ingressos em minutos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <label className="block text-sm font-medium text-gray-700">Título do Evento</label>
              <input className="mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Nome do evento" />

              <label className="block text-sm font-medium text-gray-700 mt-4">Data e Hora</label>
              <input type="date" className="mt-2 w-full border rounded-md px-3 py-2" />

              <label className="block text-sm font-medium text-gray-700 mt-4">Local</label>
              <input className="mt-2 w-full border rounded-md px-3 py-2" placeholder="Endereço ou online" />
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea className="mt-2 w-full border rounded-md px-3 py-2 h-40 resize-none" placeholder="Descrição do evento e instruções"></textarea>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Ingressos</label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md border hover:border-primary/30 transition-colors">
                    <div>
                      <div className="font-medium">Ingresso Padrão</div>
                      <div className="text-sm text-gray-500">Entrada geral</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">R$ 20,00</div>
                      <div className="text-sm text-gray-500">Quantidade: 100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link href="/eventos" className="text-gray-600 hover:text-primary">Cancelar</Link>
            <button onClick={handleSave} className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">Salvar e Publicar</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
