import { Field, ObjectType } from '@nestjs/graphql';
import { Song } from 'src/song/model/song.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('genre')
export class Genre {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Song], { nullable: true })
  @OneToMany(() => Song, (song) => song.genre)
  songs?: Song[];
}
