import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { CatEntity } from '../cat/cat.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('breed')
export class BreedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field(() => [CatEntity], { nullable: true })
  @OneToMany(() => CatEntity, (cat) => cat.breed)
  cats?: CatEntity[];

  @Field()
  @Column()
  seed: string;

  @BeforeInsert()
  generateSeed() {
    this.seed = Math.random().toString(36).substring(2, 15);
  }
}
