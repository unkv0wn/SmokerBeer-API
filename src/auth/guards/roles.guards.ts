import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
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
      console.log('Nenhuma role requerida para esta rota');
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('Usuário do request:', user);

    if (!user || !user.roles) {
      console.log('Usuário ou roles não definidos no request:', user);
      return false;
    }

    console.log('Roles do usuário:', user.roles);
    console.log('Roles requeridas para a rota:', requiredRoles);

    const hasRole = user.roles.some((role: eRoles) =>
      requiredRoles.includes(role),
    );
    console.log('Usuário tem role requerida?', hasRole);

    if (!hasRole) {
      throw new ForbiddenException('Acesso negado: permissão insuficiente.');
    }

    return hasRole;
  }
}
