import { FakeFeedbackRepository } from "../../infra/prisma/repositories/fake-feedback-repository"
import { CreateFeedback } from "./create-feedback"

const sendMailSpy = jest.fn()

const feedbackRepository = new FakeFeedbackRepository()
const feedbackCreate = new CreateFeedback(
  feedbackRepository,
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to create a new feedback', async () => {
    await expect(feedbackCreate.execute({
      type: 'bug',
      comment: 'Problema na minha api'
    })).resolves.not.toThrow()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to create a new feedback with empty Type', async () => {
    await expect(feedbackCreate.execute({
      type: '',
      comment: 'Problema na minha api'
    }))
      .rejects
      .toThrow()
  })

  it('should not be able to create a new feedback with empty Comment', async () => {
    await expect(feedbackCreate.execute({
      type: 'bug',
      comment: ''
    }))
      .rejects
      .toThrow()
  })

  it('should not be able to create a new feedback with an invalid screenshot', async () => {
    await expect(feedbackCreate.execute({
      type: 'bug',
      comment: 'Problema na minha api',
      screenshot: 'invalid_image'
    }))
      .rejects
      .toThrow()
  })
})