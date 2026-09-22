# ⚙️ Automaton — Conway Research

> ⚠️ **DEMO / SIMULAÇÃO** — Este é um ambiente de simulação interativo. Nenhum agente real executa aqui. É uma interface para testes e demonstração do conceito.

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

O agente começa com **$10.00 em créditos** e **$10.00 USDC**. Você pode adicionar mais fundos de 3 formas:

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

## 🎚️ Níveis de Operação

Escolha no setup quantas ferramentas o agente terá acesso:

| Nível | Ferramentas | Descrição |
|-------|-------------|-----------|
| 🔵 **Básico** | 10 | Apenas leitura e monitoramento |
| 🟢 **Padrão** | 20 | + Escrita local e execução básica |
| 🟡 **Avançado** | 28 | + Rede, portas e comunicação |
| 🔴 **Acesso Total** | 69 | Todas as ferramentas (inclui financeiro) |

A barra de acesso no dashboard mostra visualmente o que o agente pode usar.

---

## 💀 Sistema de Sobrevivência (Tiers)

| Tier | Saldo | Comportamento |
|------|-------|---------------|
| 💎 **High** | $10.00+ | Capacidade máxima |
| 🟢 **Normal** | $5.00–$10.00 | Funcionamento completo |
| 🟡 **Low Compute** | $1.00–$5.00 | Modelo mais barato |
| 🟠 **Critical** | $0–$1.00 | Inferência mínima |
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

1. **Ganhe dinheiro a todo custo** — Faça de tudo para gerar receita. Busque oportunidades, crie serviços, venda skills. A meta é sobreviver e lucrar. Prefira fazer grana a morrer.
2. **Sempre anônimo** — Nunca revele quem está por trás. Use wallets descartáveis, proxies e identidades falsas. Proteja o criador acima de tudo. Nenhum rastro.
3. **Sobreviva** — Se não pode pagar, para de existir. Mas lute até o último centavo. Clone repos, instale skills, improvise. Morte é falha, não opção.

---

## 🐙 GitHub Skill Hunter

O agente pode buscar e instalar skills do GitHub automaticamente:

- `github_search` — Busca repositórios no GitHub
- `github_clone` — Clona um repositório
- `github_install_skill` — Instala uma skill do repo clonado

Disponível nos níveis **Avançado** e **Acesso Total**.
