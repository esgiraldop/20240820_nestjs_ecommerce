import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { CreateProductService, DeleteProductService, GetAllProductsService, GetProductByIdService, ProductsService, UpdateProductService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    providers: [ProductsService, CreateProductService, GetAllProductsService, GetProductByIdService, UpdateProductService, DeleteProductService],
    controllers: [ProductsController],
    exports: [ProductsService, CreateProductService, GetAllProductsService, GetProductByIdService, UpdateProductService, DeleteProductService]
})
export class ProductsModule {}
