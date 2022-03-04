import { TablesGameEntity } from '../tables-game/tables-game.entity';
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Tables')
export class TablesEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdTable: number;

  @Field()
  @Column()
  Description: string;
  
  @Field(() => Int)
  @Column()
  IdGame: number;

  @Field(() => TablesGameEntity)
  @ManyToOne(() => TablesGameEntity, TableGame => TableGame.IdGame)
  @JoinColumn({ name: 'IdGame', referencedColumnName: 'IdGame' })
  TableGame: TablesGameEntity;
  
  @Field(() => Boolean)
  @Column()
  Enabled: boolean;
}
