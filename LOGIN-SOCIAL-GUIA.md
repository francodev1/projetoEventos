# 🔐 Login Social - Configuração Rápida

## ✅ O que foi arrumado:

1. **OAuth URLs corretas** - Agora redireciona para `/auth/callback` (padrão do Supabase)
2. **Route Handler criado** - Página `/auth/callback` que processa o login e redireciona para `/perfil`
3. **Parâmetros adicionais** - `access_type` e `prompt` para melhor experiência OAuth
4. **Tratamento de erros** - Loading state melhorado

## 🚀 Como configurar:

### 1️⃣ Execute o SQL de Segurança (OBRIGATÓRIO)
```sql
-- Abra o Supabase SQL Editor e execute o arquivo: enable-rls.sql
```

### 2️⃣ Configure o Google OAuth

**No Google Cloud Console:**
1. Vá para https://console.cloud.google.com/
2. Crie/selecione projeto
3. **APIs e Serviços** → **Credenciais** → **+ Criar credenciais** → **ID do cliente OAuth**
4. Configure:
   - Tipo: **Aplicativo da Web**
   - **Origens JavaScript autorizadas**:
     ```
     https://tkcnefujgwgjvwlrlxdc.supabase.co
     http://localhost:3001
     ```
   - **URIs de redirecionamento autorizados**:
     ```
     https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback
     ```
5. Copie o **Client ID** e **Client Secret**

**No Supabase:**
1. Dashboard → **Authentication** → **Providers**
2. Ative **Google**
3. Cole o Client ID e Client Secret
4. **Save**

### 3️⃣ Configure o Apple OAuth (Opcional)

**Requisito:** Apple Developer Account ($99/ano)

Siga o guia completo em `CONFIGURAR-OAUTH.md` seção "Passo 3"

### 4️⃣ Teste

1. Abra http://localhost:3001/login
2. Clique em "Continuar com Google"
3. Faça login com sua conta Google
4. Deve redirecionar para `/perfil` automaticamente

## 🔄 Fluxo OAuth:

```
Usuário clica "Google/Apple"
    ↓
Redireciona para Google/Apple (login)
    ↓
Google/Apple redireciona para: /auth/callback?code=xxxxx
    ↓
Route handler processa o code
    ↓
Cria sessão no Supabase
    ↓
Redireciona para /perfil
```

## ⚠️ URLs Importantes:

- **Callback Supabase**: `https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback`
- **Callback Local**: `http://localhost:3001/auth/callback` (criado automaticamente)

## 🐛 Problemas comuns:

### "redirect_uri_mismatch"
- Verifique se a URL no Google está **exatamente** igual: `https://tkcnefujgwgjvwlrlxdc.supabase.co/auth/v1/callback`
- Use HTTPS para o Supabase, não HTTP

### "Invalid client"
- Verifique se copiou Client ID e Secret corretamente no Supabase
- Certifique-se de ter ativado o provider Google

### Não redireciona depois do login
- Verifique se criou a rota `/auth/callback/route.ts`
- Veja o console do navegador (F12) por erros

## 📝 Checklist Final:

- [ ] SQL do RLS executado
- [ ] Google OAuth configurado no Google Cloud Console
- [ ] Google OAuth ativado no Supabase com credenciais
- [ ] Testado login com Google
- [ ] Redirecionamento para `/perfil` funcionando

---

**Pronto para usar! 🎉**

Depois de configurar o Google OAuth no dashboard, o login social vai funcionar perfeitamente.
