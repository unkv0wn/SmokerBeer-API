import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/auth/guards/roles.guards";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export function HasRoles(...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(RolesGuard)
  );
}