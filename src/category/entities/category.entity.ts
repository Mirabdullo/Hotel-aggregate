import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('hotel_category')
export class Category{
    @ApiProperty({example: '1', description: "Unikal ID"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'besh yulduz', description: "Mehmonxona categoriyasi"})
    @Column({
        nullable: false,
        unique: true
    })
    category: string

}
