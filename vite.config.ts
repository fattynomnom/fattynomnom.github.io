import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

export default (async () => {
    const Markdown = (await import('vite-plugin-md')).default

    return defineConfig({
        plugins: [vue({ include: [/\.vue$/, /\.md$/] }), svgLoader(), Markdown()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    })
})()
