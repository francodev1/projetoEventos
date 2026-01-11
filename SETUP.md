# 🚀 Guia de Configuração - Fonte Church

## Pré-requisitos

1. **Node.js 18+** - [Download aqui](https://nodejs.org/)
2. **PostgreSQL 14+** - [Download aqui](https://www.postgresql.org/download/)
3. **Git** (opcional)

## 📦 Instalação Rápida

### 1. Instalar Node.js (se não tiver)

Baixe e instale o Node.js em: https://nodejs.org/

Verifique a instalação:
```powershell
node --version
npm --version
```

### 2. Instalar Dependências

#### Backend:
```powershell
cd backend
npm install
```

#### Frontend:
```powershell
cd frontend
npm install
npm install tailwindcss-animate
```

### 3. Configurar Banco de Dados PostgreSQL

Opção A - PostgreSQL Local:
1. Instale PostgreSQL
2. Crie o banco: `createdb fontechurch`
3. Configure `DATABASE_URL` no `backend\.env`

Opção B - Usar SQLite para testes (mais fácil):
Edite `prisma\schema.prisma` e mude:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### 4. Executar Migrations

```powershell
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Rodar os Servidores

#### Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```
Servidor rodando em: http://localhost:3001

#### Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```
Website rodando em: http://localhost:3000

## 🎨 Acessar o Site

Abra seu navegador em: **http://localhost:3000**

Você verá a landing page da Fonte Church!

## 🔧 Configurações Adicionais

### Pagar.me (Pagamentos)

1. Crie conta em: https://pagar.me
2. Obtenha suas chaves de API
3. Configure em `backend\.env`:
   - `PAGARME_API_KEY`
   - `PAGARME_PLATFORM_RECIPIENT_ID`

### Problemas Comuns

**Erro "npm não é reconhecido"**
- Instale Node.js e reinicie o terminal

**Erro de porta em uso**
- Mude `PORT=3001` para outra porta no `.env`

**Erro de conexão com banco**
- Use SQLite conforme opção B acima
- Ou configure PostgreSQL corretamente

## 📝 Próximos Passos

- [ ] Configurar autenticação (NextAuth/Clerk)
- [ ] Adicionar mais páginas (eventos, dashboard)
- [ ] Integrar Pagar.me real
- [ ] Deploy em produção

---

**Dúvidas?** Consulte o README.md principal
