export interface ISendMailProps {
  subject: string
  body: string
}

export interface IMailProvider {
  sendMail(data: ISendMailProps): Promise<void>
}
