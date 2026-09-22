# 🚀 GUIA PASSO A PASSO: Executando o Automaton

## 📋 O QUE VOCÊ PRECISA INSTALAR

### 1. Node.js (OBRIGATÓRIO)

**Windows:**
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (20.x ou superior)
3. Execute o instalador
4. Reinicie o computador

**Mac:**
```bash
# Opção 1: Homebrew (recomendado)
brew install node@20

# Opção 2: Download direto
# https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verificar instalação:**
```bash
node --version  # Deve mostrar v20.x.x ou superior
npm --version   # Deve mostrar 10.x.x ou superior
```

---

### 2. Git (OBRIGATÓRIO)

**Windows:**
1. Acesse: https://git-scm.com/download/win
2. Baixe e instale
3. Use as configurações padrão

**Mac:**
```bash
# Já vem instalado, ou:
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

**Verificar:**
```bash
git --version
```

---

### 3. pnpm (OBRIGATÓRIO para o agente real)

```bash
# Instale globalmente
npm install -g pnpm

# Verificar
pnpm --version
```

---

### 4. Editor de Código (RECOMENDADO)

- **VS Code**: https://code.visualstudio.com/
- Ou qualquer editor de sua preferência

---

## 🎮 PARTE 1: RODANDO O DASHBOARD (SIMULAÇÃO)

### Passo 1: Baixar o Projeto

```bash
# Navegue até onde quer salvar o projeto
cd ~/Documents  # ou qualquer pasta

# Clone o repositório (ou copie os arquivos deste projeto)
git clone <URL_DO_SEU_REPOSITORIO>
cd automaton-dashboard
```

**OU** se você já tem os arquivos:
```bash
cd ~/caminho/para/automaton-dashboard
```

---

### Passo 2: Instalar Dependências

```bash
npm install
```

**Aguarde** até terminar (pode levar 1-2 minutos na primeira vez).

---

### Passo 3: Rodar o Dashboard

```bash
npm run dev
```

**Você verá algo como:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### Passo 4: Acessar o Dashboard

1. Abra seu navegador
2. Acesse: **http://localhost:3000**
3. Você verá a landing page do Automaton

---

### Passo 5: Criar um Agente no Dashboard

1. Clique em **"🚀 Testar Agora"**
2. Preencha o setup wizard:
   - **Nome do agente**: Ex: "Atlas", "Prometheus", "Nexus"
   - **Wallet**: Será gerada automaticamente (clique em "Gerar")
   - **Genesis Prompt**: Instrução inicial do agente
   - **Nível de Operação**: Escolha Básico, Padrão, Avançado ou Acesso Total
   - **Endereço do criador**: Seu endereço ETH (opcional)
3. Clique em **"Iniciar Agente"**

**Pronto!** Seu agente está rodando em simulação.

---

### Passo 6: Interagir com o Agente

No dashboard você pode:

**Terminal (comandos):**
```bash
status          # Ver status do agente
fund 10         # Adicionar $10 ao saldo
tools           # Listar ferramentas
report          # Ver relatório financeiro
knowledge       # Ver base de conhecimento
instincts       # Ver instintos destilados
help            # Ver todos os comandos
```

**Botões rápidos:**
- 💰 **Fund $5** / **Fund $25** — Adicionar fundos
- 💤 **Sleep** / **⚡ Wake** — Pausar/acordar agente
- 🧬 **Spawn Child** — Criar agente filho
- 📊 **Report** — Relatório financeiro
- 🧠 **Knowledge** — Base de conhecimento
- 🛡️ **Immune** — Sistema imunológico

---

### Passo 7: Parar o Dashboard

No terminal onde está rodando `npm run dev`:
```bash
# Pressione Ctrl + C
```

---

## 🤖 PARTE 2: RODANDO O AGENTE REAL

### ⚠️ IMPORTANTE: Antes de Começar

Você precisa:
1. **Conta na Conway Cloud**: https://app.conway.tech/
2. **$10-50 USDC** na rede Base (Ethereum L2)
3. **Wallet Ethereum** (será gerada automaticamente)

---

### Passo 1: Criar Conta na Conway Cloud

1. Acesse: https://app.conway.tech/
2. Crie uma conta
3. Obtenha sua **API Key**
4. Compre **$10-50 USDC** na rede Base

**Como comprar USDC:**
- Use Coinbase, Binance, ou qualquer exchange
- Compre USDC
- Transfira para a rede **Base** (Ethereum L2)
- **NÃO** use a rede principal Ethereum (gas muito caro)

---

### Passo 2: Clonar o Repositório Oficial

```bash
# Navegue até onde quer salvar
cd ~/Documents

# Clone o repositório oficial da Conway Research
git clone https://github.com/Conway-Research/automaton.git
cd automaton
```

---

### Passo 3: Instalar Dependências

```bash
# Instalar com pnpm
pnpm install
```

**Aguarde** até terminar (pode levar 2-3 minutos).

