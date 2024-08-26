import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { createUserDto } from './dtos/createUser.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get()
    async getUsers():Promise<User[]>{
        return this.userService.getAllUsers()
    }

    @Post()
    async createUser(@Body() userData: createUserDto):Promise<User>{
        return this.userService.createUser(userData)
    }

    @Get(':id')
    async getUserById(@Param('id') id:number):Promise<User>{
        return this.userService.getUserById(+id)
    }

    @Patch(':id')
    async updateUser(@Param('id') id:number, @Body() newUserData:Partial<createUserDto>):Promise<UpdateResult>{
        return this.userService.updateUser(id, newUserData)
    }

    @Delete(':id')
    async DeleteUserService(@Param('id') id:number):Promise<DeleteResult>{
        return this.userService.deleteUser(id)
    }
}
