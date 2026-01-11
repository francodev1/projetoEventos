# 🎯 Passo a Passo: Criar Tabelas no Supabase

## 1️⃣ Abrir SQL Editor

1. Acesse seu projeto no Supabase: https://supabase.com/dashboard
2. No menu lateral esquerdo, clique em **SQL Editor** (ícone </>)

## 2️⃣ Executar o Script SQL

1. Clique em **"+ New query"** (canto superior direito)
2. Copie TODO o conteúdo do arquivo `setup-database.sql`
3. Cole no editor SQL
4. Clique em **"Run"** (ou pressione Ctrl+Enter)
5. Aguarde aparecer "Success. No rows returned"

## 3️⃣ Verificar Tabelas Criadas

1. Clique em **"Table Editor"** no menu lateral
2. Você deve ver 4 tabelas:
   - ✅ users
   - ✅ events
   - ✅ tickets
   - ✅ subscriptions

## 4️⃣ Gerar Prisma Client

Volte para o terminal e execute:

```bash
cd backend
npx prisma db pull
npx prisma generate
```

Isso vai:
- Sincronizar o schema local com o banco
- Gerar o Prisma Client para usar no código

## ✅ Pronto!

Seu banco de dados está configurado e pronto para uso!

**Me avise quando terminar** que eu continuo com a configuração de autenticação.
