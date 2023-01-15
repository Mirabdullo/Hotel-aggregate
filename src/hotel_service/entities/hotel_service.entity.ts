import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "../../hotel/entities/hotel.entity";
import { Service } from "../../service/entities/service.entity";

@Entity('hotel_service')
export class HotelService {
    @ApiProperty({example: '1', description: 'Unikal id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: '1', description: 'Unikal id'})
    @Column({
        nullable: false
    })
    hotel_id: number

    @ApiProperty({example: '1', description: 'Unikal id'})
    @Column({nullable: false})
    service_id: number

}
