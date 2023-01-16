import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'facilities_place', timestamps: false})
export class FacilitiesPlace extends Model<FacilitiesPlace> {
    @ApiProperty({example: "1", description: 'Unikal id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: '1', description: "Unikal id"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    facilities_id: number

    @ApiProperty({example: '1', description: "Unikal id"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    place_id: number
}
