import { UsersRolesEntity } from './../users-roles/users-roles.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity('LGS_Users')
export class UsersEntity {
    @Field({ nullable: true })
    @PrimaryGeneratedColumn()
    Id?: number;

    @Field()
    @Column()
    UserName: string;

    @Field()
    @Column()
    Name: string;

    @Field()
    @Column()
    LastName: string;
    
    @Field()
    @Column()
    Psw: string;

    @Field()
    @Column()
    Enabled: boolean
    
    @Field()
    @Column()
    StartDate: Date;

    @Field()
    @Column()
    Deleted: boolean

    @Field(() => [UsersRolesEntity], { nullable: true })
    @OneToMany(() => UsersRolesEntity, userRoles => userRoles.Users)
    @JoinColumn({ name: 'Id', referencedColumnName: 'IdUser'})
    UserRoles?: UsersRolesEntity[];

    @Field()
    Token?: string;
}