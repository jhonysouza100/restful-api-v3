<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API REST multi-tenant construida con [NestJS](https://nestjs.com/) y TypeORM. Esta API está diseñada para múltiples clientes donde cada cliente (tenant) tiene acceso exclusivo a sus propios productos y datos.

### Características principales

- ✅ **Multi-tenant**: Aislamiento completo de datos por cliente
- ✅ **TypeORM**: ORM con soporte para SQLite y MySQL
- ✅ **Validación**: DTOs con class-validator y class-transformer
- ✅ **Documentación**: Swagger/OpenAPI integrado
- ✅ **TypeScript**: Tipado fuerte en todo el proyecto
- ✅ **Arquitectura modular**: Estructura escalable y mantenible

## Installation

```bash
$ npm install
```

## Estructura Multi-Tenant

### Arquitectura

El proyecto implementa una arquitectura multi-tenant donde cada cliente (tenant) tiene acceso exclusivo a sus propios datos. El sistema identifica automáticamente el tenant en cada request y filtra todos los datos según el tenant correspondiente.

### Estructura del Proyecto

```
src/
├── core/                          # Módulo core (global)
│   ├── entities/
│   │   └── tenant.entity.ts       # Entidad Tenant
│   ├── services/
│   │   ├── tenant-context.service.ts  # Contexto del tenant por request
│   │   └── tenants.service.ts    # Servicio para gestionar tenants
│   ├── guards/
│   │   └── tenant.guard.ts       # Guard para validar y extraer tenant
│   ├── interceptors/
│   │   └── tenant.interceptor.ts # Interceptor para establecer contexto
│   ├── decorators/
│   │   └── tenant.decorator.ts   # Decorador para obtener tenantId
│   └── core.module.ts            # Módulo core global
├── modules/
│   └── products # Módulo de productos                      
│       ├── entities/
│       │   ├── product.entity.ts     # Entidad base Product (con tenantId)
│       ├── dtos/
│       │   ├── create-product.dto.ts # DTO base para productos
│       │   └── update-*.dto.ts       # DTOs de actualización
│       ├── products.service.ts   # Servicio con filtrado automático por tenant
│       ├── products.controller.ts # Controller con TenantGuard
│       └── products.module.ts
└── app.module.ts                  # Módulo principal
```

### Identificación del Tenant

El sistema identifica el tenant de **dos formas** (en orden de prioridad):

#### 1. API Key (Header `x-api-key`)
Envía la API Key del tenant en el header:

```bash
curl -H "x-api-key: abc123xyz" http://localhost:3000/api/v1/products/perfumes
```

**Nota:** La API Key debe estar registrada en la base de datos en el campo `apiKey` de la entidad `Tenant`.

#### 2. Dominio de la URL
El sistema identifica automáticamente el tenant por el dominio desde donde se hace la consulta. Por ejemplo, si `mitienda.com` hace una consulta, el sistema buscará el tenant asociado a ese dominio:

```bash
# El tenant se identifica automáticamente por el dominio
https://mitienda.com
```

**Nota:** El dominio debe estar registrado en la base de datos en el campo `domain` de la entidad `Tenant`.

### Aislamiento de Datos

- ✅ Cada operación CRUD filtra automáticamente por `tenantId`
- ✅ Los productos solo son visibles para su tenant correspondiente
- ✅ No se puede acceder a productos de otros tenants
- ✅ El `tenantId` se asigna automáticamente al crear productos
- ✅ Todas las queries incluyen el filtro de tenant automáticamente

### Uso

#### Ejemplo: Crear un producto

```bash
# Usando API Key
POST /api/v1/products
Headers:
  x-api-key: abc123xyz
  Content-Type: application/json

Body:
{
  "name": "Chanel No. 5",
  "price": 89.99,
  "stock": 50,
  "brand": "Chanel",
  "size": "100ml"
}

# O usando dominio (el tenant se identifica automáticamente)
Desde: https://mitienda.com
POST
Headers:
  Content-Type: application/json

Body:
{
  "name": "Chanel No. 5",
  "price": 89.99,
  "stock": 50,
  "brand": "Chanel",
  "size": "100ml"
}
```

#### Ejemplo: Listar productos

```bash
# Usando API Key
GET /api/v1/products
Headers:
  x-api-key: abc123xyz

# O usando dominio (el tenant se identifica automáticamente)
GET from https://mitienda.com
```

**Respuesta:** Solo retorna los productos del tenant correspondiente (identificado por API Key o dominio).

#### Ejemplo: Obtener un producto específico

```bash
# Usando API Key
GET /api/v1/products/1
Headers:
  x-api-key: abc123xyz

# O usando dominio
GET from https://mitienda.com
```

**Nota:** Si el producto con ID 1 no pertenece al tenant identificado, retornará 404.

### Entidad Tenant

Cada tenant tiene la siguiente estructura:

```typescript
{
  id: number;              // ID único del tenant
  name: string;            // Nombre del tenant
  domain: string;          // Dominio completo (ej: "mitienda.com") (opcional)
  apiKey: string;         // API Key única (opcional)
  isActive: boolean;       // Estado activo/inactivo
  createdAt: Date;         // Fecha de creación
  updatedAt: Date;         // Fecha de actualización
}
```

**Nota:** El tenant debe tener al menos uno de los siguientes campos configurado: `domain` o `apiKey`.

### Componentes Multi-Tenant

#### TenantGuard
Valida y extrae el tenant del request. Se aplica automáticamente en los controladores que usan `@UseGuards(TenantGuard)`.

#### TenantContextService
Mantiene el contexto del tenant durante todo el ciclo de vida del request. Es un servicio con scope `REQUEST` para asegurar el aislamiento.

#### TenantsService
Servicio para gestionar tenants: buscar por ID, subdomain o API Key.

### Seguridad

- ✅ Validación automática del tenant en cada request
- ✅ Aislamiento completo de datos entre tenants
- ✅ No se puede acceder a datos de otros tenants
- ✅ Validación de existencia del tenant antes de procesar requests

### Documentación API

La documentación Swagger está disponible en:

```
http://localhost:3000/docs
```

Todos los endpoints requieren identificar el tenant mediante:
- Header `x-api-key` con la API Key del tenant, o
- Dominio completo en la URL desde donde se hace la consulta

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Configuración de Base de Datos

El proyecto está configurado para usar SQLite por defecto. Para cambiar a MySQL, configura las variables de entorno:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=usuario
DB_PASSWORD=contraseña
DB_NAME=test_db
DB_SYNCHRONIZE=true
```

**Nota:** En producción, `DB_SYNCHRONIZE` debe ser `false` para evitar pérdida de datos.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Próximos Pasos Recomendados

1. **Módulo de Administración**: Crear endpoints para gestionar tenants (CRUD)
2. **Autenticación**: Implementar JWT o OAuth2 para autenticación de usuarios
3. **Autorización**: Agregar roles y permisos por tenant
4. **Rate Limiting**: Implementar límites de requests por tenant
5. **Logging y Auditoría**: Agregar logging de todas las operaciones por tenant
6. **Índices de Base de Datos**: Crear índices en `tenantId` para mejorar el rendimiento

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com/) - Framework Node.js
- [TypeORM](https://typeorm.io/) - ORM para TypeScript
- [SQLite](https://www.sqlite.org/) / [MySQL](https://www.mysql.com/) - Base de datos
- [class-validator](https://github.com/typestack/class-validator) - Validación de DTOs
- [class-transformer](https://github.com/typestack/class-transformer) - Transformación de objetos
- [Swagger](https://swagger.io/) - Documentación de API

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
