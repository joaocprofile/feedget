import { Feedback } from "../../../domain/entities/feedback"
import { FeedbackCreateData, IFeedbackRepository } from "../../../domain/repositories/Ifeedback-repository"

export class FakeFeedbackRepository implements IFeedbackRepository {

  private readonly feedbacks: FeedbackCreateData[]

  constructor() {
    this.feedbacks = []
  }

  async create({ type, comment, screenshot }: FeedbackCreateData): Promise<void> {
    const feedback = Feedback.New({
      type,
      comment,
      screenshot
    })
    this.feedbacks.push(feedback.props)
    console.log(feedback)
  }
}
