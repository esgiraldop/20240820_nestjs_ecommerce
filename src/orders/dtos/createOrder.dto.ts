import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    productId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    amount: number
}