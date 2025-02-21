#!/bin/sh

echo "Iniciando container com NODE_ENV=$NODE_ENV"

# Se o ambiente for desenvolvimento, usa o hot reload do NestJS
if [ "$NODE_ENV" = "development" ]; then
  echo "Rodando em modo desenvolvimento com hot reload..."
  npm run start:dev
else
  echo "Rodando em modo produção com PM2..."
  pm2-runtime start dist/main.js
fi
