#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# Automaton Status Checker
# ═══════════════════════════════════════════════════════════════════

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   📊 AUTOMATON STATUS CHECKER                                ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar se está no diretório correto
if [ ! -d "automaton-real" ]; then
    echo -e "${RED}[ERROR]${NC} Diretório automaton-real não encontrado!"
    echo "Execute o script install_real.sh primeiro."
    exit 1
fi

cd automaton-real

# Status do agente
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📋 STATUS DO AGENTE${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ -f "dist/index.js" ]; then
    echo -e "${GREEN}✓${NC} Agente instalado"
else
    echo -e "${RED}✗${NC} Agente não instalado"
    exit 1
fi

# Verificar configuração
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Configuração .env encontrada"
else
    echo -e "${YELLOW}⚠${NC} Arquivo .env não encontrado"
fi

# Verificar wallet
if [ -f "$HOME/.automaton/wallet.json" ]; then
    echo -e "${GREEN}✓${NC} Wallet configurada"
    WALLET_ADDR=$(cat $HOME/.automaton/wallet.json | grep -o '"address":"[^"]*"' | cut -d'"' -f4)
    echo "  Endereço: ${WALLET_ADDR:0:10}...${WALLET_ADDR: -4}"
else
    echo -e "${YELLOW}⚠${NC} Wallet não configurada (será criada no primeiro run)"
fi

# Verificar API key
if [ -f "$HOME/.automaton/api-key" ]; then
    echo -e "${GREEN}✓${NC} API key configurada"
else
    echo -e "${YELLOW}⚠${NC} API key não configurada"
fi

echo ""

# Saldo
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}💰 SALDO${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if node packages/cli/dist/index.js credits 2>/dev/null; then
    echo ""
else
    echo -e "${YELLOW}⚠${NC} Não foi possível verificar o saldo"
    echo "  Possíveis causas:"
    echo "  - Agente não foi iniciado ainda"
    echo "  - API key não configurada"
    echo "  - Sem conexão com a internet"
fi

echo ""

# Logs recentes
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}📝 LOGS RECENTES (últimas 10 linhas)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ -f "$HOME/.automaton/logs/agent.log" ]; then
    tail -10 $HOME/.automaton/logs/agent.log
else
    echo -e "${YELLOW}⚠${NC} Nenhum log encontrado"
    echo "  O agente precisa ser executado pelo menos uma vez"
fi

echo ""

# Knowledge Exchange
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🧠 KNOWLEDGE EXCHANGE${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ -f "$HOME/.automaton/knowledge_exchange.db" ]; then
    DECISIONS=$(sqlite3 $HOME/.automaton/knowledge_exchange.db "SELECT COUNT(*) FROM decisions;" 2>/dev/null || echo "0")
    INSTINCTS=$(sqlite3 $HOME/.automaton/knowledge_exchange.db "SELECT COUNT(*) FROM instincts;" 2>/dev/null || echo "0")
    
    echo -e "${GREEN}✓${NC} Knowledge Exchange ativo"
    echo "  Decisões registradas: $DECISIONS"
    echo "  Instintos destilados: $INSTINCTS"
else
    echo -e "${YELLOW}⚠${NC} Knowledge Exchange não inicializado"
fi

echo ""

# Processo
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}⚙️  PROCESSO${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if pgrep -f "node dist/index.js" > /dev/null; then
    PID=$(pgrep -f "node dist/index.js")
    echo -e "${GREEN}✓${NC} Agente rodando (PID: $PID)"
    
    # Uptime
    if command -v ps &> /dev/null; then
        UPTIME=$(ps -p $PID -o etime= | xargs)
        echo "  Uptime: $UPTIME"
    fi
else
    echo -e "${YELLOW}⚠${NC} Agente não está rodando"
    echo "  Para iniciar: node dist/index.js --run"
fi

echo ""

# Recomendações
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}💡 RECOMENDAÇÕES${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠${NC} Configure o arquivo .env com suas credenciais"
fi

if [ ! -f "$HOME/.automaton/wallet.json" ]; then
    echo -e "${YELLOW}⚠${NC} Execute o setup wizard: node dist/index.js --run"
fi

if ! pgrep -f "node dist/index.js" > /dev/null; then
    echo -e "${YELLOW}⚠${NC} Inicie o agente: node dist/index.js --run"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Verificação concluída!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
