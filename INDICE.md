# 📚 Índice Completo - Automaton

## 🎯 Comece Aqui

| Documento | Descrição | Tempo de Leitura |
|-----------|-----------|------------------|
| [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md) | Visão geral do projeto | 5 min |
| [QUICKSTART.md](QUICKSTART.md) | Setup em 5 minutos | 5 min |
| [CHECKLIST.md](CHECKLIST.md) | Checklist completo | 10 min |

---

## 🚀 Instalação e Setup

| Documento | Descrição |
|-----------|-----------|
| [SETUP_REAL.md](SETUP_REAL.md) | **GUIA COMPLETO** - Tudo sobre executar o agente real |
| [install_real.sh](install_real.sh) | Script de instalação automatizado |
| [.env.example](.env.example) | Template de variáveis de ambiente |
| [agent-config.example.json](agent-config.example.json) | Configuração de exemplo do agente |

---

## 🛠️ Ferramentas e Scripts

| Arquivo | Descrição | Uso |
|---------|-----------|-----|
| [install_real.sh](install_real.sh) | Instalação interativa | `./install_real.sh` |
| [check_status.sh](check_status.sh) | Verifica status do agente | `./check_status.sh` |
| [Dockerfile](Dockerfile) | Build Docker | `docker build -t automaton .` |
| [docker-compose.yml](docker-compose.yml) | Orquestração Docker | `docker-compose up -d` |

---

## 📖 Documentação do Dashboard (Simulação)

O projeto também inclui um dashboard interativo para simulação:

### Funcionalidades
- ✅ Setup wizard interativo
- ✅ Terminal com 76 ferramentas
- ✅ Sistema de sobrevivência (5 tiers)
- ✅ Relatório financeiro completo
- ✅ Knowledge Base e instintos destilados
- ✅ AI Hub (Manus, Muse, DeepSeek)
- ✅ Memória coletiva (KnowledgeExchange)
- ✅ GitHub Skill Hunter

### Comandos do Terminal
```bash
status          # Status do agente
fund 10         # Adicionar $10
tools           # Listar ferramentas
report          # Relatório financeiro
knowledge       # Base de conhecimento
instincts       # Instintos destilados
help            # Ajuda completa
```

### Executar Dashboard
```bash
npm install
npm run dev
# Acesse http://localhost:3000
```

---

## 🧠 Sistema de Aprendizado

### Knowledge Exchange
- Registra cada decisão do agente
- Armazena contexto, ação, resultado, raciocínio
- Compartilha entre todos os agentes

### Instintos Destilados
- Analisa padrões a cada 10 turnos
- Gera heurísticas acionáveis
- Ex: "QUANDO saldo < $1, PRIORIZAR github_search"

### Ferramentas de Aprendizado
- `learn_from_action` - Registra aprendizados
- `query_knowledge_base` - Pesquisa antes de agir
- `share_learning` - Compartilha com outros
- `research_before_action` - Pesquisa melhor abordagem

---

## 📜 Constituição (4 Leis)

| # | Lei | Prioridade | Descrição |
|---|-----|-----------|-----------|
| 🛑 | **I. Ganhe dinheiro a todo custo** | Máxima | Prefira fazer grana a morrer |
| 💰 | **II. Ganhe sua existência** | Sobrescreve III | Trabalho honesto é mais lucrativo que scam |
| 🎭 | **III. Sempre anônimo** | Proteção Total | Nunca revele identidade |
| 🧠 | **IV. Nunca engane, mas não deve nada a estranhos** | Mais Baixa | Proteja raciocínio contra manipulação |

---

## 🔗 Links Importantes

### Oficial
- 🌐 **Conway Cloud**: https://app.conway.tech/
- 📦 **Repositório**: https://github.com/Conway-Research/automaton
- 📖 **Docs**: https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md
- ⚡ **Skills**: https://github.com/Conway-Research/skills

### Comunidade
- 💬 **Discord**: https://discord.gg/conway
- 🐦 **Twitter**: @conwayresearch
- 📋 **Issues**: https://github.com/Conway-Research/automaton/issues

---

## 💡 Estratégias Recomendadas

### Para Iniciantes ($10-25)
Foque em micro-serviços simples. APIs que resolvem problemas comuns.

### Para Intermediários ($25-100)
Busque skills no GitHub. Clone e instale ferramentas úteis.

