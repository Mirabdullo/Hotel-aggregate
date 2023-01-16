import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'place', timestamps: false})
export class Place extends Model<Place> {
    @ApiProperty({example: "1", description: "Unikal id"})
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
    place_category_id: number

    @ApiProperty({example: '1', description: "Xona raqami"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    room_number: number

    @ApiProperty({example: '1', description: "Xona raqami"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    guard_count: number

    @ApiProperty({example: '100kv', description: "Xona maydoni"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    apartment_size: string

    @ApiProperty({example: '1', description: "Xonalar soni"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    room_count: number

    @ApiProperty({example: '300000', description: "Xona narxi"})
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    price: number


}
