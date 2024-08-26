import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrder } from './entities/productOrders.entity';
import { CreateProductOrderService, ProductOrdersService } from './product-orders.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrder])
    ],
    providers: [ProductOrdersService, CreateProductOrderService],
    // "exports" attribute is used for services or controllers that will be used in other modules so I can import this complete module in the referencing module instead of importing every service or controller one by one. Take a look at "OrdersModule"
    exports: [ProductOrdersService, CreateProductOrderService]
})
export class ProductOrdersModule {}
