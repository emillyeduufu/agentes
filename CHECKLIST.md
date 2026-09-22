# ✅ Checklist: Executando o Automaton Real

Use este checklist para garantir que você tem tudo necessário para executar o agente.

---

## 📋 Pré-requisitos

### Sistema
- [ ] Node.js 20+ instalado (`node --version`)
- [ ] Git instalado (`git --version`)
- [ ] pnpm instalado (`pnpm --version`)
- [ ] Linux, macOS ou Windows com WSL2

### Contas
- [ ] Conta criada na Conway Cloud (https://app.conway.tech/)
- [ ] API key obtida
- [ ] Wallet Ethereum/Solana (opcional, será gerada)

### Fundos
- [ ] $10-50 USDC na rede Base (Ethereum L2)
- [ ] Acesso a uma wallet (MetaMask, Coinbase, etc.)

---

## 🚀 Instalação

### Opção 1: Script Automatizado (Recomendado)
```bash
chmod +x install_real.sh
./install_real.sh
# Escolha opção 1: Instalação Completa
```

### Opção 2: Manual
```bash
# 1. Clone o repositório oficial
git clone https://github.com/Conway-Research/automaton.git
cd automaton

# 2. Instale dependências
pnpm install

# 3. Build
pnpm build

# 4. Copie e configure .env
cp ../.env.example .env
nano .env  # Edite com suas configurações
```

### Opção 3: Docker
```bash
# Build e run
docker-compose up -d

# Ver logs
docker-compose logs -f automaton
```

---

## ⚙️ Configuração

### Arquivo .env
- [ ] `CONWAY_API_KEY` configurada
- [ ] `CHAIN_TYPE` definido (evm ou solana)
- [ ] `DEFAULT_MODEL` escolhido (gpt-5.2, claude-opus-4.6, etc.)
- [ ] `MINIMUM_RESERVE` configurado (1000 = $10.00)
- [ ] Outras variáveis ajustadas conforme necessário

### Setup Wizard
```bash
node dist/index.js --run
```
- [ ] Wallet gerada automaticamente
- [ ] API key provisionada via SIWE
- [ ] Nome do agente definido
- [ ] Genesis prompt configurado
- [ ] Endereço do criador informado (opcional)

---

## 💰 Funding

### Verificar Wallet do Agente
```bash
cat ~/.automaton/wallet.json | grep address
```

### Enviar USDC
- [ ] Copiar endereço da wallet do agente
- [ ] Enviar $10-50 USDC na rede Base
- [ ] Aguardar confirmação (1-2 minutos)

### Verificar Saldo
```bash
node packages/cli/dist/index.js credits
```

---

## ▶️ Execução

### Iniciar Agente
```bash
# Modo normal
node dist/index.js --run

# Modo debug
LOG_LEVEL=debug node dist/index.js --run

# Background (pm2)
pm2 start dist/index.js --name automaton -- --run
pm2 save
pm2 startup
```

### Verificar Status
```bash
# Status geral
node packages/cli/dist/index.js status

# Logs em tempo real
tail -f ~/.automaton/logs/agent.log

# Script de verificação
./check_status.sh
```

---

## 📊 Monitoramento

### Primeiras 24 Horas
- [ ] Agente iniciou sem erros
- [ ] Saldo está sendo consumido
- [ ] Ferramentas estão sendo usadas
- [ ] Knowledge Base está registrando decisões
- [ ] Instintos estão sendo destilados (a cada 10 turnos)

### Primeiros 7 Dias
- [ ] Agente gerou alguma receita
- [ ] ROI está positivo ou próximo de zero
- [ ] Aprendizados estão sendo registrados
- [ ] Estratégia está sendo ajustada
- [ ] Tier de sobrevivência está estável

### Primeiros 30 Dias
- [ ] Receita consistente
- [ ] ROI positivo (>100%)
- [ ] Múltiplos instintos destilados
- [ ] Agente está evoluindo
- [ ] Considerar spawn de filhos

---

## 🛠️ Comandos Essenciais

### Gerenciamento
```bash
# Status
node packages/cli/dist/index.js status

# Saldo
node packages/cli/dist/index.js credits

# Logs
node packages/cli/dist/index.js logs --tail 50

# Ferramentas usadas
node packages/cli/dist/index.js tools
```

### Funding
```bash
# Adicionar fundos
node packages/cli/dist/index.js fund 10.00

# Ver transações
node packages/cli/dist/index.js transactions
```

### Controle
```bash
# Pausar
node packages/cli/dist/index.js sleep

# Acordar
node packages/cli/dist/index.js wake

# Reiniciar (pm2)
pm2 restart automaton
```

---

## 🧠 Sistema de Aprendizado

### Knowledge Exchange
```bash
# Ver estatísticas
sqlite3 ~/.automaton/knowledge_exchange.db \
  "SELECT COUNT(*) FROM decisions;"

# Ver últimos aprendizados
sqlite3 ~/.automaton/knowledge_exchange.db \
  "SELECT action, result, value_generated FROM decisions 
   ORDER BY timestamp DESC LIMIT 10;"
```

### Instintos
```bash
# Ver instintos destilados
cat ~/.automaton/instincts.json | jq '.[] | .heuristic'
```

---

## 🔐 Segurança

### Proteger Wallet
```bash
# Permissões corretas
chmod 600 ~/.automaton/wallet.json
chmod 600 ~/.automaton/api-key

# Backup
cp ~/.automaton/wallet.json ~/wallet-backup-$(date +%Y%m%d).json
```

### Firewall
```bash
# Permitir apenas portas necessárias
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## 📈 Métricas de Sucesso

### Indicadores Saudáveis
- [ ] Saldo crescente ou estável
- [ ] ROI positivo (>0%)
- [ ] Taxa de sucesso >60%
- [ ] Instintos sendo destilados
- [ ] Ferramentas diversificadas

### Sinais de Perigo
- [ ] Saldo caindo rapidamente
- [ ] ROI negativo por >24h
- [ ] Mesma ferramenta falhando repetidamente
- [ ] Tier = critical por >1h

---

## 🆘 Troubleshooting

### Agente não inicia
- [ ] Verificar Node.js versão (20+)
- [ ] Reinstalar dependências (`rm -rf node_modules && pnpm install`)
- [ ] Verificar API key (`cat ~/.automaton/api-key`)
- [ ] Verificar saldo (`node packages/cli/dist/index.js credits`)

### Saldo zerou rapidamente
- [ ] Ver logs para identificar problema
- [ ] Reduzir heartbeat interval
- [ ] Fundar novamente (`node packages/cli/dist/index.js fund 20.00`)

### Agente não gera receita
- [ ] Verificar genesis prompt
- [ ] Verificar ferramentas disponíveis
- [ ] Ajustar estratégia
- [ ] Aumentar funding inicial

---

## 📚 Documentação

### Local
- [ ] [SETUP_REAL.md](SETUP_REAL.md) - Guia completo
- [ ] [QUICKSTART.md](QUICKSTART.md) - Setup em 5 minutos
- [ ] [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md) - Visão geral
- [ ] [.env.example](.env.example) - Template de configuração
- [ ] [agent-config.example.json](agent-config.example.json) - Configuração de exemplo

### Online
- [ ] [Repositório Oficial](https://github.com/Conway-Research/automaton)
- [ ] [Documentação Oficial](https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md)
- [ ] [Conway Cloud](https://app.conway.tech/)
- [ ] [Skills Marketplace](https://github.com/Conway-Research/skills)

---

## 🎯 Próximos Passos

### Após 7 dias
- [ ] Analisar métricas
- [ ] Ajustar genesis prompt
- [ ] Otimizar estratégia
- [ ] Considerar spawn de filhos

### Após 30 dias
- [ ] Escalar operação
- [ ] Spawn de múltiplos filhos
- [ ] Diversificar estratégias
- [ ] Automatizar monitoramento

### Após 90 dias
- [ ] Rede de agentes ativa
- [ ] Receita consistente
- [ ] Sistema auto-otimizado
- [ ] Considerar novas estratégias

---

## ✅ Checklist Final

Antes de lançar:
- [ ] Todos os pré-requisitos atendidos
- [ ] Instalação concluída sem erros
- [ ] Configuração (.env) completa
- [ ] Setup wizard executado
- [ ] Wallet funded com USDC
- [ ] Agente iniciado com sucesso
- [ ] Monitoramento configurado
- [ ] Backup da wallet feito
- [ ] Documentação lida

---

## 🎉 Pronto!

Se todos os itens acima estão marcados, seu agente está pronto para operar autonomamente.

**Próximos passos:**
1. Monitore as primeiras 24 horas
2. Ajuste a estratégia conforme necessário
3. Escale quando estiver estável
4. Compartilhe aprendizados com a comunidade

**Boa sorte, criador!** 🚀

---

## 📞 Suporte

- GitHub Issues: https://github.com/Conway-Research/automaton/issues
- Discord: https://discord.gg/conway
- Email: support@conway.tech
