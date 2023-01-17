import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'category', timestamps: false})
export class Category extends Model<Category>{
    @ApiProperty({example: '1', description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'besh yulduz', description: "Mehmonxona categoriyasi"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    category: string

}
