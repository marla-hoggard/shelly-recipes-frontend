module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // Check these
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/ban-ts-comment": "off",
    "no-bitwise": ["error"],
    "no-trailing-spaces": ["warn"],
    "no-else-return": ["off"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "no-underscore-dangle": ["warn", { allow: ["_token", "_error"] }],
    "func-names": ["warn", "as-needed"],
    "no-redeclare": ["error"],
    "no-shadow": ["warn"],
    "padded-blocks": ["warn", "never"],
    "no-multiple-empty-lines": ["warn", { max: 2 }],
    semi: ["warn"],
    "new-cap": ["off"],

    "react/display-name": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/jsx-sort-props": ["off"],
    "react/no-unescaped-entities": ["off"],
    "react/prop-types": ["off"],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "react-hooks/exhaustive-deps": ["warn"],
  },
};
