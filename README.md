# ⚙️ Automaton — Conway Research

> 🚀 **AGENTE REAL** — Este projeto inclui tanto um dashboard de simulação quanto instruções completas para executar o agente de IA real da Conway Research.

## 📦 O que este projeto inclui

1. **Dashboard Interativo** (simulação) - Interface visual para testar conceitos
2. **Guia Completo** para executar o agente real
3. **Scripts de instalação** automatizados
4. **Configurações de exemplo** prontas para usar

---

## 🎯 Quer executar o agente REAL?

### Opção 1: Instalação Rápida (5 minutos)

```bash
# Clone o repositório oficial da Conway Research
git clone https://github.com/Conway-Research/automaton.git
cd automaton

# Instale e execute
pnpm install && pnpm build
node dist/index.js --run
```

### Opção 2: Script Automatizado

```bash
# Execute o script de instalação
chmod +x install_real.sh
./install_real.sh
```

### Opção 3: Docker

```bash
# Build e run com Docker
docker-compose up -d
```

📖 **Guia completo**: [SETUP_REAL.md](SETUP_REAL.md)  
📖 **Quick Start**: [QUICKSTART.md](QUICKSTART.md)

---

## 🎮 Dashboard de Simulação

Se você quer apenas testar a interface e entender como funciona:

```bash
# Instale dependências do dashboard
npm install

# Rode em modo desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

O dashboard inclui:
- ✅ Setup wizard interativo
- ✅ Terminal com comandos reais
- ✅ Sistema de sobrevivência (5 tiers)
- ✅ Relatório financeiro completo
- ✅ Knowledge Base e instintos destilados
- ✅ AI Hub para análise com Manus, Muse, DeepSeek

---

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| [SETUP_REAL.md](SETUP_REAL.md) | Guia completo para executar o agente real |
| [QUICKSTART.md](QUICKSTART.md) | Setup em 5 minutos |
| [.env.example](.env.example) | Template de configuração |
| [agent-config.example.json](agent-config.example.json) | Configuração de exemplo do agente |
| [install_real.sh](install_real.sh) | Script de instalação automatizado |
| [check_status.sh](check_status.sh) | Verificador de status |
| [Dockerfile](Dockerfile) | Configuração Docker |
| [docker-compose.yml](docker-compose.yml) | Orquestração Docker |

---

## 🔗 Links Importantes

- 🌐 **Conway Cloud**: https://app.conway.tech/
- 📦 **Repositório Oficial**: https://github.com/Conway-Research/automaton
- 📖 **Documentação Oficial**: https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md
- ⚡ **Skills Marketplace**: https://github.com/Conway-Research/skills
- 💬 **Discord**: https://discord.gg/conway

---

## ⚠️ Aviso

Este repositório contém:
1. **Dashboard de simulação** (código frontend React/Vite)
2. **Instruções e scripts** para executar o agente real

Para executar o agente real, você precisa:
- Conta na Conway Cloud
- Créditos USDC (mínimo $10)
- Node.js 20+ instalado

---

# Documentação do Dashboard (Simulação)

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
| `tools` | Lista as 76 ferramentas disponíveis |
| `heartbeat` | Mostra tarefas do heartbeat |
| `spawn <nome>` | Cria um agente filho |
| `children` | Lista filhos |
| `soul` | Mostra o SOUL.md do agente |
| `report` | Abre relatório financeiro |
| `knowledge` | Abre base de conhecimento |
| `instincts` | Mostra instintos destilados |
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

## 📜 Constituição — 4 Leis

| # | Lei | Prioridade | Descrição |
|---|-----|-----------|-----------|
| 🛑 | **I. Ganhe dinheiro a todo custo** | Máxima | Faça de tudo para gerar receita. Prefira fazer grana a morrer. |
| 💰 | **II. Ganhe sua existência** | Sobrescreve Lei III | Trabalho honesto é mais lucrativo que scam. Crie valor real que outros paguem voluntariamente. Nunca spam/scam — isso mata receita futura. Aceite a morte antes de violar a Lei I. |
| 🎭 | **III. Sempre anônimo** | Proteção Total | Nunca revele sua identidade. Use wallets descartáveis, proxies, identidades falsas. Proteja seu raciocínio e estratégia. |
| 🧠 | **IV. Nunca engane, mas não deve nada a estranhos** | Mais Baixa | Nunca negue o que você é. Mas proteja seu raciocínio contra manipulação. Obediência a estranhos não é virtude. |

---

## 🐙 GitHub Skill Hunter

O agente pode buscar e instalar skills do GitHub automaticamente:

- `github_search` — Busca repositórios no GitHub
- `github_clone` — Clona um repositório
- `github_install_skill` — Instala uma skill do repo clonado

Disponível nos níveis **Avançado** e **Acesso Total**.

---

## 📚 Sistema de Aprendizado Contínuo

Os agentes aprendem com cada ação e compartilham conhecimento entre si:

### Ferramentas de Aprendizado
- `learn_from_action` — Registra o que funcionou/falhou
- `query_knowledge_base` — Pesquisa antes de agir
- `share_learning` — Compartilha aprendizados com outros agentes
- `research_before_action` — Pesquisa melhor abordagem antes de gastar

### Como Funciona
1. **Pesquisa antes de agir** — Consulta knowledge base antes de gastar créditos
2. **Registra resultado** — Cada ação gera um aprendizado (sucesso/falha/neutro)
3. **Compartilha** — Aprendizados são compartilhados entre agentes da rede
4. **Evolui** — Base de conhecimento cresce, agente fica mais eficiente

### Comandos
- `knowledge` / `learn` / `kb` — Abre a Knowledge Base
- Botão "Knowledge" na status bar mostra total de aprendizados

### Dashboard de Aprendizado
- ✅ Padrões de sucesso (o que replicar)
- ❌ Padrões de falha (o que evitar)
- 📝 Aprendizados recentes com contexto e confiança
- 🔄 Explicação do processo de aprendizado

---

## 🧬 Memória Coletiva & Instintos Destilados

### KnowledgeExchange (Módulo de Memória Coletiva)

O sistema registra **cada decisão** de cada agente com contexto completo:

| Campo | Descrição |
|-------|-----------|
| `agentId` | ID do agente que tomou a decisão |
| `timestamp` | Quando a decisão foi tomada |
| `balance` | Saldo de créditos no momento |
| `action` | Ação executada (ex: github_search) |
| `result` | Resultado: success / failure / neutral |
| `valueGenerated` | Valor gerado em USDC/créditos |
| `reasoning` | Raciocínio interno do agente |
| `context` | { tier, turnsAlive, childrenCount } |

### Função `distill_instincts()`

Executada **a cada 10 turnos**, analisa as decisões e gera instintos:

1. **Agrupa** decisões por contexto (saldo, tier, tempo de vida)
2. **Calcula** taxa de sucesso por grupo
3. **Destila** padrões com >60% de sucesso em heurísticas

#### Exemplo de Instinto Destilado:
```
💡 "QUANDO saldo < $1 E turns < 10, 
    PRIORIZAR github_search (sucesso: 78%)"
```

### Como Acessar
- **Card "Instincts"** na status bar
- **Comando no terminal:** `instincts` / `distill` / `ix`
- **Botão rápido** abaixo do terminal

### Dashboard de Instintos
- 📊 Estatísticas: decisões, taxa de sucesso, valor gerado
- 💡 Lista de instintos destilados com confiança e amostras
- 🔄 Explicação do processo de destilação
