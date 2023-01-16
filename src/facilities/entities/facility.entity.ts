import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'facility', timestamps: false})
export class Facility extends Model<Facility> {
    @ApiProperty({example: '1', description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'divat', description: "Xona jihozlari"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string

}
