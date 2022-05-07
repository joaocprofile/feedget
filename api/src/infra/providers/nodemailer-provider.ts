import nodemailer from 'nodemailer'

import { IMailProvider, ISendMailProps } from "../../core/providers/IMailProvider";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9e4abd98f6b9e0",
    pass: "74dbceefb3f202"
  }
});

export class NodemailerProvider implements IMailProvider {
  async sendMail({ subject, body }: ISendMailProps): Promise<void> {

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com.br>',
      to: 'João Carvalho <joao@finmily.com>',
      subject,
      html: body
    })
  }

}