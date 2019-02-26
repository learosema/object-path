import typescript from "rollup-plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    name: "objectPathGet",
    file: "./dist/object-path.umd.js",
    format: "umd"
  },
  plugins: [typescript()]
};
