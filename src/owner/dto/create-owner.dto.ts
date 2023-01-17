import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateOwnerDto {
  @ApiProperty({ example: 'Akmal', description: 'Mulk egasining ismi' })
  @IsNotEmpty()
  @IsString({ message: 'fname must be a string' })
  first_name: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Mulk egasining familiyasi' })
  @IsNotEmpty()
  @IsString({ message: 'lname  must be a string' })
  last_name: string;

  @ApiProperty({
    example: 'akmal@gmail.com',
    description: 'Mulk egasining emaili',
  })
  @IsEmail({}, { message: 'email must be a string' })
  email: string;


  @ApiProperty({ example: '12345', description: 'Mulk egasining paroli' })
  @IsNotEmpty()
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: "Parol kamida 6ta belgidan iboraat bo'lisi kerak" })
  password: string;

  @ApiProperty({
    example: '996582142',
    description: 'Mulk egasining phone number',
  })
  @IsNotEmpty()
  @IsString({ message: 'phone must be a string' })
  phone_number: string;




}
