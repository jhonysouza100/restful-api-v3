import { ApiProperty } from "@nestjs/swagger";
import { PayloadInterface } from "src/common/interfaces/payload.interface";

export class AdminLoginOkResponse {
  @ApiProperty({
    example: 'jwt_token',
  })
  token: string;
  
  @ApiProperty({
    example: PayloadInterface,
    type: PayloadInterface
  })
  payload: PayloadInterface;
}

export class AdminLoginErrorResponse {
  @ApiProperty({
    example: 'Invalid password',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    example: 401,
  })
  statusCode: number
}

export class verifyOkResponse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: "admin",
  })
  name: string;

  @ApiProperty({
    example: "admin@gmail.com",
  })
  email: string;

  @ApiProperty({
    example: "ADMIN",
  })
  role: string;

  @ApiProperty({
    example: "https://image.jpg",
  })
  picture: string;

  @ApiProperty({
    example: 1763780612,
  })
  iat: number;
  @ApiProperty({
    example: 1763867012,
  })
  exp: number;
}

export class verifyErrorResponse {
  @ApiProperty({
    example: 'No session token were found',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    example: 401,
  })
  statusCode: number
}