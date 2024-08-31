import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/orders.entity';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductOrdersService } from 'src/productOrders/product-orders.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CreateOrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private productService: ProductsService,
    private productOrdersService: ProductOrdersService,
    private usersService: UsersService,
    private dataSource: DataSource
  ) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    try{
        return this.dataSource.transaction(async (transactionalEntityManager: EntityManager) => {
            // Checking if the user exists
            const userData = await this.usersService.getUserById(orderData.userId);
            if (!userData) {
              throw new NotFoundException("The user does not exist");
            }
      
            const ProductData = await this.productService.getProductById(orderData.productId);
            if (!ProductData) {
              throw new NotFoundException("The product does not exist");
            }
      
            // Calculating total price of the order
            const totalPrice = ProductData.price * orderData.amount;
      
            // Creating order
            const newOrder = this.orderRepository.create({
              totalPrice,
              user: { id: orderData.userId }
            });
      
            const orderResponse = await transactionalEntityManager.save(Order, newOrder);
      
            // Creating the productOrder
            await this.createProductOrderWithinTransaction(
              transactionalEntityManager,
              orderResponse.id,
              ProductData.id
            );
      
            return orderResponse;
        });
    }catch (error) {
        // If there's an error, the transaction will automatically roll back
        if (error instanceof NotFoundException) {
            // Re-throw NotFoundException to maintain specific error handling
            throw error;
        }
        throw new ConflictException("The order could not be created");
    }
  }

  private async createProductOrderWithinTransaction(
    transactionalEntityManager: EntityManager,
    orderId: number,
    productId: number
  ): Promise<void> {
    const productOrderData = {
      order: { id: orderId },
      product: { id: productId }
    };

    // Assuming ProductOrder is the entity for product orders
    await transactionalEntityManager.save('ProductOrder', productOrderData);
  }
}

@Injectable()
export class OrdersService {
  constructor(private createOrderService: CreateOrderService) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    return await this.createOrderService.createOrder(orderData);
  }
}