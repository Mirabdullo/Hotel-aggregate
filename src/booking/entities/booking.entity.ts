import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'booking', timestamps: false })
export class Booking extends Model<Booking> {
  @ApiProperty({ example: '1', description: 'Unikalid' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '22.01.2023', description: 'Boshlanish vaqti' })
  @Column({
    type: DataType.DATE,
  })
  start_date: Date;

  @ApiProperty({ example: '24.01.2023', description: 'Tugash vaqti' })
  @Column({
    type: DataType.DATE,
  })
  end_date: Date;

  @ApiProperty({ example: '2', description: 'Mexmonlar soni' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guard_count: number;

  @ApiProperty({ example: '2', description: 'Bolalar soni' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  children_count: number;

  @ApiProperty({ example: '1', description: 'Place id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  place_id: number;

  @ApiProperty({ example: '2', description: 'Guest id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guest_id: number;

  @ApiProperty({ example: 'Tozalikka etibor berishingizni sorayman', description: 'Maxsus talab yoki takliflar' })
  @Column({
    type: DataType.STRING,
  })
  special_request: string

  @ApiProperty({ example: '2340000', description: 'Umumiy summa' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  over_all: number;

}
