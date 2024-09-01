import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { registerUserDto } from './dtos/register-user.dto';
import { CheckUserByEmailService } from './register/checkUserByEmail.service';
import { EncryptPasswordHelper } from './helpers/encryptPassword.helper';
import { ValidatePasswordService } from './helpers/validatePassword.helper';
import { GenerateTokenHelper } from './helpers/generateToken.helper';

@Injectable()
export class AuthRegisterService{
    constructor(
        private usersService:UsersService,
        private checkUserByEmailService:CheckUserByEmailService,
        private encryptPasswordService:EncryptPasswordHelper
    ){}

    async register(registerData:registerUserDto):Promise<User>{

        // Checking if user does not exist already
        const userData = await this.checkUserByEmailService.checkNotExistence(registerData.email)
        
        const hashedPass = await this.encryptPasswordService.encryptPassword(registerData.password)

        return await this.usersService.createUser({
            ...registerData, 
            password: hashedPass,
            roleId: 2 // Regular register user is assigned a role 2
        });
    }
}

@Injectable()
export class AuthLoginService{
    constructor(
        private usersService:UsersService,
        private checkUserByEmailService:CheckUserByEmailService,
        private validatePasswordService:ValidatePasswordService,
        private generateTokenHelper:GenerateTokenHelper
    ){}

    async authLogin(userLoginData:registerUserDto):Promise<string>{
        const userData = await this.checkUserByEmailService.checkExistence(userLoginData.email)
        
        this.validatePasswordService.validatePassword(userLoginData.password, userData.password)
        
        //Delivering jwt
        return await this.generateTokenHelper.generateToken({id:userData.id , roleId:userData.role.id})
    }
}

@Injectable()
export class AuthService {
    constructor(
        private authRegisterService:AuthRegisterService,
        private authLoginService:AuthLoginService
    ){}

    async register(registerData:registerUserDto):Promise<User>{
        return this.authRegisterService.register(registerData)
    }

    async login(loginData:registerUserDto):Promise<String>{
        return this.authLoginService.authLogin(loginData)
    }
}
