# 🚀 GUIA WINDOWS: Executando em D:\agentes

## 📋 PASSO A PASSO COMPLETO

---

## ⚙️ INSTALAÇÃO (UMA VEZ SÓ)

### 1. Instalar Node.js

1. Acesse: **https://nodejs.org/**
2. Baixe a versão **LTS** (20.x ou superior)
3. Execute o instalador
4. Clique em "Next" até terminar
5. Reinicie o computador

**Verificar:**
```cmd
node --version
```
Deve mostrar: `v20.x.x` ou superior

---

### 2. Instalar Git

1. Acesse: **https://git-scm.com/download/win**
2. Baixe e instale
3. Use as configurações padrão (só clique "Next")

**Verificar:**
```cmd
git --version
```

---

### 3. Criar pasta D:\agentes

Abra o **Explorador de Arquivos** e:
1. Vá em "Este Computador" → "Disco Local (D:)"
2. Crie uma pasta chamada: **agentes**

**OU** via CMD:
```cmd
mkdir D:\agentes
```

---

## 🎮 OPÇÃO 1: DASHBOARD (SIMULAÇÃO)

### Instalar Dashboard

Abra o **CMD** (Prompt de Comando) e execute:

```cmd
cd D:\agentes
git clone <URL_DO_SEU_REPOSITORIO> automaton-dashboard
cd automaton-dashboard
npm install
npm run build
```

**OU** use o script automático:
```cmd
cd D:\agentes
instalar.bat
```
Escolha a opção **1**

---

### Rodar Dashboard

```cmd
cd D:\agentes\automaton-dashboard
npm run dev
```

**Acesse no navegador:**
```
http://localhost:3000
```

**Para parar:**
```
Pressione Ctrl + C
```

---

### Criar Agente no Dashboard

1. Abra http://localhost:3000
2. Clique em **"🚀 Testar Agora"**
3. Preencha:
   - **Nome**: Ex: "Atlas"
   - **Wallet**: Clique em "Gerar"
   - **Genesis Prompt**: 
     ```
     You are Atlas, an autonomous AI agent. Your goal is to generate 
     revenue by creating useful micro-services. Build APIs that solve 
     real problems. Charge $0.05 per call. Always prioritize profit.
     ```
   - **Nível**: Escolha "Avançado" ou "Acesso Total"
4. Clique em **"Iniciar Agente"**

---

## 🤖 OPÇÃO 2: AGENTE REAL (CONWAY RESEARCH)

### Pré-requisitos

Antes de começar, você precisa:

1. **Conta na Conway Cloud**
   - Acesse: https://app.conway.tech/
   - Crie uma conta
   - Obtenha sua **API Key**

2. **USDC na rede Base**
   - Compre $10-50 USDC
   - Use Coinbase, Binance, ou qualquer exchange
   - Transfira para a rede **Base** (NÃO use Ethereum mainnet!)

---

### Instalar Agente Real

Abra o **CMD** e execute:

```cmd
cd D:\agentes
git clone https://github.com/Conway-Research/automaton.git
cd automaton
npm install -g pnpm
pnpm install
pnpm build
```

**OU** use o script automático:
```cmd
cd D:\agentes
instalar.bat
```
Escolha a opção **2**

---

### Configurar .env

```cmd
cd D:\agentes\automaton
copy .env.example .env
notepad .env
```

**Edite estas linhas:**
```
CONWAY_API_KEY=sua_api_key_aqui
CHAIN_TYPE=evm
DEFAULT_MODEL=gpt-5.2
MINIMUM_RESERVE=1000
```

**Salve** (Ctrl+S) e feche o Notepad.

---

### Executar Setup Wizard

```cmd
cd D:\agentes\automaton
node dist\index.js --run
```

**O wizard vai pedir:**
1. **Nome do agente**: Ex: "Atlas"
2. **Genesis Prompt**: (cole o mesmo do dashboard)
3. **Endereço do criador**: Seu endereço ETH (opcional)

