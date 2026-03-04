// Obtiene el usuario de la token de Header: "Cookies: auth-token"
import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/common/constants";
import { Request } from 'express';
import { PayloadInterface } from "src/common/interfaces/payload.interface";

@Injectable()
export class CookiesGard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const cookie = request.cookies?.['auth-token'];

    if(!cookie) throw new UnauthorizedException('No session cookies were found');

    try {
      const payload: PayloadInterface = await this.jwtService.verifyAsync(cookie, {secret: jwtConstants.secret});
      
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return true;
  }
}