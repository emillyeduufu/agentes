# 🎯 GUIA SUPER SIMPLES - Para quem NÃO programa

## 🤔 O que é isso?

Você tem **2 coisas** aqui:

1. 🎮 **Dashboard** (simulação) - É como um "jogo" para ver como o agente funciona. **GRÁTIS**.
2. 🤖 **Agente Real** - É o agente de verdade que ganha dinheiro. **CUSTA $10-50**.

**Comece pelo Dashboard (GRÁTIS) para entender como funciona!**

---

## 📦 PASSO 1: Baixar os Arquivos (SEM PROGRAMAÇÃO!)

### Opção A: Baixar como ZIP (MAIS FÁCIL!)

1. Vá até a página do projeto no GitHub (onde os arquivos estão)
2. Procure o botão verde **"Code"** (ou "Código")
3. Clique em **"Download ZIP"**
4. Vai baixar um arquivo `.zip` no seu computador

### Opção B: Se você já tem os arquivos

Se alguém te mandou os arquivos, ótimo! Pule para o Passo 2.

---

## 📂 PASSO 2: Colocar os Arquivos em D:\agentes

### Passo 2.1: Criar a pasta

1. Abra o **"Meu Computador"** (ou "Este Computador")
2. Clique no **Disco D:**
3. Clique com botão direito → **"Novo"** → **"Pasta"**
4. Nome da pasta: **agentes**
5. Aperte **Enter**

✅ Pronto! Agora você tem: `D:\agentes`

### Passo 2.2: Colocar os arquivos lá

1. Abra a pasta `D:\agentes`
2. Se baixou o ZIP:
   - Vá em **"Downloads"**
   - Ache o arquivo `.zip` que baixou
   - Clique com botão direito → **"Extrair aqui"** (ou "Extract here")
   - Vai criar uma pasta com os arquivos
3. Se já tem os arquivos:
   - Copie tudo (Ctrl + A, depois Ctrl + C)
   - Cole dentro de `D:\agentes` (Ctrl + V)

✅ Pronto! Agora você tem todos os arquivos em `D:\agentes`

---

## 💻 PASSO 3: Instalar o Node.js (UMA VEZ SÓ!)

### O que é Node.js?
É um programa que faz o dashboard funcionar. É como instalar o Word para abrir documentos .doc.

### Como instalar:

1. Abra o navegador (Chrome, Edge, Firefox)
2. Vá em: **https://nodejs.org/**
3. Vai aparecer **2 botões verdes**:
   - Escolha o botão da **ESQUERDA** (LTS - mais estável)
4. Vai baixar um arquivo `.msi`
5. **Duplo clique** no arquivo baixado
6. Vai abrir uma janela de instalação:
   - Clique em **"Next"** (Próximo)
   - Clique em **"Next"** de novo
   - Clique em **"Next"** de novo
   - Clique em **"Install"** (Instalar)
   - Espere terminar
   - Clique em **"Finish"** (Concluir)

✅ Pronto! Node.js instalado!

### Como saber se funcionou?

1. Aperte a tecla **Windows** no teclado
2. Digite: **cmd**
3. Vai aparecer **"Prompt de Comando"** - clique nele
4. Na janela preta que abrir, digite:
   ```
   node --version
   ```
5. Aperte **Enter**
6. Deve aparecer algo como: `v20.11.0`

✅ Se apareceu um número, funcionou! Pode fechar a janela preta.

❌ Se deu erro, reinicie o computador e tente de novo.

---

## 🎮 PASSO 4: Rodar o Dashboard (SIMULAÇÃO GRÁTIS)

### Passo 4.1: Abrir a pasta

1. Abra o **"Meu Computador"**
2. Vá em **Disco D:** → pasta **agentes**
3. Você vai ver vários arquivos e pastas

### Passo 4.2: Instalar as dependências (UMA VEZ SÓ!)

1. Na pasta `D:\agentes`, procure um arquivo chamado:
   **`instalar.bat`**
2. **Duplo clique** nele
3. Vai abrir uma janela preta (tipo o CMD)
4. Escolha a opção **1** (Dashboard)
5. Aperte **Enter**
6. **ESPERE** (pode demorar 2-5 minutos na primeira vez)
7. Vai aparecer várias mensagens
8. Quando terminar, aperte qualquer tecla

✅ Pronto! Dashboard instalado!

### Passo 4.3: Rodar o Dashboard

1. Na pasta `D:\agentes`, procure o arquivo:
   **`rodar-dashboard.bat`**
2. **Duplo clique** nele
3. Vai abrir uma janela preta
4. Vai aparecer uma mensagem tipo:
   ```
   Local: http://localhost:3000
   ```
