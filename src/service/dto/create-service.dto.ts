import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({example: "Lift", description: "Mexmonxona servicelari"})
    @IsNotEmpty()
    @IsString({message: "service must be string"})
    name: string
}
