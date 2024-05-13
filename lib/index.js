"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _fs = _interopRequireDefault(require("fs"));
var _excluded = ["types"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
var PACKAGE_NAME = 'useStateMix';
var PLUGIN_NAME = 'babel-plugin-none-reactive-effect';
var logs = [];
var visitor = {
  VariableDeclarator: function VariableDeclarator(path, _ref) {
    var t = _ref.t;
    if (path.get('init').isCallExpression() && path.get('init.callee').isIdentifier({
      name: PACKAGE_NAME
    }) && path.get('id').isArrayPattern() && path.get('id.elements').length === 2) {
      path.node.id.elements.push(t.identifier("".concat(path.get('id.elements.0').node.name, "Ref")));
    }
  }
};
function _default(_ref2) {
  var t = _ref2.types,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var importedName = '';
  return {
    name: PLUGIN_NAME,
    visitor: {
      Program: function Program(path, state) {
        path.traverse(visitor, {
          t: t
        });
      }
    }
  };
}
//# sourceMappingURL=index.js.map