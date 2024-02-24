require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    env: {
        node: true, // Add this line
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "turbo", "prettier"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        "semi": "error",
        "no-empty": "warn",
        "no-empty-function": "warn",
        "prefer-const": "warn",
        "@typescript-eslint/no-empty-interface": "warn",
    },
};