import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class EncryptPasswordHelper{
    constructor(){}

    async encryptPassword(password:string):Promise<string>{
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    
}