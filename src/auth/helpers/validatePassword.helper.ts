import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class ValidatePasswordService{
    validatePassword(passwordToValidate, password){
        //Validating password
        const matchPass = bcrypt.compare(passwordToValidate, password)

        if(!matchPass){
            throw new BadRequestException("The password is not correct")
        }
    }
}