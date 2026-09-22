@echo off
chcp 65001 >nul
title Automaton - Gerenciador PM2
cd /d D:\agentes\automaton

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   ⚙️  GERENCIADOR DE AGENTES (PM2)                          ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Verificar se PM2 está instalado
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Instalando PM2...
    call npm install -g pm2
    echo.
)

:menu
echo ═══════════════════════════════════════════════════════════════
echo O que voce deseja fazer?
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1) 📋 Listar agentes
echo 2) 🚀 Iniciar agente (foreground)
echo 3) 🚀 Iniciar agente (background com PM2)
echo 4) 🔄 Reiniciar agente
echo 5) ⏸️  Parar agente
echo 6) 🗑️  Deletar agente
echo 7) 📝 Ver logs
echo 8) 💰 Fundar agente
echo 9) ❌ Sair
echo.
set /p choice="Escolha uma opcao: "

if "%choice%"=="1" goto list
if "%choice%"=="2" goto start_foreground
if "%choice%"=="3" goto start_background
if "%choice%"=="4" goto restart
if "%choice%"=="5" goto stop
if "%choice%"=="6" goto delete
if "%choice%"=="7" goto logs
if "%choice%"=="8" goto fund
if "%choice%"=="9" goto end
goto menu

:list
echo.
echo ═══════════════════════════════════════════════════════════════
echo AGENTES RODANDO
echo ═══════════════════════════════════════════════════════════════
echo.
pm2 list
echo.
pause
goto menu

:start_foreground
echo.
set /p agent_name="Nome do agente (ex: atlas): "
echo.
echo [INFO] Iniciando agente %agent_name% em foreground...
echo.
echo Para parar: Ctrl + C
echo.
node dist\index.js --run
goto menu

:start_background
echo.
set /p agent_name="Nome do agente (ex: atlas): "
echo.
echo [INFO] Iniciando agente %agent_name% em background...
pm2 start dist\index.js --name agent-%agent_name% -- --run
echo.
echo [OK] Agente iniciado!
echo.
echo Use 'pm2 logs agent-%agent_name%' para ver logs
echo.
pause
goto menu

:restart
echo.
pm2 list
echo.
set /p agent_name="Nome do agente para reiniciar: "
pm2 restart agent-%agent_name%
echo.
echo [OK] Agente reiniciado!
echo.
pause
goto menu

:stop
echo.
pm2 list
echo.
set /p agent_name="Nome do agente para parar: "
pm2 stop agent-%agent_name%
echo.
echo [OK] Agente parado!
echo.
pause
goto menu

:delete
echo.
pm2 list
echo.
set /p agent_name="Nome do agente para deletar: "
pm2 delete agent-%agent_name%
echo.
echo [OK] Agente deletado!
echo.
pause
goto menu

:logs
echo.
pm2 list
echo.
set /p agent_name="Nome do agente: "
echo.
echo [INFO] Logs do agente %agent_name% (Ctrl+C para sair)
echo.
pm2 logs agent-%agent_name%
goto menu

:fund
echo.
set /p amount="Quanto fundar (ex: 10.00): "
node packages\cli\dist\index.js fund %amount%
echo.
pause
goto menu

:end
echo.
echo Saindo...
echo.
exit /b 0
