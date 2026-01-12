import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { supabase } from '../config/supabase'
import { generateToken } from '../utils/jwt'
import { z } from 'zod'

const router = Router()

// Schema de validação para registro
const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

// Schema de validação para login
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

// POST /api/auth/register - Criar conta
router.post('/register', async (req: Request, res: Response) => {
  try {
    // Validar dados
    const { name, email, password } = registerSchema.parse(req.body)

    // Verificar se usuário já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário no Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'ORGANIZER',
          subscriptionStatus: 'INACTIVE'
        }
      ])
      .select('id, name, email, role, subscriptionStatus, createdAt')
      .single()

    if (error) {
      console.error('Erro ao criar usuário:', error)
      return res.status(500).json({ error: 'Erro ao criar usuário' })
    }

    // Gerar JWT token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    })

    // Retornar usuário e token
    return res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        subscriptionStatus: newUser.subscriptionStatus,
        createdAt: newUser.createdAt
      },
      token,
      expiresIn: '30m'
    })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    console.error('Erro no registro:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// POST /api/auth/login - Fazer login
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validar dados
    const { email, password } = loginSchema.parse(req.body)

    // Buscar usuário
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, password, role, subscriptionStatus, createdAt')
      .eq('email', email.toLowerCase())
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    // Gerar JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    // Retornar usuário e token
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
        createdAt: user.createdAt
      },
      token,
      expiresIn: '30m'
    })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    console.error('Erro no login:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// GET /api/auth/me - Obter dados do usuário logado
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    const token = authHeader.replace('Bearer ', '')
    
    const { verifyToken } = await import('../utils/jwt')
    const payload = verifyToken(token)

    // Buscar usuário atualizado
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, subscriptionStatus, createdAt, updatedAt')
      .eq('id', payload.userId)
      .single()

    if (error || !user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    return res.status(200).json({ user })
  } catch (error: any) {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
})

// POST /api/auth/refresh - Renovar token
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { token: oldToken } = req.body

    if (!oldToken) {
      return res.status(400).json({ error: 'Token não fornecido' })
    }

    const { decodeToken } = await import('../utils/jwt')
    const payload = decodeToken(oldToken)

    if (!payload) {
      return res.status(401).json({ error: 'Token inválido' })
    }

    // Buscar usuário para garantir que ainda existe
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('id', payload.userId)
      .single()

    if (error || !user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    // Gerar novo token
    const newToken = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    return res.status(200).json({
      token: newToken,
      expiresIn: '30m'
    })
  } catch (error: any) {
    console.error('Erro ao renovar token:', error)
    return res.status(500).json({ error: 'Erro ao renovar token' })
  }
})

export { router as authRoutes }
