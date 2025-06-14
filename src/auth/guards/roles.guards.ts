import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../config/constants/roles.constants';
import { eRoles } from '../../config/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<eRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Proteção contra undefined
    if (!user || !user.roles) {
      return false;
    }

    // Verifica se o usuário tem pelo menos uma das roles requeridas
    return user.roles.some((role: eRoles) => requiredRoles.includes(role));
  }
}
