import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Hotel } from "../../hotel/entities/hotel.entity";

@Table({tableName: 'owner', timestamps: false})
export class Owner extends Model<Owner> {
    @ApiProperty({example: '1', description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: '1Salim', description: "Mulkdorning ismi"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string

    @ApiProperty({example: 'Olimov', description: "Mulkdorning familiyasi"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string

    @ApiProperty({example: 'salim@gamil.com', description: "Mulkdorning emaili"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string

    @ApiProperty({example: 'salim001', description: "Mulkdorning paroli"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @ApiProperty({example: '998952000101', description: "Mulkdorning telefon raqami"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_number: string


    refresh_token: string

}
