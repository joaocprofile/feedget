import crypto from 'crypto'

type FeedbackProps = {
  type: string
  comment: string
  screenshot?: string
}

export class Feedback {
  protected readonly _id: string
  public props: FeedbackProps

  private constructor(props: FeedbackProps, _id?: string) {
    this._id = _id ?? crypto.randomUUID()
    this.props = props
  }

  public static New(props: FeedbackProps, id?: string): Feedback {
    const feedback = new Feedback(props, id)
    return feedback
  }
}