NestJS AWS Module

Esse pacote contém componentes NestJS, como Módulos e Providers, que juntos permitem conectar e executar ações em serviços AWS.

Os serviços disponíveis no momento são:
- AWS S3

## Instalação
Para adicionar o pacote ao seu projeto NestJS, siga estas instruções:
1. Como este pacote está hospedado no GitHub, é necessário configurar seu projeto para enxergar seu repositório. Crie um arquivo `.npmrc` no mesmo diretório do `package.json` com o seguinte conteúdo:
```
// meu-projeto/.npmrc

registry=https://npm.pkg.github.com/Stone-Connection
```

2. Instale o pacote:
```
npm install --save @stone-connection/nestjs-aws
```

## Uso
Para usar o pacote, importe os componentes desejados na sua aplicação NestJS:
```typescript
import * as AWS from '@stone-connection/nestjs-aws';
// ou
import {
  AwsModule,
  AwsS3Module,
  AwsS3Service
} from '@stone-connection/nestjs-aws';
```

## Antes de inicializar a aplicação NestJS com a `nestjs-aws`
Esta biblioteca requer uma conexão com a AWS e irá buscar no `process.env` as seguintes variáveis.
|Variável|Descrição|Obrigatório|
|-|-|-|
|`AWS_ACCESS_KEY_ID`¹|ID da chave de acesso à AWS, obtida no console da AWS.|Obrigatório.
|`AWS_SECRET_ACCESS_KEY`¹|Chave de acesso secreta, obtida junto ao ID, no console da AWS.|Obrigatório.|
¹ Certifique-se de que o par "ID+Chave" fornecido detém as permissões necessárias para o serviço que deseja utilizar.

## Serviços
Para usar os Serviços desta biblioteca, primeiro faça a importação do módulo correspondente no módulo em que deseja usá-la, na sua aplicação.

```typescript
// cats.module.ts

import { Module } from '@nestjs/common';
import { AwsS3Module } from '@stone-connection/nestjs-aws';

@Module({
  imports: [
    AwsS3Module
  ],
  ...
})
export class CatsModule {}
```

Em seguida, injete o Service correspondente na classe que deseja utilizá-lo. (Pode ser um Controller ou outro Service).
```typescript
// cats.service.ts

import { Injectable } from '@nestjs/common';
import { AwsS3Service } from '@stone-connection/nestjs-aws';

@Injectable()
export class CatsService {
  constructor(
    private s3: AwsS3Service,
  ) {}

  ...
}
```

### S3
```typescript
import { AwsS3Service } from '@stone-connection/nestjs-aws';

export class CatsService {
  constructor(private s3: AwsS3Service) {}
}
```

O AwsS3Service possui os seguintes métodos

|Método|Descrição|
|-|-|
|`s3.upload(params)`|Envia um arquivo para o AWS S3. `params` é um objeto `S3.PutObjectRequest` do pacote `aws-sdk` e deve, obrigatoriamente, conter `{Bucket, Key, Body}`, para o correto funcionamento. O Bucket pode ser omitido, caso exista a variável de ambiente `AWS_S3_BUCKET_NAME` carregada no `process.env`.|
|`s3.uploadMany(params)`|Envia um lote de arquivos, um de cada vez, pelo método `upload` explicado acima, para o AWS S3.|

O AwsS3Service está configurado para tentar o upload de cada arquivo por 3 vezes. Este comportamento pode ser sobrescrito com a variável de ambiente `AWS_S3_MAX_RETRIES`.