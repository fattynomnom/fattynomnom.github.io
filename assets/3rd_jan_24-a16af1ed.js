import{d as n,c as t,o,f as s}from"./index-3bd1b11c.js";const a="/assets/3rd_jan_24_1-800dc83c.png",r={class:"markdown-body"},i=s(`<p>It’s been awhile, but I had very good excuse: work and more work. The holidays season has been STRESSFUL to say the least.</p><p>Anyway, I got to work adding more more queries and mutations, but before long, it started looking like this:</p><pre><code class="">// src/Resolvers.ts
const Resolvers: Resolvers = {
    Query: {
        ...
        getTransactions: async (
            _parent: unknown,
            _args: unknown,
            { user }: ApolloContext
        ) =&gt; {
            if (!user.email) {
                throw new GraphQLError(&#39;Unauthorized&#39;, {
                    extensions: {
                        code: &#39;401&#39;
                    }
                })
            }

            // fetch and return data
        }
    },
    Mutation: {
        ...
        addTransaction: async (
            _: unknown,
            { transaction }: MutationAddTransactionArgs,
            { user }: ApolloContext
        ) =&gt; {
            if (!user.email) {
                throw new GraphQLError(&#39;Unauthorized&#39;, {
                    extensions: {
                        code: &#39;401&#39;
                    }
                })
            }

            // update and return data
        }
    }
}
</code></pre><p>As you can see, <code class="">getTransactions</code> and <code class="">addTransaction</code> both have almost the same implementation - they both check if the user email exists in the context, and if not, they throw an error.</p><p><em>Why</em> I’m checking the email is besides the point. The problem here is as I keep adding more resolvers that needs this checking, this bit of code becomes repetitive, so the best solution is to create a single middleware that can be used by multiple resolvers.</p><p>I came across <a href="https://stackoverflow.com/questions/69600434/how-to-set-a-middleware-only-for-a-specific-resolver-in-graphql-backend-using-ap">this question</a> on StackOverflow and tried out the suggestion.</p><p>First, I installed the necessary packages via <code class="">npm install @graphql-tools/schema graphql-middleware</code>.</p><p>Then I created the middleware file, applying the auth middleware only for the resolvers I need, <code class="">getTransactions</code> and <code class="">addTransaction</code>:</p><pre><code class="">// src/middleware.ts
import { GraphQLError, GraphQLResolveInfo } from &#39;graphql&#39;

import { ApolloContext } from &#39;./types.d&#39;
import { ResolverFn } from &#39;./generated/graphql&#39;

const authResolver = async (
    resolve: ResolverFn&lt;object, object, ApolloContext, object&gt;,
    parent: object,
    args: object,
    context: ApolloContext,
    info: GraphQLResolveInfo
) =&gt; {
    if (!context.user.email) {
        throw new GraphQLError(&#39;Unauthorized&#39;, {
            extensions: {
                code: &#39;401&#39;
            }
        })
    }

    return resolve(parent, args, context, info)
}

const Middlewares = {
    Query: {
        getTransactions: authResolver
    },
    Mutation: {
        addTransaction: authResolver
    }
}

export default Middlewares
</code></pre><p>Lastly, I updated the <code class="">ApolloServer</code> initialization:</p><pre><code class="">// src/index.ts
import Resolvers from &#39;./Resolvers&#39;
import Middlewares from &#39;./middleware&#39;

const typeDefs = readFileSync(&#39;src/Schema.graphql&#39;, { encoding: &#39;utf-8&#39; })
const schema = makeExecutableSchema({ typeDefs, resolvers: Resolvers })
const schemaWithMiddleware = applyMiddleware(schema, Middlewares)
const server = new ApolloServer&lt;ApolloContext&gt;({
    schema: schemaWithMiddleware,
})
</code></pre><p>Now I can update my <code class="">Resolvers</code> file to remove the parts where I’m throwing a 401 error.</p><p>This is the result when testing it:</p><p><img src="`+a+'" alt="Apollo sandbox testing result"></p><p>As usual, you can find the full functioning code <a href="https://github.com/fattynomnom/itrack-expressjs">here</a>.</p><h1>Final thoughts</h1><p>This implementation isn’t as intuitive as I’d like it to be. What if a resolver needs multiple middlewares? I can foresee my middleware file easily becoming very complex very quickly, as opposed to in ExpressJS, where you can easily chain middlewares together using <code class="">app.use()</code>.</p><p>But maybe I’m being pessimistic and there is a clean, intuitive way to chain middlewares together, I just haven’t found it yet. Either way, I’ll update this space again with my findings!</p>',18),d=[i],m={title:"Adding middlewares to GraphQL resolvers",date:"3/1/24"},u="",g=n({__name:"3rd_jan_24",setup(c,{expose:e}){return e({frontmatter:{title:"Adding middlewares to GraphQL resolvers",date:"3/1/24"},excerpt:void 0}),(l,p)=>(o(),t("div",r,d))}});export{g as default,u as excerpt,m as frontmatter};
