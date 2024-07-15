import { Global, Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

//if you want to make a service available to every module
//without importing the module in every module
//use global()
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  //make this available to every other module.
  //any module that imports catsmodule has access
  //to catsservice
  exports: [CatsService]
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}