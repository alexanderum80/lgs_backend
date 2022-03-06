import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Chips')
export class ChipsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdChip: number;

  @Field()
  @Column()
  Color: string;

  @Field()
  @Column()
  Value: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'bytea', nullable: true })
  Image?: string;
}
