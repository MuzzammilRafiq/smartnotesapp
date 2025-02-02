const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "no-console": "warn", // Example: change `console.log` to warnings instead of errors
    },
  },
];

export default eslintConfig;
