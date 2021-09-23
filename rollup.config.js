import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  plugins: [
    terser(),
  ],
  output: [
    {
      file: pkg.module,
      format: "esm",
    },
    {
      file: pkg.browser,
      format: "iife",
      name: "Petungan",
    },
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
};
