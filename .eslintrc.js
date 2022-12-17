module.exports = {
  extends: 'eslint-config-egg',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: [
        '@babel/preset-react',
      ],
    },
  },
  plugins: [
    'react',
  ],
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      extends: 'eslint-config-egg/typescript',
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint/eslint-plugin',
        'react',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'arrow-parens': [ 'warn', 'always' ],
      },
    },
  ],
  rules: {
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 'error',
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '(^_)|(^props$)|(^e$)|(^React$)',
      },
    ],
    'arrow-parens': [ 'warn', 'always' ],
    'no-empty': [ 'error', { allowEmptyCatch: true }],
    'prefer-promise-reject-errors': 'off',
  },
};
