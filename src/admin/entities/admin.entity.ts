import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'admin', timestamps: false})
export class Admin extends Model<Admin> {
    @ApiProperty({example: '1', description: 'Unikal id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'Umar', description: 'admin ismi'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string

    @ApiProperty({example: 'Karimov', description: 'admin familiyasi'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string

    @ApiProperty({example: '996585858', description: 'admin phone numberi'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number: string

    @ApiProperty({example: 'Umar@gmail.com', description: 'Admin emaili'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string

    @ApiProperty({example: '12345', description: 'Admin password'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @ApiProperty({example: 'true', description: 'Active adminligi'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @ApiProperty({example: 'true', description: 'Active adminligi'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator: boolean

    @Column({
        type: DataType.STRING
    })
    refresh_token: string

}
