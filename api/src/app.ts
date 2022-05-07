import express, { Application } from 'express'
import cors from 'cors'

import "reflect-metadata"
import './infra/DI'

import { Route } from './core/abstract/Route'

export class App {
  private application: Application

  private constructor() {
    this.application = express()
  }

  private async bootstrap(routes: Route[]): Promise<void> {
    this.application.use(express.json())
    this.application.use(cors())

    this.application.get('/', (request, response) => {
      return response.status(200).json({
        service: 'API',
        version: '1',
        resources: [
          `POST: ${3000}/feedbacks`,
        ]
      })
    })
    for (let route of routes) {
      route.applyRoute(this.application)
    }
  }

  public static CreateServer(routes: Route[] = []): express.Application {
    const app = new App()
    app.bootstrap(routes)
    return app.application
  }
}