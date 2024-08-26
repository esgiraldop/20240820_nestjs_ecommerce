import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CreateUserService, DeleteUserService, GetAllUsersService, GetUserByIdService, UpdateUserService, UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService, CreateUserService, GetAllUsersService, GetUserByIdService, UpdateUserService, DeleteUserService],
    controllers: [UsersController]
})
export class UsersModule {}
