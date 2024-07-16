import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaService],
})
export class PostModule {}
