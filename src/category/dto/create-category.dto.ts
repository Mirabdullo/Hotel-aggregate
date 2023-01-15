import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: 'besh yulduz', description: "Mehmonxona categoriasi"})
    @IsNotEmpty()
    @IsString({message: "name must be string"})
    readonly category: string
}
