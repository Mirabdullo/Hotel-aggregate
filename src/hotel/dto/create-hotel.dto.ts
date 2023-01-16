import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHotelDto {
    @ApiProperty({example: "Lift", description: "Mexmonxona nomi"})
    @IsNotEmpty()
    @IsString({message: "service must be string"})
    name: string

    @ApiProperty({example: "Toshkent sh. Chilonzor", description: "Mexmonxona addresi"})
    @IsNotEmpty()
    @IsString({message: "service must be string"})
    address: string

    @ApiProperty({example: "Toshkent", description: "Mexmonxona locatsiyasi"})
    @IsNotEmpty()
    @IsString({message: "service must be string"})
    location: string

    @ApiProperty({example: "Mehmonxona haqida ", description: "Mexmonxona haqida"})
    @IsNotEmpty()
    @IsString({message: "service must be string"})
    description: string

    @ApiProperty({example: "1", description: "Comment id"})
    @IsNumber({},{message: "id must be string"})
    comment_id: number

    @ApiProperty({example: "1", description: "Place id"})
    @IsNumber({},{message: "id must be string"})
    place_id: number

    @ApiProperty({example: "1", description: "Category id"})
    @IsNumber({},{message: "id must be string"})
    category_id: number
}
