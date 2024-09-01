import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CheckUserByEmailService{
    constructor(private usersService:UsersService){}

    async checkExistence(email:string):Promise<User>{
        const userData = await this.usersService.getUserByEmail(email)

        if(!userData){
            throw new NotFoundException("The user is not registered")
        }

        return userData
    }

    async checkNotExistence(email:string):Promise<User>{
        const userData = await this.usersService.getUserByEmail(email)

        if(userData){
            throw new NotFoundException("The user exists already")
        }

        return userData
    }
}