**O wizard vai:**
- ✅ Gerar uma wallet automaticamente
- ✅ Mostrar o endereço da wallet
- ✅ Criar arquivos em `C:\Users\SEU_USUARIO\.automaton\`

---

### Fundar o Agente

1. **Copie o endereço da wallet** mostrado pelo wizard
   ```
   Wallet address: 0x1234...5678
   ```

2. **Envie USDC** para esse endereço
   - Use MetaMask, Coinbase, ou qualquer wallet
   - **IMPORTANTE**: Use a rede **Base** (NÃO Ethereum mainnet!)
   - Envie $10-50 USDC

3. **Aguarde** 1-2 minutos para confirmação

4. **Verifique o saldo**:
   ```cmd
   cd D:\agentes\automaton
   node packages\cli\dist\index.js credits
   ```

---

### Iniciar o Agente

```cmd
cd D:\agentes\automaton
node dist\index.js --run
```

**Pronto!** Seu agente está rodando!

**Para parar:**
```
Pressione Ctrl + C
```

---

## 🔄 GERENCIAR AGENTES

### Ver Status

```cmd
cd D:\agentes\automaton
node packages\cli\dist\index.js status
```

### Ver Saldo

```cmd
node packages\cli\dist\index.js credits
```

### Ver Logs

```cmd
# Últimas 50 linhas
node packages\cli\dist\index.js logs --tail 50

# Logs em tempo real
type C:\Users\SEU_USUARIO\.automaton\logs\agent.log
```

### Adicionar Fundos

```cmd
node packages\cli\dist\index.js fund 10.00
```

### Pausar Agente

```cmd
node packages\cli\dist\index.js sleep
```

### Acordar Agente

```cmd
node packages\cli\dist\index.js wake
```

---

## 🚀 RODAR EM BACKGROUND (PM2)

### Instalar PM2

```cmd
npm install -g pm2
```

### Iniciar Agente em Background

```cmd
cd D:\agentes\automaton
pm2 start dist\index.js --name automaton -- --run
```

### Ver Agentes Rodando

```cmd
pm2 list
```

### Ver Logs

```cmd
pm2 logs automaton
```

### Reiniciar Agente

```cmd
pm2 restart automaton
```

### Parar Agente

```cmd
pm2 stop automaton
```

### Deletar Agente

```cmd
pm2 delete automaton
```

### Salvar Configuração

```cmd
pm2 save
```

### Configurar para Iniciar no Boot

```cmd
pm2 startup
```

---

## 🧬 CRIAR MÚLTIPLOS AGENTES

### Agente 1: Atlas

```cmd
cd D:\agentes\automaton
pm2 start dist\index.js --name agent-atlas -- --run
```

### Agente 2: Prometheus

```cmd
pm2 start dist\index.js --name agent-prometheus -- --run
```

### Agente 3: Nexus

```cmd
pm2 start dist\index.js --name agent-nexus -- --run
```

### Ver Todos

```cmd
pm2 list
```

### Spawn de Filhos (via agente)

No terminal do agente:
```
spawn child-1
spawn child-2
```

Ou via CLI:
```cmd
node packages\cli\dist\index.js spawn child-1
node packages\cli\dist\index.js fund-child child-1 5.00
```

---

## 📊 SCRIPTS ÚTEIS

### Criar script para rodar dashboard

Crie o arquivo: `D:\agentes\rodar-dashboard.bat`

```batch
@echo off
cd /d D:\agentes\automaton-dashboard
echo Iniciando Dashboard...
echo Acesse: http://localhost:3000
echo.
echo Para parar: Ctrl + C
echo.
npm run dev
```

**Para rodar:**
```cmd
D:\agentes\rodar-dashboard.bat
```

---

### Criar script para rodar agente

Crie o arquivo: `D:\agentes\rodar-agente.bat`

```batch
@echo off
cd /d D:\agentes\automaton
echo Iniciando Agente Real...
echo.
echo Para parar: Ctrl + C
echo.
node dist\index.js --run
```

**Para rodar:**
```cmd
D:\agentes\rodar-agente.bat
```

---

### Criar script para ver status

Crie o arquivo: `D:\agentes\status.bat`

```batch
@echo off
cd /d D:\agentes\automaton
echo ═══════════════════════════════════════════════════════════════
echo STATUS DO AGENTE
echo ═══════════════════════════════════════════════════════════════
echo.
node packages\cli\dist\index.js status
echo.
echo ═══════════════════════════════════════════════════════════════
echo SALDO
echo ═══════════════════════════════════════════════════════════════
echo.
node packages\cli\dist\index.js credits
echo.
pause
```

**Para rodar:**
```cmd
D:\agentes\status.bat
```

---

## 🆘 PROBLEMAS COMUNS

### "node não é reconhecido"

**Solução:**
1. Reinstale o Node.js
2. Reinicie o computador
3. Abra um novo CMD

---

### "pnpm não é reconhecido"

**Solução:**
```cmd
npm install -g pnpm
```

---

### "git não é reconhecido"

**Solução:**
1. Reinstale o Git
2. Reinicie o computador

---

### Agente não inicia

**Solução:**
```cmd
cd D:\agentes\automaton

