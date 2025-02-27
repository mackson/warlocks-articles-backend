FROM nginx:latest

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pm2


RUN apt-get install -y procps \
    && apt-get install -y nano \
    && apt-get install -y net-tools \
    && apt-get install -y iputils-ping
 

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x start.sh

EXPOSE 5001 80

COPY ./default /etc/nginx/sites-available/default

CMD ["sh", "/var/www/html/start.sh"]
