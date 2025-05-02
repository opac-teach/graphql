import { Field, ObjectType } from '@nestjs/graphql';
import { Genre } from 'src/genre/model/genre.model';
import { User } from 'src/user/model/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('song')
export class Song {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  authorId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.songs, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'authorId' })
  author?: User;

  @Field(() => String)
  @Column()
  genreId: string;

  @Field(() => Genre, { nullable: true })
  @ManyToOne(() => Genre, (genre) => genre.songs, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'genreId' })
  genre?: Genre;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
