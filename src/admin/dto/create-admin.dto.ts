import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator"

export class CreateAdminDto {
    @ApiProperty({example: 'Umar', description: 'Karimov'})
    @IsString()
    first_name: string

    @ApiProperty({example: 'Umar', description: 'Karimov'})
    @IsString()
    last_name: string

    @ApiProperty({example: 'Umar', description: 'Karimov'})
    @IsString()
    phone_number: string

    @ApiProperty({example: 'Umar', description: 'Karimov'})
    @IsEmail()
    email: string

    @ApiProperty({example: 'Umar', description: 'Karimov'})
    @IsString()
    password: string

    @ApiProperty({example: 'true', description: 'Active adminligi'})
    @IsOptional()
    @IsBoolean()
    is_active: boolean

    @ApiProperty({example: 'true', description: 'Active adminligi'})
    @IsOptional()
    @IsBoolean()
    is_creator: boolean
}
