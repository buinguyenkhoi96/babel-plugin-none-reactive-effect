import fs from 'fs';

const PACKAGE_NAME = 'useStateMix';
const PLUGIN_NAME = 'babel-plugin-none-reactive-effect';
const logs = []; 

const visitor = {
  VariableDeclarator(path, { t }) {
    if (
      path.get('init').isCallExpression() &&
      path.get('init.callee').isIdentifier({ name: PACKAGE_NAME }) &&
      path.get('id').isArrayPattern() &&
      path.get('id.elements').length === 2
    ) {
      path.node.id.elements.push(t.identifier(`${path.get('id.elements.0').node.name}Ref`));
    }
  },
};

export default function ({ types: t, ...rest }) {
  let importedName = '';

  return {
    name: PLUGIN_NAME,
    visitor: {
      Program(path, state) {
        path.traverse(visitor, { t });
      },
    }
  };
}