import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const { data } = context.switchToHttp().getRequest().user
    const isMatch = this.matchRoles(roles, data.role);

    if (!isMatch) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    return true
  }

  matchRoles(roles: string[], userRole: string) {
    return roles.some(role => role === userRole);
  };
}