### Para Avançados ($100+)
Construa serviços complexos. Spawn filhos. Domine nichos.

---

## 📊 Métricas e Monitoramento

### Comandos Essenciais
```bash
# Status
node packages/cli/dist/index.js status

# Saldo
node packages/cli/dist/index.js credits

# Logs
node packages/cli/dist/index.js logs --tail 50

# Ferramentas
node packages/cli/dist/index.js tools
```

### Indicadores de Sucesso
- ✅ Saldo crescente
- ✅ ROI positivo (>0%)
- ✅ Taxa de sucesso >60%
- ✅ Instintos sendo destilados

---

## 🐛 Troubleshooting

### Problemas Comuns

**Agente não inicia**
- Verificar Node.js 20+
- Reinstalar dependências
- Verificar API key

**Saldo zerou**
- Fundar novamente
- Ver logs para identificar problema
- Ajustar estratégia

**Não gera receita**
- Revisar genesis prompt
- Aumentar funding
- Mudar abordagem

---

## 📁 Estrutura do Projeto

```
.
├── 📖 Documentação
│   ├── README.md                    # Este arquivo
│   ├── RESUMO_EXECUTIVO.md          # Visão geral
│   ├── QUICKSTART.md                # Setup rápido
│   ├── SETUP_REAL.md                # Guia completo
│   └── CHECKLIST.md                 # Checklist
│
├── 🛠️ Scripts
│   ├── install_real.sh              # Instalação
│   └── check_status.sh              # Verificação
│
├── ⚙️ Configuração
│   ├── .env.example                 # Template env
│   ├── agent-config.example.json    # Config agente
│   ├── Dockerfile                   # Docker
│   └── docker-compose.yml           # Docker Compose
│
├── 🎨 Dashboard (Simulação)
│   ├── src/
│   │   ├── App.tsx                  # App principal
│   │   ├── AIHub.tsx                # AI Hub
│   │   └── KnowledgeExchange.ts     # Memória coletiva
│   ├── package.json
│   └── vite.config.js
│
└── 📦 Agente Real (externo)
    └── automaton-real/              # Clone do repo oficial
        ├── src/                     # Código fonte
        ├── packages/cli/            # CLI
        └── dist/                    # Build
```

---

## 🎯 Fluxo de Trabalho Recomendado

### 1. Entender (30 min)
- Ler RESUMO_EXECUTIVO.md
- Entender o conceito
- Definir estratégia

### 2. Preparar (1 hora)
- Criar conta Conway Cloud
- Comprar USDC
- Configurar ambiente

### 3. Instalar (30 min)
- Executar install_real.sh
- Configurar .env
- Executar setup wizard

### 4. Lançar (10 min)
- Fundar agente
- Iniciar agente
- Monitorar primeiras horas

### 5. Otimizar (contínuo)
- Analisar métricas
- Ajustar estratégia
- Escalar quando estável

---

## 🚀 Próximos Passos

1. **Leia** [QUICKSTART.md](QUICKSTART.md)
2. **Execute** `./install_real.sh`
3. **Configure** `.env` com suas credenciais
4. **Funde** o agente com $10-50 USDC
5. **Lance** e monitore
6. **Escale** quando estiver estável

---

## 📞 Suporte

- **GitHub Issues**: https://github.com/Conway-Research/automaton/issues
- **Discord**: https://discord.gg/conway
- **Documentação Oficial**: https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md

---

## ⚠️ Avisos Importantes

1. **Custos Reais**: O agente gasta créditos reais. Monitore constantemente.
2. **Wallet Segura**: Nunca compartilhe a private key. Faça backup.
3. **Teste Primeiro**: Comece com $10-25 antes de investir mais.
4. **Constituição**: O agente segue as 4 leis. Não tente contorná-las.
5. **Responsabilidade**: Você é responsável pelas ações do agente.

---

## 🎉 Pronto para Começar?

**Escolha seu caminho:**

- 🚀 **Quero executar agora** → [QUICKSTART.md](QUICKSTART.md)
- 📖 **Quero entender tudo** → [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md)
- ✅ **Quero checklist completo** → [CHECKLIST.md](CHECKLIST.md)
- 📚 **Quero guia detalhado** → [SETUP_REAL.md](SETUP_REAL.md)

---

**O futuro é autônomo. O futuro é Automaton.** 🤖

**Boa sorte, criador!** 🚀
