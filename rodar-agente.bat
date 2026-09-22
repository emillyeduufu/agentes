@echo off
chcp 65001 >nul
title Automaton - Agente Real
cd /d D:\agentes\automaton

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   🤖 AUTOMATON AGENTE REAL                                   ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Verificar se .env existe
if not exist ".env" (
    echo [AVISO] Arquivo .env nao encontrado!
    echo.
    echo Configurando .env...
    copy .env.example .env
    echo.
    echo Editando .env...
    echo Configure as variaveis e salve o arquivo.
    echo.
    notepad .env
    echo.
    pause
)

echo [INFO] Iniciando Agente Real...
echo.
echo ═══════════════════════════════════════════════════════════════
echo 📍 Comandos uteis (em outra janela):
echo.
echo    Status:  node packages\cli\dist\index.js status
echo    Saldo:   node packages\cli\dist\index.js credits
echo    Logs:    node packages\cli\dist\index.js logs --tail 50
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo Para parar: Ctrl + C
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

node dist\index.js --run
