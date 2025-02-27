## Desafio Técnico: Plataforma de Artigos com Foco em Escalabilidade e Qualidade de Códigond

Este repositório foi criado para demonstração do backend / API REST para o desafio técnico da Warlocks. Nele temos uma aplicação para gerenciamento de artigos utilizando tecnologias e metodologias modernas para o desenvolvimento web. Optei por usar no backend um system design baseado em Domain Driven Design e Clean Architecture para promover o desacoplamento dos dominios de negócios das demais camadas da aplicação como, infraestrutura, persistência e apresentação, esse modelo é amplamente utilizado em projetos de grande porte, e viabiliza escala em aplicações monoliticas ou microsserviços.

### Tecnologias

- [ ]  Nest 11
- [ ]  Redis (caching)
- [ ]  Mongodb / Mongoose
- [ ]  Swagger para documentação
- [ ]  Docker e Docker-compose
- [ ]  TODO: Monitoramento com Prometheus e Grafana
- [ ]  TODO: Terraform para subir os ambientes de development e production


### Metodologias

- [ ]  Test Driven Development
- [ ]  Domain Driven Design
- [ ]  Gitflow customizado (development / prod)


## Como rodar localmente?

Toda a aplicação está conteinerizada por tanto para testar localmente basta

```bash
docker-compose up -d
# or
yarn start:dev

```

## Testes

```bash
npm run test
# or
yarn test

```

## Infraestrutura

(ex.: onde hospedaria, como escalaria, que serviços utilizaria para banco de dados, logs, monitoramento, etc.).

Por possuir um ótimo conhecimento com os serviços da AWS optaria por hospedar a aplicação em um cluster EKS, com Load Balancer (ALB), VPC, S3, clsuter mongoodb, com replicas



## Arquitetura / System Design

