import { Permission } from "src/permissions/entities/permissions.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Role')
export class Role{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @OneToMany(()=>Permission, (permission)=>permission.role)
    permissions: Permission[]

    @OneToMany(()=>User, (user)=>user.role)
    users: User[];
}