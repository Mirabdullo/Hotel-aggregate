import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaceCategoryDto {
    @ApiProperty({example: "ikki xonali", description: "Xona turi"})
    @IsNotEmpty()
    @IsString({message: "category must be string"})
    category: string
}
