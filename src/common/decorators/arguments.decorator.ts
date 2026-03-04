import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY, VALIDATION_KEY } from "src/common/constants";
import { Role } from "src/common/enums/role.enum";

export const RolesArgument = (roleParam: Role) => SetMetadata(ROLES_KEY, roleParam);

export const ValidateArgument = (validationOpt: boolean) => SetMetadata(VALIDATION_KEY, validationOpt);