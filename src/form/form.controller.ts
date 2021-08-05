import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { IClient } from 'src/interfaces/client.interface';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('form')
export class FormController {
  constructor(private mailerServive: MailerService) {}

  @Post()
  async sendEmail(@Body() body: IClient, @Res() res: Response): Promise<any> {
    try {
      const info = await this.mailerServive.transporter.sendMail({
        from: `"Cliente👻" <${body.email}>`, // sender address
        to: 'laboratoriodentalflores1@gmail.com', // list of receivers
        subject: 'Cliente', // Subject line
        text: `
          Telefono: ${body.phone}

          ${body.message}

          - De: ${body.name}
        `, // plain text body
        // html: '<b>Hello world?</b>', // html body
      });
    } catch {
      res.status(200).json({ msg: 'err' });
    }
    res.status(200).json({ msg: 'ok' });
  }
}
