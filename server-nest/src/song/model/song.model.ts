import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/model/user.model';
import {
  BeforeUpdate,
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
  title: string;

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

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }
}
