# 🔵 Google Cloud Console - Passo a Passo Completo

## 📋 Antes de começar

Você vai precisar de:
- Uma conta Google (Gmail)
- 10 minutos
- O link do seu Supabase: `https://tkcnefujgwgjvwlrlxdc.supabase.co`

---

## 🚀 PASSO 1: Acessar o Google Cloud Console

1. Abra o navegador
2. Acesse: **https://console.cloud.google.com/**
3. Faça login com sua conta Google
4. Aceite os termos de serviço (se aparecer)

---

## 📁 PASSO 2: Criar ou Selecionar Projeto

### Opção A: Se você NÃO tem nenhum projeto ainda

1. No topo da página, clique em **"Select a project"** (Selecionar um projeto)
2. Na janela que abrir, clique em **"NEW PROJECT"** (Novo Projeto)
3. Preencha:
   - **Project name**: `ChurchPass` (ou o nome que preferir)
   - **Organization**: deixe como está
   - **Location**: deixe como está
4. Clique em **"CREATE"** (Criar)
5. Aguarde 10-30 segundos (barra de progresso no topo)
6. Clique no ícone de 🔔 (sino) no topo
7. Clique em **"SELECT PROJECT"** quando a notificação aparecer

### Opção B: Se você JÁ tem um projeto

1. No topo da página, clique no nome do projeto atual
2. Selecione o projeto que quer usar
3. Ou crie um novo seguindo "Opção A"

---

## 🎫 PASSO 3: Configurar Tela de Consentimento OAuth

> ⚠️ **IMPORTANTE**: Você PRECISA fazer isso ANTES de criar as credenciais!

1. No menu lateral esquerdo (☰), clique em:
   - **APIs & Services** (APIs e Serviços)
   - Depois clique em **OAuth consent screen** (Tela de permissão OAuth)

2. Selecione o tipo de usuário:
   - ✅ **External** (Externo) ← ESCOLHA ESTE
   - Clique em **CREATE** (Criar)

3. **Página 1 - OAuth consent screen**:
   - **App name**: `ChurchPass`
   - **User support email**: seu email (escolha da lista)
   - **App logo**: deixe em branco (opcional)
   - **App domain** → deixe TODOS vazios (não precisa preencher)
   - **Authorized domains**: deixe vazio por enquanto
   - **Developer contact information**: seu email
   - Clique em **SAVE AND CONTINUE** (Salvar e Continuar)

4. **Página 2 - Scopes**:
   - Clique em **ADD OR REMOVE SCOPES** (Adicionar ou remover escopos)
   - Na lista que abrir, marque:
     - ✅ `.../auth/userinfo.email`
     - ✅ `.../auth/userinfo.profile`
     - ✅ `openid`
   - Clique em **UPDATE** (Atualizar)
   - Clique em **SAVE AND CONTINUE** (Salvar e Continuar)

5. **Página 3 - Test users** (Usuários de teste):
   - Clique em **+ ADD USERS** (Adicionar usuários)
   - Digite seu email (e de quem mais vai testar)
   - Clique em **ADD** (Adicionar)
   - Clique em **SAVE AND CONTINUE** (Salvar e Continuar)

6. **Página 4 - Summary**:
   - Revise as informações
   - Clique em **BACK TO DASHBOARD** (Voltar ao painel)

---

## 🔑 PASSO 4: Criar Credenciais OAuth

1. No menu lateral esquerdo, clique em:
   - **Credentials** (Credenciais)

2. No topo da página, clique em:
   - **+ CREATE CREDENTIALS** (Criar credenciais)
   - Selecione **OAuth client ID** (ID do cliente OAuth)

3. Se aparecer um aviso "To create an OAuth client ID, you must first configure your consent screen":
   - Clique em **CONFIGURE CONSENT SCREEN**
   - Siga o PASSO 3 acima
   - Depois volte aqui

4. Configure o OAuth Client ID:
   - **Application type**: ✅ **Web application** (Aplicativo da Web)
   - **Name**: `ChurchPass Web Client`

5. **Authorized JavaScript origins** (Origens JavaScript autorizadas):
   - Clique em **+ ADD URI**
   - Cole: `https://tkcnefujgwgjvwlrlxdc.supabase.co`
   - Clique em **+ ADD URI** novamente
   - Cole: `http://localhost:3001`

