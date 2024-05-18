## Deploy ambiente AWS Localmente

### Buildar a imagem localmente

Na pasta raiz execute:

```
docker build -t controladorproducao-app .
```

### Rodar a imagem para testar

```
docker run -p 3333:3333 controladorproducao-app
```

### Criar o AMazon ECR Registry

```
aws ecr-public create-repository --repository-name controladorproducao-app-repo --region us-east-1
```

### Autenticar sua máquina local com o client da Amazon ECR

```
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```

### Criar a tag da imagem

Substituir <RPO_URI> prolo reposi´torio do ECR, ex: public.ecr.aws/d5d5p5r5/controladorproducao-app-repo

```
docker tag controladorproducao-app:latest <REPO_URI>:latest
```

## Subir a imagen no repositório ECR

```
docker push <REPO_URI>
```

### Provisionar o EKS Cluster

[Instalar o eksctl](https://docs.aws.amazon.com/pt_br/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-eksctl.html)

```
eksctl version

eksctl create cluster --name controladorproducao-app-cluster --region us-east-1
```

### Configurar o kubectl

```
aws eks update-kubeconfig --name controladorproducao-app-cluster --region us-east-a

```

### Deploy no EKS

```
cd kubernetes-aws/
kubectl apply -f Deployment-app.yml
```

Verificar se funcionou:

```
kubectl get deployments
kubectl get services
```

### Testar

Pegue o valor em External-IP, adicione a porta no final e teste no navegador. Pronto!
