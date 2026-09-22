# 🎯 GUIA VISUAL - PASSO A PASSO COM IMAGENS

## 📸 PASSO 1: Criar a pasta D:\agentes

### O que você vai ver:

```
┌─────────────────────────────────────────┐
│  Este Computador                        │
│                                         │
│  📁 Disco Local (C:)                    │
│  📁 Disco Local (D:)  ← CLIQUE AQUI    │
│  📁 DVD Drive (E:)                      │
└─────────────────────────────────────────┘
```

### O que fazer:

1. Abra **"Este Computador"** (ou "Meu Computador")
2. Clique em **Disco Local (D:)**
3. Clique com botão direito em um espaço vazio
4. Escolha **"Novo"** → **"Pasta"**
5. Digite: **agentes**
6. Aperte **Enter**

### Resultado:

```
D:\
└── 📁 agentes  ← Sua nova pasta!
```

---

## 📸 PASSO 2: Instalar Node.js

### O que você vai ver no site:

```
┌─────────────────────────────────────────┐
│  nodejs.org                             │
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   20.11.0    │  │   21.6.1     │    │
│  │     LTS      │  │   Current    │    │
│  │              │  │              │    │
│  │  [Download]  │  │  [Download]  │    │
│  │   ← CLIQUE   │  │              │    │
│  │     AQUI!    │  │              │    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
```

### O que fazer:

1. Vá em: **https://nodejs.org/**
2. Clique no botão da **ESQUERDA** (LTS)
3. Vai baixar um arquivo
4. **Duplo clique** no arquivo baixado
5. Vai abrir esta janela:

```
┌─────────────────────────────────────────┐
│  Welcome to Node.js Setup               │
│                                         │
│         [Next]  ← CLIQUE AQUI           │
└─────────────────────────────────────────┘
```

6. Clique em **"Next"** várias vezes
7. Clique em **"Install"**
8. Espere terminar
9. Clique em **"Finish"**

### Como testar se funcionou:

1. Aperte a tecla **Windows** no teclado
2. Digite: **cmd**
3. Clique em **"Prompt de Comando"**
4. Vai abrir uma janela preta
5. Digite: `node --version`
6. Aperte **Enter**

### Resultado esperado:

```
┌─────────────────────────────────────────┐
│  Prompt de Comando                      │
│                                         │
│  C:\Users\Voce> node --version          │
│  v20.11.0  ← Se aparecer isso, OK! ✅   │
│                                         │
│  C:\Users\Voce> _                       │
└─────────────────────────────────────────┘
```

---

## 📸 PASSO 3: Colocar os arquivos em D:\agentes

### O que você vai ver:

```
D:\agentes\
├── 📄 instalar.bat          ← Arquivos que você precisa ter
├── 📄 rodar-dashboard.bat
├── 📄 rodar-agente.bat
├── 📄 status.bat
├── 📄 gerenciador.bat
├── 📁 src\
├── 📁 public\
├── 📄 package.json
├── 📄 vite.config.js
└── ... (outros arquivos)
```

### Como conseguir os arquivos:

**PERGUNTE PARA QUEM TE PASOU O PROJETO:**

> "Oi! Como eu baixo os arquivos do dashboard? Você tem o link do GitHub ou pode me enviar os arquivos?"

**OU** se você tem acesso ao GitHub:

1. Vá no link do repositório
2. Clique no botão verde **"Code"**
3. Clique em **"Download ZIP"**
4. Vai baixar um arquivo `.zip`
5. **Duplo clique** no ZIP
6. Clique em **"Extrair"**
7. Escolha: **D:\agentes**
8. Clique em **"Extrair"**

---

## 📸 PASSO 4: Instalar o Dashboard

### O que você vai ver:

```
D:\agentes\
├── 📄 instalar.bat  ← DUPLO CLIQUE AQUI!
├── 📄 rodar-dashboard.bat
├── 📄 rodar-agente.bat
└── ...
```

### O que fazer:

1. Abra a pasta **D:\agentes**
2. **Duplo clique** em **instalar.bat**
3. Vai abrir esta janela:

```
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗  │
│  ║  ⚙️  AUTOMATON - Instalador      ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
│  O que voce deseja fazer?               │
│                                         │
│  1) 🎮 Instalar DASHBOARD               │
│  2) 🤖 Instalar AGENTE REAL             │
│  3) ▶️  Rodar Dashboard                 │
│  4) ▶️  Rodar Agente Real               │
│  5) 📊 Ver Status                       │
│  6) ❌ Sair                             │
│                                         │
│  Escolha uma opcao: 1  ← DIGITE 1      │
└─────────────────────────────────────────┘
```

4. Digite **1** e aperte **Enter**
5. **ESPERE** (pode demorar 2-5 minutos)
6. Vai aparecer várias mensagens
7. Quando terminar, aperte qualquer tecla

### Resultado:

