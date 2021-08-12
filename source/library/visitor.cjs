import { Visitor as BaseVisitor } from '@virtualpatterns/babel-plugin-mablung/visitor'
import Is from '@pwn/is'

class Visitor extends BaseVisitor {

  constructor(babel) {
    super(babel)
  }

  get nodeType() {
    return [ 'StringLiteral' ]
  }

  onStringLiteralNode(path, state) {
    // console.log(`Visitor.onStringLiteralNode('${path.node.name}', state)`)

    let option = state.opts
    let rule = option.rule

    rule.forEach((rule) => {

      rule.searchForPattern = rule.searchForPattern ? rule.searchForPattern : Is.regexp(rule.searchFor) ? rule.searchFor : new RegExp(rule.searchFor, 'gi')

      path.node.value = path.node.value.replace(rule.searchForPattern, rule.replaceWith)

    })

  }

}

export { Visitor }

// {
//   'rule': [
//     {
//       'searchFor': '../error/replace-error.js',
//       'replaceWith': '...',
//     }
//   ]
// }      
