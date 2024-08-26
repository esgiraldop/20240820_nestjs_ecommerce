import { ProductOrder } from "src/productOrders/entities/productOrders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @OneToMany(()=>ProductOrder, (productOrder)=>productOrder.product)
    productOrders: ProductOrder[];
}