FROM node:20-alpine

# Instala dependências do sistema
RUN apk add --no-cache git sqlite python3 make g++

# Cria diretório de trabalho
WORKDIR /app

# Copia package files
COPY package.json pnpm-lock.yaml ./

# Instala pnpm
RUN npm install -g pnpm

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia código fonte
COPY . .

# Build do projeto
RUN pnpm build

# Cria diretório para dados persistentes
RUN mkdir -p /root/.automaton

# Expõe portas (o agente pode expor portas dinamicamente)
EXPOSE 3000 8080 8000

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV LOG_LEVEL=info

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node packages/cli/dist/index.js status || exit 1

# Comando padrão
CMD ["node", "dist/index.js", "--run"]
