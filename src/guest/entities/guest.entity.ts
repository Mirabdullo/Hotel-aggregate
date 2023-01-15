import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guest')
export class Guest {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
    nullable: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Akmal', description: 'Guestning ismi' })
  @Column({
    nullable: false,
  })
  last_name: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
  })
  phone_number: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
  })
  password: string;

  @ApiProperty({ example: 'Fayziyev', description: 'Guestning familiyasi' })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '1', description: 'Guestning jinsi 1 yoki 2' })
  @Column({
    unique: true,
  })
  gender: number;


}
