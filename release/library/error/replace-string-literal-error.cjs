"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplaceStringLiteralError = void 0;

var _visitorError = require("@virtualpatterns/mablung-babel-plugin/visitor-error");

class ReplaceStringLiteralError extends _visitorError.VisitorError {
  constructor(...parameter) {
    super(...parameter);
  }

}

exports.ReplaceStringLiteralError = ReplaceStringLiteralError;

//# sourceMappingURL=replace-string-literal-error.cjs.map