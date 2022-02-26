import { UsersRolesEntity } from './../users-roles/users-roles.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity('LGS_Users')
export class UsersEntity {
    @Field()
    @PrimaryGeneratedColumn()
    Id: number;

    @Field()
    @Column()
    Name: string;

    @Field()
    @Column()
    LastName: string;

    @Field()
    @Column()
    StartDate: Date;
    
    @Field()
    @Column()
    Psw: string;

    @Field()
    @Column()
    Enabled: boolean

    @Field(() => [UsersRolesEntity])
    @OneToMany(() => UsersRolesEntity, userRoles => userRoles.Users)
    @JoinColumn({ name: 'Id', referencedColumnName: 'IdUser'})
    UserRoles?: UsersRolesEntity[];

    @Field()
    Token?: string;
}