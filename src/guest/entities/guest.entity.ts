import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'guest', timestamps: false })
export class Guest extends Model<Guest> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Akmal', description: 'Guestning ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;


  @Column({
    type: DataType.STRING
  })
  refresh_token: string
}
