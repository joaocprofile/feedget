import { useState } from "react"

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import otherImageUrl from '../../assets/other.svg'
import { FeedbackContentStep } from "./Steps/FeedbackContentStep"
import { FeedbackSuccesstep } from "./Steps/FeedbackSuccessStep"
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Idéia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: otherImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleFeedbackTypeChanged(value: FeedbackType) {
    setFeedbackType(value)
  }
  function handleFeedbackTypeRestart() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccesstep
          onFeedbackTypeRestart={handleFeedbackTypeRestart}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep
              onFeedbackTypeChanged={handleFeedbackTypeChanged}
            />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackTypeRestart={handleFeedbackTypeRestart}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-1" href="https://ezhelp.com.br">Ezhelp</a>
      </footer>
    </div>
  )
}