6. **Authorized redirect URIs** (URIs de redirecionamento autorizados):
   - Clique em **+ ADD URI**
   - Cole **EXATAMENTE**: `https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback`
   - ⚠️ **ATENÇÃO**: 
     - Tem que ser HTTPS (não HTTP)
     - Termina com `/auth/v1/callback`
     - Não pode ter espaços ou / no final

7. Clique em **CREATE** (Criar)

---

## 📋 PASSO 5: Copiar as Credenciais

1. Uma janela vai aparecer com:
   - **Your Client ID**: `1234567890-abc...apps.googleusercontent.com`
   - **Your Client Secret**: `GOCSPX-xyz...`

2. **COPIE AMBOS!** Você vai precisar deles no próximo passo

   💡 **Dica**: Clique no ícone de copiar (📋) ao lado de cada um

3. Se fechar a janela sem copiar:
   - Vá em **Credentials** (Credenciais) no menu lateral
   - Clique no nome do cliente OAuth que você criou
   - As credenciais estarão lá

---

## 🟢 PASSO 6: Configurar no Supabase

Agora vá para o Supabase Dashboard:

1. Abra: **https://supabase.com/dashboard**
2. Selecione seu projeto: **tkcnefujgwgjvwlrlxdc**
3. No menu lateral, clique em:
   - **Authentication** (ícone de 🔐)
   - Depois clique em **Providers**

4. Procure por **Google** na lista
5. Clique para expandir
6. Ative o toggle: **Enable Sign in with Google**
7. Cole as credenciais:
   - **Client ID (for OAuth)**: cole o Client ID que você copiou
   - **Client Secret (for OAuth)**: cole o Client Secret que você copiou
8. Clique em **Save** (Salvar)

---

## ✅ PASSO 7: Testar

1. Abra seu frontend: **http://localhost:3001/login**
2. Clique em **"Continuar com Google"**
3. Vai abrir uma janela do Google
4. Faça login com sua conta Google
5. Aceite as permissões
6. Deve redirecionar para `/perfil` automaticamente

### Se der erro "Access blocked: This app's request is invalid"

Isso acontece quando você esqueceu de configurar a Tela de Consentimento OAuth.

**Solução**:
1. Volte ao PASSO 3
2. Configure a tela de consentimento
3. Tente novamente

### Se der erro "redirect_uri_mismatch"

**Solução**:
1. Volte ao Google Cloud Console
2. Vá em **Credentials** → clique no seu OAuth Client
3. Verifique se o redirect URI está **EXATAMENTE** assim:
   ```
   https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback
   ```
4. Salve e tente novamente

---

## 📸 Resumo Visual das URLs

### No Google Cloud Console:

**JavaScript origins:**
```
https://tkcnefujgwgjvwlrlxdc.supabase.co
http://localhost:3001
```

**Redirect URIs:**
```
https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback
```

### No Supabase Dashboard:

**Client ID:**
```
1234567890-abc...apps.googleusercontent.com
(o que você copiou do Google)
```

**Client Secret:**
```
GOCSPX-xyz...
(o que você copiou do Google)
```

---

## 🎯 Checklist Final

- [ ] Acessei o Google Cloud Console
- [ ] Criei/selecionei um projeto
- [ ] Configurei a Tela de Consentimento OAuth (External)
- [ ] Adicionei escopos: email, profile, openid
- [ ] Adicionei meu email como usuário de teste
- [ ] Criei credenciais OAuth (Web application)
- [ ] Adicionei JavaScript origins (Supabase + localhost)
- [ ] Adicionei Redirect URI correto (.../auth/v1/callback)
- [ ] Copiei Client ID
- [ ] Copiei Client Secret
- [ ] Colei ambos no Supabase
- [ ] Ativei "Enable Sign in with Google"
- [ ] Salvei no Supabase
- [ ] Testei no frontend
- [ ] Login funcionou! 🎉

---

## 🆘 Precisa de Ajuda?

**Erro mais comum:** "redirect_uri_mismatch"
- Certifique-se que o redirect URI no Google está **EXATAMENTE** igual ao esperado
- Tem que ser HTTPS (não HTTP)
- Não pode ter espaços
- Não pode ter barra (/) no final

**App ainda em teste:**
- Seu app fica em modo "Testing" até você publicá-lo
- Em modo teste, só os emails que você adicionou em "Test users" podem fazer login
- Está ok para desenvolvimento!

**Para produção (quando colocar o site no ar):**
- Vá em **OAuth consent screen**
- Clique em **PUBLISH APP**
- Siga o processo de verificação do Google

---

**Pronto! Agora o login com Google está funcionando! 🚀**
