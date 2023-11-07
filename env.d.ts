/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.md' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component

    import type { Frontmatter } from 'vite-plugin-md'
    export const frontmatter: Frontmatter
}
