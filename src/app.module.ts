import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { ProductOrdersModule } from './productOrders/productOrders.module';
import { OrdersModule } from './orders/orders.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { Role } from './roles/entities/roles.entity';
import { Product } from './products/entities/products.entity';
import { ProductOrder } from './productOrders/entities/productOrders.entity';
import { Order } from './orders/entities/orders.entity';
import { Permission } from './permissions/entities/permissions.entity';
import { Entities } from './entities/entities/entities.entity';

@Module({
  imports: [
    UsersModule, RolesModule, ProductsModule, ProductOrdersModule, OrdersModule, PermissionsModule, EntitiesModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      username: "root",
      password: "12345678",
      database: "e_commerce_nest",
      port: 3306,
      host: "localhost",
      // synchronize: true,
      entities: [User, Role, Product, ProductOrder, Order, Permission, Entities],
    })
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
