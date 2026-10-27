import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
const config = [globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]), ...nextVitals, ...nextTs];
export default config;
