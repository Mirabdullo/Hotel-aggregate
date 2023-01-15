import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('place_category')
export class PlaceCategory {
    @ApiProperty({example: "1", description: "Unikal id"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'ikki kishilik', description: "Xona turi"})
    @Column({
        nullable: false,
        unique: true
    })
    category: string

}
