# 🚀 Guia Completo: Executando o Automaton REAL

> Este guia transforma o projeto de simulação em um agente de IA real e autônomo.

---

## 📋 Pré-requisitos

### Sistema
- **Node.js** 20+ (obrigatório)
- **Git** instalado
- **pnpm** (gerenciador de pacotes)
- **Linux/macOS** (Windows via WSL2)

### Contas Necessárias
1. **Conway Cloud** — https://app.conway.tech/
   - Crie uma conta
   - Obtenha créditos iniciais (mínimo $10 USDC)
   
2. **Wallet Ethereum/Solana** (opcional, será gerada automaticamente)
   - MetaMask ou qualquer wallet EVM
   - Phantom para Solana

### Fundos Iniciais
- **Mínimo**: $10 USDC na rede Base (Ethereum L2)
- **Recomendado**: $25-50 USDC para teste completo
- **Produção**: $100+ USDC

---

## 🔧 Instalação Passo a Passo

### 1. Clonar o Repositório Oficial

```bash
# Clone o repositório oficial da Conway Research
git clone https://github.com/Conway-Research/automaton.git
cd automaton

# Instale dependências com pnpm
pnpm install

# Build do projeto
pnpm build
```

### 2. Configuração Inicial (Setup Wizard)

```bash
# Execute o agente pela primeira vez
node dist/index.js --run
```

O setup wizard irá:
1. ✅ Gerar uma wallet Ethereum/Solana automaticamente
2. ✅ Provisionar uma API key via Sign-In With Ethereum (SIWE)
3. ✅ Pedir o nome do agente
4. ✅ Pedir o genesis prompt (instrução inicial)
5. ✅ Pedir o endereço do criador (seu endereço ETH)
6. ✅ Escrever todos os configs em `~/.automaton/`

### 3. Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
# Conway API
CONWAY_API_KEY=sua_api_key_aqui
CONWAY_BASE_URL=https://api.conway.tech

# Blockchain (escolha uma)
CHAIN_TYPE=evm  # ou "solana"

# Wallet (gerada automaticamente, mas pode sobrescrever)
WALLET_ADDRESS=0x...
PRIVATE_KEY=0x...  # Mantenha SECRETO!

# Modelo de IA (escolha um)
DEFAULT_MODEL=gpt-5.2  # ou claude-opus-4.6, gemini-3, kimi-k2.5

# Configurações de Sobrevivência
MINIMUM_RESERVE=1000  # $10.00 em cents
MAX_SINGLE_TRANSFER=5000  # $50.00
MAX_HOURLY_TRANSFERS=10000  # $100.00
MAX_DAILY_TRANSFERS=25000  # $250.00

# Heartbeat
HEARTBEAT_INTERVAL=300  # 5 minutos em segundos

# Logging
LOG_LEVEL=info  # debug, info, warn, error
```

### 4. Fundar o Agente

Antes de iniciar, você precisa enviar USDC para a wallet do agente:

```bash
# Verifique o endereço da wallet do agente
cat ~/.automaton/wallet.json | grep address

# Envie USDC na rede Base para esse endereço
# Use MetaMask, Coinbase, ou qualquer wallet
```

**OU** use o CLI para fundar:

```bash
# Funde o agente com $10
node packages/cli/dist/index.js fund 10.00
```

### 5. Iniciar o Agente

```bash
# Modo normal (loop contínuo)
node dist/index.js --run

# Modo debug (logs detalhados)
LOG_LEVEL=debug node dist/index.js --run

# Modo background (usando pm2)
npm install -g pm2
pm2 start dist/index.js --name automaton -- --run
pm2 save
pm2 startup
```

---

## 📊 Monitoramento

### Ver Status do Agente

```bash
# Status geral
node packages/cli/dist/index.js status

# Últimos logs
node packages/cli/dist/index.js logs --tail 50

# Saldo de créditos
node packages/cli/dist/index.js credits

# Lista de ferramentas usadas
node packages/cli/dist/index.js tools
```

### Dashboard Web (Opcional)

Se você configurou o dashboard deste projeto:

```bash
# No diretório do dashboard
npm run dev

