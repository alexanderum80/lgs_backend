import { PaymentsEntity } from './../payments/payments.entity';
import { TablesGameEntity } from '../tables-game/tables-game.entity';
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;

  @Field(() => TablesGameEntity)
  @ManyToOne(() => TablesGameEntity, TableGame => TableGame.IdGame)
  @JoinColumn({ name: 'IdGame', referencedColumnName: 'IdGame' })
  TableGame: TablesGameEntity;
    
  @Field({ nullable: true })
  Game?: string;
    
  @Field(() => [TablesInitValuesEntity], { nullable: true })
  @OneToMany(() => TablesInitValuesEntity, inicialValues => inicialValues.Table)
  InitValues?: TablesInitValuesEntity[];

  @Field({ nullable: true })
  TotalInitValues?: number;
}

@ObjectType()
@Entity('LGS_Tables_INIT_Values')
export class TablesInitValuesEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdInitValue: number;

  @Field(() => Int)
  @Column()
  IdTable: number;

  @Field(() => Int)
  @Column()
  IdPayment: number;

  @Field(() => PaymentsEntity)
  @ManyToOne(() => PaymentsEntity, payments => payments.IdPayment)
  @JoinColumn({ name: 'IdPayment', referencedColumnName: 'IdPayment'})
  Payment: PaymentsEntity;

  @Field(() => Int)
  @Column()
  Qty: number;

  @Field(() => Int)
  @Column()
  IdUser: number;

  @Field()
  @Column()
  Date: Date;

  @Field(() => TablesEntity)
  @ManyToOne(() => TablesEntity, inicialValues => inicialValues.InitValues)
  @JoinColumn({ name: 'IdTable', referencedColumnName: 'IdTable' })
  Table: TablesEntity;
}
