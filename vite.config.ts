import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve( process.cwd(), '.', dir )
}
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3006,
  },
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  }
});
