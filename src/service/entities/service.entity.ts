import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'service', timestamps: false})
export class Service extends Model<Service> {
    @ApiProperty({example: "1", description: "Unikal id"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'Lift', description: "Mexmonxona serviclari"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string

}
