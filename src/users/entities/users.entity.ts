import { Order } from "src/orders/entities/orders.entity";
import { Role } from "src/roles/entities/roles.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    password: string;

    @ManyToOne(()=>Role, (role)=>role.users)
    role: Role;

    @OneToMany(()=>Order, (order)=>order.user)
    orders: Order[];
}