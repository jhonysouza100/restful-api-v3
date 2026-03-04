import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/common/enums/role.enum";

export class PayloadInterface {
  @ApiProperty({
    example: 1,
  })
  id: number;
  
  @ApiProperty({
    example: 'jhon',
  })
  name: string;
  
  @ApiProperty({
    example: 'jhon@gmail.com',
  })
  email: String;
 
  @ApiProperty({
    example: Role.ADMIN,
  })
  role: String;
  
  @ApiProperty({
    example: 'images.com/user_image.jpg',
  })
  picture: string;
}