import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const appKey = request.headers['x-app-key'];
    const userAgent = request.headers['user-agent'];

    const expectedAppKey = this.configService.get<string>('APP_KEY');
    
    if (!expectedAppKey) {
      // Se não houver chave configurada no servidor, podemos bloquear ou logar
      // Para segurança, vamos bloquear
      throw new UnauthorizedException('Server configuration error: APP_KEY not defined');
    }

    if (appKey !== expectedAppKey) {
      throw new UnauthorizedException('Invalid or missing X-App-Key');
    }

    if (userAgent !== 'TechPulse/1.0.0 ReactNative') {
      throw new UnauthorizedException('Invalid or missing User-Agent');
    }

    return true;
  }
}
