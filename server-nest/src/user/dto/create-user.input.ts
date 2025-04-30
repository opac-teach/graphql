import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of user' })
  name: string;

  @Field(() => String, { description: 'Email of user' })
  email: string;

  @Field(() => String, { description: 'Password of user' })
  password: string;
}
