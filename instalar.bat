@echo off
chcp 65001 >nul
title Automaton - Instalador Windows

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   ⚙️  AUTOMATON - Instalador para Windows                    ║
echo ║   Pasta: D:\agentes                                          ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Instale o Node.js 20+ de: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
for /f "tokens=1 delims=v" %%a in ('node --version') do set NODE_VER=%%a
echo [OK] Node.js %NODE_VER% encontrado
echo.

REM Verificar Git
echo [2/5] Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Git nao encontrado!
    echo.
    echo Instale o Git de: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo [OK] Git encontrado
echo.

REM Criar pasta D:\agentes
echo [3/5] Criando pasta D:\agentes...
if not exist "D:\agentes" mkdir "D:\agentes"
cd /d "D:\agentes"
echo [OK] Pasta criada: D:\agentes
echo.

REM Menu
echo ═══════════════════════════════════════════════════════════════
echo O que voce deseja fazer?
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1) 🎮 Instalar DASHBOARD (Simulacao)
echo 2) 🤖 Instalar AGENTE REAL (Conway Research)
echo 3) ▶️  Rodar Dashboard
echo 4) ▶️  Rodar Agente Real
echo 5) 📊 Ver Status do Agente
echo 6) ❌ Sair
echo.
set /p choice="Escolha uma opcao: "

if "%choice%"=="1" goto install_dashboard
if "%choice%"=="2" goto install_agent
if "%choice%"=="3" goto run_dashboard
if "%choice%"=="4" goto run_agent
if "%choice%"=="5" goto check_status
if "%choice%"=="6" goto end
goto menu

:install_dashboard
echo.
echo ═══════════════════════════════════════════════════════════════
echo Instalando DASHBOARD (Simulacao)
echo ═══════════════════════════════════════════════════════════════
echo.

cd /d "D:\agentes"

if exist "automaton-dashboard" (
    echo [INFO] Pasta automaton-dashboard ja existe. Atualizando...
    cd automaton-dashboard
    git pull
) else (
    echo [INFO] Clonando repositorio...
    echo.
    echo IMPORTANTE: Substitua a URL abaixo pela URL do seu repositorio!
    echo.
    set /p repo_url="URL do repositorio (ou pressione ENTER para pular): "
    if "%repo_url%"=="" (
        echo.
        echo [AVISO] Copie os arquivos do projeto para D:\agentes\automaton-dashboard
        mkdir automaton-dashboard
        cd automaton-dashboard
    ) else (
        git clone %repo_url% automaton-dashboard
        cd automaton-dashboard
    )
)

echo.
echo [4/5] Instalando dependencias...
call npm install
echo.
echo [5/5] Buildando projeto...
call npm run build
echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ DASHBOARD INSTALADO COM SUCESSO!
echo ═══════════════════════════════════════════════════════════════
echo.
echo Para rodar:
echo   cd D:\agentes\automaton-dashboard
echo   npm run dev
echo.
echo Depois acesse: http://localhost:3000
echo.
pause
goto menu

:install_agent
echo.
echo ═══════════════════════════════════════════════════════════════
echo Instalando AGENTE REAL (Conway Research)
echo ═══════════════════════════════════════════════════════════════
echo.

cd /d "D:\agentes"

REM Verificar pnpm
echo [INFO] Verificando pnpm...
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Instalando pnpm...
    call npm install -g pnpm
)
echo [OK] pnpm encontrado
echo.

if exist "automaton" (
    echo [INFO] Pasta automaton ja existe. Atualizando...
    cd automaton
    git pull
) else (
    echo [INFO] Clonando repositorio oficial da Conway Research...
    git clone https://github.com/Conway-Research/automaton.git
    cd automaton
)

echo.
echo [4/5] Instalando dependencias com pnpm...
call pnpm install
echo.
echo [5/5] Buildando projeto...
call pnpm build
echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ AGENTE REAL INSTALADO COM SUCESSO!
echo ═══════════════════════════════════════════════════════════════
echo.
echo PROXIMOS PASSOS:
echo.
echo 1. Crie conta em: https://app.conway.tech/
echo 2. Obtenha sua API Key
echo 3. Compre USDC na rede Base (minimum $10)
echo 4. Configure o arquivo .env
echo 5. Execute: node dist\index.js --run
echo.
echo Para configurar:
echo   cd D:\agentes\automaton
echo   copy .env.example .env
echo   notepad .env
echo.
pause
goto menu

:run_dashboard
echo.
echo ═══════════════════════════════════════════════════════════════
echo Rodando DASHBOARD
echo ═══════════════════════════════════════════════════════════════
echo.

if not exist "D:\agentes\automaton-dashboard" (
    echo [ERRO] Dashboard nao instalado!
    echo Execute a opcao 1 primeiro.
    pause
    goto menu
)

cd /d "D:\agentes\automaton-dashboard"
echo [INFO] Iniciando dashboard...
echo.
echo Acesse: http://localhost:3000
echo.
echo Para parar: Ctrl + C
echo.
call npm run dev
goto menu

:run_agent
echo.
echo ═══════════════════════════════════════════════════════════════
echo Rodando AGENTE REAL
echo ═══════════════════════════════════════════════════════════════
echo.

if not exist "D:\agentes\automaton" (
    echo [ERRO] Agente nao instalado!
    echo Execute a opcao 2 primeiro.
    pause
    goto menu
)

cd /d "D:\agentes\automaton"

if not exist ".env" (
    echo [AVISO] Arquivo .env nao encontrado!
    echo.
    echo Configurando .env...
    copy .env.example .env
    echo.
    echo Editando .env...
    notepad .env
    echo.
    echo Configure as variaveis e salve o arquivo.
    pause
)

echo [INFO] Iniciando agente...
echo.
echo Para parar: Ctrl + C
echo.
node dist\index.js --run
goto menu

:check_status
echo.
echo ═══════════════════════════════════════════════════════════════
echo Verificando STATUS DO AGENTE
echo ═══════════════════════════════════════════════════════════════
echo.

if not exist "D:\agentes\automaton" (
    echo [ERRO] Agente nao instalado!
    pause
    goto menu
)

cd /d "D:\agentes\automaton"

echo [INFO] Status geral...
call node packages\cli\dist\index.js status
echo.
echo [INFO] Saldo de creditos...
call node packages\cli\dist\index.js credits
echo.
echo [INFO] Ultimos logs...
call node packages\cli\dist\index.js logs --tail 10
echo.
pause
goto menu

:end
echo.
echo Saindo...
echo.
exit /b 0
