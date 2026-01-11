import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Função utilitária para mesclar classes CSS com Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata valor numérico para moeda brasileira (BRL)
 * @param value - Valor a ser formatado
 * @returns String formatada como moeda (ex: "R$ 24,90")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Formata data para padrão brasileiro com hora
 * @param date - Data como Date ou string
 * @returns String formatada (ex: "15 de janeiro de 2026, 14:30")
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Formata data para padrão brasileiro curto
 * @param date - Data como Date ou string
 * @returns String formatada (ex: "15/01/2026")
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

/**
 * Calcula percentual entre dois valores
 * @param part - Parte do valor
 * @param total - Valor total
 * @returns Percentual calculado
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}

/**
 * Trunca texto com reticências
 * @param text - Texto a ser truncado
 * @param maxLength - Tamanho máximo
 * @returns Texto truncado
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Valida CPF brasileiro
 * @param cpf - CPF a ser validado
 * @returns true se válido
 */
export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '')
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  
  let sum = 0
  let remainder
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false
  
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false
  
  return true
}

/**
 * Formata CPF
 * @param cpf - CPF a ser formatado
 * @returns CPF formatado (xxx.xxx.xxx-xx)
 */
export function formatCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
