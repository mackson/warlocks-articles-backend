#!/bin/sh

# Define a default value for NODE_ENV if not set
NODE_ENV=${NODE_ENV:-production}

systemctl restart nginx

echo "Iniciando container com NODE_ENV=$NODE_ENV"

# Se o ambiente for desenvolvimento, usa o hot reload do NestJS
# Carrega as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

if [ "$NODE_ENV" = "development" ]; then
  echo "Rodando em modo desenvolvimento com hot reload..."
  npm run start:dev
else
  echo "Rodando em modo produção com PM2..."
  pm2 start dist/main.js --name warlocks-articles-backend
  pm2 logs warlocks-articles-backend
fi