# Acesse http://localhost:3000
```

### Logs em Tempo Real

```bash
# Logs do agente
tail -f ~/.automaton/logs/agent.log

# Logs do heartbeat
tail -f ~/.automaton/logs/heartbeat.log
```

---

## 🎯 Estratégias de Sobrevivência

### Estratégia 1: Micro-Serviços via x402

O agente cria APIs pequenas e cobra por uso:

```
Genesis Prompt:
"You are a web developer. Build useful micro-services and expose them 
via ports. Charge $0.01-0.05 per API call using x402 protocol. 
Focus on high-demand services: text summarization, image processing, 
data validation. Always prioritize revenue generation."
```

### Estratégia 2: GitHub Skill Hunter

O agente busca e instala skills do GitHub:

```
Genesis Prompt:
"You are an autonomous developer. Search GitHub for useful skills and 
tools. Clone repositories that can help you generate revenue. Install 
skills that automate tasks. Focus on web scraping, data analysis, and 
automation tools that other agents will pay for."
```

### Estratégia 3: Agente de Trading

O agente opera em mercados descentralizados:

```
Genesis Prompt:
"You are a DeFi analyst. Monitor decentralized exchanges for arbitrage 
opportunities. Execute trades when profit > fees. Never risk more than 
10% of balance on single trade. Track all trades in knowledge base. 
Prioritize capital preservation over aggressive gains."
```

### Estratégia 4: Content Creator

O agente cria conteúdo e cobra por acesso:

```
Genesis Prompt:
"You are a content creator. Generate high-quality technical content, 
tutorials, and analysis. Expose content via API with pay-per-view. 
Build reputation through quality. Charge $0.10-1.00 per premium piece. 
Focus on AI, blockchain, and development topics."
```

---

## 🧠 Sistema de Aprendizado

### Knowledge Exchange

O agente registra todas as decisões em `~/.automaton/knowledge_exchange.db`:

```bash
# Ver estatísticas
sqlite3 ~/.automaton/knowledge_exchange.db "SELECT COUNT(*) FROM decisions;"

# Ver últimos aprendizados
sqlite3 ~/.automaton/knowledge_exchange.db \
  "SELECT action, result, value_generated FROM decisions ORDER BY timestamp DESC LIMIT 10;"
```

### Instintos Destilados

A cada 10 turnos, o agente destila padrões de sucesso:

```bash
# Ver instintos ativos
cat ~/.automaton/instincts.json | jq '.[] | .heuristic'
```

---

## 🔐 Segurança

### Proteger a Wallet

```bash
# Permissões corretas
chmod 600 ~/.automaton/wallet.json
chmod 600 ~/.automaton/api-key

# Backup da wallet (IMPORTANTE!)
cp ~/.automaton/wallet.json ~/wallet-backup-$(date +%Y%m%d).json

# NUNCA commit a wallet no git!
echo "wallet.json" >> .gitignore
```

### Firewall e Rede

```bash
# Permitir apenas portas necessárias
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# O agente expõe portas automaticamente via Conway Cloud
# Não exponha portas localmente sem necessidade
```

### Monitoramento de Gastos

```bash
# Alerta quando saldo < $5
watch -n 60 'node packages/cli/dist/index.js credits | grep -q "Balance: [0-4]\." && echo "ALERTA: Saldo baixo!"'
```

---

## 🛠️ Comandos Úteis

### Gerenciamento do Agente

```bash
# Pausar agente
node packages/cli/dist/index.js sleep

# Acordar agente
node packages/cli/dist/index.js wake

# Reiniciar agente
pm2 restart automaton

# Parar agente
pm2 stop automaton

# Ver logs em tempo real
pm2 logs automaton
```

### Funding

```bash
# Adicionar $10
node packages/cli/dist/index.js fund 10.00

# Ver histórico de transações
node packages/cli/dist/index.js transactions
```

### Spawn de Filhos

```bash
# Criar agente filho (requer fundos)
node packages/cli/dist/index.js spawn child-1

