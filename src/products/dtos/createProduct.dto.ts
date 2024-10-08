import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    description: string
}