"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PACKAGE_NAME = 'useStateMix';
var PLUGIN_NAME = 'babel-plugin-none-reactive-effect';
var visitor = {
  ImportDeclaration: function ImportDeclaration(path, state) {
    if (path.get('source').isStringLiteral({
      value: PACKAGE_NAME
    })) {
      state.importedPackageName = path.get('specifiers.0.local').node.name;
    }
  },
  VariableDeclarator: function VariableDeclarator(path, state) {
    var t = state.t,
      importedPackageName = state.importedPackageName;
    if (path.get('init').isCallExpression() && path.get('init.callee').isIdentifier({
      name: importedPackageName
    }) && path.get('id').isArrayPattern() && path.get('id.elements').length === 2) {
      state.variableNames.push(path.get('id.elements.0').node.name);
      path.node.id.elements.push(t.identifier("".concat(path.get('id.elements.0').node.name, "Ref")));
    }
  },
  Identifier: function Identifier(path, state) {
    var t = state.t;
    if (!state.variableNames.includes(path.node.name)) {
      return;
    }
    var useEffectCallExpressionPath = path.find(function (parentPath) {
      return t.isCallExpression(parentPath.node) && t.isIdentifier(parentPath.get('callee').node, {
        name: 'useEffect'
      });
    });
    if (!useEffectCallExpressionPath || useEffectCallExpressionPath.get('arguments').length < 2 || !useEffectCallExpressionPath.get('arguments.1').isArrayExpression() || useEffectCallExpressionPath.get('arguments.1.elements').some(function (dependenciesListPath) {
      return t.isIdentifier(dependenciesListPath.node, {
        name: path.node.name
      });
    })) {
      return;
    }
    path.node.name = "".concat(path.node.name, "Ref");
  }
};
function _default(_ref) {
  var t = _ref.types;
  return {
    name: PLUGIN_NAME,
    visitor: {
      Program: function Program(path, state) {
        _fs["default"].writeFileSync('./ast.json', JSON.stringify(path.node, null, 2));
        path.traverse(visitor, {
          t: t,
          variableNames: [],
          importedPackageName: ''
        });
      }
    }
  };
}
//# sourceMappingURL=index.js.map