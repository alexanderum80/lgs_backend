import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OperationsEntity } from 'src/operations/operations.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Player')
export class PlayersEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdPlayer?: number;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column()
  LastName: string;

  @Field()
  @Column()
  StartDate?: Date;
  
  @Field({ nullable: true })
  @Column()
  Personal_Id?: string;

  @Field({ nullable: true })
  @Column()
  Note?: string;

  @Field({ nullable: true })
  @Column()
  CellPhone?: string;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;

  @Field(() => Int, { nullable: true })
  @Column()
  IdCountry?: number;

  @Field(() => Boolean)
  @Column()
  Deleted: boolean;
  
  @Field({ nullable: true })
  @Column()
  DateOfBirth?: Date;

  @Field(() => Int)
  @Column()
  Status: number;

  @Field(() => OperationsEntity)
  @ManyToOne(() => OperationsEntity, operations => operations.IdOperation)
  @JoinColumn({ name: 'Status', referencedColumnName: 'IdOperation'})
  StatusInfo: OperationsEntity;
}
