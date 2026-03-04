import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CoreModule } from 'src/core/core.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),
  CoreModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
