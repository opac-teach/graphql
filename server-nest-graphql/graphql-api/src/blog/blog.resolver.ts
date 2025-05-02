import { Resolver, Query } from '@nestjs/graphql';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => [Blog])
  getAllBlogs() {
    return this.blogService.findAll();
  }
}
