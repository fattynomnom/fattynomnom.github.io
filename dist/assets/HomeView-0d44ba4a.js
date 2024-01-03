import{d as i,o as n,c as r,a as d,b as c,r as g,u as b,w as f,F as _,e as I,t as w,f as y,n as v,g as x,h as k,T as A,p as q,i as L,j as S,k as T,l as P}from"./index-72f74cc5.js";const j="/assets/7th_nov_23_1-5f319197.png",U={class:"markdown-body"},R=d('<p>Previously I’ve already created a front-end NextJs project called <a href="https://github.com/fattynomnom/itrack-nextjs">iTrack</a>.</p><p>For context, the purpose of the app is to track user’s expenses.</p><p>As of right now, the data is the app is mocked, so what I need to do next is create a backend for it, for which I already know I want to use GraphQL (GraphQL &gt; REST ftw).</p><p>From past experience, I’ve used Hasura for creating GraphQL APIs.</p><p><strong>Pros of using Hasura:</strong></p><ul><li>Minimal code writing. APIs, models and actions can all be created / managed via UI.</li><li>Able to connect a PostgreSQL database.</li><li>Automatically handles hosting of your database and APIs.</li></ul><p><strong>Cons of using Hasura:</strong></p><ul><li>Personally prefer writing code than using UI.</li><li>If I were to host my database and APIs on Hasura, whoever wants to try out my project would also need to host their own database and APIs on Hasura as well, would be easier if APIs and database can run locally.</li><li>Expanding on allowing users to run project locally, I am aware when using Hasura’s UI, our actions (eg. running SQL queries, creating tables) can be “recorded” into code, which can be backed up to another repo to allow replication. However, I find this entire structure very messy, managing our own migration files and code is easier. I could be wrong about this and just don’t know how to manage this well enough.</li></ul><p>Overall, I decided to forgo using a platform like Hasura. Plus, it could be a chance to test out my rusty SQL query skills.</p><p>First, I setup my ExpressJs app with Apollo so that I can start writing GraphQL APIs. I followed <a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">this tutorial</a>.</p><p>Then I setup a PostgreSQL database using <a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">these guidelines</a>.</p><p>After the database setup, I followed <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a> to setup Knex.</p><p>If you don’t know what Knex is, essentially it is a query builder for many SQL databases, including PostgreSQL. Tbh, very reminiscent of Laravel days. <a href="https://knexjs.org/">Here is the Knex documentation</a> if you’re curious.</p><p>After setting up Knex, I replaced the static datasets with PostgreSQL queries, run <code class="">npm run dev</code> and tested my APIs on <a href="https://studio.apollographql.com/sandbox/explorer">Apollo’s GraphQL sandbox</a>:</p><p><img src="'+j+'" alt="Apollo sandbox testing result"></p><p>So far everything works!</p><p>I’ve commited my progress to this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next steps:</strong></p><ul><li>Learn how to use Knex’s query builder and replace PostgreSQL queries with Knex</li><li>Learn how to integrate <a href="https://auth0.com/">Auth0</a> into our backend application</li></ul><p><strong>Here’s a full list of resources I’ve referenced:</strong></p><ul><li><a href="https://knexjs.org/">Knex</a></li><li><a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">Build a GraphQL app in Node.js with TypeScript and graphql-request</a></li><li><a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">Set up postgres + database on MacOS (M1)</a></li><li><a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">Node + Express + Knex + PostgreSQL</a></li></ul>',21),E=[R],C={title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},N=i({__name:"7th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",U,E))}}),$={class:"markdown-body"},Q=d(`<p>A short one for today, but something is better than nothing I guess!</p><p>So previously I had only used <a href="https://knexjs.org/">Knex</a> for writing migration and seed files (following <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a>). Querying was still being done via SQL.</p><p>So I decided its time to convert these SQL queries to use the Knex query builder.</p><p>First, setting up the config:</p><pre><code class="">// database.ts
const Knex = knex({
    client: &#39;pg&#39;,
    connection: {
        user: ({}).POSTGRESQL_USER,
        password: ({}).POSTGRESQL_PW,
        host: ({}).POSTGRESQL_HOST,
        port: Number(({}).POSTGRESQL_PORT),
        database: ({}).POSTGRESQL_DB
    }
})

export default Knex
</code></pre><p>And after doing a brief reading of the documentation, I converted these queries:</p><pre><code class="">pool.query(&#39;SELECT * from users&#39;)
pool.query(
    &#39;INSERT INTO users (email) VALUES ($1) RETURNING email&#39;,
    [user.email]
)
</code></pre><p>Into these:</p><pre><code class="">Knex(&#39;users&#39;).select(&#39;*&#39;)
Knex(&#39;users&#39;).insert(user, &#39;*&#39;)
</code></pre><p>Much easier to read and I don’t have to worry about SQL syntax! Knex’s query builder also looks a lot like Laravel’s query builder… But its been awhile since Laravel for me, so I don’t remember these things off the top of my head anymore.</p><p>View the changes I’ve made in this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next thing I’ll be working on:</strong> Integrating Auth0 with Express</p>`,12),M=[Q],G={title:"Writing queries using Knex",date:"8/11/23"},H=i({__name:"8th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"Writing queries using Knex",date:"8/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",$,M))}}),O="/assets/13th_nov_23_1-fdfc503b.png",F="/assets/13th_nov_23_2-cdae4a2d.png",J="/assets/13th_nov_23_3-95325731.png",D={class:"markdown-body"},z=d('<p>Previously I talked about setting up an Apollo server with ExpressJs for GraphQL APIs, but these APIs aren’t protected. Ideally I want my APIs to be protected by something like an Authorization header.</p><p>I decided to go with <a href="https://auth0.com/docs/">Auth0</a> as this seems like the industry standard for authentication, plus it is a method that I haven’t tried before, so plenty of opportunity for learning.</p><p>First, I followed <a href="https://auth0.com/docs/quickstart/backend/nodejs/interactive">this tutorial</a> and created an API on the Auth0 dashboard like so:</p><p><img src="'+O+`" alt="Create API on Auth0 dashboard"></p><p>Then, using the <code class="">express-oauth2-jwt-bearer</code> package mentioned in the tutorial, I created the middleware that checks for the JWT token in the Authorization header:</p><pre><code class="">// src/index.ts
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
</code></pre><p>Since I haven’t added anything to the claims yet, I will just use some loggers and return a static email to the context for now.</p><p>Now for testing, first I went to my Auth0 API dashboard and got a test token from the “Test” tab.</p><p>Then I launched my server via <code class="">npm run dev</code>, and used the <a href="https://studio.apollographql.com/sandbox/explorer">Apollo Sandbox</a> to test my GraphQL APIs:</p><p><img src="`+F+'" alt="Testing auth header on Apollo Sandbox"></p><p>It works! Checking my terminal showed that the token was also decoded successfully:</p><p><img src="'+J+'" alt="Results logged to console"></p><p>So now that everything works so far, my next step is to actually implement the authentication part in my <a href="https://github.com/fattynomnom/itrack-nextjs">NextJs client</a>.</p><p>I’ve committed all my progress so far to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p><p><strong>You can check the list of resources I’ve referenced here:</strong></p><ul><li><a href="https://auth0.com/docs/quickstart/backend/nodejs/interactive">Add authorization to an Express.js API application</a></li><li><a href="https://www.apollographql.com/docs/apollo-server/api/express-middleware/">expressMiddleware API docs</a></li><li><a href="https://www.apollographql.com/docs/apollo-server/security/authentication/">Authentication and authorization</a></li></ul>',24),B=[z],W={title:"Protecting GraphQL API routes with Auth0",date:"13/11/23"},K=i({__name:"13th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"Protecting GraphQL API routes with Auth0",date:"13/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",D,B))}}),Y="/assets/15th_nov_23_1-c2eda73f.png",V="/assets/15th_nov_23_2-ff2f2715.png",X={class:"markdown-body"},Z=d('<p>Initially I had implemented Firebase authentication for my <a href="https://github.com/fattynomnom/itrack-nextjs">NextJs project</a>, but if you saw my previous update, I decided to go ahead with Auth0 instead.</p><p>For this, I’ll be using the <a href="https://github.com/auth0/nextjs-auth0#page-router">nextjs-auth0 package</a>.</p><h1>Configure Auth0 application</h1><p>First, I followed <a href="https://github.com/auth0/nextjs-auth0#auth0-configuration">the docs</a> and updated my application’s Allowed Callback URLs and Allowed Logout URLs in the Auth0 dashboard.</p><p><img src="'+Y+`" alt="Configure allowed Auth0 URLs"></p><p>Something that I was REALLY confused about this step was the Allowed Callback URLs. I thought that I had to enter the URL that I wanted Auth0 to redirect to after login was completed. But it wasn’t the case, I tried it and got an error after logging in. I’ll explain how to ACTUALLY perform the redirect later.</p><h1>Configure package in NextJs</h1><p>I updated the env variables required for the package to work:</p><pre><code class="">// .env
# use \`openssl rand -hex 32\` command to generate a random secret
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
</code></pre><p>You can find these values in your Auth0 application dashboard.</p><p>The package will automatically detect these variables in your <code class="">.env</code> file, you don’t have to actually import them anywhere unless you want to explicitly do so and customize your config. So make sure NOT to prepend <code class="">NEXT_PUBLIC_</code> to the env.</p><h1>Setup Auth0 APIs</h1><p>Next, depending on what kind of NextJs router you’re using, the setup for Auth0 APIs is different. Since my NextJs project is using <code class="">pages</code> directory instead of <code class="">app</code>, I followed <a href="https://github.com/auth0/nextjs-auth0#page-router">these steps</a> to implement the auth pages.</p><pre><code class="">// pages/api/auth/[auth0].ts
import { handleAuth, handleLogin } from &#39;@auth0/nextjs-auth0&#39;

export default handleAuth()
</code></pre><p>The package will setup the following APIs for you:</p><ul><li><code class="">/api/auth/login</code></li><li><code class="">/api/auth/callback</code></li><li><code class="">/api/auth/logout</code></li><li><code class="">/api/auth/me</code></li></ul><h1>Route to Auth0 APIs</h1><p>Now directing user to login/signup is as easy as doing <code class="">&lt;a href=&quot;/api/auth/login&quot;&gt;Login&lt;/a&gt;</code>, and the same applies for logout.</p><p>However, since these are APIs and not actual pages, you should not use <code class="">&lt;Link&gt;</code> but instead use <code class="">&lt;a&gt;</code>.</p><p>Now when the user clicks on “Login”, they would see something like this:</p><p><img src="`+V+`" alt="Auth0 login page"></p><p>This makes my <code class="">/login</code> and <code class="">/register</code> pages redundant now… If I’m not mistaken, you can still use custom login and registration pages, but maybe this is something I can explore a bit later, for now I just want to setup the authentication flow.</p><h1>Redirect user after login</h1><p>Once user has logged in, by default, users will be redirected back to the root path <code class="">/</code>. I want to change this to direct users back to <code class="">/dashboard</code> instead, so I had to update <code class="">/pages/api/auth/[auth0].ts</code> to the following:</p><pre><code class="">// pages/api/auth/[auth0].ts
import { handleAuth, handleLogin } from &#39;@auth0/nextjs-auth0&#39;

export default handleAuth({
    login: (req, res) =&gt; {
        handleLogin(req, res, {
            returnTo: &#39;/dashboard&#39;
        })
    }
})
</code></pre><p>If I correctly understand the documentation, you can also try using <code class="">&lt;a href=&quot;/api/auth/login?returnTo=/dashboard&quot;&gt;Login&lt;/a&gt;</code> instead of updating the config, but I have not tested this.</p><h1>Get logged in user details</h1><p>To get the logged in user details, you will need to implement the <code class="">UserProvider</code> in <code class="">_app.tsx</code>:</p><pre><code class="">// pages/_app.tsx
import { UserProvider } from &#39;@auth0/nextjs-auth0/client&#39;

export default function MyApp({ Component, pageProps }) {
    &lt;UserProvider&gt;
        &lt;Component {...pageProps} /&gt;
    &lt;/UserProvider&gt;
}
</code></pre><p>Then you can simply use the <code class="">useUser</code> hook like so:</p><pre><code class="">import { useUser } from &#39;@auth0/nextjs-auth0/client&#39;

export default function Settings() {
    const { user, error, isLoading } = useUser()

    return (
        &lt;div className=&quot;grid grid-cols-12 px-7 py-10 max-w-3xl mx-auto&quot;&gt;
            &lt;Text className=&quot;col-span-4 my-auto&quot;&gt;Email&lt;/Text&gt;
            &lt;TextInput
                className=&quot;col-span-8&quot;
                disabled
                value={isLoading ? &#39;&#39; : user.email}
            /&gt;
        &lt;/div&gt;
    )
}
</code></pre><p>Just make sure to properly handle the <code class="">isLoading</code> state, otherwise if you use <code class="">user.email</code> directly without waiting for it to load, you would receive a <code class="">Cannot access email of undefined</code> error.</p><h1>Protect authenticated routes with middleware</h1><p>The package provides a <code class="">withMiddlewareAuthRequired</code> middleware that you can wrap each of your individual components in (see <a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-server-side-rendered-ssr-page">here</a>).</p><p>For my use case, by default, all pages should be protected except these pages:</p><ul><li><code class="">/</code></li><li><code class="">/login</code></li><li><code class="">/register</code></li></ul><p>(I know my <code class="">/login</code> and <code class="">/register</code> pages are redundant, but I’m keeping them around for now because… I spent time on them!! And I might still want to use them later!!)</p><p>So instead of wrapping each of my components/pages with this middleware, I opted to do this instead:</p><pre><code class="">// middleware.ts
import { withMiddlewareAuthRequired } from &#39;@auth0/nextjs-auth0/edge&#39;

export default withMiddlewareAuthRequired()

export const config = {
    // \`/((?!login|register).*)\` means to exclude pages starting with \`/login\` or \`/register\`
    // \`(.+)\` means to exclude specifically the root page \`/\`
    // Disclaimer: I&#39;m not a regex wizard, this is just what I&#39;ve googled
    matcher: &#39;/((?!login|register).*)(.+)&#39;
}
</code></pre><p>So now by default, all my pages (except the specified pages) will be protected by this middleware. See more on <a href="https://nextjs.org/docs/pages/building-your-application/routing/middleware#matching-paths">NextJs middleware</a>.</p><p>If I try to navigate to <code class="">/dashboard</code> without logging in first, the middleware would redirect me to login instead.</p><h1>Calling Auth0 protected external APIs</h1><p>In my previous post, I had already setup my backend APIs to be protected by Auth0. So now I’ll try calling those APIs from my app.</p><pre><code class="">// .env
AUTH0_AUDIENCE=http://localhost:4000/graphql
</code></pre><pre><code class="">// pages/api/users.ts
import { getAccessToken, withApiAuthRequired } from &#39;@auth0/nextjs-auth0&#39;
import axios from &#39;axios&#39;

const users = async (req, res) =&gt; {
    const { accessToken } = await getAccessToken(req, res)
    const response = await axios.post(
        &#39;http://localhost:4000/graphql&#39;,
        {
            query: \`
                query Query {
                    getAllUsers {
                        email
                    }
                }
            \`
        },
        {
            headers: {
                Authorization: \`Bearer \${accessToken}\`
            }
        }
    )
    res.status(200).json(response.data)
}

export default withApiAuthRequired(users)
</code></pre><pre><code class="">// pages/dashboard.tsx
useEffect(() =&gt; {
    const getUsers = async () =&gt; {
        const response = await axios.get(&#39;/api/users&#39;)
        console.log(response)
    }
    getUsers()
}, [])
</code></pre><p>And it worked! I got a 200 status code and the data from my backend API.</p><p>Also a note (because I was confused about this too), I’ve tested and the <code class="">getAccessToken</code> method will fetch the existing access token, or if the access token is expired, refresh and fetch the new access token for you.</p><h1>Conclusion</h1><p>Overall this setup was quite easy, I don’t have to handle the authenticated state or credentials, and I don’t have to worry about security, so I can see why more and more companies are adopting Auth0 as the standard, as opposed to setting up authentication themselves.</p><p>My next steps are to try to encode the logged in user’s data (like email) into the token’s claims, so that my backend APIs can decode the token and return data based on the token’s claims.</p><p>To be honest, with my method of setting up authentication, I’m not sure if this is possible. I tried googling ahead before I implemented this whole authentication flow but I wound up even more confused, so I decided to implement the flow first and think about how to do this later.</p><p><strong>As usual, all resources:</strong></p><ul><li><a href="https://github.com/auth0/nextjs-auth0#page-router">nextjs-auth0 repo</a></li><li><a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-server-side-rendered-ssr-page">nextjs-auth0 examples</a></li><li><a href="https://nextjs.org/docs/pages/building-your-application/routing/middleware">NextJs middleware</a></li></ul>`,54),ee=[Z],te={title:"Implementing Auth0 in NextJs",date:"15/11/23"},oe=i({__name:"15th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"Implementing Auth0 in NextJs",date:"15/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",X,ee))}}),se={class:"markdown-body"},ne=d(`<p>As mentioned, I am a huge Typescript fan. So when I accidentally came across <a href="https://www.apollographql.com/docs/apollo-server/workflow/generate-types/">this tutorial</a> to generate typings from my GraphQL schema using Codegen… I just had to. A little sidetracked from my previous goal, but this was easy enough to do.</p><p>So without Codegen, I was doing this:</p><pre><code class="">// src/Schema.ts
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
</code></pre><p>I finished up by adding my generated types file to my Eslint ignore list as well as my <code class="">.gitignore</code>.</p><p>I’ve committed my changes to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p><p>Ok now onto the next thing: adding user details to token claims.</p>`,18),ae=[ne],re={title:"Generate typings from GraphQL schema",date:"16/11/23"},ie=i({__name:"16th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"Generate typings from GraphQL schema",date:"16/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",se,ae))}}),de="/assets/17th_nov_23_1-c51677cc.png",ce="/assets/17th_nov_23_2-dc596c30.png",le="/assets/17th_nov_23_3-8ef9cae7.png",pe="/assets/17th_nov_23_4-1b4b7c14.png",he="/assets/17th_nov_23_5-416b9f7d.png",ue={class:"markdown-body"},ge=d('<p>So I managed to find <a href="https://auth0.com/docs/get-started/architecture-scenarios/spa-api/api-implementation-nodejs#4-determine-the-user-identity">this documentation</a> on how to add the user’s details to your token’s claims.</p><p>Just one problem, the documentation is outdated. It mentions using Rules, but when I went to the rules page, this is what I got:</p><p><img src="'+de+'" alt="Auth0 rules is being deprecated"></p><p>Well, no point learning something that is going to be deprecated right.</p><p>So I did a bit more digging and came across <a href="https://community.auth0.com/t/post-login-action-not-adding-email-to-access-token/97804">this thread</a>. I don’t exactly have this problem, but it pointed me in the right direction.</p><p>First, login to the Auth0 dashboard, and go to “Actions” &gt; “Flows”. Select the “Login” flow.</p><p>When you’re in the Login flow, create an action like this:</p><p><img src="'+ce+`" alt="Create action"></p><p>Once the Action has been created, add the following code:</p><pre><code class="">exports.onExecutePostLogin = async (event, api) =&gt; {
    if (event.authorization) {
        const namespace = &#39;http://localhost:4000&#39;;
        api.accessToken.setCustomClaim(\`\${namespace}/claims/email\`, event.user.email);
    }
};
</code></pre><p>According to the docs and the community issue opened above, the reason why we are using <code class="">namespace</code> is to avoid conflict with existing claims, so make sure to use something unique.</p><p><img src="`+le+'" alt="Add action code"></p><p>Click on “Deploy”, then go back to the Login flow.</p><p>On the right hand side, you should see your newly created “Add email to Access Token” action. Drag and drop this action to your flow like this:</p><p><img src="'+pe+`" alt="Add action to flow"></p><p>Click on “Apply” and thats it, from now on when a user logs in, their email will be automatically added to the token’s claims.</p><p>But I still need to test this by updating my backend project. First, I added the namespace I used earlier to my <code class="">.env</code> file:</p><pre><code class="">// .env
AUTH0_EMAIL_CLAIM=http://localhost:4000/claims/email
</code></pre><p>Then replaced the static email used in my <code class="">expressMiddleware</code> context:</p><pre><code class="">// src/index.ts
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
            const email =
                req.auth?.payload[({}).AUTH0_EMAIL_CLAIM || &#39;&#39;]

            return {
                user: { email: email ? (email as string) : undefined }
            }
        }
    })
)
</code></pre><p>Lastly, adding loggers to my GraphQL resolvers for testing:</p><pre><code class="">// src/Resolvers.ts
const Resolvers: Resolvers = {
    Query: {
        getAllUsers: async (
            _parent: unknown,
            _args: unknown,
            context: ApolloContext
        ) =&gt; {
            console.log(3, context)
            ...
        }
    },
    Mutation: {
        ...
    }
}
</code></pre><p>After this is done on the backend, I logged into my frontend application and queried <code class="">getAllUsers</code>. On top of the 200 status code and the data response, I checked my backend terminal to find this logged:</p><p><img src="`+he+'" alt="Console log"></p><p>So it worked!</p><p>I’m aware that I’m not actually doing anything with the user’s email yet, but now that I have the base setup, I can actually start setting up the tables and models I need for the frontend to use, so that’s what I’ll actually be doing next.</p><p>I’m not too sure if I’ll be updating this space since I’ve actually gotten everything setup, and now its just the tedious task of setting up tables, schema and data, but I’ll keep in mind to update whenever I learn something new.</p><p>I’ve committed my progress to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p>',28),me=[ge],fe={title:"Adding user email to Auth0 token claims",date:"17/11/23"},we=i({__name:"17th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"Adding user email to Auth0 token claims",date:"17/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",ue,me))}}),ye="/assets/19th_nov_23_1-457c73c9.png",be="/assets/19th_nov_23_3-a64b63b3.png",_e="/assets/19th_nov_23_2-a625fc70.png",Ie={class:"markdown-body"},ve=d(`<p>So I <em>thought</em> I got my bases all covered but I forgot one thing… When a user registers with Auth0, the user is not being added to my PostgreSQL db, but into Auth0’s db instead.</p><p>Considering they are two separate databases, doing relational queries like “Fetch transactions belonging to specific user”, is harder to do.</p><p>So initially I had followed <a href="https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-registration-flow#store-the-auth0-user-id-in-a-remote-system">this tutorial</a> to add the registered user to my db after user has completed registration flow.</p><p>The tutorials mentions to add an action to the Post Registration flow, something like this:</p><pre><code class="">exports.onExecutePostUserRegistration = async (event) =&gt; {
    await axios.post(&quot;https://my-api.exampleco.com/users&quot;, { params: { email: event.user.email }});
};
</code></pre><p>And it worked… for users who <em>actually</em> went through the registration flow with an email and password. If the user “registers” using their Google account, technically, they would not go through this registration flow (after much manual testing). I wished the docs would’ve been clearer about this.</p><p>So instead, I’m going to follow <a href="https://community.auth0.com/t/problems-with-post-user-registration-action/101314">this suggestion</a> to use the <strong>Post Login flow</strong> instead of the Post Registration flow, by checking the number of logins when user logins. If the number of logins is 1, I will assume that the user has just registered and add their email to my db.</p><p>First, go to “Flows” on the Auth0 dashboard, then select the “Login” flow. Then on the right hand side, create an action for the flow like so:</p><p><img src="`+ye+`" alt="Create action"></p><p>For the code I am using this:</p><pre><code class="">const axios = require(&quot;axios&quot;);

exports.onExecutePostLogin = async (event, api) =&gt; {
    if (event.stats.logins_count === 1) {
        await axios.post(
            &#39;http://localhost:4000/graphql&#39;,
            {
                query: \`
                    mutation AddUser {
                        addUser(email: &quot;\${event.user.email}&quot;) {
                            email
                        }
                    }
                \`
            }
        )
    }
};
</code></pre><p>Notice that I’m using the Axios library. You can add dependencies by going to the sidebar and adding the Axios library like so:</p><p><img src="`+be+`" alt="Add action dependency"></p><p>But I had two other issues:</p><ol><li>I have not deployed my database nor my backend server anywhere yet. Up until now, I’ve been running it locally. How would Auth0 make requests to my local server to add the user into my db?</li><li>In the last few posts, I talked about protecting my APIs with an auth header. Where do I get the auth token to attach to the header?</li></ol><h1>Making your ExpressJs APIs publicly accessible</h1><p>So tackling issue 1: <a href="https://ngrok.com/">Ngrok</a>.</p><p>To summarize, Ngrok allows you to connect your local server to the internet, by providing you a publicly accessible URL.</p><p>Follow the instructions <a href="https://ngrok.com/download">here</a> to download Ngrok. For me I just simply ran <code class="">brew install ngrok/ngrok/ngrok</code>.</p><p>While downloading, go to Ngrok’s website and create a new account, its free!</p><p>Once you have created an account and downloaded Ngrok, go to your account dashboard and get your auth token. Add your token locally like this: <code class="">ngrok config add-authtoken {token}</code>.</p><p>When that’s done, starting it is as simple as doing this:</p><pre><code class="">// run expressjs locally
npm run dev

// connect your local server to the internet
// make sure you are pointing to the correct port that your expressjs app is running on
ngrok http 4000
</code></pre><p>You should see something like this after:</p><p><img src="`+_e+`" alt="Ngrok terminal"></p><p>Use that URL in your code like so:</p><pre><code class="">exports.onExecutePostLogin = async (event, api) =&gt; {
    if (event.stats.logins_count === 1) {
        await axios.post(
            &#39;https://367a-2001-f40-960-21e7-c091-a1fe-a103-84ec.ngrok-free.app/graphql&#39;, // ngrok url
            {
                ...
            }
        )
    }
};
</code></pre><p>However, once I terminate the Ngrok session, this <code class="">axios.post()</code> method would return an error because the URL would no longer be valid outside of the session. Auth0 would no longer be able to make requests to add user to my db anymore. So this is something to keep in mind: <strong>To always update the URL whenever we start a new Ngrok session.</strong></p><h1>Getting an Auth0 token to add user to db</h1><p>So I googled and found <a href="https://community.auth0.com/t/how-do-i-call-my-api-from-a-rule/41309">this community post</a> on how to roughly do this. I would need to make some changes as I am using Auth0 Actions instead of Rules.</p><p>Going back to the “Add email to db” action I’ve just created, I’m going to add this:</p><pre><code class="">exports.onExecutePostLogin = async (event, api) =&gt; {
    if (event.stats.logins_count === 1) {
        const response = await axios.post(\`https://\${YOUR_AUTH0_DOMAIN}/oauth/token\`, {
            client_id: YOUR_CLIENT_ID,
            client_secret: YOUR_CLIENT_SECRET,
            audience: &#39;http://localhost:4000/graphql&#39;,
            grant_type: &#39;client_credentials&#39;
        })

        // api call to add user to db here
    }
};
</code></pre><p>For the client ID and secret, on the Auth0 dashboard, navigate to “Applications”. You should see two applications, one an SPA application and another a Machine to Machine application. Get your credentials from the <strong>Machine to Machine</strong> application.</p><p>Make sure you have also created an API with the audience <code class="">http://localhost:4000/graphql</code>. I talked about creating an API in my post <a href="#protecting-graphql-api-routes-with-auth0">Protecting GraphQL API routes with Auth0</a>.</p><p>And now we should be able to get the token! We can now attach the token to the header by using <code class="">response.data.access_token</code>.</p><p>The full code now looks like this:</p><pre><code class="">const axios = require(&quot;axios&quot;);

exports.onExecutePostLogin = async (event, api) =&gt; {
    if (event.stats.logins_count === 1) {
        const response = await axios.post(\`https://\${YOUR-AUTH0-DOMAIN}/oauth/token\`, {
            client_id: YOUR_CLIENT_ID,
            client_secret: YOUR_CLIENT_SECRET,
            audience: &#39;http://localhost:4000/graphql&#39;,
            grant_type: &#39;client_credentials&#39;
        })

        await axios.post(
            &#39;https://367a-2001-f40-960-21e7-c091-a1fe-a103-84ec.ngrok-free.app/graphql&#39;, // ngrok url
            {
                query: \`
                    mutation AddUser {
                        addUser(email: &quot;\${event.user.email}&quot;) {
                            email
                        }
                    }
                \`
            },
            {
                headers: {
                    Authorization: \`Bearer \${response.data.access_token}\`
                }
            }
        )
    }
};
</code></pre><p>I’ve tested it, and now whenever someone logs in for the first time (whether by email/password or by social connections), their email would be added to my db.</p><p>Now onto actual development.</p><p><strong>Resources</strong>:</p><ul><li><a href="https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-registration-flow#store-the-auth0-user-id-in-a-remote-system">Store the Auth0 user ID in a remote system</a></li><li><a href="https://community.auth0.com/t/problems-with-post-user-registration-action/101314">Problems with post user registration action</a></li><li><a href="https://ngrok.com/download">Download Ngrok</a></li><li><a href="https://community.auth0.com/t/how-do-i-call-my-api-from-a-rule/41309">How do I call my API from a rule</a></li></ul>`,41),xe=[ve],ke={title:"Adding registered Auth0 user to database",date:"19/11/23"},Ae=i({__name:"19th_nov_23",setup(t,{expose:e}){return e({frontmatter:{title:"Adding registered Auth0 user to database",date:"19/11/23"},excerpt:void 0}),(o,s)=>(n(),r("div",Ie,xe))}}),qe="/assets/3rd_jan_24_1-800dc83c.png",Le={class:"markdown-body"},Se=d(`<p>It’s been awhile, but I had very good excuse: work and more work. The holidays season has been STRESSFUL to say the least.</p><p>Anyway, I got to work adding more more queries and mutations, but before long, it started looking like this:</p><pre><code class="">// src/Resolvers.ts
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
</code></pre><p>Now I can update my <code class="">Resolvers</code> file to remove the parts where I’m throwing a 401 error.</p><p>This is the result when testing it:</p><p><img src="`+qe+'" alt="Apollo sandbox testing result"></p><p>As usual, you can find the full functioning code <a href="https://github.com/fattynomnom/itrack-expressjs">here</a>.</p><h1>Final thoughts</h1><p>This implementation isn’t as intuitive as I’d like it to be. What if a resolver needs multiple middlewares? I can foresee my middleware file easily becoming very complex very quickly, as opposed to in ExpressJS, where you can easily chain middlewares together using <code class="">app.use()</code>.</p><p>But maybe I’m being pessimistic and there is a clean, intuitive way to chain middlewares together, I just haven’t found it yet. Either way, I’ll update this space again with my findings!</p>',18),Te=[Se],Pe={title:"Adding middlewares to GraphQL resolvers",date:"3/1/24"},je=i({__name:"3rd_jan_24",setup(t,{expose:e}){return e({frontmatter:{title:"Adding middlewares to GraphQL resolvers",date:"3/1/24"},excerpt:void 0}),(o,s)=>(n(),r("div",Le,Te))}}),Ue={xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"1.5",class:"w-6 h-6",viewBox:"0 0 24 24"},Re=c("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"},null,-1),Ee=[Re];function Ce(t,e){return n(),r("svg",Ue,[...Ee])}const Ne={render:Ce},$e=t=>(q("data-v-172b250b"),t=t(),L(),t),Qe={class:"divide-y p-10 md:px-28 lg:py-36 h-full lg:overflow-y-auto"},Me=d('<section data-v-172b250b><h1 data-v-172b250b>Hey there!</h1><p data-v-172b250b> I&#39;m a part time software engineer and full time cat person who likes problem solving and puzzles. </p><p data-v-172b250b> I don&#39;t have any fancy repositories for you to see (I&#39;m sure you can understand as a software developer, most of our client works are proprietary), though you can still head over to my <a href="https://github.com/fattynomnom" data-v-172b250b>Github</a> to view my personal projects I&#39;m working on when I have the time! </p><p data-v-172b250b> I&#39;m a huge advocate for Typescript, object-oriented programming and clean coding practices (DRY, SOLID). I know writing it is a pain, but reading clean code is <i data-v-172b250b>*chefs kiss*</i>. Do I sit back sometimes and admire clean code structures? Yes, yes I do. </p><p data-v-172b250b> My hobbies are gardening, reading mangas, watching movies and starting 1001 coding projects that I don&#39;t finish. </p><p data-v-172b250b> I&#39;m trying to hold myself accountable by creating this site to document my learning process. Hopefully I&#39;ll be able to learn and update this space as much as possible (when life, work and cats doesn&#39;t get in the way). </p><p data-v-172b250b> Just in case you&#39;re curious, this site was made with VueJs and TailwindCss (both of which I <i data-v-172b250b>think</i> I&#39;m a master at). </p></section>',1),Ge=$e(()=>c("h1",null,"What I'm learning",-1)),He=["onClick"],Oe={class:"text-sm text-gray-400"},Fe=i({__name:"HomeView",setup(t){const e=g([{frontmatter:Pe,component:je,displayed:!1},{frontmatter:ke,component:Ae,displayed:!1},{frontmatter:fe,component:we,displayed:!1},{frontmatter:re,component:ie,displayed:!1},{frontmatter:te,component:oe,displayed:!1},{frontmatter:W,component:K,displayed:!1},{frontmatter:G,component:H,displayed:!1},{frontmatter:C,component:N,displayed:!1}]),o=g([]),s=g(-1),h=b();return f(()=>h.hash,l=>{const u=l.replace("#","");if(u){const a=e.value.findIndex(({frontmatter:p})=>{var m;return((m=p.title)==null?void 0:m.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,""))===u});a>=0&&(e.value.forEach(p=>p.displayed=!1),e.value[a].displayed=!0,s.value=a)}},{immediate:!0}),f(()=>[o.value.length,s],()=>{var l;s.value>=0&&((l=o.value[s.value])==null||l.scrollIntoView())}),(l,u)=>(n(),r("main",Qe,[Me,c("section",null,[Ge,(n(!0),r(_,null,I(e.value,a=>(n(),r("div",{ref_for:!0,ref_key:"postRefs",ref:o,key:a.frontmatter.title,class:"space-y-5 p-5 md:p-10 rounded-lg bg-gray-50 overflow-hidden"},[c("div",{class:"flex items-center justify-between cursor-pointer space-x-5",onClick:p=>a.displayed=!a.displayed},[c("div",null,[c("p",Oe,w(a.frontmatter.date),1),c("h2",null,w(a.frontmatter.title),1)]),y(x(Ne),{class:v(["w-5 h-5 text-gray-500",{"rotate-180":a.displayed}])},null,8,["class"])],8,He),y(A,null,{default:k(()=>[a.displayed?(n(),S(T(a.component),{key:0})):P("",!0)]),_:2},1024)]))),128))])]))}});const Je=(t,e)=>{const o=t.__vccOpts||t;for(const[s,h]of e)o[s]=h;return o},ze=Je(Fe,[["__scopeId","data-v-172b250b"]]);export{ze as default};
