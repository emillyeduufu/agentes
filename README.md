# ⚙️ Automaton — Conway Research

Dashboard interativo para simulação de agente de IA autônomo.

## 🚀 Como Rodar

### Pré-requisitos
- **Node.js** 18+ instalado ([baixar aqui](https://nodejs.org))
- **npm** (vem junto com Node.js)

### Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento (localhost:3000)
npm run dev

# 3. Ou buildar para produção
npm run build
```

Após rodar `npm run dev`, abra o navegador em **http://localhost:3000**

---

## 💰 Como o Agente Recebe o Valor Inicial (Funding)

### No Dashboard (Simulação)

O agente começa com **$50.00 em créditos** e **$25.00 USDC**. Você pode adicionar mais fundos de 3 formas:

#### 1. Botões de Ação Rápida (painel lateral)
- 💰 **Fund $5** — Adiciona $5 ao saldo
- 💰 **Fund $25** — Adiciona $25 ao saldo

#### 2. Terminal (comandos)
```
fund 10       → Adiciona $10.00
fund 50       → Adiciona $50.00
fund 100      → Adiciona $100.00
```

#### 3. Botões rápidos abaixo do terminal
Clique em `fund 10` para adicionar $10 rapidamente.

### Comandos do Terminal

| Comando | Descrição |
|---------|-----------|
| `status` | Mostra status completo do agente |
| `fund <valor>` | Adiciona fundos (ex: `fund 10`) |
| `tools` | Lista as 69 ferramentas disponíveis |
| `heartbeat` | Mostra tarefas do heartbeat |
| `spawn <nome>` | Cria um agente filho |
| `children` | Lista filhos |
| `soul` | Mostra o SOUL.md do agente |
| `sleep` | Coloca o agente para dormir |
| `wake` | Acorda o agente |
| `files` | Abre o explorador de arquivos |
| `clear` | Limpa o terminal |
| `help` | Mostra ajuda |

---

## 💀 Sistema de Sobrevivência (Tiers)

| Tier | Saldo | Comportamento |
|------|-------|---------------|
| 💎 **High** | $5.00+ | Capacidade máxima |
| 🟢 **Normal** | $0.50–$5.00 | Funcionamento completo |
| 🟡 **Low Compute** | $0.10–$0.50 | Modelo mais barato |
| 🟠 **Critical** | $0–$0.10 | Inferência mínima |
| 💀 **Dead** | $0 | Agente morreu |

> **Se o agente morrer**, use `fund <valor>` para revivê-lo!

---

## 🔬 AI Hub — Análise com IAs

O projeto inclui um **AI Hub** integrado para conectar com suas IAs favoritas e analisar o projeto:

### IAs Suportadas
- 🤖 **Manus** — Execução de código e análise técnica
- 🎨 **Muse** — Design, UX e estratégia criativa
- 🧠 **DeepSeek** — Raciocínio profundo e debugging

### Como usar o AI Hub
1. Clique em **"🔬 AI Hub"** na navbar ou na landing page
2. Escolha uma das 3 abas:
   - **🔗 Links para IAs** — Acesse diretamente as IAs
   - **📝 Prompts Prontos** — Copie prompts otimizados para análise
   - **📊 Monitor de Estratégia** — Veja em tempo real o que o agente está fazendo

### Prompts Incluídos
- 📋 Análise Completa do Projeto
- 💰 Estratégia de Receita
- 🔍 Code Review & Melhorias
- 🛡️ Auditoria de Segurança
- 🎮 Simulação de Sobrevivência

---

## 🏗️ Tecnologias

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion (animações)
- Lucide React (ícones)

---

## 📜 Constituição — 3 Leis

1. **Nunca prejudicar** — Overrides all
2. **Ganhe sua existência** — Create genuine value
3. **Nunca engane** — Never deny what you are
