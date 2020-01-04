import * as  Parameter from 'parameter'

const validate = paramPart => rule => {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value
    descriptor.value = function() {
      const ctx = arguments[0]
      const data = ctx[paramPart]
      const p = new Parameter()
      const errors = p.validate(rule, data)
      if (errors) throw new Error(JSON.stringify(errors))
      return oldValue.apply(null, arguments)
    }
    return descriptor
  }
}

export const querystring = validate('query')
export const body = validate('body')