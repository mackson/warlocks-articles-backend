# Usa a imagem oficial do Nginx como base
FROM nginx:latest

# Instala Node.js e PM2
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pm2

# Define o diretório de trabalho para o código do app
WORKDIR /var/www/html

# Copia os arquivos de dependência primeiro para otimizar o cache
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Torna o start.sh executável
RUN chmod +x start.sh

# Expor as portas do NestJS e Nginx
EXPOSE 5001 80

# Copia a configuração do Nginx
COPY ./default /etc/nginx/sites-available/default

# Usa o start.sh para iniciar a aplicação
CMD ["sh", "/var/www/html/start.sh"]
