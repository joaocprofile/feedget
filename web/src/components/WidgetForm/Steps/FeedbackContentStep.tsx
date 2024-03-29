import { FormEvent, useState } from "react"

import { ArrowLeft } from "phosphor-react"

import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../../ScreenshotButton"
import { api } from "../../../services/api"
import { Loading } from "../../Loading"

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackSent: () => void
  onFeedbackTypeRestart: () => void
}
export function FeedbackContentStep({
  feedbackType,
  onFeedbackSent,
  onFeedbackTypeRestart
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  function screenshotTook(screenshot: string) {
    setScreenshot(screenshot)
  }
  const feedbackInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()
    setIsSendingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })

    onFeedbackSent()
    setIsSendingFeedback(false)
  }
  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          type="button"
          onClick={onFeedbackTypeRestart}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img className="w-6 h-6"
            src={feedbackInfo.image.source} alt={feedbackInfo.image.alt}
          />
          {feedbackInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="
            min-w-[304px] 
            w-full min-h-[112px] 
            text-sm 
            placeholder-zinc-400 
            text-zinc-50
            border-zinc-600
            bg-transparent
            rounded-md 
            focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none
            scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
            className="p-2 
                     bg-brand-500 
                       rounded-md
                       border-transparent 
                       flex-1 
                       flex 
                       justify-center 
                       items-center 
                       text-blue-50
                       text-sm hover:bg-brand-300
                       focus:outline-none
                       focus:ring-2 
                       focus:ring-offset-2 
                       focus:ring-offset-zinc-900 transition-colors
                       disabled:opacity-50 disabled:hover:bg-brand-500">
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}