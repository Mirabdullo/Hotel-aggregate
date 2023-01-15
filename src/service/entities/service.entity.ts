import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('service')
export class Service {
    @ApiProperty({example: "1", description: "Unikal id"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Lift', description: "Mexmonxona serviclari"})
    @Column({
        nullable: false,
        unique: true
    })
    name: string

}
