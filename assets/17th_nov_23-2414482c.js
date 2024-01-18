import{d as t,c as n,o,f as s}from"./index-401d1458.js";const a="/assets/17th_nov_23_1-c51677cc.png",i="/assets/17th_nov_23_2-dc596c30.png",c="/assets/17th_nov_23_3-8ef9cae7.png",r="/assets/17th_nov_23_4-1b4b7c14.png",d="/assets/17th_nov_23_5-416b9f7d.png",l={class:"markdown-body"},p=s('<p>So I managed to find <a href="https://auth0.com/docs/get-started/architecture-scenarios/spa-api/api-implementation-nodejs#4-determine-the-user-identity">this documentation</a> on how to add the user’s details to your token’s claims.</p><p>Just one problem, the documentation is outdated. It mentions using Rules, but when I went to the rules page, this is what I got:</p><p><img src="'+a+'" alt="Auth0 rules is being deprecated"></p><p>Well, no point learning something that is going to be deprecated right.</p><p>So I did a bit more digging and came across <a href="https://community.auth0.com/t/post-login-action-not-adding-email-to-access-token/97804">this thread</a>. I don’t exactly have this problem, but it pointed me in the right direction.</p><p>First, login to the Auth0 dashboard, and go to “Actions” &gt; “Flows”. Select the “Login” flow.</p><p>When you’re in the Login flow, create an action like this:</p><p><img src="'+i+`" alt="Create action"></p><p>Once the Action has been created, add the following code:</p><pre><code class="">exports.onExecutePostLogin = async (event, api) =&gt; {
    if (event.authorization) {
        const namespace = &#39;http://localhost:4000&#39;;
        api.accessToken.setCustomClaim(\`\${namespace}/claims/email\`, event.user.email);
    }
};
</code></pre><p>According to the docs and the community issue opened above, the reason why we are using <code class="">namespace</code> is to avoid conflict with existing claims, so make sure to use something unique.</p><p><img src="`+c+'" alt="Add action code"></p><p>Click on “Deploy”, then go back to the Login flow.</p><p>On the right hand side, you should see your newly created “Add email to Access Token” action. Drag and drop this action to your flow like this:</p><p><img src="'+r+`" alt="Add action to flow"></p><p>Click on “Apply” and thats it, from now on when a user logs in, their email will be automatically added to the token’s claims.</p><p>But I still need to test this by updating my backend project. First, I added the namespace I used earlier to my <code class="">.env</code> file:</p><pre><code class="">// .env
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
</code></pre><p>After this is done on the backend, I logged into my frontend application and queried <code class="">getAllUsers</code>. On top of the 200 status code and the data response, I checked my backend terminal to find this logged:</p><p><img src="`+d+'" alt="Console log"></p><p>So it worked!</p><p>I’m aware that I’m not actually doing anything with the user’s email yet, but now that I have the base setup, I can actually start setting up the tables and models I need for the frontend to use, so that’s what I’ll actually be doing next.</p><p>I’m not too sure if I’ll be updating this space since I’ve actually gotten everything setup, and now its just the tedious task of setting up tables, schema and data, but I’ll keep in mind to update whenever I learn something new.</p><p>I’ve committed my progress to <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p>',28),h=[p],y={title:"Adding user email to Auth0 token claims",date:"17/11/23"},f="",w=t({__name:"17th_nov_23",setup(m,{expose:e}){return e({frontmatter:{title:"Adding user email to Auth0 token claims",date:"17/11/23"},excerpt:void 0}),(u,g)=>(o(),n("div",l,h))}});export{w as default,f as excerpt,y as frontmatter};
