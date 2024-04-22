import{d as e,c as o,o as n,f as a}from"./index-273a13f6.js";const r={class:"markdown-body"},i=a(`<p>Yep, I’m talking about this blog. All of these posts are written in Markdown and dynamically imported as VueJS components.</p><p>Initially, every post was imported manually. Implementation was pretty simple but every time I created a new post, I need to import it manually in my component, and as the posts increase, so would the number of manual imports.</p><p>So this is how I did it.</p><h1>Install packages</h1><p>Here’s the packages I’m using:</p><p><a href="https://github.com/antfu/vite-plugin-md">vite-plugin-md</a> - This plugin allows us to import Markdown files as components, which cut out most of my work for me.</p><p><a href="https://github.com/jxson/front-matter">front-matter</a> - Frontmatter is kind of like the “metadata” of Markdown docs. For me, I’m using it to store my post title and date. This package will “extract” the Frontmatter from the Markdown docs for me.</p><p>Install these packages with <code class="">npm install vite-plugin-md front-matter -D</code></p><h1>Setup vite-plugin-md</h1><p>Setup is pretty straightforward and you can view their docs for more examples, but this is what I did:</p><pre><code class="">// vite.config.ts
import { URL, fileURLToPath } from &#39;node:url&#39;

import { defineConfig } from &#39;vite&#39;
import svgLoader from &#39;vite-svg-loader&#39;
import vue from &#39;@vitejs/plugin-vue&#39;

export default (async () =&gt; {
    const Markdown = (await import(&#39;vite-plugin-md&#39;)).default

    return defineConfig({
        plugins: [vue({ include: [/\\.vue$/, /\\.md$/] }), svgLoader(), Markdown()],
        resolve: {
            alias: {
                &#39;@&#39;: fileURLToPath(new URL(&#39;./src&#39;, import.meta.url))
            }
        }
    })
})()
</code></pre><p>And some extra configuration because I’m using Typescript:</p><pre><code class="">// tsconfig.json
{
    ...
    &quot;compilerOptions&quot;: {
        ...
        &quot;types&quot;: [&quot;vite-svg-loader&quot;, &quot;vite/client&quot;]
    }
}
</code></pre><pre><code class="">// env.d.ts
/// &lt;reference types=&quot;vite/client&quot; /&gt;
/// &lt;reference types=&quot;vite-svg-loader&quot; /&gt;

declare module &#39;*.md&#39; {
    import type { DefineComponent } from &#39;vue&#39;
    const component: DefineComponent&lt;{}, {}, any&gt;
    export default component

    // if you&#39;re using frontmatter from vite-plugin-md
    // but note that in this project, i&#39;m using a separate library
    // more on this in the next section
    import type { Frontmatter } from &#39;vite-plugin-md&#39;
    export const frontmatter: Frontmatter
}
</code></pre><h1>Write script</h1><p>Next I wrote a simple script that uses the package <a href="https://github.com/jxson/front-matter">front-matter</a> to extract all the frontmatter from my posts like this:</p><pre><code class="">// scripts/ExtractFrontmatter.ts
const fs = require(&#39;fs&#39;)
const fm = require(&#39;front-matter&#39;)

const convertToSlug = text =&gt; {
    return text
        .toLowerCase()
        .replace(/[^\\w ]+/g, &#39;&#39;)
        .replace(/ +/g, &#39;-&#39;)
}

const allAttrs = fs
    .readdirSync(&#39;./src/docs&#39;) // reading all Markdown files
    .map(file =&gt; {
        if (!file.includes(&#39;.md&#39;)) {
            return undefined
        }

        const data = fs.readFileSync(\`./src/docs/\${file}\`, { encoding: &#39;utf8&#39; })
        const { attributes } = fm(data)

        return {
            ...attributes,
            fileName: file,
            slug: convertToSlug(attributes.title)
        }
    })
    .filter(attr =&gt; !!attr)

fs.writeFileSync(&#39;./src/docs/generated.json&#39;, JSON.stringify(allAttrs))
</code></pre><p>This script gets all the Markdown files in my <code class="">src/docs</code> directory, extracts the Frontmatter as <code class="">attributes</code> along with the file name and slug into an array in JSON format, sorted by date, which can be imported and used.</p><p>Now every time I add a new post to <code class="">src/docs</code>, I just need to run <code class="">node scripts/ExtractFrontmatter.ts</code> before I run <code class="">npm run build</code>.</p><p>This is what the generated data looks like:</p><pre><code class="">[
    {
        &quot;title&quot;: &quot;Adding middlewares to GraphQL resolvers&quot;,
        &quot;date&quot;: &quot;3/1/24&quot;,
        &quot;fileName&quot;: &quot;3rd_jan_24.md&quot;,
        &quot;slug&quot;: &quot;adding-middlewares-to-graphql-resolvers&quot;
    },
    {
        &quot;title&quot;: &quot;Adding registered Auth0 user to database&quot;,
        &quot;date&quot;: &quot;19/11/23&quot;,
        &quot;fileName&quot;: &quot;19th_nov_23.md&quot;,
        &quot;slug&quot;: &quot;adding-registered-auth0-user-to-database&quot;
    },
    {
        &quot;title&quot;: &quot;Adding user email to Auth0 token claims&quot;,
        &quot;date&quot;: &quot;17/11/23&quot;,
        &quot;fileName&quot;: &quot;17th_nov_23.md&quot;,
        &quot;slug&quot;: &quot;adding-user-email-to-auth0-token-claims&quot;
    },
    ...
]
</code></pre><p>Side note, I know that <a href="https://github.com/antfu/vite-plugin-md">vite-plugin-md</a> can also extract frontmatter from Markdown docs, but this is a Vite plugin and I’m writing a script that is not processed by Vite.</p><h1>Creating routes for each post</h1><p>Now that I have the posts data generated, I can use these data to create the route for each post like so:</p><pre><code class="">// src/router/index.ts
import { createRouter, createWebHistory } from &#39;vue-router&#39;

import posts from &#39;@/docs/generated.json&#39;

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: &#39;/&#39;,
            name: &#39;home&#39;,
            component: () =&gt; import(&#39;../views/HomeView.vue&#39;)
        },
        ...posts.map(({ title, date, slug, fileName }) =&gt; ({
            path: \`/\${slug}\`,
            name: slug,
            meta: { isPost: true, date, title },
            component: () =&gt; import(\`@/docs/\${fileName.replace(&#39;.md&#39;, &#39;&#39;)}.md\`)
        }))
    ]
})

export default router
</code></pre><p>I know doing this</p><pre><code class="">() =&gt; import(\`@/docs/\${fileName.replace(&#39;.md&#39;, &#39;&#39;)}.md\`)
</code></pre><p>looks weird because… why am I replacing <code class="">.md</code> just to add it in later? Why not just do</p><pre><code class="">() =&gt; import(\`@/docs/\${fileName}\`)
</code></pre><p>for simplycity sake?</p><p>Reason being, Vite cannot read the import without the extension explicitly defined. During runtime, Vite will throw a “Cannot dynamically import module” error and the component won’t load.</p><p>This is also where the package <a href="https://github.com/antfu/vite-plugin-md">vite-plugin-md</a> comes in. As you can see, we’re not importing a Vue component but a Markdown doc, but this plugin will import the Markdown doc as a Vue component instead.</p><h1>Displaying posts</h1><p>On the homepage, I will display all posts, so this is pretty straightforward, I just import all the generated posts and display it. You can view the code <a href="https://github.com/fattynomnom/fattynomnom.github.io/blob/main/src/views/HomeView.vue">here</a>.</p><p>And as for displaying the post directly, you can view it <a href="https://github.com/fattynomnom/fattynomnom.github.io/blob/main/src/App.vue">here</a>.</p><p>Sorry, I’d paste the Vue code here but I just realized there is a downside to using <a href="https://github.com/antfu/vite-plugin-md">vite-plugin-md</a> - I can’t embed Vue-related code as it seems that Vite is also processing it. This is even after escaping it with \`\`\`.</p><p>And thats pretty much it! It was so simple but it took me so long to finally convert from manually importing my posts to this. Overall, the effort it took is much less than I thought.</p><p>If you want to view the entire codebase, heres a link to my Github repo for this site: <a href="https://github.com/fattynomnom/fattynomnom.github.io">fattynomnom.github.io</a>.</p>`,38),s=[i],c={title:"Create your own blog with Markdown and VueJS + Vite",date:"17/1/24"},l="",h=e({__name:"17_jan_24",setup(p,{expose:t}){return t({frontmatter:{title:"Create your own blog with Markdown and VueJS + Vite",date:"17/1/24"},excerpt:void 0}),(d,u)=>(n(),o("div",r,s))}});export{h as default,l as excerpt,c as frontmatter};
