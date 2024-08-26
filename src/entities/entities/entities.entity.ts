import { Permission } from "src/permissions/entities/permissions.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Entitites')
export class Entities{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>Permission, (permission)=>permission.entity)
    permissions:Permission[]
}