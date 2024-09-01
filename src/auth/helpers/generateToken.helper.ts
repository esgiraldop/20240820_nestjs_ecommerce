import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

interface IGenerateToken{
    id: number,
    roleId: number
}

@Injectable()
export class GenerateTokenHelper{
    constructor(private jwtService:JwtService){}

    async generateToken({id, roleId}:IGenerateToken):Promise<string>{
        return await this.jwtService.signAsync({id, roleId})
    }
}