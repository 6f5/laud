import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import { defineConfig } from "rollup";
import { fileURLToPath } from "url"
import { join } from "path";

const __dirname = join(fileURLToPath(import.meta.url), "..")
const declarationDir = join(__dirname, "dist", "dts")
export default defineConfig({
  input: "src/index.ts",
  output: [
    { file: "dist/laud.js", format: "cjs" },
    { file: "dist/laud.min.js", format: "cjs", plugins: [terser()], name: "laud" },
    { file: "dist/laud.es.js", format: "es" },
    { file: "dist/laud.es.min.js", format: "es", plugins: [terser()] }
  ],
  plugins: [typescript({ compilerOptions: { target: "es5" } }), typescript({ declaration: true, outDir: declarationDir })]
})
