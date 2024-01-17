import{d as t,c as o,o as a,f as s}from"./index-3bd1b11c.js";const n="/assets/15th_nov_23_1-c2eda73f.png",i="/assets/15th_nov_23_2-ff2f2715.png",r={class:"markdown-body"},d=s('<p>Initially I had implemented Firebase authentication for my <a href="https://github.com/fattynomnom/itrack-nextjs">NextJs project</a>, but if you saw my previous update, I decided to go ahead with Auth0 instead.</p><p>For this, I’ll be using the <a href="https://github.com/auth0/nextjs-auth0#page-router">nextjs-auth0 package</a>.</p><h1>Configure Auth0 application</h1><p>First, I followed <a href="https://github.com/auth0/nextjs-auth0#auth0-configuration">the docs</a> and updated my application’s Allowed Callback URLs and Allowed Logout URLs in the Auth0 dashboard.</p><p><img src="'+n+`" alt="Configure allowed Auth0 URLs"></p><p>Something that I was REALLY confused about this step was the Allowed Callback URLs. I thought that I had to enter the URL that I wanted Auth0 to redirect to after login was completed. But it wasn’t the case, I tried it and got an error after logging in. I’ll explain how to ACTUALLY perform the redirect later.</p><h1>Configure package in NextJs</h1><p>I updated the env variables required for the package to work:</p><pre><code class="">// .env
# use \`openssl rand -hex 32\` command to generate a random secret
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
</code></pre><p>You can find these values in your Auth0 application dashboard.</p><p>The package will automatically detect these variables in your <code class="">.env</code> file, you don’t have to actually import them anywhere unless you want to explicitly do so and customize your config. So make sure NOT to prepend <code class="">NEXT_PUBLIC_</code> to the env.</p><h1>Setup Auth0 APIs</h1><p>Next, depending on what kind of NextJs router you’re using, the setup for Auth0 APIs is different. Since my NextJs project is using <code class="">pages</code> directory instead of <code class="">app</code>, I followed <a href="https://github.com/auth0/nextjs-auth0#page-router">these steps</a> to implement the auth pages.</p><pre><code class="">// pages/api/auth/[auth0].ts
import { handleAuth, handleLogin } from &#39;@auth0/nextjs-auth0&#39;

export default handleAuth()
</code></pre><p>The package will setup the following APIs for you:</p><ul><li><code class="">/api/auth/login</code></li><li><code class="">/api/auth/callback</code></li><li><code class="">/api/auth/logout</code></li><li><code class="">/api/auth/me</code></li></ul><h1>Route to Auth0 APIs</h1><p>Now directing user to login/signup is as easy as doing <code class="">&lt;a href=&quot;/api/auth/login&quot;&gt;Login&lt;/a&gt;</code>, and the same applies for logout.</p><p>However, since these are APIs and not actual pages, you should not use <code class="">&lt;Link&gt;</code> but instead use <code class="">&lt;a&gt;</code>.</p><p>Now when the user clicks on “Login”, they would see something like this:</p><p><img src="`+i+`" alt="Auth0 login page"></p><p>This makes my <code class="">/login</code> and <code class="">/register</code> pages redundant now… If I’m not mistaken, you can still use custom login and registration pages, but maybe this is something I can explore a bit later, for now I just want to setup the authentication flow.</p><h1>Redirect user after login</h1><p>Once user has logged in, by default, users will be redirected back to the root path <code class="">/</code>. I want to change this to direct users back to <code class="">/dashboard</code> instead, so I had to update <code class="">/pages/api/auth/[auth0].ts</code> to the following:</p><pre><code class="">// pages/api/auth/[auth0].ts
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
</code></pre><p>And it worked! I got a 200 status code and the data from my backend API.</p><p>Also a note (because I was confused about this too), I’ve tested and the <code class="">getAccessToken</code> method will fetch the existing access token, or if the access token is expired, refresh and fetch the new access token for you.</p><h1>Conclusion</h1><p>Overall this setup was quite easy, I don’t have to handle the authenticated state or credentials, and I don’t have to worry about security, so I can see why more and more companies are adopting Auth0 as the standard, as opposed to setting up authentication themselves.</p><p>My next steps are to try to encode the logged in user’s data (like email) into the token’s claims, so that my backend APIs can decode the token and return data based on the token’s claims.</p><p>To be honest, with my method of setting up authentication, I’m not sure if this is possible. I tried googling ahead before I implemented this whole authentication flow but I wound up even more confused, so I decided to implement the flow first and think about how to do this later.</p><p><strong>As usual, all resources:</strong></p><ul><li><a href="https://github.com/auth0/nextjs-auth0#page-router">nextjs-auth0 repo</a></li><li><a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-server-side-rendered-ssr-page">nextjs-auth0 examples</a></li><li><a href="https://nextjs.org/docs/pages/building-your-application/routing/middleware">NextJs middleware</a></li></ul>`,54),c=[d],g={title:"Implementing Auth0 in NextJs",date:"15/11/23"},m="",f=t({__name:"15th_nov_23",setup(l,{expose:e}){return e({frontmatter:{title:"Implementing Auth0 in NextJs",date:"15/11/23"},excerpt:void 0}),(h,p)=>(a(),o("div",r,c))}});export{f as default,m as excerpt,g as frontmatter};
