import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // Configuração global do módulo de configuração
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // Timeout de 10 segundos e máximo de 5 redirecionamentos
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5
    }),
    // Cache para armazenar as notícias por 15 minutos
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 15
    }),
    // Limitar o número de requisição por IP
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 20
    }])
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
