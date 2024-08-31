import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrder } from './entities/productOrders.entity';
import { Repository } from 'typeorm';
import { CreateProductOrderDto } from './dtos/createProductOrder.dto';

@Injectable()
export class CreateProductOrderService {
    constructor(@InjectRepository(ProductOrder) private productorderRepository:Repository<ProductOrder>){}

    async createProductOrder(productOrderData:CreateProductOrderDto):Promise<ProductOrder>{
        const newProductOrder = this.productorderRepository.create({
            // I cannot assign "orderId: productOrderData.id" as in "ProductOrder" entity there is not a column called as "orderId", but "order". With this syntaxis, i'm creating a reference to the "order" and "product" entities. So for the case of "order" for example, i'm telling TypeORM this "ProductOrder" is associated with an "Order" that has this "id"
            order: {id: productOrderData.order.id},
            product: {id: productOrderData.product.id}
        })

        // return await this.productorderRepository.save(newProductOrder)
        return newProductOrder
    }
}

@Injectable()
export class ProductOrdersService {
    constructor(
        private createProductOrderService:CreateProductOrderService
    ){}

    async createProductOrder(productOrderData:CreateProductOrderDto):Promise<ProductOrder>{
        return await this.createProductOrderService.createProductOrder(productOrderData)
    }
}
