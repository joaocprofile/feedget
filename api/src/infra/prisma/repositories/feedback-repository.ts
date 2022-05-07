import { connection } from ".."
import { FeedbackCreateData, IFeedbackRepository } from "../../../domain/repositories/Ifeedback-repository"

export class FeedbackRepository implements IFeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData): Promise<void> {
    await connection.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}
