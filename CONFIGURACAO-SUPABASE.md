# Configuração do Supabase

## Passo 1: Criar Conta no Supabase

1. Acesse https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub ou Google
4. Você terá **2 projetos gratuitos**

## Passo 2: Criar Novo Projeto

1. No dashboard, clique em "New Project"
2. Preencha:
   - **Name**: `churchpass` (ou nome de sua escolha)
   - **Database Password**: Crie uma senha forte e **ANOTE**
   - **Region**: `South America (São Paulo)` (mais próximo do Brasil)
   - **Pricing Plan**: Free (gratuito)
3. Clique em "Create new project"
4. Aguarde ~2 minutos para provisionar

## Passo 3: Obter Connection String

1. No menu lateral, clique em **Settings** (ícone de engrenagem)
2. Clique em **Database**
3. Role até **Connection string**
4. Escolha a aba **URI**
5. Copie a connection string (formato: `postgresql://postgres:[YOUR-PASSWORD]@...`)
6. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou

Exemplo:
```
postgresql://postgres:SuaSenhaAqui@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

## Passo 4: Configurar no Projeto

1. Abra o arquivo `backend/.env`
2. Cole a connection string na variável `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:SuaSenhaAqui@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

## Passo 5: Instalar Dependências

Execute os comandos:
```bash
cd backend
npm install @prisma/client prisma
```

## Passo 6: Executar Migrations

Ainda na pasta `backend`, execute:
```bash
npx prisma migrate dev --name init
```

Isso irá:
- Criar todas as tabelas no Supabase
- Gerar o Prisma Client
- Sincronizar o schema

## Passo 7: Verificar no Supabase

1. Volte ao dashboard do Supabase
2. Clique em **Table Editor** no menu lateral
3. Você deve ver as tabelas: `users`, `events`, `tickets`, `subscriptions`

## ✅ Pronto!

Seu banco de dados PostgreSQL está configurado e pronto para uso!

## Próximos Passos

Agora vamos configurar a autenticação com NextAuth.js
