import { IMailProvider } from "../../core/providers/IMailProvider"
import { Feedback } from "../entities/feedback"
import { IFeedbackRepository } from "../repositories/Ifeedback-repository"

export interface FeedbackRequest {
  type: string
  comment: string
  screenshot?: string
}

export class CreateFeedback {
  constructor(
    private readonly feedbackRepository: IFeedbackRepository,
    private readonly mailProvider: IMailProvider
  ) { }

  async execute({ type, comment, screenshot }: FeedbackRequest) {
    if (!type) {
      throw new Error('Type is required')
    }
    if (!comment) {
      throw new Error('Comment is required')
    }
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format')
    }
    const newFeedback = Feedback.New({
      type,
      comment,
      screenshot
    })
    await this.feedbackRepository.create(newFeedback.props)

    await this.mailProvider.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src=${screenshot} />` : ``,
        `</div>`
      ].join('\n')
    })
  }
}