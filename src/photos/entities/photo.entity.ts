import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from "../../hotel/entities/hotel.entity";

@Entity('photos')
export class Photo {
    @ApiProperty({example: '1', description: "Unikal ID"})
    @PrimaryGeneratedColumn()
    id: number
    
    @ApiProperty({example: 'Photo', description: "Table name"})
    @Column({
        nullable: false,
    })
    table_name: string

    @ApiProperty({example: 'photo.jpg', description: "Hotel rasmi"})
    @Column({
        nullable: false,
    })
    photo: string

    @ApiProperty({example: '1', description: "unikal id"})
    @Column({
        nullable: false,
        
    })
    hotel_or_place_id: number


    @ManyToOne(() => Hotel, hotel => hotel.photos)
    @JoinColumn()
    hotel: Hotel
}
