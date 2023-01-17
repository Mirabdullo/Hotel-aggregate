import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Facility } from "../../facilities/entities/facility.entity";
import { Place } from "../../place/entities/place.entity";

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
    @ForeignKey(() => Facility)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    facilities_id: number

    @ApiProperty({example: '1', description: "Unikal id"})
    @ForeignKey(() => Place)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    place_id: number

    @BelongsTo(() => Facility)
    facility: Facility

    @BelongsTo(() => Place)
    place: Place
} 
