import { Router } from 'express';

const router = Router();

// Placeholder para rotas de autenticação
// Implementar com NextAuth.js ou Clerk no frontend

router.post('/register', (req, res) => {
  res.json({ message: 'Auth routes - implementar integração com NextAuth/Clerk' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Auth routes - implementar integração com NextAuth/Clerk' });
});

export { router as authRoutes };
