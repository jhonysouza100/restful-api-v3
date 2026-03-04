import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "src/common/constants";
import { PayloadInterface } from "src/common/interfaces/payload.interface";

@Injectable()
export class BearerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('No session token were found');

    try {
      const payload: PayloadInterface = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return true
  }
}