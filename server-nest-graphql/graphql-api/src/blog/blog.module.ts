import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';



@Module({
  providers: [BlogService, BlogResolver],
  imports: [TypeOrmModule.forFeature([Blog])],
})
export class BlogModule {}
