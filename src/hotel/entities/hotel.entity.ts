import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../category/entities/category.entity";
import { Comment } from "../../comment/entities/comment.entity";
import { Photo } from "../../photos/entities/photo.entity";
import { Place } from "../../place/entities/place.entity";

@Table({tableName: 'hotel', timestamps: false})
export class Hotel extends Model<Hotel> {
    @ApiProperty({example: "1", description: "Unikal id"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'ShoxSaroy', description: "Mexmonxona nomi"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    address: string

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona locatsiyasi"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    location: string

    @ApiProperty({example: 'Mexmonxona haqida malumotlar', description: "Mexmonxona haqida malumotlar"})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
    })
    comment_id: number

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @ForeignKey(() => Place)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    place_id: number

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    category_id: number


    @BelongsTo(() => Comment)
    comments: Comment

    @BelongsTo(() => Place)
    places: Place

    @BelongsTo(() => Category)
    category: Category

}
