import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Hotel } from "../../hotel/entities/hotel.entity";
import { Owner } from "../../owner/entities/owner.entity";
import { Service } from "../../service/entities/service.entity";

@Table({tableName: 'hotel_service', timestamps: false})
export class HotelService extends Model<HotelService> {
    @ApiProperty({example: '1', description: 'Unikal id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: '1', description: 'Unikal id'})
    @ForeignKey(() => Hotel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    hotel_id: number

    @ApiProperty({example: '1', description: 'Unikal id'})
    @ForeignKey(() => Service)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    service_id: number


    @ApiProperty({example: '1', description: 'Unikal id'})
    @ForeignKey(() => Owner)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    owner_id: number

    @BelongsTo(() => Hotel)
    hotel: Hotel

    @BelongsTo(() => Service)
    service: Service

}
