import{d as n,c as o,f as s,o as r}from"./index-5a3f0592.js";const a={class:"markdown-body"},d={title:"Generate typings from GraphQL schema",date:"16/11/23"},l="",g=n({__name:"16th_nov_23",setup(p,{expose:t}){return t({frontmatter:{title:"Generate typings from GraphQL schema",date:"16/11/23"},excerpt:void 0}),(c,e)=>(r(),o("div",a,e[0]||(e[0]=[s(`<p>As mentioned, I am a huge Typescript fan. So when I accidentally came across <a href="https://www.apollographql.com/docs/apollo-server/workflow/generate-types/">this tutorial</a> to generate typings from my GraphQL schema using Codegen… I just had to. A little sidetracked from my previous goal, but this was easy enough to do.</p><p>So without Codegen, I was doing this:</p><pre><code class="">// src/Schema.ts
const Schema = \`#graphql
    type User {
        email: String!
    }
    type Query {
        getAllUsers: [User]
    }
    type Mutation {
        addUser(email: String): User
    }
\`
export default Schema
</code></pre><pre><code class="">// src/models.ts
export interface User {
    email: string
}
</code></pre><p>At this stage, since I only had one model <code class="">User</code>, it is still maintainable.</p><p>But when I start adding more models, it can easily get out of hand. There would be two separate files with many different models that I need to maintain. Its more work, and frankly people aren’t perfect, we’re a lot more prone to making errors.</p><p>So it makes sense to use Codegen to automatically generate typings based on the schema. Define it once and never do it again.</p><p>The <a href="https://www.apollographql.com/docs/apollo-server/workflow/generate-types/">tutorial</a> was pretty straightforward so I won’t go into it, but here’s my config anyway for reference:</p><pre><code class="">// codegen.ts
import type { CodegenConfig } from &#39;@graphql-codegen/cli&#39;

const config: CodegenConfig = {
    overwrite: true,
    schema: &#39;src/Schema.graphql&#39;,
    generates: {
        &#39;src/generated/graphql.ts&#39;: {
            plugins: [&#39;typescript&#39;, &#39;typescript-resolvers&#39;]
        }
    }
}

export default config
</code></pre><p>And my scripts:</p><pre><code class="">// package.json
...
&quot;scripts&quot;: {
    ...
    &quot;codegen&quot;: &quot;graphql-codegen --config codegen.ts&quot;,
    &quot;build&quot;: &quot;npm run codegen &amp;&amp; tsc&quot;,
    &quot;start&quot;: &quot;npm run build &amp;&amp; node dist/index.js&quot;
},
</code></pre><p>Then all I needed to do was run <code class="">npm run codegen</code> to generate my typings in <code class="">src/generated/graphql.ts</code>.</p><p>With this, I can remove my <code class="">src/models.ts</code> file. This is how I used the generated types:</p><pre><code class="">// src/Resolvers.ts
import { MutationAddUserArgs, Resolvers } from &#39;./generated/graphql&#39;

const Resolvers: Resolvers = {
    Query: {
        getAllUsers: async () =&gt; {
            ...
        }
    },
    Mutation: {
        addUser: async (_: unknown, user: MutationAddUserArgs) =&gt; {
            ...
        }
    }
}

export default Resolvers
</code></pre><pre><code class="">// src/index.ts
import { User } from &#39;./generated/graphql&#39;

interface ApolloContext {
    user: User
}
</code></pre><p>I finished up by adding my generated types file to my Eslint ignore list as well as my <code class="">.gitignore</code>.</p><p>I’ve committed my changes to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p><p>Ok now onto the next thing: adding user details to token claims.</p>`,18)])))}});export{g as default,l as excerpt,d as frontmatter};
