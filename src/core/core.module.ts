import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { TenantGuard } from './guards/tenant.guard';
import { TenantInterceptor } from './interceptors/tenant.interceptor';
import { TenantContextService } from './services/tenant-context.service';
import { TenantsService } from './services/tenants.service';
import { TenantsController } from './tenants/tenants.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantContextService, TenantsService, TenantGuard, TenantInterceptor],
  exports: [TenantContextService, TenantsService, TenantGuard, TenantInterceptor],
  controllers: [TenantsController],
})
export class CoreModule {}