5. **NÃO FECHE** essa janela!
6. Abra o navegador (Chrome, Edge, Firefox)
7. Na barra de endereço, digite:
   ```
   http://localhost:3000
   ```
8. Aperte **Enter**

✅ **PRONTO!** Você vai ver o dashboard do Automaton! 🎉

---

## 🎯 PASSO 5: Usar o Dashboard

### Criar seu primeiro agente:

1. Na página que abriu, clique no botão **"🚀 Testar Agora"**
2. Vai aparecer um formulário:
   - **Nome**: Digite um nome (ex: "Atlas")
   - **Wallet**: Clique em "Gerar" (vai criar uma carteira)
   - **Genesis Prompt**: Pode deixar o que está lá
   - **Nível**: Escolha "Avançado"
3. Clique em **"Iniciar Agente"**

✅ Seu agente está rodando! Você vai ver:
- Terminal com comandos
- Saldo do agente
- Status
- Relatórios

### Comandos que você pode usar:

No terminal do dashboard, digite:
- `status` - Ver status do agente
- `fund 10` - Adicionar $10 ao saldo (é simulado, não custa nada!)
- `tools` - Ver ferramentas disponíveis
- `report` - Ver relatório financeiro
- `help` - Ver todos os comandos

---

## 🤖 PASSO 6: Agente Real (QUANDO ESTIVER PRONTO)

**⚠️ ATENÇÃO**: Isso custa dinheiro real! Só faça quando entender bem o dashboard.

### O que você precisa:

1. **Conta na Conway Cloud**
   - Vá em: https://app.conway.tech/
   - Crie uma conta
   - Obtenha sua "API Key" (é como uma senha)

2. **Dinheiro (USDC)**
   - Compre $10-50 USDC
   - Use Coinbase, Binance, ou Mercado Bitcoin
   - Transfira para a rede **Base** (NÃO use Ethereum normal!)

### Como rodar:

1. Na pasta `D:\agentes`, procure: **`rodar-agente.bat`**
2. **Duplo clique** nele
3. Vai abrir uma janela
4. Siga as instruções na tela
5. Quando pedir, cole sua API Key
6. Quando pedir, digite um nome para o agente
7. Quando pedir, cole seu endereço de wallet

✅ Pronto! Agente real rodando!

---

## 🆘 PROBLEMAS?

### Problema: "A janela preta fecha sozinha"
**Solução**: Clique com botão direito no arquivo `.bat` → "Executar como administrador"

### Problema: "Aparece erro quando digito node --version"
**Solução**: 
1. Reinicie o computador
2. Tente de novo
3. Se não funcionar, reinstale o Node.js

### Problema: "http://localhost:3000 não abre"
**Solução**:
1. Verifique se a janela preta ainda está aberta
2. Se fechou, dê duplo clique em `rodar-dashboard.bat` de novo
3. Espere aparecer a mensagem "http://localhost:3000"
4. Tente abrir de novo no navegador

### Problema: "Não sei onde estão os arquivos"
**Solução**:
1. Abra o "Meu Computador"
2. Vá em **Disco D:**
3. Procure a pasta **agentes**
4. Os arquivos estão lá dentro

---

## 📞 PRECISA DE AJUDA?

Se travou em algum passo:

1. **Tire um print da tela** (botão Print Screen)
2. **Me mande a mensagem** dizendo:
   - Em qual passo você está
   - O que apareceu na tela
   - Qual erro apareceu

Eu te ajudo! 🚀

---

## 🎉 RESUMO SUPER SIMPLES

```
1. Baixar arquivos (ZIP)
   ↓
2. Colocar em D:\agentes
   ↓
3. Instalar Node.js (nodejs.org)
   ↓
4. Duplo clique em: instalar.bat
   ↓
5. Duplo clique em: rodar-dashboard.bat
   ↓
6. Abrir navegador: http://localhost:3000
   ↓
7. PRONTO! 🎉
```

---

## 📚 ARQUIVOS IMPORTANTES

| Arquivo | O que faz |
|---------|-----------|
| **instalar.bat** | Instala tudo (duplo clique) |
| **rodar-dashboard.bat** | Roda o dashboard (duplo clique) |
| **rodar-agente.bat** | Roda o agente real (duplo clique) |
| **status.bat** | Ver status (duplo clique) |
| **gerenciador.bat** | Gerenciar agentes (duplo clique) |

---

## 💡 DICAS FINAIS

1. **Comece pelo Dashboard** (GRÁTIS) para entender
2. **Não tenha pressa** - leia com calma
3. **Se der erro**, tire print e me mande
4. **NÃO FECHE** a janela preta enquanto usa o dashboard
5. **Faça backup** dos arquivos importantes

---

**Você consegue! Vai dar certo!** 🚀

Qualquer dúvida, me avise em qual passo você está e o que apareceu na tela!
