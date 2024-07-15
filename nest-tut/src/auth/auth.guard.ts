import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  //every guard requires the can activate function.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler())
    if(!roles){
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user;
    //match roles is probably your custom function to check
    //if the roles match or something
    //return matchRoles(roles, user.roles)
    return true
  }
}
