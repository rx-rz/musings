import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Next,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { CreateCatDTO } from './cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './cat.types';
import { HTTPExceptionFilter } from 'exceptions/http-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { LoggingInterceptor } from 'src/auth/logging.interceptor';
//prefix is declared in the controller decorator. in this case, it's cats.
@Controller('cats')
//controller scoped
@UseFilters(new HTTPExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  //you can specify the required httpcode.
  @HttpCode(201)
  //this will be GET /cats
  //if i decide to go /cats/findAll, it will be
  //@Get("findAll")
  findAll(): string {
    //function name itself is arbitrary. doesnt serve a nestjs specific purpose.
    if ('a' == 'a') {
      throw new HttpException(
        { message: 'Forbidden! Fok off!' },
        HttpStatus.FORBIDDEN,
      );
    }
    return 'This gets all cats';
  }
  @Get('specificCat')
  findSpecificCat(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Param() params: any,
  ): string {
    return 'This gets a specific cat';
  }

  @Post('createCat')
  @HttpCode(204)
  @UseFilters(new HTTPExceptionFilter())
  @UseGuards(AuthGuard)
  @Header('Content-Type', 'application/json')
  @Redirect('https://nestjs.com', 303)
  createCat(): string {
    return 'This action adds a new cat';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get()
  async findAllCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @Roles(["admin"])
  //method scoped
  @UseFilters(new HTTPExceptionFilter())
  async create(@Body() createCatDTO: CreateCatDTO) {
    //no return for POST hmm
    this.catsService.create(createCatDTO);
  }
}
