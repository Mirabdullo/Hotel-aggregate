import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateGuestDto {
    @ApiProperty({example: 'Akmal', description: 'Mexmonning  ismi'})
    @IsNotEmpty()
    @IsString({message: "first name must be string"})
    first_name: string;

    @ApiProperty({example: 'Fayziyev', description: 'Mexmonning  ismi'})
    @IsNotEmpty()
    @IsString({message: "last name must be string"})
    last_name: string;

    @ApiProperty({example: '998996542314', description: 'Mexmonning telefon raqami'})
    @IsNumberString({},{message: "phone number must be string"})
    phone_number: string;

    @ApiProperty({example: 'akmal001', description: 'Mexmonning  paroli'})
    @IsNotEmpty()
    @IsString({message: "password must be string"})
    password: string;

    @ApiProperty({example: 'akmal@gmail.com', description: 'Mexmonning  emaili'})
    @IsEmail({},{message: "Email to'g'ri kelmadi"})
    email: string;

  
}
