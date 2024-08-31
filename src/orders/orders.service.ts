import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/orders.entity';
import { DataSource, Repository, Transaction } from 'typeorm';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductOrdersService } from 'src/productOrders/product-orders.service';
import { UsersService } from 'src/users/users.service';
import { ProductOrder } from 'src/productOrders/entities/productOrders.entity';

@Injectable()
export class CreateOrderService {
    constructor(
        @InjectRepository(Order) private orderRepository:Repository<Order>,
        private productService: ProductsService,
        private productOrdersService: ProductOrdersService,
        private usersService: UsersService,
        private dataSource: DataSource
    ){}

    async createOrder(
        orderData:CreateOrderDto,
    ):Promise<Order>{

        //Checking if the user exists
        const userData = await this.usersService.getUserById(orderData.userId)
        if(!userData){
            throw new NotFoundException("The user does not exist")
        }
        
        const ProductData = await this.productService.getProductById(orderData.productId)

        if(!ProductData){
            throw new NotFoundException("The product does not exist")
        }

        // Calculating total price of the order
        const totalPrice = ProductData.price * orderData.amount
        
        // Start a transaction. In a transaction, if one of the query fails, all the other queries are rolled back, so no partial data is inserted
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            // Creating order
            const orderResponse = await queryRunner.manager.save(Order, {
                totalPrice,
                user: {id: orderData.userId}
            })

            // Creating order
            await queryRunner.manager.save(ProductOrder, {
                order: {id:orderResponse.id},
                product: {id:ProductData.id}
            })

            await queryRunner.commitTransaction();

            return orderResponse
        }catch(error){
            // If there's an error, rollback the changes
            await queryRunner.rollbackTransaction();
            throw new ConflictException("The order could not be created");
        }finally{
            // Release the query runner which is manually created
            await queryRunner.release();
        }
    }
}

@Injectable()
export class OrdersService{
    constructor(private createOrderService:CreateOrderService){}

    async createOrder(orderData:CreateOrderDto):Promise<Order>{
        return await this.createOrderService.createOrder(orderData)
    }
}