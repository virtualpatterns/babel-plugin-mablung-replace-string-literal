import { VisitorError } from '@virtualpatterns/mablung-babel-plugin/visitor-error'

class ReplaceStringLiteralError extends VisitorError {

  constructor(...parameter) {
    super(...parameter)
  }

}

export { ReplaceStringLiteralError }
