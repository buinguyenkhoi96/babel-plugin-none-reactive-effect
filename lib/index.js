"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
function _default(babel) {
  console.log(babel);
  return {
    visitor: {
      Identifier: function Identifier(id) {
        console.log('====================================');
        console.log(id);
        console.log('====================================');
      }
    }
  };
}