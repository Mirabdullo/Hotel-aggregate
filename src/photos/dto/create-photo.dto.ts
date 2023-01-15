import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreatePhotoDto {
    @ApiProperty({example: 'Photo', description: "Table name"})
    @IsNotEmpty()
    @IsString({message: "Table name must be string"})
    table_name: string

    @ApiProperty({example: 'photo.jpeg', description: "Photo"})
    @IsNotEmpty()
    @IsString({message: "Photo must be string"})
    photo: string

    @ApiProperty({example: '1', description: "unikal id"})
    @IsNotEmpty()
    @IsNumber({},{message: "id must be number"})
    hotel_or_place_id: number
}
