import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Image {
    @Field()
    url: string

    @Field(() => Int)
    height: number

    @Field(() => Int)
    width: number
}
