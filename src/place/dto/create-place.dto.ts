import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePlaceDto {
    @ApiProperty({example: '1', description: "Unikal id"})
    @IsNumber({},{message: "Id must be number"})
    place_category_id: number

    @ApiProperty({example: '12', description: "Xonaning raqami"})
    @IsNumber({},{message: "Room number must be number"})
    room_number: number

    @ApiProperty({example: '2', description: "Xonaning necha kishhiga mo'ljallanganligi"})
    @IsNumber({},{message: "guard count must be number"})
    guard_count: number

    @ApiProperty({example: '40kv', description: "Xona o'lchami"})
    @IsNotEmpty()
    @IsString({message: "appartment size must be string"})
    apartment_size: string

    @ApiProperty({example: '1', description: "Xonalar soni "})
    @IsNumber({},{message: "room count must be number"})
    room_count: number

    @ApiProperty({example: '250000', description: "Xona narxi"})
    @IsNumber({},{message: "Price must be number"})
    price: number
}
