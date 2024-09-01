import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dtos/register-user.dto';
import { User } from 'src/users/entities/users.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() registerData:registerUserDto):Promise<User>{
        return this.authService.register(registerData)
    }

    @Post('login')
    async login(@Body() loginData:registerUserDto):Promise<String>{
        return this.authService.login(loginData)
    }
}