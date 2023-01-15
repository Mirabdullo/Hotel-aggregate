import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { Comment } from "../../comment/entities/comment.entity";
import { Photo } from "../../photos/entities/photo.entity";
import { Place } from "../../place/entities/place.entity";

@Entity('hotel')
export class Hotel {
    @ApiProperty({example: "1", description: "Unikal id"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'ShoxSaroy', description: "Mexmonxona nomi"})
    @Column({
        nullable: false,
        unique: true
    })
    name: string

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @Column({
        nullable: false,
    })
    address: string

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona locatsiyasi"})
    @Column({
        nullable: false,
    })
    location: string

    @ApiProperty({example: 'Mexmonxona haqida malumotlar', description: "Mexmonxona haqida malumotlar"})
    @Column({
        nullable: false,
    })
    description: string

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    
    @Column({
        nullable: false,
        
    })
    photo_id: number

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @Column({
        nullable: false,
    })
    comment_id: number

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @Column({
        nullable: false,
    })
    place_id: number

    @ApiProperty({example: 'Toshkent sh. Chilonzor', description: "Mexmonxona addressi"})
    @Column({
        nullable: false,
    })
    category_id: number

    @OneToMany(type => Photo, photo => photo.hotel)
    photos: Photo[]

    @OneToMany(type => Comment, comment => comment.id)
    comments: Comment[]

    @OneToMany(type => Place, place => place.id)
    place: Place[]

    @OneToOne(type => Category)
    category: Category
}
