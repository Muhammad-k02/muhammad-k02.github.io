module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react', 
    'import', 
    'unused-imports',
    'simple-import-sort'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx']
      }
    }
  },
  rules: {
    // Import sorting
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // Possible Errors
    'no-console': 'warn',
    'no-debugger': 'warn',

    // Best Practices
    'eqeqeq': ['error', 'always'],
    'no-unused-vars': 'off', // Disabled in favor of unused-imports plugin
    
    // Stylistic Issues
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    
    // React Rules
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    
    // Import Rules
    'import/order': ['error', {
      'groups': [
        'builtin', 
        'external', 
        'internal', 
        ['parent', 'sibling', 'index']
      ],
      'newlines-between': 'always'
    }],
    'import/no-unresolved': 'error',
    'import/named': 'error',
    
    // Unused Imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { 
        'vars': 'all', 
        'varsIgnorePattern': '^_', 
        'args': 'after-used', 
        'argsIgnorePattern': '^_' 
      }
    ]
  }
};