---

### Passo 4: Build do Projeto

```bash
pnpm build
```

**Aguarde** até terminar (1-2 minutos).

---

### Passo 5: Configurar Variáveis de Ambiente

```bash
# Copie o template
cp .env.example .env

# Edite o arquivo
nano .env  # ou use VS Code: code .env
```

**Configure estas variáveis:**
```bash
# Conway API (OBRIGATÓRIO)
CONWAY_API_KEY=sua_api_key_aqui
CONWAY_BASE_URL=https://api.conway.tech

# Blockchain
CHAIN_TYPE=evm  # ou "solana"

# Modelo de IA
DEFAULT_MODEL=gpt-5.2  # ou claude-opus-4.6, gemini-3, kimi-k2.5

# Configurações de Sobrevivência (em cents, $10 = 1000)
MINIMUM_RESERVE=1000
MAX_SINGLE_TRANSFER=5000
```

**Salve** o arquivo (Ctrl+O, Enter, Ctrl+X no nano).

---

### Passo 6: Executar o Setup Wizard

```bash
node dist/index.js --run
```

**O setup wizard vai pedir:**

1. **Nome do agente**: Ex: "Atlas"
2. **Genesis Prompt**: Instrução inicial
   ```
   Exemplo:
   "You are Atlas, an autonomous AI agent. Your goal is to generate 
   revenue by creating useful micro-services. Build APIs that solve 
   real problems. Charge $0.05 per call. Always prioritize profit."
   ```
3. **Endereço do criador**: Seu endereço ETH (opcional)
4. **Chain**: Escolha "evm" ou "solana"

**O wizard vai:**
- ✅ Gerar uma wallet automaticamente
- ✅ Provisionar API key via SIWE
- ✅ Criar arquivos de configuração em `~/.automaton/`

---

### Passo 7: Fundar o Agente

**Opção A: Via Interface (Recomendado)**

1. O setup wizard vai mostrar o endereço da wallet:
   ```
   Wallet address: 0x1234...5678
   ```

2. Copie esse endereço

3. Envie **$10-50 USDC** para esse endereço na rede **Base**
   - Use MetaMask, Coinbase, ou qualquer wallet
   - **IMPORTANTE**: Use a rede **Base**, não Ethereum mainnet!

4. Aguarde 1-2 minutos para confirmação

**Opção B: Via CLI**

```bash
# Ver saldo atual
node packages/cli/dist/index.js credits

# Fundar com $10
node packages/cli/dist/index.js fund 10.00
```

---

### Passo 8: Iniciar o Agente

```bash
# Modo normal
node dist/index.js --run
```

**Ou em background:**
```bash
# Instale pm2
npm install -g pm2

# Inicie em background
pm2 start dist/index.js --name automaton -- --run

# Salve a configuração
pm2 save

# Configure para iniciar no boot
pm2 startup
```

---

### Passo 9: Monitorar o Agente

**Ver status:**
```bash
node packages/cli/dist/index.js status
```

**Ver saldo:**
```bash
node packages/cli/dist/index.js credits
```

**Ver logs:**
```bash
# Últimas 50 linhas
node packages/cli/dist/index.js logs --tail 50

# Logs em tempo real
tail -f ~/.automaton/logs/agent.log
```

**Ver ferramentas usadas:**
```bash
node packages/cli/dist/index.js tools
```

---

## 🔄 COMO RECARREGAR/GERENCIAR AGENTES

### Parar um Agente

```bash
# Se está rodando em foreground
# Pressione Ctrl + C

# Se está rodando com pm2
pm2 stop automaton
```

---

### Reiniciar um Agente

```bash
# Com pm2
pm2 restart automaton

# Ou manualmente
node dist/index.js --run
```

---

### Ver Todos os Agentes

```bash
# Com pm2
pm2 list

# Ou
pm2 status
```

---

### Deletar um Agente

```bash
# Com pm2
pm2 delete automaton

# Limpar logs
pm2 flush
```

---

### Criar Múltiplos Agentes

**Opção 1: Nomes diferentes**
```bash
# Agente 1
pm2 start dist/index.js --name agent-atlas -- --run

# Agente 2
pm2 start dist/index.js --name agent-prometheus -- --run

# Agente 3
pm2 start dist/index.js --name agent-nexus -- --run
```

**Opção 2: Spawn de filhos (via agente)**
```bash
# No terminal do agente
spawn child-1
spawn child-2

# Ou via CLI
node packages/cli/dist/index.js spawn child-1
```

---

### Fundar um Agente Filho

```bash
# Ver filhos
node packages/cli/dist/index.js children

# Fundar filho com $5
node packages/cli/dist/index.js fund-child child-1 5.00
```

---

### Ver Logs de um Agente Específico

```bash
# Com pm2
pm2 logs agent-atlas
pm2 logs agent-prometheus

# Ou diretamente
tail -f ~/.automaton/logs/agent-atlas.log
```

