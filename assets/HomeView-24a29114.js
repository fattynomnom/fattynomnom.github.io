import{d,o as s,c as a,a as c,b as r,r as h,F as u,e as g,t as l,f as p,n as m,u as f,w,T as y,p as x,g as I,h as _,i as b,j as v}from"./index-54156144.js";const k="/assets/7th_nov_23_1-5f319197.png",A={class:"markdown-body"},L=c('<p>Previously I’ve already created a front-end NextJs project called <a href="https://github.com/fattynomnom/itrack-nextjs">iTrack</a>.</p><p>For context, the purpose of the app is to track user’s expenses.</p><p>As of right now, the data is the app is mocked, so what I need to do next is create a backend for it, for which I already know I want to use GraphQL (GraphQL &gt; REST ftw).</p><p>From past experience, I’ve used Hasura for creating GraphQL APIs.</p><p><strong>Pros of using Hasura:</strong></p><ul><li>Minimal code writing. APIs, models and actions can all be created / managed via UI.</li><li>Able to connect a PostgreSQL database.</li><li>Automatically handles hosting of your database and APIs.</li></ul><p><strong>Cons of using Hasura:</strong></p><ul><li>Personally prefer writing code than using UI.</li><li>If I were to host my database and APIs on Hasura, whoever wants to try out my project would also need to host their own database and APIs on Hasura as well, would be easier if APIs and database can run locally.</li><li>Expanding on allowing users to run project locally, I am aware when using Hasura’s UI, our actions (eg. running SQL queries, creating tables) can be “recorded” into code, which can be backed up to another repo to allow replication. However, I find this entire structure very messy, managing our own migration files and code is easier. I could be wrong about this and just don’t know how to manage this well enough.</li></ul><p>Overall, I decided to forgo using a platform like Hasura. Plus, it could be a chance to test out my rusty SQL query skills.</p><p>First, I setup my ExpressJs app with Apollo so that I can start writing GraphQL APIs. I followed <a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">this tutorial</a>.</p><p>Then I setup a PostgreSQL database using <a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">these guidelines</a>.</p><p>After the database setup, I followed <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a> to setup Knex.</p><p>If you don’t know what Knex is, essentially it is a query builder for many SQL databases, including PostgreSQL. Tbh, very reminiscent of Laravel days. <a href="https://knexjs.org/">Here is the Knex documentation</a> if you’re curious.</p><p>After setting up Knex, I replaced the static datasets with PostgreSQL queries, run <code class="">npm run dev</code> and tested my APIs on <a href="https://studio.apollographql.com/sandbox/explorer">Apollo’s GraphQL sandbox</a>:</p><p><img src="'+k+'" alt="Apollo sandbox testing result"></p><p>So far everything works!</p><p>I’ve commited my progress to this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next steps:</strong></p><ul><li>Learn how to use Knex’s query builder and replace PostgreSQL queries with Knex</li><li>Learn how to integrate <a href="https://auth0.com/">Auth0</a> into our backend application</li></ul><p><strong>Here’s a full list of resources I’ve referenced:</strong></p><ul><li><a href="https://knexjs.org/">Knex</a></li><li><a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">Build a GraphQL app in Node.js with TypeScript and graphql-request</a></li><li><a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">Set up postgres + database on MacOS (M1)</a></li><li><a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">Node + Express + Knex + PostgreSQL</a></li></ul>',21),q=[L],S={title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},P=d({__name:"7th_nov_23",setup(e,{expose:t}){return t({frontmatter:{title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},excerpt:void 0}),(n,i)=>(s(),a("div",A,q))}}),T={class:"markdown-body"},j=c(`<p>A short one for today, but something is better than nothing I guess!</p><p>So previously I had only used <a href="https://knexjs.org/">Knex</a> for writing migration and seed files (following <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a>). Querying was still being done via SQL.</p><p>So I decided its time to convert these SQL queries to use the Knex query builder.</p><p>First, setting up the config:</p><pre><code class="">// database.ts
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
</code></pre><p>Much easier to read and I don’t have to worry about SQL syntax! Knex’s query builder also looks a lot like Laravel’s query builder… But its been awhile since Laravel for me, so I don’t remember these things off the top of my head anymore.</p><p>View the changes I’ve made in this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next thing I’ll be working on:</strong> Integrating Auth0 with Express</p>`,12),E=[j],N={title:"Writing queries using Knex",date:"8/11/23"},U=d({__name:"8th_nov_23",setup(e,{expose:t}){return t({frontmatter:{title:"Writing queries using Knex",date:"8/11/23"},excerpt:void 0}),(n,i)=>(s(),a("div",T,E))}}),Q="/assets/13th_nov_23_1-fdfc503b.png",C="/assets/13th_nov_23_2-cdae4a2d.png",R="/assets/13th_nov_23_3-95325731.png",H={class:"markdown-body"},$=c('<p>Previously I talked about setting up an Apollo server with ExpressJs for GraphQL APIs, but these APIs aren’t protected. Ideally I want my APIs to be protected by something like an Authorization header.</p><p>I decided to go with <a href="https://auth0.com/docs/">Auth0</a> as this seems like the industry standard for authentication, plus it is a method that I haven’t tried before, so plenty of opportunity for learning.</p><p>First, I followed <a href="https://auth0.com/docs/quickstart/backend/nodejs/interactive">this tutorial</a> and created an API on the Auth0 dashboard like so:</p><p><img src="'+Q+`" alt="Create API on Auth0 dashboard"></p><p>Then, using the <code class="">express-oauth2-jwt-bearer</code> package mentioned in the tutorial, I created the middleware that checks for the JWT token in the Authorization header:</p><pre><code class="">// src/index.ts
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
</code></pre><p>Since I haven’t added anything to the claims yet, I will just use some loggers and return a static email to the context for now.</p><p>Now for testing, first I went to my Auth0 API dashboard and got a test token from the “Test” tab.</p><p>Then I launched my server via <code class="">npm run dev</code>, and used the <a href="https://studio.apollographql.com/sandbox/explorer">Apollo Sandbox</a> to test my GraphQL APIs:</p><p><img src="`+C+'" alt="Testing auth header on Apollo Sandbox"></p><p>It works! Checking my terminal showed that the token was also decoded successfully:</p><p><img src="'+R+'" alt="Results logged to console"></p><p>So now that everything works so far, my next step is to actually implement the authentication part in my <a href="https://github.com/fattynomnom/itrack-nextjs">NextJs client</a>.</p><p>I’ve committed all my progress so far to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p><p><strong>You can check the list of resources I’ve referenced here:</strong></p><ul><li><a href="https://auth0.com/docs/quickstart/backend/nodejs/interactive">Add authorization to an Express.js API application</a></li><li><a href="https://www.apollographql.com/docs/apollo-server/api/express-middleware/">expressMiddleware API docs</a></li><li><a href="https://www.apollographql.com/docs/apollo-server/security/authentication/">Authentication and authorization</a></li></ul>',24),J=[$],G={title:"Protecting GraphQL API routes with Auth0",date:"13/11/23"},M=d({__name:"13th_nov_23",setup(e,{expose:t}){return t({frontmatter:{title:"Protecting GraphQL API routes with Auth0",date:"13/11/23"},excerpt:void 0}),(n,i)=>(s(),a("div",H,J))}}),K="/assets/15th_nov_23_1-afad7491.png",O="/assets/15th_nov_23_2-8f95e3a7.png",B={class:"markdown-body"},D=c('<p>Initially I had implemented Firebase authentication for my <a href="https://github.com/fattynomnom/itrack-nextjs">NextJs project</a>, but if you saw my previous update, I decided to go ahead with Auth0 instead.</p><p>For this, I’ll be using the <a href="https://github.com/auth0/nextjs-auth0#page-router">nextjs-auth0 package</a>.</p><h1>Configure Auth0 application</h1><p>First, I followed <a href="https://github.com/auth0/nextjs-auth0#auth0-configuration">the docs</a> and updated my application’s Allowed Callback URLs and Allowed Logout URLs in the Auth0 dashboard.</p><p><img src="'+K+`" alt="Configure allowed Auth0 URLs"></p><p>Something that I was REALLY confused about this step was the Allowed Callback URLs. I thought that I had to enter the URL that I wanted Auth0 to redirect to after login was completed. But it wasn’t the case, I tried it and got an error after logging in. I’ll explain how to ACTUALLY perform the redirect later.</p><h1>Configure package in NextJs</h1><p>I updated the env variables required for the package to work:</p><pre><code class="">// .env
# use \`openssl rand -hex 32\` command to generate a random secret
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
</code></pre><p>The package will automatically find these variables in your <code class="">.env</code> file, you don’t have to actually import them anywhere unless you want to explicitly do so and customize your config. So make sure NOT to prepend <code class="">NEXT_PUBLIC_</code> to the env.</p><h1>Setup Auth0 APIs</h1><p>Next, depending on what kind of NextJs router you’re using, the setup for Auth0 APIs is different. Since my NextJs project is using <code class="">pages</code> directory instead of <code class="">app</code>, I followed <a href="https://github.com/auth0/nextjs-auth0#page-router">these steps</a> to implement the auth pages.</p><pre><code class="">// pages/api/auth/[auth0].ts
import { handleAuth, handleLogin } from &#39;@auth0/nextjs-auth0&#39;

export default handleAuth()
</code></pre><p>The package will setup the following APIs for you:</p><ul><li><code class="">/api/auth/login</code></li><li><code class="">/api/auth/callback</code></li><li><code class="">/api/auth/logout</code></li><li><code class="">/api/auth/me</code></li></ul><h1>Route to Auth0 APIs</h1><p>Now directing user to login/signup is as easy as doing <code class="">&lt;a href=&quot;/api/auth/login&quot;&gt;Login&lt;/a&gt;</code>, and the same applies for logout.</p><p>However, since these are APIs and not actual pages, you should not use <code class="">&lt;Link&gt;</code> but instead use <code class="">&lt;a&gt;</code>.</p><p>Now when the user clicks on “Login”, they would see something like this:</p><p><img src="`+O+`" alt="Auth0 login page"></p><p>This makes my <code class="">/login</code> and <code class="">/register</code> pages redundant now… If I’m not mistaken, you can still use custom login and registration pages, but maybe this is something we can explore a bit later, for now I just want to setup the authentication flow.</p><h1>Redirect user after login</h1><p>Once user has logged in, by default, users will be redirected back to the root path <code class="">/</code>. I want to change this to direct users back to <code class="">/dashboard</code> instead, so I had to update <code class="">/pages/api/auth/[auth0].ts</code> to the following:</p><pre><code class="">// pages/api/auth/[auth0].ts
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
</code></pre><p>And it worked! I got a 200 status code and the data from my backend API.</p><p>Also a note (because I was confused about this too), I’ve tested and the <code class="">getAccessToken</code> method will fetch the existing access token, or if the access token is expired, refresh and fetch the new access token for you.</p><h1>Conclusion</h1><p>Overall this setup was quite easy, I don’t have to handle the authenticated state or credentials, and I don’t have to worry about security, so I can see why more and more companies are adopting Auth0 as the standard, as opposed to setting up authentication themselves.</p><p>My next steps are to try to encode the logged in user’s data (like email) into the token’s claims, so that my backend APIs can decode the token and return data based on the token’s claims.</p><p>To be honest, with my method of setting up authentication, I’m not sure if this is possible. I tried googling ahead before I implemented this whole authentication flow but I wound up even more confused, so I decided to implement the flow first and think about how to do this later.</p><p><strong>As usual, all resources:</strong></p><ul><li><a href="https://github.com/auth0/nextjs-auth0#page-router">nextjs-auth0 repo</a></li><li><a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-server-side-rendered-ssr-page">nextjs-auth0 examples</a></li><li><a href="https://nextjs.org/docs/pages/building-your-application/routing/middleware">NextJs middleware</a></li></ul>`,53),z=[D],F={title:"Implementing Auth0 in NextJs",date:"15/11/23"},V=d({__name:"15th_nov_23",setup(e,{expose:t}){return t({frontmatter:{title:"Implementing Auth0 in NextJs",date:"15/11/23"},excerpt:void 0}),(n,i)=>(s(),a("div",B,z))}}),W={xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"1.5",class:"w-6 h-6",viewBox:"0 0 24 24"},Y=r("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"},null,-1),X=[Y];function Z(e,t){return s(),a("svg",W,[...X])}const ee={render:Z},te=e=>(x("data-v-747c077e"),e=e(),I(),e),oe={class:"divide-y p-10 md:px-28 lg:py-36 h-full lg:overflow-y-auto"},se=c('<section data-v-747c077e><h1 data-v-747c077e>Hey there!</h1><p data-v-747c077e> I&#39;m a part time software engineer and full time cat person who likes problem solving and puzzles. </p><p data-v-747c077e> I don&#39;t have any fancy repositories for you to see (I&#39;m sure you can understand as a software developer, most of our client works are proprietary), though you can still head over to my <a href="https://github.com/fattynomnom" data-v-747c077e>Github</a> to view my personal projects I&#39;m working on when I have the time! </p><p data-v-747c077e> I&#39;m a huge advocate for Typescript, object-oriented programming and clean coding practices (DRY, SOLID). I know writing it is a pain, but reading clean code is <i data-v-747c077e>*chefs kiss*</i>. Do I sit back sometimes and admire clean code structures? Yes, yes I do. </p><p data-v-747c077e> My hobbies are gardening, reading mangas, watching movies and starting 1001 coding projects that I don&#39;t finish. </p><p data-v-747c077e> I&#39;m trying to hold myself accountable by creating this site to document my learning process. Hopefully I&#39;ll be able to learn and update this space as much as possible (when life, work and cats doesn&#39;t get in the way). </p><p data-v-747c077e> Just in case you&#39;re curious, this site was made with VueJs and TailwindCss (both of which I <i data-v-747c077e>think</i> I&#39;m a master at). </p></section>',1),ae=te(()=>r("h1",null,"What I'm learning",-1)),ne=["onClick"],re={class:"text-sm text-gray-400"},ie=d({__name:"HomeView",setup(e){const t=h([{frontmatter:F,component:V,displayed:!1},{frontmatter:G,component:M,displayed:!1},{frontmatter:N,component:U,displayed:!1},{frontmatter:S,component:P,displayed:!1}]);return(n,i)=>(s(),a("main",oe,[se,r("section",null,[ae,(s(!0),a(u,null,g(t.value,o=>(s(),a("div",{key:o.frontmatter.title,class:"space-y-5 p-5 md:p-10 rounded-lg bg-gray-50 overflow-hidden"},[r("div",{class:"flex items-center justify-between cursor-pointer space-x-5",onClick:ce=>o.displayed=!o.displayed},[r("div",null,[r("p",re,l(o.frontmatter.date),1),r("h2",null,l(o.frontmatter.title),1)]),p(f(ee),{class:m(["w-5 h-5 text-gray-500",{"rotate-180":o.displayed}])},null,8,["class"])],8,ne),p(y,null,{default:w(()=>[o.displayed?(s(),_(b(o.component),{key:0})):v("",!0)]),_:2},1024)]))),128))])]))}});const de=(e,t)=>{const n=e.__vccOpts||e;for(const[i,o]of t)n[i]=o;return n},pe=de(ie,[["__scopeId","data-v-747c077e"]]);export{pe as default};
