import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/users.entity';
import { createUserDto } from './dtos/createUser.dto';

@Injectable()
export class CreateUserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async createUser(userData:createUserDto):Promise<User>{
        const newUser = this.userRepository.create(userData)
        return await this.userRepository.save(newUser)
    }
}

@Injectable()
export class GetAllUsersService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async getAllUsers():Promise<User[]>{
        return await this.userRepository.find()
    }
}

@Injectable()
export class GetUserByIdService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async getAllUsers(id:number):Promise<User>{
        return await this.userRepository.findOne({where:{id:id}})
    }
}

@Injectable()
export class UpdateUserService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async updateUser(id:number, newUserData: Partial<createUserDto>):Promise<UpdateResult>{
        return await this.userRepository.update(id, newUserData)
    }
}

@Injectable()
export class DeleteUserService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async deleteUser(id:number):Promise<DeleteResult>{
        return await this.userRepository.delete(id)
    }
}

@Injectable()
export class UsersService{
    constructor(
        private createUserService:CreateUserService,
        private getAllUsersService:GetAllUsersService,
        private getUserByIdService: GetUserByIdService,
        private updateUserService: UpdateUserService,
        private deleteUserService: DeleteUserService
    ){}

    async createUser(userData:createUserDto):Promise<User>{
        return await this.createUserService.createUser(userData)
    }

    async getAllUsers():Promise<User[]>{
        return await this.getAllUsersService.getAllUsers()
    }

    async getUserById(id:number):Promise<User>{
        return this.getUserByIdService.getAllUsers(id)
    }

    async updateUser(id:number, newUserData:Partial<createUserDto>):Promise<UpdateResult>{
        return this.updateUserService.updateUser(id, newUserData)
    }

    async deleteUser(id:number):Promise<DeleteResult>{
        return this.deleteUserService.deleteUser(id)
    }
}