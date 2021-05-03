import { ApiProperty } from '@nestjs/swagger';
export class CreateProduct {
  @ApiProperty()
  title: string;

  @ApiProperty({
    default: 'Custom description'
  })
  description: string;

  @ApiProperty({
    default: 50,
    minimum: 1
  })
  price: number;
}