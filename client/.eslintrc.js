module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    'max-len': ['error', 80, {
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
    }],
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'space-before-function-paren': ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    'react/jsx-filename-extension': ['warn', {
      extensions: ['.jsx', '.tsx'],
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
      },
    },
  },
};
