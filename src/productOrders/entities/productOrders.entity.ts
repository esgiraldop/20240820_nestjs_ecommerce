import { Order } from "src/orders/entities/orders.entity";
import { Product } from "src/products/entities/products.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductOrder{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Order, (order)=>order.productOrder)
    order: Order;

    @ManyToOne(()=>Product, (product)=>product.productOrders)
    product: Product;
}