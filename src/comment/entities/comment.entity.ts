import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Guest } from '../../guest/entities/guest.entity';

@Table({ tableName: 'comment', timestamps: false })
export class Comment extends Model<Comment> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Unikal id' })
  @ForeignKey(() => Guest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guest_id: number;

  @ApiProperty({
    example: 'Shinam mexmonxona',
    description: 'Mexmonxona haqida fikrlar',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ApiProperty({
    example: '10',
    description: "Mexmonxona reytingi 1dan 10 ga bo'lgan baholash tizimida",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reyting: number;

  @BelongsTo(() => Guest)
  guest: Guest
}
