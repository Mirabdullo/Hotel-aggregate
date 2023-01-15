import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'besh yulduz',
    description: 'Mehmonxona categoriasi',
  })
  @IsNumber({}, { message: 'id must be number' })
  guest_id: number;

  @ApiProperty({
    example: 'besh yulduz',
    description: 'Mehmonxona categoriasi',
  })
  @IsNotEmpty()
  @IsString({ message: 'comment must be string' })
  comment: string;

  @ApiProperty({
    example: 'besh yulduz',
    description: 'Mehmonxona categoriasi',
  })
  @IsNumber({}, { message: 'reyting must be number' })
  reyting: number;
}
