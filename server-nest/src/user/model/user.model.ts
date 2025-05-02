import { Field, ObjectType } from '@nestjs/graphql';
import { Song } from 'src/song/model/song.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Song], { nullable: true })
  @OneToMany(() => Song, (song) => song.author)
  songs?: Song[];
}
