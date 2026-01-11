# ⚠️ IMPORTANTE: Node.js Não Instalado

## 🚨 Você precisa instalar o Node.js primeiro!

### Passo 1: Instalar Node.js

1. Acesse: **https://nodejs.org/**
2. Baixe a versão **LTS (recomendada)**
3. Execute o instalador
4. **Reinicie o VS Code** após a instalação

### Passo 2: Verificar Instalação

Abra um novo terminal e execute:
```powershell
node --version
npm --version
```

Você deve ver algo como:
```
v20.10.0
10.2.3
```

### Passo 3: Instalar o Projeto

Depois que o Node.js estiver instalado, execute no terminal do VS Code:

```powershell
cd "c:\Users\lucas.baptista\OneDrive - DBserver Assessoria em Sistemas de Informação Ltda\Área de Trabalho\churchpass"
.\instalar.bat
```

OU manualmente:

```powershell
# Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init

# Frontend
cd ..\frontend
npm install
npm install tailwindcss-animate
```

### Passo 4: Rodar o Projeto

Opção A - Script automático:
```powershell
.\iniciar.bat
```

Opção B - Manual (2 terminais):

Terminal 1:
```powershell
cd backend
npm run dev
```

Terminal 2:
```powershell
cd frontend
npm run dev
```

### Passo 5: Acessar o Site

Abra seu navegador em: **http://localhost:3000**

---

## 🎨 Preview do Site

A landing page terá:
- ✅ Header com logo "Fonte Church"
- ✅ Hero section com call-to-action
- ✅ Seção de funcionalidades (4 cards)
- ✅ Pricing (R$ 24,90/mês)
- ✅ Footer completo
- ✅ Design minimalista com cores azul (#0056e0) e fundo claro
- ✅ Tipografia Cinzel (títulos) + Inter (corpo)

---

## 📞 Suporte

Se tiver problemas:
1. Certifique-se que instalou o Node.js 18+
2. Reinicie o VS Code após instalar
3. Verifique se as portas 3000 e 3001 estão livres
