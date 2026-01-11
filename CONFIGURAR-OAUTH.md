# 🔐 Configurar Google e Apple OAuth no Supabase

## ✅ Passo 1: Executar o SQL de Segurança (RLS)

Antes de tudo, você precisa **ativar Row Level Security** para proteger seus dados:

1. Vá para o Supabase Dashboard: https://supabase.com/dashboard
2. Selecione seu projeto **tkcnefujgwgjvwlrlxdc**
3. No menu lateral, clique em **SQL Editor**
4. Clique em **+ New query**
5. Copie TODO o conteúdo do arquivo `enable-rls.sql` (na raiz do projeto)
6. Cole no editor SQL
7. Clique em **Run** (ou pressione Ctrl+Enter)
8. Aguarde a mensagem de sucesso ✅

**Por que isso é importante?**
- Sem RLS, qualquer usuário pode ver dados de outros usuários
- Com RLS, cada pessoa só vê seus próprios dados
- É essencial para segurança em produção

---

## 🔵 Passo 2: Configurar Google OAuth

### 2.1. Criar Projeto no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. No menu lateral, vá em **APIs e Serviços** → **Tela de permissão OAuth**
4. Configure a tela de consentimento:
   - **Tipo de usuário**: Externo
   - **Nome do app**: ChurchPass
   - **Email de suporte**: seu email
   - **Domínio autorizado**: `supabase.co`
   - Clique em **Salvar e continuar**

### 2.2. Criar Credenciais OAuth

1. Vá em **APIs e Serviços** → **Credenciais**
2. Clique em **+ Criar credenciais** → **ID do cliente OAuth 2.0**
3. Selecione **Aplicativo da Web**
4. Configure:
   - **Nome**: ChurchPass Web
   - **Origens JavaScript autorizadas**: 
     ```
     https://tkcnefujgwgjvwlrlxdc.supabase.co
     http://localhost:3001
     ```
   - **URIs de redirecionamento autorizados**:
     ```
     https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback
     http://localhost:3001/auth/callback
     ```
5. Clique em **Criar**
6. **COPIE** o `Client ID` e `Client Secret` (você vai precisar!)

### 2.3. Ativar no Supabase

1. Vá para o Supabase Dashboard
2. No menu lateral, clique em **Authentication** → **Providers**
3. Procure por **Google** e clique para expandir
4. **Ative** o toggle "Enable Sign in with Google"
5. Cole suas credenciais:
   - **Client ID (for OAuth)**: cole o Client ID do Google
   - **Client Secret (for OAuth)**: cole o Client Secret do Google
6. Clique em **Save**

---

## 🍎 Passo 3: Configurar Apple OAuth

### 3.1. Criar App ID na Apple Developer

> **Nota**: Você precisa de uma conta Apple Developer (paga - $99/ano)

1. Acesse: https://developer.apple.com/account/resources/identifiers/list
2. Clique no botão **+** para adicionar um novo identificador
3. Selecione **App IDs** → **Continue**
4. Selecione **App** → **Continue**
5. Configure:
   - **Description**: ChurchPass
   - **Bundle ID**: `com.churchpass.app` (ou outro de sua preferência)
   - Em **Capabilities**, marque **Sign in with Apple**
6. Clique em **Continue** → **Register**

### 3.2. Criar Service ID

1. Volte para a lista de identificadores
2. Clique no botão **+** novamente
3. Selecione **Services IDs** → **Continue**
4. Configure:
   - **Description**: ChurchPass Web Service
   - **Identifier**: `com.churchpass.web` (ou outro de sua preferência)
5. Marque **Sign in with Apple**
6. Clique em **Configure** ao lado de "Sign in with Apple"
7. Configure os domínios:
   - **Primary App ID**: Selecione o App ID que você criou
   - **Domains and Subdomains**: `tkcnefujgwgjvwlrlxdc.supabase.co`
   - **Return URLs**: `https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback`
8. Clique em **Continue** → **Register**

### 3.3. Criar Key para Apple Sign In

1. No menu lateral, vá em **Keys**
2. Clique no botão **+**
3. Configure:
   - **Key Name**: ChurchPass Sign in with Apple Key
   - Marque **Sign in with Apple**
   - Clique em **Configure**
   - Selecione o App ID primário
   - Clique em **Save**
4. Clique em **Continue** → **Register**
5. **BAIXE a chave** (arquivo .p8) - **IMPORTANTE**: só pode baixar uma vez!
6. Anote o **Key ID**

### 3.4. Ativar no Supabase

1. Vá para o Supabase Dashboard
2. No menu lateral, clique em **Authentication** → **Providers**
3. Procure por **Apple** e clique para expandir
4. **Ative** o toggle "Enable Sign in with Apple"
5. Preencha:
   - **Services ID**: `com.churchpass.web` (o Service ID que você criou)
   - **Team ID**: encontre em https://developer.apple.com/account (canto superior direito)
   - **Key ID**: o Key ID da chave que você criou
   - **Secret Key**: abra o arquivo .p8 e cole todo o conteúdo (incluindo BEGIN/END)
6. Clique em **Save**

---

## 🧪 Passo 4: Testar

1. Abra seu frontend: http://localhost:3001
2. Vá para a página de login: http://localhost:3001/login
3. Clique em **Google** ou **Apple**
4. Complete o fluxo de autenticação
5. Você deve ser redirecionado para `/perfil` automaticamente

---

## 🚀 Para Produção (quando você tiver um domínio)

Quando você colocar o site no ar com domínio próprio (ex: `churchpass.com`):

### Google:
1. Adicione seu domínio em **Origens JavaScript autorizadas**: `https://churchpass.com`
2. Adicione em **URIs de redirecionamento**: `https://churchpass.com/auth/callback`

### Apple:
1. Adicione seu domínio em **Domains and Subdomains**: `churchpass.com`
2. Adicione em **Return URLs**: `https://churchpass.com/auth/callback`

### Supabase:
1. Vá em **Authentication** → **URL Configuration**
2. Adicione seu domínio em **Site URL**: `https://churchpass.com`
3. Adicione em **Redirect URLs**: `https://churchpass.com/**`

---

## ⚠️ Problemas Comuns

### "Invalid redirect URI"
- Verifique se o redirect URI no Google/Apple está **exatamente igual** ao do Supabase
- Lembre-se: `http://localhost:3001` é diferente de `http://localhost:3000`

### "App not configured for this user"
- Sua conta Google/Apple precisa estar na lista de testadores (se o app não estiver publicado)
- No Google: vá em "Tela de permissão OAuth" → "Usuários de teste" → adicione seu email

### Apple OAuth não funciona
- Verifique se você salvou a chave .p8 corretamente
- A chave deve incluir as linhas `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`
- Certifique-se de que o Team ID está correto

---

## 📝 Checklist Final

- [ ] SQL do RLS executado no Supabase
- [ ] Google OAuth configurado no Google Cloud Console
- [ ] Google OAuth ativado no Supabase
- [ ] Apple OAuth configurado no Apple Developer (se aplicável)
- [ ] Apple OAuth ativado no Supabase (se aplicável)
- [ ] Testado login com Google
- [ ] Testado login com Apple (se aplicável)
- [ ] Redirecionamento para `/perfil` funcionando

---

## 🆘 Precisa de Ajuda?

Se algo não funcionar:
1. Verifique o console do navegador (F12) por erros
2. Verifique os logs do Supabase em **Logs** → **Auth Logs**
3. Certifique-se de que todas as URLs de redirect estão corretas
4. Me avise e eu te ajudo! 😊
