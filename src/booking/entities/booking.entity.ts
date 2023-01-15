import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking')
export class Booking {
  @ApiProperty({ example: '1', description: 'Unikalid' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '22.01.2023', description: 'Boshlanish vaqti' })
  @Column()
  start_date: Date;

  @ApiProperty({ example: '24.01.2023', description: 'Tugash vaqti' })
  @Column()
  end_date: Date;

  @ApiProperty({ example: '2', description: 'Mexmonlar soni' })
  @Column()
  guard_count: number;

  @ApiProperty({ example: '2', description: 'Bolalar soni' })
  @Column()
  children_count: number;

  @ApiProperty({ example: '1', description: 'Place id' })
  @Column()
  place_id: number;

  @ApiProperty({ example: '2', description: 'Guest id' })
  @Column()
  guest_id: number;

  @ApiProperty({example: '2340000', description: "Umumiy summa"})
  @Column()
  over_all: number


}
