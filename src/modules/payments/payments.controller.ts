import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MercadopagoResponse } from 'src/modules/payments/interfaces/mercadopago-response.interface.ts';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('mercadopago/confirm')
  @ApiOperation({ summary: 'Receptor de notificaciones de mercado Pago', description: 'Las notificaciones se enviarán cada vez que se cree un pago o se modifique su estado (Pendiente, Rechazado o Aprobado). En el campo notification_url, indica la URL desde la que se recibirán las notificaciones.' })
  @ApiOkResponse({
    description: 'Mercadopago espera una respuesta para validar que esa recepción fue correcta. Para eso, debes devolver un HTTP STATUS 200 (OK) o 201 (CREATED).',
  })
  @ApiBody({ type: MercadopagoResponse, description: 'La notificación será enviada con formato JSON atraves de la plataforma de Mercado Pago' })
  confirmPayment(@Body() notification: MercadopagoResponse) {
    try {
      return this.paymentsService.confirmPayment(notification)
    } catch (error) {
      return error.message
    }
  }
}
