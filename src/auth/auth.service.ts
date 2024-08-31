import { Injectable } from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/createUser.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    // constructor(private usersService:UsersService){}

    // async register(registerData:Partial<createUserDto>):Promise<User>{
    //     const 
    //     return await 
    // }
}
