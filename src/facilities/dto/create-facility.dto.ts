import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFacilityDto {
    @ApiProperty({example: 'divan', description: "Xona jihozlari"})
    @IsNotEmpty()
    @IsString({message: "name must be string"})
    readonly name: string
}
