import { IsString,IsEmail,IsEmpty, IsNotEmpty, IsEnum } from "class-validator"

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name:string
    @IsEmail()
    @IsNotEmpty()
    email:string
    @IsEnum(["INTERN","ENGINEER","ADMIN"],{message:"Valid Role Is Required"})
    role: "INTERN"|"ENGINEER"|"ADMIN"
}