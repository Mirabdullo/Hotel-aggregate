import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Hotel } from "../../hotel/entities/hotel.entity";
import { Place } from "../../place/entities/place.entity";

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
    @ForeignKey(() => Hotel)
    @ForeignKey(() => Photo)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    hotel_or_place_id: string


 

}
