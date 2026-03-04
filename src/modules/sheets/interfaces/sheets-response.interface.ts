import { ApiProperty } from "@nestjs/swagger";

export class SheetsErrorResponse {
  @ApiProperty({
    example: 'Failed to get Google Sheets client'
  })
  message: string;

  @ApiProperty({
    example: 'Not Found'
  })
  error: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number
}