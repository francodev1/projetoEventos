# 🔐 Sistema de Autenticação JWT - ChurchPass

## 📋 Visão Geral

Sistema de autenticação customizado com JWT (JSON Web Tokens) com expiração de 30 minutos e armazenamento em localStorage.

---

## 🏗️ Arquitetura

### Backend (Node.js + Express)

**Arquivos Criados:**
- `backend/src/utils/jwt.ts` - Utilitários JWT (gerar, verificar, decodificar)
- `backend/src/middlewares/auth.middleware.ts` - Middleware de autenticação
- `backend/src/routes/auth.routes.ts` - Rotas de autenticação
- `backend/src/config/supabase.ts` - Cliente Supabase

**Endpoints Disponíveis:**

```
POST /api/auth/register - Criar nova conta
POST /api/auth/login - Fazer login
GET /api/auth/me - Obter dados do usuário logado
POST /api/auth/refresh - Renovar token expirado
```

---

## 🔑 Fluxo de Autenticação

### 1. **Registro de Usuário**

**Request:**
```javascript
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "ORGANIZER",
    "subscriptionStatus": "INACTIVE",
    "createdAt": "2026-01-12T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30m"
}
```

### 2. **Login**

**Request:**
```javascript
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30m"
}
```

### 3. **Acessar Rota Protegida**

**Request:**
```javascript
GET http://localhost:3001/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "user": {
    "id": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "role": "ORGANIZER",
    "subscriptionStatus": "INACTIVE",
    "createdAt": "2026-01-12T...",
    "updatedAt": "2026-01-12T..."
  }
}
```

### 4. **Renovar Token Expirado**

**Request:**
```javascript
POST http://localhost:3001/api/auth/refresh
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30m"
}
```

---

## 💻 Como Iniciar o Backend

```bash
cd backend

# Instalar dependências (se necessário)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará rodando em: `http://localhost:3001`

---

## 🔒 Segurança

### Token JWT Contém:
```json
{
  "userId": "uuid-do-usuario",
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "role": "ORGANIZER",
  "iat": 1705066800,
  "exp": 1705068600
}
```

### Características:
- ✅ Token expira em 30 minutos
- ✅ Senha armazenada com bcrypt (hash + salt)
- ✅ Validação com Zod nos endpoints
- ✅ Middleware de autenticação para rotas protegidas
- ✅ Suporte a renovação de token

### Variáveis de Ambiente (.env):
```env
JWT_SECRET=fonte-church-super-secret-key-2026
PORT=3001
SUPABASE_URL=https://tkcnefujgwgjvwlrlxdc.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Etgjg96PYmfci8NpkNYPIQ_iwXfgATH
```

⚠️ **IMPORTANTE**: Mude o `JWT_SECRET` para uma chave aleatória e segura em produção!

---

## 🧪 Testando com cURL

### Registro:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste User","email":"teste@exemplo.com","password":"senha123"}'
```

### Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","password":"senha123"}'
```

### Obter Usuário (substitua TOKEN pelo token recebido):
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📦 Próximas Etapas

Para integrar com o frontend Next.js:

1. Criar serviço de API no frontend (`lib/auth.ts`)
2. Salvar token no localStorage após login/registro
3. Criar interceptor Axios para adicionar token automaticamente
4. Criar hook `useAuth()` para gerenciar estado do usuário
5. Implementar renovação automática antes da expiração
6. Atualizar páginas de login/cadastro para usar o backend

---

## ⚙️ Middleware de Autenticação

Para proteger rotas no backend:

```typescript
import { authMiddleware, AuthRequest } from './middlewares/auth.middleware'

router.get('/eventos/meus', authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user?.userId
  // Buscar eventos do usuário
})
```

---

## 🔄 Renovação Automática de Token

Implemente um interceptor no frontend que:

1. Verifica expiração do token antes de cada request
2. Se faltar menos de 5 minutos para expirar, renova automaticamente
3. Se já expirou, redireciona para login

---

## 📝 Notas Importantes

- ✅ Não suba para o Vercel ainda (conforme solicitado)
- ✅ Token salvo no localStorage (não em cookies)
- ✅ Expiração de 30 minutos
- ✅ Backend pronto para receber requests do frontend
- ✅ Supabase usado apenas como banco de dados (não Supabase Auth)

---

**Sistema pronto para uso local! 🚀**
