import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { CreateOrderService, OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { ProductOrdersModule } from 'src/productOrders/productOrders.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        ProductsModule,
        ProductOrdersModule,
        UsersModule
    ],
    providers: [OrdersService, CreateOrderService],
    controllers: [OrdersController]
})
export class OrdersModule {}
