# 🚀 Deploy no Vercel - Guia Completo

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Vercel (pode fazer login com GitHub)
- Código no GitHub (vamos fazer o push)

---

## 🔧 PASSO 1: Preparar o Código

### 1.1. Criar arquivo .gitignore (se não existir)
```bash
cd frontend
```

Verifique se tem `.gitignore` com:
```
.env.local
node_modules
.next
out
.DS_Store
```

### 1.2. Fazer commit e push para o GitHub
```bash
cd "C:\Users\lucas.baptista\OneDrive - DBserver Assessoria em Sistemas de Informação Ltda\Área de Trabalho\churchpass"
git add .
git commit -m "Preparar frontend para deploy Vercel"
git push
```

---

## 🌐 PASSO 2: Deploy no Vercel

### 2.1. Acessar o Vercel
1. Vá para: https://vercel.com
2. Clique em **"Sign Up"** ou **"Login"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seus repositórios

### 2.2. Importar Projeto
1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Procure pelo repositório **churchpass**
3. Clique em **"Import"**

### 2.3. Configurar o Projeto
Na tela de configuração:

**Framework Preset:** Next.js (já deve vir selecionado)

**Root Directory:** Clique em **"Edit"** e selecione `frontend`

**Build and Output Settings:**
- Build Command: `npm run build` (já vem preenchido)
- Output Directory: `.next` (já vem preenchido)
- Install Command: `npm install` (já vem preenchido)

### 2.4. Adicionar Variáveis de Ambiente ⚠️ IMPORTANTE

Clique em **"Environment Variables"** e adicione:

**Nome:** `NEXT_PUBLIC_SUPABASE_URL`  
**Valor:** `https://tkcnefujgwgjvwlrlxdc.supabase.co`

**Nome:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
**Valor:** `sb_publishable_Etgjg96PYmfci8NpkNYPIQ_iwXfgATH`

**Nome:** `NEXT_PUBLIC_API_URL`  
**Valor:** `https://seu-dominio.vercel.app/api` (por enquanto deixe vazio, vamos atualizar depois)

### 2.5. Deploy
1. Clique em **"Deploy"**
2. Aguarde 2-5 minutos
3. 🎉 Seu site estará no ar!

---

## 🔑 PASSO 3: Configurar OAuth no Google Cloud

Após o deploy, você vai receber uma URL tipo: `https://churchpass.vercel.app`

### 3.1. Adicionar URL no Google Cloud Console
1. Vá para: https://console.cloud.google.com/
2. Selecione o projeto **fonteventos**
3. **APIs & Services** → **Credentials**
4. Clique no seu OAuth Client (**ChurchPass Web**)
5. Em **"Authorized JavaScript origins"**, adicione:
   ```
   https://churchpass.vercel.app
   ```
6. Em **"Authorized redirect URIs"**, adicione:
   ```
   https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback
   ```
   (essa já deve estar lá, só confirme)
7. Clique em **"Save"**

---

## 🟢 PASSO 4: Configurar URL no Supabase

### 4.1. Adicionar Site URL
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. **Settings** (⚙️) → **Authentication**
4. Em **"Site URL"**, adicione: `https://churchpass.vercel.app`
5. Em **"Redirect URLs"**, adicione:
   ```
   https://churchpass.vercel.app/**
   http://localhost:3001/**
   ```
6. Clique em **"Save"**

---

## ✅ PASSO 5: Testar

1. Acesse: `https://churchpass.vercel.app` (sua URL do Vercel)
2. Vá para `/login`
3. Teste login com Google
4. Teste cadastro com email

---

## 🔄 Atualizações Futuras

Sempre que fizer mudanças no código:

```bash
git add .
git commit -m "Sua mensagem"
git push
```

O Vercel vai fazer **deploy automático**! 🚀

---

## 📝 Variáveis de Ambiente no Vercel

Se precisar adicionar/editar depois:

1. Dashboard Vercel → Seu projeto
2. **Settings** → **Environment Variables**
3. Adicione/edite as variáveis
4. Clique em **"Redeploy"** para aplicar

---

## 🐛 Problemas Comuns

### Build falhou no Vercel
- Verifique os logs no Vercel
- Certifique-se que as variáveis de ambiente estão corretas
- Teste `npm run build` localmente primeiro

### OAuth não funciona em produção
- Confirme que adicionou a URL do Vercel no Google Cloud Console
- Confirme que adicionou no Supabase (Site URL e Redirect URLs)
- Aguarde 5 minutos e limpe o cache do navegador

### 404 ao acessar rotas
- Certifique-se que selecionou `frontend` como Root Directory
- Vercel deve detectar Next.js automaticamente

---

## 📞 Checklist Final

- [ ] Código no GitHub
- [ ] Projeto importado no Vercel
- [ ] Root Directory configurado como `frontend`
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy realizado com sucesso
- [ ] URL do Vercel adicionada no Google Cloud Console
- [ ] Site URL configurada no Supabase
- [ ] Redirect URLs configuradas no Supabase
- [ ] Login com Google testado
- [ ] Cadastro com email testado

---

**Pronto! Seu ChurchPass está no ar! 🎉**
