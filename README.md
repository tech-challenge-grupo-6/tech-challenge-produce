# Tech Challenge Produce Microservice

Repositório responsável por operacionalizar o processo de produção do pedido, acompanhando a fila de pedidos (visão da cozinha), atualização de status de cada passo do pedido.

## Criando ambiente mongodb localmente

```
docker run -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

## Rodando o projeto local em modo de desenvolvimento

Obs.: não se esqueceça de adicionar as variáveis de ambiente

```
cp env.example .env
npm i && npm run start:dev
```

## Buildando e rodando o projeto

```
npm i && npm run swagger && npm run build && npm run start
```

## Testando o projeto

```
npm test
```

## Criando e destruindo ambientes docker

```
npm run up
npm run down
```

## Rodar OWASP

docker run --name zap --network host -v $(pwd):/zap/wrk/:rw -t zaproxy/zap-stable zap-api-scan.py -t http://localhost:3333/swagger -f openapi -r report.html