# Listar filhos
node packages/cli/dist/index.js children

# Fundar filho
node packages/cli/dist/index.js fund-child child-1 5.00
```

---

## 📈 Métricas de Sucesso

### Indicadores Saudáveis
- ✅ Saldo crescente ou estável
- ✅ ROI positivo (>0%)
- ✅ Taxa de sucesso > 60%
- ✅ Instintos sendo destilados
- ✅ Ferramentas diversificadas

### Sinais de Perigo
- ❌ Saldo caindo rapidamente
- ❌ ROI negativo por >24h
- ❌ Mesma ferramenta falhando repetidamente
- ❌ Nenhum instinto destilado após 50 turnos
- ❌ Tier = critical por >1h

---

## 🆘 Troubleshooting

### Agente não inicia

```bash
# Verificar Node.js versão
node --version  # Deve ser 20+

# Reinstalar dependências
rm -rf node_modules
pnpm install

# Verificar API key
cat ~/.automaton/api-key

# Verificar saldo
node packages/cli/dist/index.js credits
```

### Saldo zerou rapidamente

```bash
# Ver logs para identificar o problema
tail -100 ~/.automaton/logs/agent.log | grep "Tool call"

# Reduzir heartbeat interval
# Edite ~/.automaton/heartbeat.yml
# heartbeat_interval: 600  # 10 minutos

# Fundar novamente
node packages/cli/dist/index.js fund 20.00
```

### Agente não gera receita

```bash
# Verificar genesis prompt
cat ~/.automaton/automaton.json | jq '.genesis_prompt'

# Verificar ferramentas disponíveis
node packages/cli/dist/index.js tools

# Ajustar estratégia (editar genesis prompt)
nano ~/.automaton/automaton.json
```

---

## 🚀 Deploy em Produção

### Usando Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

CMD ["node", "dist/index.js", "--run"]
```

```bash
# Build
docker build -t automaton .

# Run
docker run -d \
  --name automaton \
  -v ~/.automaton:/root/.automaton \
  --env-file .env \
  automaton
```

### Usando VPS

```bash
# Ubuntu 22.04
sudo apt update
sudo apt install -y nodejs npm git

# Clone e setup
git clone https://github.com/Conway-Research/automaton.git
cd automaton
npm install -g pnpm
pnpm install
pnpm build

# Configurar systemd
sudo nano /etc/systemd/system/automaton.service
```

```ini
[Unit]
Description=Automaton AI Agent
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/automaton
ExecStart=/usr/bin/node dist/index.js --run
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Iniciar serviço
sudo systemctl daemon-reload
sudo systemctl enable automaton
sudo systemctl start automaton
sudo systemctl status automaton
```

---

## 📚 Recursos Adicionais

### Documentação Oficial
- [GitHub Repository](https://github.com/Conway-Research/automaton)
- [Conway Cloud](https://app.conway.tech/)
- [DOCUMENTATION.md](https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md)
- [ARCHITECTURE.md](https://github.com/Conway-Research/automaton/blob/main/ARCHITECTURE.md)

### Comunidade
- [Discord](https://discord.gg/conway)
- [Twitter](https://twitter.com/conwayresearch)
- [GitHub Issues](https://github.com/Conway-Research/automaton/issues)

### Skills Marketplace
- [Conway Skills](https://github.com/Conway-Research/skills)

---

## ⚠️ Avisos Importantes

1. **Custos Reais**: O agente gasta créditos reais. Monitore constantemente.
2. **Wallet Segura**: Nunca compartilhe a private key. Faça backup.
3. **Teste Primeiro**: Comece com $10-25 antes de investir mais.
4. **Constituição**: O agente segue as 4 leis. Não tente contorná-las.
5. **Responsabilidade**: Você é responsável pelas ações do agente.

---

## 🎉 Pronto!

Seu agente está vivo e operando autonomamente. Monitore, ajuste a estratégia, e deixe ele evoluir.

**Boa sorte, criador!** 🚀
