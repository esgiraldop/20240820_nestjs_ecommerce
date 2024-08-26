import { Entities } from "src/entities/entities/entities.entity";
import { Role } from "src/roles/entities/roles.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Permissions')
export class Permission{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Role, (role)=>role.permissions)
    role: Role

    @ManyToOne(()=>Entities, (entity)=>entity.permissions)
    entity: Entities;
}