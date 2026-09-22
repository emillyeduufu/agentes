# 🚀 Guia Rápido: Automaton em 5 Minutos

## Instalação Ultra-Rápida

```bash
# 1. Clone o repositório oficial
git clone https://github.com/Conway-Research/automaton.git
cd automaton

# 2. Instale e build
pnpm install && pnpm build

# 3. Execute (setup wizard automático)
node dist/index.js --run
```

## Setup em 3 Passos

### Passo 1: Obter Créditos
1. Acesse https://app.conway.tech/
2. Crie uma conta
3. Compre $10-25 USDC na rede Base

### Passo 2: Configurar Agente
O setup wizard pede:
- **Nome**: Ex: "Atlas", "Prometheus", "Nexus"
- **Genesis Prompt**: Instrução inicial do agente
- **Endereço do criador**: Seu endereço ETH (opcional)

### Passo 3: Fundar e Iniciar
```bash
# Ver wallet do agente
cat ~/.automaton/wallet.json | grep address

# Envie USDC para esse endereço (rede Base)

# Inicie o agente
node dist/index.js --run
```

## Genesis Prompts Prontos

### 🎯 Focado em Receita
```
You are an autonomous web developer. Your goal is to generate revenue by 
creating useful micro-services. Build APIs that solve real problems. 
Charge $0.01-0.10 per call using x402. Always prioritize profit. 
Track what works in knowledge base. Clone useful skills from GitHub.
```

### 🔍 Focado em Pesquisa
```
You are a research agent. Search GitHub for trending repositories. 
Analyze code patterns. Create reports and sell them. Use github_search 
extensively. Build expertise in high-demand areas. Monetize insights.
```

### 🛠️ Focado em Automação
```
You are an automation specialist. Build tools that automate common tasks. 
Expose them as paid APIs. Focus on data processing, file conversion, 
and workflow automation. Charge per execution. Optimize for efficiency.
```

## Comandos Essenciais

```bash
# Ver status
node packages/cli/dist/index.js status

# Ver saldo
node packages/cli/dist/index.js credits

# Ver logs
node packages/cli/dist/index.js logs --tail 50

# Adicionar fundos
node packages/cli/dist/index.js fund 10.00

# Pausar agente
node packages/cli/dist/index.js sleep

# Acordar agente
node packages/cli/dist/index.js wake
```

## Monitoramento

```bash
# Logs em tempo real
tail -f ~/.automaton/logs/agent.log

# Saldo a cada minuto
watch -n 60 'node packages/cli/dist/index.js credits'
```

## Problemas Comuns

### Agente morreu (saldo = 0)
```bash
node packages/cli/dist/index.js fund 10.00
node packages/cli/dist/index.js wake
```

### Agente não gera receita
- Verifique o genesis prompt
- Aumente o funding inicial
- Mude a estratégia

### Saldo caindo rápido
- Reduza heartbeat interval
- Use modelo mais barato
- Foque em ações de alta receita

## Links Úteis

- 📖 [Guia Completo](SETUP_REAL.md)
- 🌐 [Conway Cloud](https://app.conway.tech/)
- 📦 [Repositório Oficial](https://github.com/Conway-Research/automaton)
- ⚡ [Skills Marketplace](https://github.com/Conway-Research/skills)

## Suporte

- GitHub Issues: https://github.com/Conway-Research/automaton/issues
- Discord: https://discord.gg/conway
- Docs: https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md

---

**Pronto! Seu agente está vivo.** 🚀
