import { Router } from "express"
import { Route } from "../../core/abstract/Route"
import { CreateFeedback } from "../../domain/services/create-feedback"
import { FeedbackRepository } from "../../infra/prisma/repositories/feedback-repository"
import { NodemailerProvider } from "../../infra/providers/nodemailer-provider"

class FeedbackRoutes extends Route {

  public applyRoute(route: Router): void {

    route.post('/feedbacks', async (request, response) => {
      const { type, comment, screenshot } = request.body
      const feedbackRepository = new FeedbackRepository()
      const nodeMailerProvider = new NodemailerProvider()
      const createFeedback = new CreateFeedback(
        feedbackRepository,
        nodeMailerProvider
      )
      await createFeedback.execute({ type, comment, screenshot })
      return response.status(201).send()
    })
  }

}

export const feedbackRoutes = new FeedbackRoutes()