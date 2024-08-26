import { ProductOrder } from "src/productOrders/entities/productOrders.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Orders')
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalPrice: number;

    @ManyToOne(()=>User, (user)=>user.orders)
    user: User;

    @OneToMany(() => ProductOrder, (productOrder)=>productOrder.order)
    productOrder: ProductOrder[];
}