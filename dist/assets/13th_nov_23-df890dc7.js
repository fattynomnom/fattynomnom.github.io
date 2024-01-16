import{d as t,c as o,o as s,f as a}from"./index-a8b18d63.js";const n="/assets/13th_nov_23_1-fdfc503b.png",r="/assets/13th_nov_23_2-cdae4a2d.png",i="/assets/13th_nov_23_3-95325731.png",c={class:"markdown-body"},d=a('<p>Previously I talked about setting up an Apollo server with ExpressJs for GraphQL APIs, but these APIs aren’t protected. Ideally I want my APIs to be protected by something like an Authorization header.</p><p>I decided to go with <a href="https://auth0.com/docs/">Auth0</a> as this seems like the industry standard for authentication, plus it is a method that I haven’t tried before, so plenty of opportunity for learning.</p><p>First, I followed <a href="https://auth0.com/docs/quickstart/backend/nodejs/interactive">this tutorial</a> and created an API on the Auth0 dashboard like so:</p><p><img src="'+n+`" alt="Create API on Auth0 dashboard"></p><p>Then, using the <code class="">express-oauth2-jwt-bearer</code> package mentioned in the tutorial, I created the middleware that checks for the JWT token in the Authorization header:</p><pre><code class="">// src/index.ts
const checkJwt = auth({
    audience: ({}).AUTH0_API_AUDIENCE,
    issuerBaseURL: ({}).AUTH0_DOMAIN
})
</code></pre><p>Now I just need to add this middleware to my GraphQL routes, which took me awhile to find the resources I need for this, but eventually I found <a href="https://www.apollographql.com/docs/apollo-server/api/express-middleware/">this</a>.</p><p>Using this method of <code class="">expressMiddleware</code> allows me to add the <code class="">checkJwt</code> middleware like so:</p><pre><code class="">// src/index.ts
app.use(
    &#39;/graphql&#39;,
    cors(),
    express.json(),
    checkJwt,
    expressMiddleware(server, {
        context: async ({ req }) =&gt; {
            // add context here
        }
    })
)
</code></pre><p><strong>Very important note:</strong> Do remember that to use <code class="">expressMiddleware</code>, the <code class="">cors()</code> and <code class="">express.json()</code> are <strong>required</strong>.</p><p>I skimmed over this information in the docs and spent a good few hours trying to figure out why my Apollo server wasn’t starting. Lesson learned: do not skim.</p><p>What if I need something that is encoded in the JWT token claims?</p><p>I followed <a href="https://www.apollographql.com/docs/apollo-server/security/authentication/">this tutorial</a> and modified the <code class="">context</code> to the following:</p><pre><code class="">// src/index.ts
app.use(
    &#39;/graphql&#39;,
    cors(),
    express.json(),
    checkJwt,
    expressMiddleware(server, {
        context: async ({ req }) =&gt; {
            const token = req.headers.authorization || &#39;&#39;
            console.log(1, token)

            console.log(2, req.auth?.payload)

            return { user: { email: &#39;test@mail.com&#39; } }
        }
    })
)
</code></pre><p>Since I haven’t added anything to the claims yet, I will just use some loggers and return a static email to the context for now.</p><p>Now for testing, first I went to my Auth0 API dashboard and got a test token from the “Test” tab.</p><p>Then I launched my server via <code class="">npm run dev</code>, and used the <a href="https://studio.apollographql.com/sandbox/explorer">Apollo Sandbox</a> to test my GraphQL APIs:</p><p><img src="`+r+'" alt="Testing auth header on Apollo Sandbox"></p><p>It works! Checking my terminal showed that the token was also decoded successfully:</p><p><img src="'+i+'" alt="Results logged to console"></p><p>So now that everything works so far, my next step is to actually implement the authentication part in my <a href="https://github.com/fattynomnom/itrack-nextjs">NextJs client</a>.</p><p>I’ve committed all my progress so far to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p><p><strong>You can check the list of resources I’ve referenced here:</strong></p><ul><li><a href="https://auth0.com/docs/quickstart/backend/nodejs/interactive">Add authorization to an Express.js API application</a></li><li><a href="https://www.apollographql.com/docs/apollo-server/api/express-middleware/">expressMiddleware API docs</a></li><li><a href="https://www.apollographql.com/docs/apollo-server/security/authentication/">Authentication and authorization</a></li></ul>',24),h=[d],w={title:"Protecting GraphQL API routes with Auth0",date:"13/11/23"},g="",f=t({__name:"13th_nov_23",setup(p,{expose:e}){return e({frontmatter:{title:"Protecting GraphQL API routes with Auth0",date:"13/11/23"},excerpt:void 0}),(l,u)=>(s(),o("div",c,h))}});export{f as default,g as excerpt,w as frontmatter};
