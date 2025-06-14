import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/auth/guards/roles.guards";
import { eRoles } from "../enums/roles.enum";

export const jwtConstants = {
  secret: 'f9d1bbb2d69379c579135247edda14b365847c5d0f9774ffbea4893537a386e9',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


