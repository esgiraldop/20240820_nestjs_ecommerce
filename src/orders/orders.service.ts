import { Injectable } from '@nestjs/common';
import { Order } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductOrdersService } from 'src/productOrders/product-orders.service';

@Injectable()
export class CreateOrderService {
    constructor(
        @InjectRepository(Order) private orderRepository:Repository<Order>,
        private productService: ProductsService,
        private productOrdersService: ProductOrdersService
    ){}

    async createOrder(orderData:CreateOrderDto):Promise<Order>{

        const ProductData = await this.productService.getProductById(orderData.productId)

        if(!ProductData){
            throw new Error("The product does not exist")
        }

        // Calculating total price of the order
        const totalPrice = ProductData.price * orderData.amount
        // Creating order
        const newOrder = this.orderRepository.create({
            totalPrice,
            user: {id: orderData.userId}
        })
        const orderResponse = await this.orderRepository.save(newOrder)

        if(!orderResponse){
            throw new Error("There was an error creating the order")
        }

        // Creating the productOrder
        const productOrderResponse = this.productOrdersService.createProductOrder({
            order: {id:orderResponse[0].id},
            product: {id:ProductData[0].id}
        })

        return await this.orderRepository.save(newOrder)
    }
}

@Injectable()
export class OrdersService{
    constructor(private createOrderService:CreateOrderService){}

    async createOrder(orderData:CreateOrderDto):Promise<Order>{
        return await this.createOrderService.createOrder(orderData)
    }
}