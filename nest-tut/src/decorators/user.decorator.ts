import { ExecutionContext, Get, SetMetadata, UseGuards, applyDecorators, createParamDecorator } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

//create a decorator
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)

//compose multiple decorators
export function Auth(...roles: string[]){
  return applyDecorators(
    SetMetadata("roles", roles)
    
  )
}

//which can be used as @User()