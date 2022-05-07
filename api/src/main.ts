import { App } from './app'
import { feedbackRoutes } from './api/routes/feedback-routes'

const PORT = process.env.PORT || 3333

function main() {
  const server = App.CreateServer([
    feedbackRoutes
  ])
  server.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
  })
}
main()
