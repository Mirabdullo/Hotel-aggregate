import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class Comment {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    nullable: false,
  })
  guest_id: number;

  @ApiProperty({
    example: 'Shinam mexmonxona',
    description: 'Mexmonxona haqida fikrlar',
  })
  @Column({
    nullable: false,
  })
  comment: string;

  @ApiProperty({
    example: '10',
    description: "Mexmonxona reytingi 1dan 10 ga bo'lgan baholash tizimida",
  })
  @Column({
    nullable: false,
  })
  reyting: number;
}
