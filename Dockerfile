# Etapa de build
FROM node:23 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps --production

COPY . .

RUN npm run build

# Etapa de runtime
FROM node:23 AS runner

WORKDIR /app

COPY --from=builder /app ./

# Instala PM2 globalmente
RUN npm install -g pm2

# Instala pacotes essenciais
RUN apt-get update && apt-get install -y \
    procps nano net-tools iputils-ping \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 5001

# Copia o script de inicialização
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
