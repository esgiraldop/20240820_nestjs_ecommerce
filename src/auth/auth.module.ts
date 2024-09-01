import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLoginService, AuthRegisterService, AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { CheckUserByEmailService } from './register/checkUserByEmail.service';
import { EncryptPasswordHelper } from './helpers/encryptPassword.helper';
import { GenerateTokenHelper } from './helpers/generateToken.helper';
import { ValidatePasswordService } from './helpers/validatePassword.helper';
import { JwtService } from '@nestjs/jwt';
// import { EncryptPasswordHelper } from './helpers/encryptPassword.helper';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRegisterService, CheckUserByEmailService, EncryptPasswordHelper, AuthLoginService, GenerateTokenHelper, ValidatePasswordService, JwtService],
})
export class AuthModule {}
