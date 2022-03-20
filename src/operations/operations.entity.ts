import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, BeforeInsert, getManager, AfterInsert, AfterUpdate } from 'typeorm';

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
    
  @Field({ nullable: true })
  Table?: string;

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

  @Field({ nullable: true })
  Amount?: number;
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