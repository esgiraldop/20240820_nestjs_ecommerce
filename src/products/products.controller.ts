import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dtos/createProduct.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService:ProductsService){}

    @Get()
    async getProducts():Promise<Product[]>{
        return this.productService.getAllProducts()
    }

    @Post()
    async createProduct(@Body() productData: CreateProductDto):Promise<Product>{
        return this.productService.createProduct(productData)
    }

    @Get(':id')
    async getProductById(@Param('id') id:number):Promise<Product>{
        return this.productService.getProductById(+id)
    }

    @Patch(':id')
    async updateProduct(@Param('id') id:number, @Body() newProductData:Partial<CreateProductDto>):Promise<UpdateResult>{
        return this.productService.updateProduct(id, newProductData)
    }

    @Delete(':id')
    async DeleteProductService(@Param('id') id:number):Promise<DeleteResult>{
        return this.productService.deleteProduct(id)
    }
}
