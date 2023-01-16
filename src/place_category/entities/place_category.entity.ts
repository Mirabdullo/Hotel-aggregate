import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'place_category', timestamps: false})
export class PlaceCategory extends Model<PlaceCategory> {
    @ApiProperty({example: "1", description: "Unikal id"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'ikki kishilik', description: "Xona turi"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    category: string

}
