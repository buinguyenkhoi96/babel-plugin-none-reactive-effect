import packageJson from '../package.json';
import logger from './logs';
const PACKAGE_NAME = 'use-none-reactive-state';

const visitor = {
  ImportDeclaration(path, state) {
    if (path.get('source').isStringLiteral({ value: PACKAGE_NAME })) {
      state.importedPackageName = path.get('specifiers.0.local').node.name;
    }
  },
  VariableDeclarator(path, state) {
    const { t, importedPackageName } = state;

    if (
      path.get('init').isCallExpression() &&
      path.get('init.callee').isIdentifier({ name: importedPackageName }) &&
      path.get('id').isArrayPattern() &&
      path.get('id.elements').length === 2
    ) {
      state.variableNames.push(path.get('id.elements.0').node.name);
      path.node.id.elements.push(t.identifier(`${path.get('id.elements.0').node.name}Ref`));
    }
  },
  Identifier(path, state) {
    const { t } = state;

    if (!state.variableNames.includes(path.node.name)) {
      return;
    }

    const useEffectCallExpressionPath = path.find((parentPath) =>
      t.isCallExpression(parentPath.node) &&
      t.isIdentifier(parentPath.get('callee').node, { name: 'useEffect' }) ||
      t.isIdentifier(parentPath.get('callee').node, { name: 'useCallback' }) ||
      t.isIdentifier(parentPath.get('callee').node, { name: 'useMemo' }));

    if (
      !useEffectCallExpressionPath
      || useEffectCallExpressionPath.get('arguments').length < 2
      || !useEffectCallExpressionPath.get('arguments.1').isArrayExpression()
      || useEffectCallExpressionPath.get('arguments.1.elements').some((dependenciesListPath) => t.isIdentifier(dependenciesListPath.node, { name: path.node.name }))
    ) {
      return;
    }

    if (path.parentPath.isObjectProperty()) {
      path.parentPath.get('value').replaceWith(t.identifier(`${path.node.name}Ref.current`));
    } else {
      path.replaceWith(t.identifier(`${path.node.name}Ref.current`));
    }

  }
};

export default function ({ types: t }) {
  return {
    name: packageJson.name,
    visitor: {
      Program(path, state) {
        path.traverse(visitor, { t, variableNames: [], importedPackageName: '' });
      },
    }
  };
}