import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesArgument } from "src/common/decorators/arguments.decorator";
import { Role } from "src/common/enums/role.enum";
import { BearerGuard } from "src/common/guards/bearer.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

export function Auth(roleParam?: Role) {
  return applyDecorators(
    // Swagger autehntication
    ApiBearerAuth(),
    // Define un argumento con <k,V> key: value
    RolesArgument(roleParam),
    // UseGards(CookiesGuard, RolesGuard),
    UseGuards(BearerGuard, RolesGuard),

  )
}