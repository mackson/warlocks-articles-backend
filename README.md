## Desafio Técnico: Plataforma de Artigos com Foco em Escalabilidade e Qualidade de Código

![capa](docs/images/warlockstech_cover.jpeg)

Este repositório foi criado para demonstração do backend / API REST para o desafio técnico da Warlocks. Nele temos uma aplicação para gerenciamento de artigos utilizando tecnologias e metodologias modernas para o desenvolvimento web. Optei por usar no backend um system design baseado em Domain Driven Design e Clean Architecture para promover o desacoplamento dos dominios de negócios das demais camadas da aplicação como; infraestrutura, persistência e apresentação, esse modelo é amplamente utilizado em projetos de grande porte, e viabiliza escala em aplicações monoliticas ou microsserviços.

### Tecnologias usadas no backend

- [ ]  Nest com typescript
- [ ]  Redis (caching)
- [ ]  Mongodb / Mongoose
- [ ]  Swagger para documentação
- [ ]  Jest (Test Driiven Development) - Testes de integração / E2E
- [ ]  Docker e docker-compose
- [ ]  JWT (Json Web Token) para autenticação
- [ ]  Nginx como proxy reverso


### Metodologias

- [ ]  Test Driven Development - Testes de integração / E2E
- [ ]  Domain Driven Design - Dominios de negócios desacoplados das demais camadas da aplicação
- [ ]  Linguagem ubiqua - Time de produto se entende com o time de desenvolvimento
- [ ]  Monorepo com Domain Driven Design, dominios de negócios desacoplados das demais camadas da aplicação
- [ ]  SOLID, classes com responsabilidades bem definidas, interfaces para facilitar a troca de implementações, etc.
- [ ]  Gitflow customizado (development / prod), com branches para features e hotfixes. Nenhuma branch pode mergeada diretamente na main, deve passar por rigorosas revisões de código antes de ser aprovada.
- [ ]  XSS Sanitizer para prevenir ataques de injeção de código malicioso
- [ ]  Criptografia de senhas com bcrypt

![capa](docs/images/clean.png)


## Documentos MongoDB

### Documento de Accounts
![capa](docs/images/doc1.png)

### Documento de Articles e Comments
![capa](docs/images/doc2.png)


## Como rodar localmente?

Você poderá testar a API neste endereço logo a baixo mas se quiser testar localmente, basta seguir os passos:

[https://warlocks.api.codestation.com.br](warlocks.api.codestation.com.br)

### O primeiro passo é clonar o projeto:

```bash
git clone git@github.com:mackson/warlocks-articles-frontend.git

```

### Segundo passo, acesse o repositório e configure seu .env baseado no .env.example

```bash

NODE_ENV=production
PORT=5001
RABBITMQ_URI=amqp://rabbitmq
REDIS_HOST=redis://localhost:6379
JWT_SECRET=ac9bAtLEnpxQ5ZdvWG4B82PTMgskSeX7VYuqzRHhwjf6Jr3FKN
DATABASE_URL="mongodb://user_db:warlocks@mongo:27017/warlocks?authSource=admin"

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin1234

```
## Atenção
Toda a aplicação está conteinerizada por tanto para testar localmente basta usar os seguintes comandos:
Obs: será necessário ter o docker e docker-compose instalados na sua máquina.


```bash
## Na primeira vez
docker-compose up --build

## Após o primeiro build
docker-compose up -d

```

### Como experimentar a API Localmente

Para testar os endpoints da API, você pode usar um extensão do Vscode chamada REST Client.
Obs: No entanto fique a vontade para usar qualquer outra ferramenta de sua preferência para testar os endpoints.
![capa](docs/images/http.png)

Dentro da raiz do nosso projeto tem uma subpasta chamada requests, dentro dela você pode usar os arquivos .http para testar os endpoints.

```bash
@token = SEU TOKEN

### Login
POST http://localhost:5001/account/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin1234"
}
```
<p>
  <strong>
    Obs: Tomei a liberdade de criar um seeder para um usuário admin que pode facilitar os seus testes, o usuário criado é:
  </strong>
</p>

```bash

POST http://localhost:5001/account/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin1234"
}
```


### Documentação e Swagger

Você pode verificar a documentação Swagger da API em:

[http://localhost:5001/api](http://localhost:5001/api)

## Como rodar os Testes E2E?

Implementei três testes E2E para os controladores account e article e comments, para rodar os testes basta executar o seguinte comando na raiz do projeto:

![capa](docs/images/tests.png)


```bash
npm run test:e2e

# ou

yarn test:e2e

```

## Infraestrutura, Arquitetura / System Design

Por possuir um ótimo conhecimento com os serviços da AWS optaria por hospedar a aplicação em um cluster EKS, com uma VPC configurada a um Load Balancer (ALB), que iria me garantir o gerenciamento de carga para as Tasks do meu cluster e a consequente escala da aplicação, implementaria também um Auto Scaling no service do cluster, usaria o S3 para armazenamento de arquivos, implementaria no Atlas um cluster mongoodb, com replicas, indexação dos documentos mais criticos. Implementaria um cluster Elasticache com Redis para viabilizar o caching.

![capa](docs/images/systemdesign.png)


### TODO (O que eu faria com mais tempo)

- [ ]  TODO: Observabilidade (APM) e monitoramento utilizaria o Prometheus com Grafana
- [ ]  TODO: Terraform para subir as infraestruturas de development e production
- [ ]  TODO: CI/CD com AWS CodePipeline e AWS CodeBuild + buildspec
- [ ]  TODO: Step de testes unitários e de integração no AWS CodeBuild e AWS CodePipeline
- [ ]  TODO: RabbitMQ - Queues para notificação de artigos, envio de email, e criação de comentarios.
- [ ]  TODO: Husky para linting e commit hooks
- [ ]  TODO: Cluster EKS com Load Balancer e Auto Scaling
- [ ]  TODO: AWS S3 para armazenamento de arquivos
- [ ]  TODO: AWS SNS/SQ para notificação de artigos, e envio de email.
- [ ]  TODO: Cluster AWS Elasticache com Redis para viabilizar o caching
- [ ]  TODO: Atlas Mongodb para armazenamento de dados
- [ ]  TODO: Code review automatizado com SonarQube
- [ ]  TODO: Ambiente de dev e prod
- [ ]  TODO: Passport Strategy para autenticação
- [ ]  TODO: Usar CQRS para segregar as responsabilidades de leitura e escrita de dados
- [ ]  TODO: Indexação dos documentos mais criticos no Atlas Mongodb
- [ ]  TODO: Teste de carga com K6, para analisar APM, performance, RPS e Thresholds.
- [ ]  TODO: Integração com frontend
- [ ]  TODO: SSL com certificado da AWS

## Infraestruturas alternativas

- Poderia usar também o AWS API Gateway como Load Balancer, com Lambdas Functions. Ideal para microserviços.
- Outra alternativa mais barata seria usar o Nginx como Load Balancer junto com um cluster kubernetes.
