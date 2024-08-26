import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dtos/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateProductService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async createProduct(productData:CreateProductDto):Promise<Product>{
        const newProduct = this.productRepository.create(productData)
        return await this.productRepository.save(newProduct)
    }
}

@Injectable()
export class GetAllProductsService{
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async getAllProducts():Promise<Product[]>{
        return await this.productRepository.find()
    }
}

@Injectable()
export class GetProductByIdService{
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async getAllProducts(id:number):Promise<Product>{
        return await this.productRepository.findOne({where:{id:id}})
    }
}

@Injectable()
export class UpdateProductService{
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async updateProduct(id:number, newProductData: Partial<CreateProductDto>):Promise<UpdateResult>{
        return await this.productRepository.update(id, newProductData)
    }
}

@Injectable()
export class DeleteProductService{
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async deleteProduct(id:number):Promise<DeleteResult>{
        return await this.productRepository.delete(id)
    }
}

@Injectable()
export class ProductsService{
    constructor(
        private createProductService:CreateProductService,
        private getAllProductsService:GetAllProductsService,
        private getProductByIdService: GetProductByIdService,
        private updateProductService: UpdateProductService,
        private deleteProductService: DeleteProductService
    ){}

    async createProduct(userData:CreateProductDto):Promise<Product>{
        return await this.createProductService.createProduct(userData)
    }

    async getAllProducts():Promise<Product[]>{
        return await this.getAllProductsService.getAllProducts()
    }

    async getProductById(id:number):Promise<Product>{
        return this.getProductByIdService.getAllProducts(id)
    }

    async updateProduct(id:number, newProductData:Partial<CreateProductDto>):Promise<UpdateResult>{
        return this.updateProductService.updateProduct(id, newProductData)
    }

    async deleteProduct(id:number):Promise<DeleteResult>{
        return this.deleteProductService.deleteProduct(id)
    }
}
