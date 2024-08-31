import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { Order } from './entities/orders.entity';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService:OrdersService){}

    @Post()
    async createOrder(@Body() orderData:CreateOrderDto):Promise<Order>{
        return this.ordersService.createOrder(orderData)
    }

}
