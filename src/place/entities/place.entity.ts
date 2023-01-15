import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('place')
export class Place {
    @ApiProperty({example: "1", description: "Unikal id"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: '1', description: "Unikal id"})
    @Column({
        nullable: false,
    })
    place_category_id: number

    @ApiProperty({example: '1', description: "Xona raqami"})
    @Column({
        nullable: false,
    })
    room_number: number

    @ApiProperty({example: '1', description: "Xona raqami"})
    @Column({
        nullable: false,
    })
    guard_count: number

    @ApiProperty({example: '100kv', description: "Xona maydoni"})
    @Column({
        nullable: false,
    })
    apartment_size: string

    @ApiProperty({example: '1', description: "Xonalar soni"})
    @Column({
        nullable: false,
    })
    room_count: number

    @ApiProperty({example: '300000', description: "Xona narxi"})
    @Column({
        nullable: false,
    })
    price: number


}
