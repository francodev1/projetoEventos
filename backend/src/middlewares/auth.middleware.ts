import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    name: string
    role: string
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Formato de token inválido' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token mal formatado' })
    }

    const payload = verifyToken(token)
    req.user = payload

    next()
  } catch (error: any) {
    return res.status(401).json({ error: error.message })
  }
}
