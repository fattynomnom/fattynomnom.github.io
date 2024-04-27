import{d as t,c as n,o as s,f as o}from"./index-4e9bca00.js";const r={class:"markdown-body"},i=o(`<p>Along with Typescript, writing tests is the best way to go to ensure that your code is as error-proof as it can get. I didn’t really come from a testing background (having been spoiled by QA testing), but when I transitioned into a new company, it was required. And I have to say, it does make a difference.</p><p>With so many tutorials and docs on how to setup Jest for testing with different frameworks, I’m going to document my own so that I can use this as a guide to refer back to later.</p><h1>Setting up Jest with Typescript</h1><p>Install the required dependencies:</p><pre><code class="">npm install -D @types/jest jest ts-jest
</code></pre><p>And setup your <code class="">jest.config.js</code> file in the root of your project’s directory:</p><pre><code class="">// jest.config.js
/** @type {import(&#39;ts-jest&#39;).JestConfigWithTsJest} */
module.exports = {
    preset: &#39;ts-jest&#39;,
    testEnvironment: &#39;node&#39;,
    setupFiles: [&#39;dotenv/config&#39;]
}
</code></pre><p>Then add this command in the <code class="">scripts</code> section of your <code class="">package.json</code>:</p><pre><code class="">{
    &quot;scripts&quot;: {
        &quot;test&quot;: &quot;jest&quot;
    }
}
</code></pre><p>With this setup, you’ll be able to start writing Jest tests and run tests with <code class="">npm run test</code>.</p><h1>Using integration testing with GraphQL for unit testing resolvers</h1><p>I found <a href="https://www.apollographql.com/docs/apollo-server/testing/testing/">this documentation</a> on integration testing. What Apollo intended for was to be enable users to do a full integration test of their GraphQL resolvers pipeline.</p><p>Previously I talked about implementing <a href="https://fattynomnom.github.io/adding-middlewares-to-graphql-resolvers">middlewares for my GraphQL resolvers</a>. While you can certainly use Apollo’s integrated testing to test the entire pipeline (from middlewares to resolvers), I’m not going to do that. Technically, I will be using their integrated testing utility to “unit” test my resolvers.</p><p>I know it kind of defeats the purpose, but just as a personal preference, I prefer to make sure each step in my pipeline is well unit tested. I feel that with integrated testing, I am unable to write concise tests that specifically tests for a particular outcome because an integrated test tends to become quite large. Unit testing feels easier to maintain for me while making sure each part of the code is doing what it should do.</p><p>Justification aside, here’s how I’m unit testing my resolver:</p><pre><code class="">// resolvers/transactions.test.ts
import { ApolloContext } from &#39;../middlewares/setApolloContext&#39;
import { ApolloServer } from &#39;@apollo/server&#39;
import resolvers from &#39;.&#39;
import typeDefs from &#39;../typeDefs&#39;
import { prisma } from &#39;../database&#39;
import { TransactionFixture } from &#39;../__fixtures__/TransactionFixture&#39;
import MockDate from &#39;mockdate&#39;

jest.mock(&#39;../database&#39;, () =&gt; ({
    prisma: {
        transaction: {
            findMany: jest.fn()
        }
    }
}))

describe(&#39;transactions&#39;, () =&gt; {
    const testServer = new ApolloServer&lt;ApolloContext&gt;({
        typeDefs,
        resolvers // You can see that I am excluding my middlewares here just to test my resolvers alone
    })
    const contextValue = {
        user: {
            id: &#39;user_id&#39;
        }
    }

    it(&#39;returns transactions belonging to the user&#39;, async () =&gt; {
        jest.mocked(prisma.transaction.findMany).mockResolvedValueOnce([
            TransactionFixture
        ])

        const response = await testServer.executeOperation(
            {
                query: \`
                    query testGetTransactions {
                        getTransactions {
                            uid
                        }
                    }
                \`
            },
            {
                contextValue
            }
        )

        expect(prisma.transaction.findMany).toHaveBeenCalledWith({
            where: {
                user_id: &#39;user_id&#39;
            }
        })
        expect(response.body).toMatchObject({
            singleResult: {
                data: {
                    getTransactions: [TransactionFixture]
                }
            }
        })
    })
})
</code></pre><p>And thats it! It seems simple but I spent a long time trying to find a way to “unit” test my resolvers. Like should I be using Supertest? Should I start the Express server? How do I start the Apollo server for testing? But eventually I found my way here and what works for me.</p><p>You can find my implementation in <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p>`,18),a=[i],u={title:"Integration testing with GraphQL",date:"27/04/24"},m="",h=t({__name:"27th_apr_24",setup(p,{expose:e}){return e({frontmatter:{title:"Integration testing with GraphQL",date:"27/04/24"},excerpt:void 0}),(c,l)=>(s(),n("div",r,a))}});export{h as default,m as excerpt,u as frontmatter};
