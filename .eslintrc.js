module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
      useJSXTextNode: true,
    },
    sourceType: "module",
    requireConfigFile: false,
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "no-empty": ["error", { allowEmptyCatch: true }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
