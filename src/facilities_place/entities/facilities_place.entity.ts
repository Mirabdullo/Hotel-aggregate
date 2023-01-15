import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('facilities_place')
export class FacilitiesPlace {
    @ApiProperty({example: "1", description: 'Unikal id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: "Unikal id"})
    @Column({
        nullable: false,
    })
    facilities_id: number

    @ApiProperty({example: '1', description: "Unikal id"})
    @Column({
        nullable: false,
    })
    place_id: number
}