```
┌─────────────────────────────────────────┐
│  ✅ DASHBOARD INSTALADO COM SUCESSO!    │
│                                         │
│  Para rodar:                            │
│    cd D:\agentes\automaton-dashboard    │
│    npm run dev                          │
│                                         │
│  Depois acesse: http://localhost:3000   │
│                                         │
│  Pressione qualquer tecla para continuar│
└─────────────────────────────────────────┘
```

---

## 📸 PASSO 5: Rodar o Dashboard

### O que fazer:

1. Abra a pasta **D:\agentes**
2. **Duplo clique** em **rodar-dashboard.bat**
3. Vai abrir esta janela:

```
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗  │
│  ║  🎮 AUTOMATON DASHBOARD           ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
│  [INFO] Iniciando Dashboard...          │
│                                         │
│  ═══════════════════════════════════    │
│  📍 Acesse no navegador:                │
│                                         │
│     http://localhost:3000  ← ANOTE!     │
│                                         │
│  ═══════════════════════════════════    │
│                                         │
│  Para parar: Ctrl + C                   │
│                                         │
│  VITE v5.x.x  ready in 500 ms          │
│                                         │
│  ➜  Local:   http://localhost:3000      │
│                                         │
│  ⚠️ NÃO FECHE ESTA JANELA! ⚠️           │
└─────────────────────────────────────────┘
```

4. **NÃO FECHE** essa janela!
5. Abra o navegador (Chrome, Edge, Firefox)
6. Na barra de endereço, digite:

```
http://localhost:3000
```

7. Aperte **Enter**

### Resultado:

```
┌─────────────────────────────────────────┐
│  ⚙️ Automaton                           │
│  Conway Research                        │
│                                         │
│  O primeiro agente de IA que pode       │
│  ganhar sua própria existência...       │
│                                         │
│  [🚀 Testar Agora]  ← CLIQUE AQUI!     │
│  [🔬 AI Hub]                            │
│  [📦 Ver no GitHub]                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📸 PASSO 6: Criar seu primeiro agente

### O que você vai ver:

```
┌─────────────────────────────────────────┐
│  Setup Wizard                           │
│                                         │
│  Passo 1 de 3                           │
│                                         │
│  Nome do agente:                        │
│  ┌─────────────────────────────────┐   │
│  │ Atlas                           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Genesis Prompt:                        │
│  ┌─────────────────────────────────┐   │
│  │ You are Atlas, an autonomous... │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Próximo]  ← CLIQUE AQUI               │
└─────────────────────────────────────────┘
```

### O que fazer:

1. Clique em **"🚀 Testar Agora"**
2. Preencha o formulário:
   - **Nome**: Digite um nome (ex: "Atlas")
   - **Genesis Prompt**: Pode deixar o que está lá
   - **Nível**: Escolha "Avançado"
3. Clique em **"Próximo"**
4. Repita até o final
5. Clique em **"Iniciar Agente"**

### Resultado:

```
┌─────────────────────────────────────────┐
│  🎛️ Dashboard                           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Agente: Atlas                   │   │
│  │ Estado: 🟢 Running              │   │
│  │ Créditos: $10.00                │   │
│  │ USDC: $10.00                    │   │
│  │ Turns: 15                       │   │
│  │ Tier: 💎 high                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Terminal:                              │
│  ┌─────────────────────────────────┐   │
│  │ ✓ Automaton runtime started     │   │
│  │ ✓ Agent "Atlas" initialized     │   │
│  │ 🧠 Turn 1: Thinking...          │   │
│  │ ⚡ Tool call → check_credits    │   │
│  │ ✓ Turn 1 complete.              │   │
│  │                                 │   │
│  │ $  │  ← DIGITE COMANDOS AQUI    │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎉 PRONTO!

**Você conseguiu!** 🎉

Agora você pode:
- ✅ Ver o agente funcionando
- ✅ Digitar comandos no terminal
- ✅ Ver relatórios
- ✅ Adicionar fundos (simulados)

---

## 📞 PRECISA DE AJUDA?

**Me diga:**

1. Em qual passo você está?
2. O que apareceu na sua tela?
3. Qual erro apareceu (se tiver)?

**Tire um print da tela** e me mande!

---

## 🎯 RESUMO VISUAL

```
┌─────────────────────────────────────────┐
│                                         │
│  1. Criar pasta D:\agentes              │
│     ↓                                   │
│  2. Instalar Node.js (nodejs.org)       │
│     ↓                                   │
│  3. Colocar arquivos em D:\agentes      │
│     ↓                                   │
│  4. Duplo clique: instalar.bat          │
│     ↓                                   │
│  5. Duplo clique: rodar-dashboard.bat   │
│     ↓                                   │
│  6. Abrir: http://localhost:3000        │
│     ↓                                   │
│  7. 🎉 PRONTO!                          │
│                                         │
└─────────────────────────────────────────┘
```

---

**Você consegue! Vai dar certo!** 🚀
