import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrder } from './entities/productOrders.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrder])
    ]
})
export class ProducOrdersModule {}
