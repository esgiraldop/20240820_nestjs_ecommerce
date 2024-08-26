import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrder } from './entities/productOrders.entity';
import { CreateProductOrderService, ProductOrdersService } from './product-orders.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrder])
    ],
    providers: [ProductOrdersService, CreateProductOrderService],
    exports: [ProductOrdersService, CreateProductOrderService]
})
export class ProductOrdersModule {}
