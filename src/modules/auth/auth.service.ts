import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { PayloadInterface } from 'src/common/interfaces/payload.interface';
import { comparePassword } from 'src/common/utils/bcrypt';
import { TenantsService } from 'src/core/services/tenants.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { AdminLoginOkResponse } from 'src/modules/auth/interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tenantService: TenantsService,
  ) {}

  async loginAdmin(credentials: LoginDto): Promise<AdminLoginOkResponse> {

    const userFound = await this.tenantService.findByName(credentials.name);

    // Valida el password
    const checkPassword = await comparePassword(credentials.password, userFound.password);
    if(!checkPassword) throw new UnauthorizedException('Invalid password');

    const payload: PayloadInterface = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email.user,
      role: userFound.role,
      picture: userFound.picture,
    };

    // Generar el token JWT
    const token = await this.jwtService.signAsync(payload);

    return { token, payload };
  }

  async verify(token: string): Promise<PayloadInterface> {
    try {
      const payload: PayloadInterface = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});

      return payload;
    } catch {
      throw new UnauthorizedException('Session expired');
    }
  }

  /* !!! crear el modulo para usuarios
  async googleRegister(user: RegisterDto): Promise<{ token: string, payload: PayloadInterface }> {
    await this.userService.createGoogleUser(user);
    
    return this.googleLogin(user.sub);
  }
  
  async googleLogin(sub: string): Promise<{ token: string, payload: PayloadInterface }> {
    const userFound = await this.userService.findOneBySub(sub);

    const payload: PayloadInterface = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      role: userFound.role,
      picture: userFound.picture,
    };
    // Generar el token JWT
    const token = await this.jwtService.signAsync(payload);
    
    return { token, payload };
  }
  */
}
