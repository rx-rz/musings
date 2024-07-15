import { Injectable } from '@nestjs/common';
import { Cat } from './cat.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(private configService: ConfigService) {}

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
