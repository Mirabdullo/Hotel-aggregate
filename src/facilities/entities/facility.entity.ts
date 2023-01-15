import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('facility')
export class Facility {
    @ApiProperty({example: '1', description: "Unikal ID"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'divat', description: "Xona jihozlari"})
    @Column({
        nullable: false,
        unique: true
    })
    name: string

}
