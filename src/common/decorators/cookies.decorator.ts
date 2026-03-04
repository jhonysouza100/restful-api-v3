import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
  
  const request: Request = ctx.switchToHttp().getRequest();

  const cookie = request.cookies?.[data] || undefined;

  // !!! debugger
  console.log(cookie)

  if(!cookie) throw new UnauthorizedException('No session cookies were found');
  
  return cookie;
});