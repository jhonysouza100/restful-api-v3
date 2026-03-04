import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { AdminLoginErrorResponse, AdminLoginOkResponse, verifyErrorResponse, verifyOkResponse } from 'src/modules/auth/interfaces/auth-response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  @ApiOperation({ summary: 'Inicio de sesión', description: 'Permite a un usuario iniciar sesión proporcionando las credenciales necesarias.' })
  @ApiBody({ type: LoginDto, description: 'Credenciales del usuario para iniciar sesión (Nombre de usuario y contraseña).' })
  @ApiCreatedResponse({
    description: 'Login successful',
    type: AdminLoginOkResponse
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid credentials provided.',
    type: AdminLoginErrorResponse
  })
  async adminLogin(@Body() credentials: LoginDto) {
    try {
      return await this.authService.loginAdmin(credentials);
    } catch (error) {
      return error.message;
    }
  }

  @Auth()
  @Get('verify')
  @ApiBearerAuth()
  @ApiOperation({
  summary: 'Verificación de usuario',
  description:
    'Verifica la validez del token enviado en la cabecera de autorización y devuelve la información del usuario autenticado. Este proceso es manejado previamente por el AuthGuard.'
  })
  @ApiOkResponse({
    description: 'Token is valid. Returns authenticated user information.',
    type: verifyOkResponse
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or expired token.',
    type: verifyErrorResponse
  })
  very(@Req() request: any) {
    try {
      // return this.authService.verify(token);
      return request.user;
    } catch (error) {
      return error.message;
    }
  }
}
