import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class CreateBookingDto {

  @ApiProperty({ example: '22.01.2023', description: 'Boshlanish vaqti' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ example: '24.01.2023', description: 'Tugash vaqti' })
  @IsDateString()
  end_date: Date;

  @ApiProperty({ example: '2', description: 'Mexmonlar soni' })
  @IsNumber()
  guard_count: number;

  @ApiProperty({ example: '2', description: 'Bolalar soni' })
  @IsNumber()
  children_count: number;

  @ApiProperty({ example: '1', description: 'Place id' })
  @IsNumber()
  place_id: number;

  @ApiProperty({ example: '2', description: 'Guest id' })
  @IsNumber()
  guest_id: number;

  @ApiProperty({example: '2340000', description: "Umumiy summa"})
  @IsNumber()
  over_all: number
}
