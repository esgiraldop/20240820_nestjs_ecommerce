import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CreateUserService, DeleteUserService, GetAllUsersService, getUserByEmailService, GetUserByIdService, UpdateUserService, UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RolesModule
    ],
    providers: [UsersService, CreateUserService, GetAllUsersService, GetUserByIdService, getUserByEmailService, UpdateUserService, DeleteUserService],
    controllers: [UsersController],
    exports: [UsersService, CreateUserService, GetAllUsersService, GetUserByIdService, getUserByEmailService, UpdateUserService, DeleteUserService]
})
export class UsersModule {}
