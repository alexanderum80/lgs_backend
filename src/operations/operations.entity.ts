import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, BeforeInsert, getManager, AfterInsert, AfterUpdate, ViewEntity, ViewColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Operations')
export class OperationsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdOperation: number;

  @Field()
  @Column()
  OperationName: string;

  @Field()
  @Column()
  Enabled: boolean;
}

@ObjectType()
@Entity('LGS_Operation_LOGSR')
export class OperationsREntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdOperation?: number;

  @Field(() => Int)
  @Column()
  Consecutive: number;

  @Field(() => Int)
  @Column()
  IdOperationType: number;
    
  @Field(() => Int)
  @Column()
  IdTable: number;

  @Field(() => Int)
  @Column()
  IdPlayer: number; 
    
  @Field(() => Int)
  @Column()
  IdUser: number;
    
  @Field(() => Date, { nullable: true })
  @Column()
  Date?: Date;

  @Field(() => Boolean, { nullable: true })
  @Column()
  Finished?: boolean;
  
  @Field(() => Boolean, { nullable: true })
  @Column()
  Cancelled?: boolean;

  @Field(() => [OperationsDEntity], { nullable: true })
  @OneToMany(() => OperationsDEntity, operationD => operationD.OperationsR)
  OperationsD?: OperationsDEntity[];
}

@ObjectType()
@Entity('LGS_Operation_LOGSD')
export class OperationsDEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdOperationDetail?: number;

  @Field(() => Int)
  @Column()
  IdOperation: number;

  @Field(() => Int)
  @Column()
  IdPayment: number;
    
  @Field()
  @Column()
  Denomination: number;
  
  @Field(() => Int)
  @Column()
  IdInstrument: number;

  @Field()
  @Column()
  Rate: number;
    
  @Field()
  @Column()
  Qty: number;

  @Field(() => OperationsREntity)
  @ManyToOne(() => OperationsREntity, operationR => operationR.OperationsD)
  @JoinColumn({ name: 'IdOperation', referencedColumnName: 'IdOperation' })
  OperationsR: OperationsREntity;
}

@ObjectType()
@ViewEntity('vw_OperationsR')
export class OperationsRView {
  @Field()
  @ViewColumn()
  IdOperation?: number;

  @Field()
  @ViewColumn()
  Consecutive: number;

  @Field()
  @ViewColumn()
  IdOperationType: number;
    
  @Field()
  @ViewColumn()
  IdTable: number;
    
  @Field()
  @ViewColumn()
  Table?: string;

  @Field()
  @ViewColumn()
  UserName?: string;

  @Field()
  @ViewColumn()
  Player?: string;

  @Field()
  @ViewColumn()
  IdPlayer: number; 
    
  @Field()
  @ViewColumn()
  IdUser: number;
    
  @Field()
  @ViewColumn()
  Date?: Date;

  @Field()
  @ViewColumn()
  Finished?: boolean;
  
  @Field()
  @ViewColumn()
  Cancelled?: boolean;

  @Field()
  @ViewColumn()
  AmountIn?: number;
  
  @Field()
  @ViewColumn()
  AmountOut?: number;
}
