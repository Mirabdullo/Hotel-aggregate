import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateHotelServiceDto {
    @ApiProperty({example: '1', description: 'Unikal id'})
    @IsNumber({},{message: 'hotel id must be number'})
    hotel_id: number

    @ApiProperty({example: '1', description: 'Unikal id'})
    @IsNumber({},{message: 'service id must be number'})
    service_id: number
}
