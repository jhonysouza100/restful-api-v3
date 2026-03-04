import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TenantGuard } from 'src/core/guards/tenant.guard';
import { SheetsErrorResponse } from 'src/modules/sheets/interfaces/sheets-response.interface';
import { SheetsService } from './sheets.service';

@Controller('sheets')
@UseGuards(TenantGuard)
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Google Spreadsheets', description: 'Retrieve data from Google Sheets associated with the tenant.' })
  @ApiNotFoundResponse({
    description: 'No se paso un id de hoja de calculo o el id es incorrecto. El id se obtinene de la configuración del tenant.',
    type: SheetsErrorResponse
  })
  @ApiOkResponse({
    description: 'Google Sheets data es un array de arrays con la información obtenida de las hojas de cálculo, cada String[] es una fila.',
    schema: {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'string' }
      },
      example: [["Sheet1-A", "Sheet1-B"], ["Sheet2-A", "Sheet2-B"]],
    }
  })
  async getGoogleSheets() {
    return await this.sheetsService.getGoogleSheets();
  }
}