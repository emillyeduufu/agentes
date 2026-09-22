# 🚀 AUTOMATON - D:\agentes

## ⚡ COMEÇAR AGORA (3 CLIQUES)

### 1️⃣ Instalar tudo
```
Dê duplo clique em: instalar.bat
```

### 2️⃣ Rodar Dashboard (Simulação)
```
Dê duplo clique em: rodar-dashboard.bat
```
Acesse: **http://localhost:3000**

### 3️⃣ Rodar Agente Real
```
Dê duplo clique em: rodar-agente.bat
```

---

## 📋 O QUE FAZER PRIMEIRO

### Opção A: Testar no Dashboard (GRÁTIS)
```
1. Duplo clique em: rodar-dashboard.bat
2. Navegador abre em: http://localhost:3000
3. Clique em "🚀 Testar Agora"
4. Preencha o setup wizard
5. Clique em "Iniciar Agente"
```

### Opção B: Agente Real (CUSTA $10-50 USDC)
```
1. Crie conta em: https://app.conway.tech/
2. Compre $10-50 USDC na rede Base
3. Duplo clique em: rodar-agente.bat
4. Siga o setup wizard
5. Envie USDC para a wallet gerada
6. Agente inicia automaticamente
```

---

## 🎮 SCRIPTS DISPONÍVEIS

| Script | O que faz |
|--------|-----------|
| **instalar.bat** | Instala tudo automaticamente |
| **rodar-dashboard.bat** | Roda o dashboard (simulação) |
| **rodar-agente.bat** | Roda o agente real |
| **status.bat** | Ver status do agente |
| **gerenciador.bat** | Gerenciar múltiplos agentes |

---

## 🔄 COMO RECARREGAR AGENTES

### Parar agente
```
No terminal: Ctrl + C
Ou com PM2: gerenciador.bat → opção 5
```

### Reiniciar agente
```
Duplo clique em: rodar-agente.bat
Ou com PM2: gerenciador.bat → opção 4
```

### Ver todos os agentes
```
Duplo clique em: gerenciador.bat → opção 1
```

### Criar múltiplos agentes
```
Duplo clique em: gerenciador.bat → opção 3
Digite nome diferente para cada agente
```

---

## 📊 VER STATUS

### Dashboard (Simulação)
```
Abra: http://localhost:3000
Veja tudo na interface visual
```

### Agente Real
```
Duplo clique em: status.bat
Ou no CMD:
  cd D:\agentes\automaton
  node packages\cli\dist\index.js status
  node packages\cli\dist\index.js credits
```

---

## 💰 ADICIONAR FUNDOS

### Dashboard (Simulação)
```
No terminal do dashboard:
  fund 10
  fund 25
  fund 50
```

### Agente Real
```
No CMD:
  cd D:\agentes\automaton
  node packages\cli\dist\index.js fund 10.00
```

---

## 🆘 PROBLEMAS?

### "Node.js não encontrado"
```
1. Baixe: https://nodejs.org/
2. Instale versão LTS (20+)
3. Reinicie o computador
```

### "Git não encontrado"
```
1. Baixe: https://git-scm.com/download/win
2. Instale
3. Reinicie o computador
```

### Agente não inicia
```
1. Verifique .env: notepad D:\agentes\automaton\.env
2. Verifique API key
3. Verifique saldo: status.bat
```

### Saldo zerou
```
1. Adicione fundos: gerenciador.bat → opção 8
2. Ou no CMD: node packages\cli\dist\index.js fund 20.00
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

- [GUIA_WINDOWS.md](GUIA_WINDOWS.md) - Guia completo para Windows
- [GUIA_EXECUCAO.md](GUIA_EXECUCAO.md) - Guia geral
- [SETUP_REAL.md](SETUP_REAL.md) - Setup detalhado
- [QUICKSTART.md](QUICKSTART.md) - 5 minutos
- [CHECKLIST.md](CHECKLIST.md) - Checklist completo

---

## 🎯 RESUMO RÁPIDO

```
┌─────────────────────────────────────────┐
│  INSTALAR (UMA VEZ)                     │
│  → instalar.bat                         │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  RODAR DASHBOARD (GRÁTIS)               │
│  → rodar-dashboard.bat                  │
│  → http://localhost:3000                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  RODAR AGENTE REAL ($10-50 USDC)        │
│  → rodar-agente.bat                     │
│  → Seguir setup wizard                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  GERENCIAR                              │
│  → gerenciador.bat                      │
│  → status.bat                           │
└─────────────────────────────────────────┘
```

---

## 📞 SUPORTE

- **GitHub**: https://github.com/Conway-Research/automaton/issues
- **Discord**: https://discord.gg/conway
- **Conway Cloud**: https://app.conway.tech/

---

**Pronto para começar!** 🚀

Duplo clique em **instalar.bat** e siga as instruções!
