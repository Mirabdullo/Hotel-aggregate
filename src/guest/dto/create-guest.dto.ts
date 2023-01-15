import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Max, Min } from "class-validator";

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

    @ApiProperty({example: 'Fayziyev', description: 'Mexmonning  ismi'})
    @IsEmail({},{message: "Email to'g'ri kelmadi"})
    email: string;

    @ApiProperty({example: '1', description: 'Mexmonning  jinsi'})
    @IsNotEmpty()
    @IsNumber({},{message: "gender must be number"})
    @Min(1)
    @Max(2)
    gender: number;
  
}