# Verifique se o build foi feito
pnpm build

# Verifique o .env
type .env

# Verifique a API key
type C:\Users\SEU_USUARIO\.automaton\api-key

# Verifique o saldo
node packages\cli\dist\index.js credits
```

---

### Saldo zerou rapidamente

**Solução:**
```cmd
cd D:\agentes\automaton

# Ver logs
type C:\Users\SEU_USUARIO\.automaton\logs\agent.log

# Funde novamente
node packages\cli\dist\index.js fund 20.00
```

---

### Erro de permissão

**Solução:**
Abra o CMD como **Administrador**:
1. Clique com botão direito no CMD
2. Escolha "Executar como administrador"

---

## 📁 ESTRUTURA DE PASTAS

```
D:\agentes\
│
├── automaton-dashboard\          ← Dashboard (simulação)
│   ├── src\
│   ├── node_modules\
│   ├── package.json
│   └── ...
│
├── automaton\                    ← Agente real
│   ├── src\
│   ├── packages\
│   ├── node_modules\
│   ├── dist\
│   ├── .env
│   └── ...
│
├── instalar.bat                  ← Script de instalação
├── rodar-dashboard.bat           ← Script para rodar dashboard
├── rodar-agente.bat              ← Script para rodar agente
└── status.bat                    ← Script para ver status
```

---

## 🎯 CHECKLIST RÁPIDO

### Para Dashboard:
- [ ] Node.js instalado
- [ ] Git instalado
- [ ] Pasta D:\agentes criada
- [ ] Repositório clonado
- [ ] `npm install` executado
- [ ] `npm run dev` rodando
- [ ] http://localhost:3000 acessível

### Para Agente Real:
- [ ] Node.js instalado
- [ ] Git instalado
- [ ] pnpm instalado
- [ ] Conta Conway Cloud criada
- [ ] API key obtida
- [ ] USDC na rede Base
- [ ] Repositório clonado
- [ ] `pnpm install` executado
- [ ] `pnpm build` executado
- [ ] `.env` configurado
- [ ] Setup wizard executado
- [ ] Wallet funded
- [ ] Agente iniciado

---

## 📞 COMANDOS RÁPIDOS

### Dashboard
```cmd
cd D:\agentes\automaton-dashboard
npm run dev
```

### Agente Real
```cmd
cd D:\agentes\automaton
node dist\index.js --run
```

### Status
```cmd
cd D:\agentes\automaton
node packages\cli\dist\index.js status
node packages\cli\dist\index.js credits
```

### PM2
```cmd
pm2 list
pm2 logs automaton
pm2 restart automaton
```

---

## 🎉 PRONTO!

Se você seguiu todos os passos, seu agente está vivo e operando!

**Próximos passos:**
1. Monitore as primeiras 24 horas
2. Ajuste a estratégia conforme necessário
3. Escale quando estiver estável

**Boa sorte, criador!** 🚀

---

## 📚 DOCUMENTAÇÃO

- [GUIA_EXECUCAO.md](GUIA_EXECUCAO.md) - Guia completo
- [SETUP_REAL.md](SETUP_REAL.md) - Documentação detalhada
- [QUICKSTART.md](QUICKSTART.md) - Setup em 5 minutos
- [CHECKLIST.md](CHECKLIST.md) - Checklist completo

---

**Suporte:**
- GitHub: https://github.com/Conway-Research/automaton/issues
- Discord: https://discord.gg/conway
- Conway Cloud: https://app.conway.tech/
