import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import {
  SwaggerModule,
  DocumentBuilder
} from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adiciona o Helmet globalmente, que serve para adicionar cabeçalhos HTTP de segurança
  app.use(helmet());

  // Habilita o CORS (Cross-Origin Resource Sharing) para permitir requisições de diferentes origens
  // origin: "*" -> Permite requisições de qualquer origem
  // methods: ['GET'] -> Permite apenas requisições do tipo GET
  app.enableCors({
    origin: "*",
    methods: ['GET']
  });

  // Adiciona o ValidationPipe globalmente, que serve para validar os dados que chegam nas requisições
  // whitelist: true -> Remove todos os dados que não estão no DTO
  // transform: true -> Transforma os dados do DTO para o tipo correto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  // Configura a documentação Swagger
  const config = new DocumentBuilder()
    .setTitle("News API")
    .setDescription('API de notícias usando Currents API')
    .setVersion('1.0')
    .build();

  // Cria o documento Swagger
  const document = SwaggerModule.createDocument(
    app, config
  );

  // Configura a documentação Swagger
  SwaggerModule.setup(
    'docs',
    app,
    document
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
