import{d as t,c as s,o,f as r}from"./index-401d1458.js";const n={class:"markdown-body"},a=r(`<p>So this was my initial “pattern” (or non-pattern really):</p><pre><code class="">| src
    - Resolvers.ts
    - TypeDefs.ts
    - index.ts
</code></pre><p>Where all my resolvers for all my models will be in one file <code class="">src/Resolvers.ts</code> and all my type definitions for all my models will be in <code class="">TypeDefs.ts</code>. I’m not going to put the code here, but as you can imagine, each file can get very large and messy, containing resolvers / type defs for different models.</p><p>As a clean freak, this irked me A LOT.</p><p>So I did some refactoring, and this is the design I came up with so far:</p><pre><code class="">| src
    - | resolvers
        - index.ts
        - transactions.ts
        - users.ts
    - | typeDefs
        - index.ts
        - transaction.graphql
        - user.graphql
    - index.ts
</code></pre><p>So now this looks better, each resolver and type defs file is split according to its model, but I still need to merge these resolvers and type defs together into one schema. <a href="https://the-guild.dev/graphql/tools">GraphQL tools</a> provides us the tools to do this.</p><h1>Install packages</h1><p>Since I don’t need all the tools that GraphQL tools provides, I just installed these 2 packages out of the box:</p><p><a href="https://the-guild.dev/graphql/tools/docs/schema-merging">@graphql-tools/merge</a> - Merges multiple resolvers / type defs into a single resolvers object / type definition to make up one schema.</p><p><a href="https://the-guild.dev/graphql/tools/docs/schema-merging#file-loading">@graphql-tools/load-files</a> - This one is pretty straightforward, this is used to import all our resolvers or type defs files.</p><p>Install these with <code class="">npm install @graphql-tools/merge @graphql-tools/load-files</code>.</p><h1>Merging type defs / resolvers</h1><p>I won’t go much into each model’s type defs as I think it’s self-explanatory, but this is my implementation for merging all my models’ type definitions:</p><pre><code class="">// src/typeDefs/index.ts
import { loadFilesSync } from &#39;@graphql-tools/load-files&#39;
import { mergeTypeDefs } from &#39;@graphql-tools/merge&#39;
import path from &#39;path&#39;

const typesArray = loadFilesSync(path.join(__dirname, &#39;./&#39;), {
    // view docs for more extensions
    extensions: [&#39;graphql&#39;],
    // ignores index.ts file
    ignoreIndex: true
})

export default mergeTypeDefs(typesArray)

</code></pre><p>This is also done the same way for <code class="">src/resolvers/index.ts</code>, just without the <code class="">graphql</code> extension config.</p><p>If you remember in a <a href="https://fattynomnom.github.io/generate-typings-from-graphql-schema">previous post</a> where I talked about using <a href="https://the-guild.dev/graphql/codegen/docs">Codegen</a> to generate Typescript types from GraphQL type defs, we would also need to re-configure it to generate typings from multiple type definition files.</p><p>This is my updated config:</p><pre><code class="">// codegen.ts
import type { CodegenConfig } from &#39;@graphql-codegen/cli&#39;

const config: CodegenConfig = {
    overwrite: true,
    schema: &#39;src/typeDefs/*.graphql&#39;, // note that I&#39;m using an asterik to generate from all .graphql extension files
    generates: {
        &#39;src/generated/graphql.ts&#39;: {
            plugins: [&#39;typescript&#39;, &#39;typescript-resolvers&#39;]
        }
    }
}

export default config
</code></pre><p>Ideally, I would’ve liked to separate the types across different files as well, but I have an issue where if I’m cross-referencing types, Codegen cannot import the type from other files for you (at least not that I know of). For example:</p><pre><code class="">// src/typeDefs/user.graphql
type User {
    email: String!
    transactions: Transaction // I am referencing another type in another file here
}
</code></pre><pre><code class="">// src/typeDefs/transaction.graphql
type Transaction { // I am using this type inside user.graphql
    ...
}
</code></pre><p>So if I were to separate the typings as well, Codegen would not be able to import the <code class="">Transaction</code> type inside <code class="">src/typeDefs/user.graphql</code> for me, and an error will be thrown if I try to run Codegen. I am PRETTY sure there is a way around this that I haven’t found yet. So its not pretty, but a single generated typings file will have to do for now.</p><p>And thats it, the pattern is pretty simple. If anyone would like to explore my files structure thoroughly, the full GitHub repo is <a href="https://github.com/fattynomnom/itrack-expressjs">here</a>.</p>`,24),i=[a],h={title:"GraphQL + ExpressJS clean architectural pattern",date:"19/1/24"},f="",g=t({__name:"18_jan_24",setup(l,{expose:e}){return e({frontmatter:{title:"GraphQL + ExpressJS clean architectural pattern",date:"19/1/24"},excerpt:void 0}),(p,d)=>(o(),s("div",n,i))}});export{g as default,f as excerpt,h as frontmatter};
