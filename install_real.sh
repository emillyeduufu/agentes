#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# Automaton Real - Script de Instalação e Setup
# ═══════════════════════════════════════════════════════════════════

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de log
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Banner
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   ⚙️  AUTOMATON REAL - Instalação e Setup                    ║"
echo "║   O primeiro agente de IA que ganha sua própria existência   ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar pré-requisitos
check_prerequisites() {
    log_info "Verificando pré-requisitos..."
    
    # Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js não encontrado. Instale Node.js 20+"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        log_error "Node.js versão $NODE_VERSION encontrada. Requerido: 20+"
        exit 1
    fi
    log_success "Node.js $(node --version)"
    
    # Git
    if ! command -v git &> /dev/null; then
        log_error "Git não encontrado. Instale git."
        exit 1
    fi
    log_success "Git $(git --version)"
    
    # pnpm
    if ! command -v pnpm &> /dev/null; then
        log_warn "pnpm não encontrado. Instalando..."
        npm install -g pnpm
    fi
    log_success "pnpm $(pnpm --version)"
}

# Clonar repositório oficial
clone_repository() {
    log_info "Clonando repositório oficial..."
    
    if [ -d "automaton-real" ]; then
        log_warn "Diretório automaton-real já existe. Atualizando..."
        cd automaton-real
        git pull
    else
        git clone https://github.com/Conway-Research/automaton.git automaton-real
        cd automaton-real
    fi
    
    log_success "Repositório clonado com sucesso"
}

# Instalar dependências
install_dependencies() {
    log_info "Instalando dependências..."
    pnpm install
    log_success "Dependências instaladas"
}

# Build do projeto
build_project() {
    log_info "Buildando projeto..."
    pnpm build
    log_success "Build concluído"
}

# Configurar variáveis de ambiente
setup_env() {
    log_info "Configurando variáveis de ambiente..."
    
    if [ ! -f .env ]; then
        cp ../.env.example .env
        log_warn ".env criado a partir do template. Edite com suas configurações!"
        echo ""
        echo "Arquivo .env criado. Configure as seguintes variáveis:"
        echo "  - CONWAY_API_KEY: Sua API key da Conway Cloud"
        echo "  - CHAIN_TYPE: evm ou solana"
        echo "  - DEFAULT_MODEL: gpt-5.2, claude-opus-4.6, gemini-3, ou kimi-k2.5"
        echo ""
        read -p "Pressione ENTER para continuar após editar o .env..."
    else
        log_success ".env já existe"
    fi
}

# Executar setup wizard
run_setup_wizard() {
    log_info "Executando setup wizard..."
    echo ""
    echo "O setup wizard irá:"
    echo "  1. Gerar uma wallet Ethereum/Solana"
    echo "  2. Provisionar API key via Sign-In With Ethereum"
    echo "  3. Pedir nome do agente"
    echo "  4. Pedir genesis prompt"
    echo "  5. Pedir endereço do criador"
    echo ""
    read -p "Pressione ENTER para iniciar o setup wizard..."
    
    node dist/index.js --run
}

# Verificar saldo
check_balance() {
    log_info "Verificando saldo..."
    node packages/cli/dist/index.js credits
}

# Menu principal
main_menu() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "O que você deseja fazer?"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    echo "1) 🚀 Instalação Completa (recomendado para primeira vez)"
    echo "2) 📥 Apenas clonar e instalar"
    echo "3) ⚙️  Executar setup wizard"
    echo "4) 💰 Verificar saldo"
    echo "5) ▶️  Iniciar agente"
    echo "6) 📊 Ver status"
    echo "7) 📖 Ver documentação"
    echo "0) ❌ Sair"
    echo ""
    read -p "Escolha uma opção: " choice
    
    case $choice in
        1)
            check_prerequisites
            clone_repository
            install_dependencies
            build_project
            setup_env
            echo ""
            log_success "═══════════════════════════════════════════════════════════════"
            log_success "Instalação concluída!"
            log_success "═══════════════════════════════════════════════════════════════"
            echo ""
            echo "Próximos passos:"
            echo "  1. Edite o arquivo .env com suas configurações"
            echo "  2. Obtenha créditos na Conway Cloud (https://app.conway.tech/)"
            echo "  3. Envie USDC para a wallet do agente"
            echo "  4. Execute: cd automaton-real && node dist/index.js --run"
            echo ""
            echo "Documentação completa: cat ../SETUP_REAL.md"
            ;;
        2)
            check_prerequisites
            clone_repository
            install_dependencies
            build_project
            log_success "Projeto instalado em automaton-real/"
            ;;
        3)
            if [ ! -d "automaton-real" ]; then
                log_error "Projeto não instalado. Execute a opção 1 ou 2 primeiro."
                exit 1
            fi
            cd automaton-real
            run_setup_wizard
            ;;
        4)
            if [ ! -d "automaton-real" ]; then
                log_error "Projeto não instalado. Execute a opção 1 ou 2 primeiro."
                exit 1
            fi
            cd automaton-real
            check_balance
            ;;
        5)
            if [ ! -d "automaton-real" ]; then
                log_error "Projeto não instalado. Execute a opção 1 ou 2 primeiro."
                exit 1
            fi
            cd automaton-real
            log_info "Iniciando agente..."
            node dist/index.js --run
            ;;
        6)
            if [ ! -d "automaton-real" ]; then
                log_error "Projeto não instalado. Execute a opção 1 ou 2 primeiro."
                exit 1
            fi
            cd automaton-real
            node packages/cli/dist/index.js status
            ;;
        7)
            echo ""
            echo "═══════════════════════════════════════════════════════════════"
            echo "Documentação"
            echo "═══════════════════════════════════════════════════════════════"
            echo ""
            echo "📖 Guia Completo: cat SETUP_REAL.md"
            echo "📖 Documentação Oficial: https://github.com/Conway-Research/automaton"
            echo "📖 Conway Cloud: https://app.conway.tech/"
            echo "📖 Skills: https://github.com/Conway-Research/skills"
            echo ""
            ;;
        0)
            log_info "Saindo..."
            exit 0
            ;;
        *)
            log_error "Opção inválida"
            exit 1
            ;;
    esac
}

# Executar menu principal
main_menu
