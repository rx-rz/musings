import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export interface Response<T>{
  data: T
}
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log("Before...")
    const response = context.switchToHttp().getResponse()
    const now = Date.now()
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`))
    )
  }
}