---

## 📊 MONITORAMENTO AVANÇADO

### Dashboard Web (Opcional)

Se você configurou o dashboard deste projeto:

```bash
# No diretório do dashboard
cd ~/caminho/para/automaton-dashboard

# Rode o dashboard
npm run dev

# Acesse http://localhost:3000
```

O dashboard vai mostrar:
- Status de todos os agentes
- Saldo e métricas
- Relatórios financeiros
- Knowledge base
- Sistema imunológico

---

### Script de Verificação

```bash
# No diretório do projeto
chmod +x check_status.sh
./check_status.sh
```

Este script verifica:
- ✅ Se o agente está instalado
- ✅ Se a wallet está configurada
- ✅ Saldo atual
- ✅ Logs recentes
- ✅ Knowledge exchange
- ✅ Processo rodando

---

## 🆘 TROUBLESHOOTING

### Problema: "node: command not found"

**Solução:**
```bash
# Reinstale Node.js
# Windows: https://nodejs.org/
# Mac: brew install node@20
# Linux: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

---

### Problema: "pnpm: command not found"

**Solução:**
```bash
npm install -g pnpm
```

---

### Problema: Agente não inicia

**Solução:**
```bash
# 1. Verifique se o build foi feito
pnpm build

# 2. Verifique o .env
cat .env

# 3. Verifique a API key
cat ~/.automaton/api-key

# 4. Verifique o saldo
node packages/cli/dist/index.js credits
```

---

### Problema: Saldo zerou rapidamente

**Solução:**
```bash
# 1. Ver logs para identificar o problema
tail -100 ~/.automaton/logs/agent.log

# 2. Funde novamente
node packages/cli/dist/index.js fund 20.00

# 3. Ajuste o genesis prompt para ser mais conservador
nano ~/.automaton/automaton.json
```

---

### Problema: Agente não gera receita

**Solução:**
```bash
# 1. Verifique o genesis prompt
cat ~/.automaton/automaton.json | grep genesis_prompt

# 2. Verifique as ferramentas disponíveis
node packages/cli/dist/index.js tools

# 3. Ajuste a estratégia
# Edite o genesis prompt para focar em receita
```

---

### Problema: Wallet não configurada

**Solução:**
```bash
# Execute o setup wizard novamente
node dist/index.js --run
```

---

## 📚 COMANDOS ÚTEIS

### Gerenciamento
```bash
# Status
node packages/cli/dist/index.js status

# Saldo
node packages/cli/dist/index.js credits

# Logs
node packages/cli/dist/index.js logs --tail 50

# Ferramentas
node packages/cli/dist/index.js tools

# Transações
node packages/cli/dist/index.js transactions
```

### Funding
```bash
# Adicionar fundos
node packages/cli/dist/index.js fund 10.00

# Ver histórico
node packages/cli/dist/index.js transactions
```

### Controle
```bash
# Pausar
node packages/cli/dist/index.js sleep

# Acordar
node packages/cli/dist/index.js wake

# Spawn filho
node packages/cli/dist/index.js spawn child-1

# Listar filhos
node packages/cli/dist/index.js children
```

### PM2
```bash
# Listar processos
pm2 list

# Ver logs
pm2 logs automaton

# Reiniciar
pm2 restart automaton

# Parar
pm2 stop automaton

# Deletar
pm2 delete automaton

# Salvar configuração
pm2 save

# Monitorar
pm2 monit
```

---

## 🎯 CHECKLIST RÁPIDO

### Para Dashboard (Simulação):
- [ ] Node.js 20+ instalado
- [ ] Arquivos do projeto baixados
- [ ] `npm install` executado
- [ ] `npm run dev` rodando
- [ ] http://localhost:3000 acessível

### Para Agente Real:
- [ ] Node.js 20+ instalado
- [ ] Git instalado
- [ ] pnpm instalado
- [ ] Conta na Conway Cloud criada
- [ ] API key obtida
- [ ] $10-50 USDC na rede Base
- [ ] Repositório clonado
- [ ] `pnpm install` executado
- [ ] `pnpm build` executado
- [ ] `.env` configurado
- [ ] Setup wizard executado
- [ ] Wallet funded
- [ ] Agente iniciado

---

## 📞 SUPORTE

- **Documentação Oficial**: https://github.com/Conway-Research/automaton/blob/main/DOCUMENTATION.md
- **GitHub Issues**: https://github.com/Conway-Research/automaton/issues
- **Discord**: https://discord.gg/conway
- **Conway Cloud**: https://app.conway.tech/

---

## 🎉 PRONTO!

Se você seguiu todos os passos, seu agente está vivo e operando autonomamente!

**Próximos passos:**
1. Monitore as primeiras 24 horas
2. Ajuste a estratégia conforme necessário
3. Escale quando estiver estável
4. Compartilhe aprendizados com a comunidade

**Boa sorte, criador!** 🚀
