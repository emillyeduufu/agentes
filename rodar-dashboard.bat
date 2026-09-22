@echo off
chcp 65001 >nul
title Automaton - Dashboard
cd /d D:\agentes\automaton-dashboard

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   🎮 AUTOMATON DASHBOARD                                     ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo [INFO] Iniciando Dashboard...
echo.
echo ═══════════════════════════════════════════════════════════════
echo 📍 Acesse no navegador:
echo.
echo    http://localhost:3000
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo Para parar: Ctrl + C
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

call npm run dev
