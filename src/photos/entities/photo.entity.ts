import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Hotel } from "../../hotel/entities/hotel.entity";

@Table({tableName: 'photo', timestamps: false})
export class Photo extends Model<Photo>{
    @ApiProperty({example: '1', description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number
    
    @ApiProperty({example: 'Photo', description: "Table name"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    table_name: string

    @ApiProperty({example: 'photo.jpg', description: "Hotel rasmi"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    photo: string

    @ApiProperty({example: '1', description: "unikal id"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    hotel_or_place_id: string


}
