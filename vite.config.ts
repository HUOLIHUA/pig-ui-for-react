import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { HOST_API } from './src/config/web-setting'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    /**开启css module */
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/assets/style/variables.less')}";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    cors: true,
    port: 5000,
    proxy: {
      '/api': {
        target: HOST_API,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
