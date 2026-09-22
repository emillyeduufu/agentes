@echo off
chcp 65001 >nul
title Automaton - Status
cd /d D:\agentes\automaton

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   📊 STATUS DO AGENTE                                        ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo ═══════════════════════════════════════════════════════════════
echo 📋 STATUS GERAL
echo ═══════════════════════════════════════════════════════════════
echo.
node packages\cli\dist\index.js status
echo.

echo ═══════════════════════════════════════════════════════════════
echo 💰 SALDO
echo ═══════════════════════════════════════════════════════════════
echo.
node packages\cli\dist\index.js credits
echo.

echo ═══════════════════════════════════════════════════════════════
echo 📝 ÚLTIMOS LOGS (10 linhas)
echo ═══════════════════════════════════════════════════════════════
echo.
node packages\cli\dist\index.js logs --tail 10
echo.

echo ═══════════════════════════════════════════════════════════════
echo 🔧 FERRAMENTAS USADAS
echo ═══════════════════════════════════════════════════════════════
echo.
node packages\cli\dist\index.js tools
echo.

pause
