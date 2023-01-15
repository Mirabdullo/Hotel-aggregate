import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateFacilitiesPlaceDto {
    @ApiProperty({example: "1", description: 'Unikal id'})
    @IsNumber({},{message: 'Id must be number'})
    facilities_id: number

    @ApiProperty({example: "1", description: 'Unikal id'})
    @IsNumber({},{message: 'Id must be number'})
    place_id: number
}
