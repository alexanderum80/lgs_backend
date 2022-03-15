import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Operation_LOGSR')
export class OperationsREntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdOperationKey: number;

  @Field(() => Int)
  @Column()
  IdUser: number;
    
  @Field(() => Date, { nullable: true })
  @Column()
  Date?: Date;
    
  @Field(() => Int)
  @Column()
  IdTable: number;

  @Field({ nullable: true })
  Table?: string;
      
  @Field(() => Int)
  @Column()
  IdState: number;

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
  IdSerial: number;

  @Field(() => Int)
  @Column()
  IdOperationKeyD: number;

  @Field(() => Int)
  @Column()
  IdPayInstrument: number;

  @Field(() => Int)
  @Column()
  IdDetail: number;
    
  @Field()
  @Column()
  Qty: number;

  @Field(() => OperationsREntity)
  @ManyToOne(() => OperationsREntity, operationR => operationR.OperationsD)
  @JoinColumn({ name: 'IdOperationKeyD', referencedColumnName: 'IdOperationKey' })
  OperationsR: OperationsREntity;
}