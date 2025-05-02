import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeUpdate,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

import { BreedEntity } from '../breed/breed.entity';
import { User } from '../user/user.entity';
import { Comment } from '@/comment/comment.entity';

@ObjectType()
@Entity('cat')
export class CatEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  age: number;

  @Field()
  @Column()
  breedId: string;

  @Field(() => BreedEntity, { nullable: true })
  @ManyToOne(() => BreedEntity, (breed) => breed.id)
  @JoinColumn({ name: 'breedId' })
  breed?: BreedEntity;

  @Field(() => Int)
  @Column()
  ownerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.cat)
  comments: Comment[];

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updated: Date;

  @Field()
  @Column()
  color: string;
}
