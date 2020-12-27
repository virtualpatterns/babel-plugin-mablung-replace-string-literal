"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visitor = void 0;

var _is = _interopRequireDefault(require("@pwn/is"));

var _visitor = require("@virtualpatterns/mablung-babel-plugin/visitor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Visitor extends _visitor.Visitor {
  constructor(babel) {
    super(babel);
  }

  get nodeType() {
    return ['StringLiteral'];
  }

  onStringLiteralNode(path, state) {
    // console.log(`Visitor.onStringLiteralNode('${path.node.name}', state)`)
    let option = state.opts;
    let rule = option.rule;
    rule.forEach(rule => {
      rule.searchForPattern = rule.searchForPattern ? rule.searchForPattern : _is.default.regexp(rule.searchFor) ? rule.searchFor : new RegExp(rule.searchFor, 'gi');
      path.node.value = path.node.value.replace(rule.searchForPattern, rule.replaceWith);
    });
  }

} // {
//   'rule': [
//     {
//       'searchFor': '../error/replace-error.js',
//       'replaceWith': '...',
//     }
//   ]
// }      


exports.Visitor = Visitor;
//# sourceMappingURL=visitor.cjs.map