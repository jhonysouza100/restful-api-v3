import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/common/config/envs';
import { ProductsModule } from 'src/modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailsModule } from './modules/emails/emails.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from 'src/common/guards/trottler.guard';
import { SheetsModule } from './modules/sheets/sheets.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    // MAIN DB CONNECTION
    TypeOrmModule.forRoot({
      // name: 'primaryDBConnection',
      // type: 'better-sqlite3',
      // database: 'database.sqlite',
      // synchronize: true,
      // logging: true,
      // autoLoadEntities: true,
      type: 'mysql',
      host: envs.DATABASE_HOST,
      port: envs.DATABASE_PORT,
      username: envs.DATABASE_USERNAME,
      password: envs.DATABASE_PASSWORD,
      database: 'test_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.registerAsync({
      // You will not need to import CacheModule in other modules once it's been loaded in the root module 
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            createKeyv(envs.REDIS_URL)
          ],
          ttl: 600000,
        }
      }
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: envs.THROTTLER_LIMITER,
        },
      ],
    }),
    ProductsModule,
    EmailsModule,
    AuthModule,
    PaymentsModule,
    SheetsModule,
    ImagesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard }],
})
export class AppModule {}