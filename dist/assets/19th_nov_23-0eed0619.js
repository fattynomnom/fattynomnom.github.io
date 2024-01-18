import{d as t,c as o,o as n,f as s}from"./index-401d1458.js";const a="/assets/19th_nov_23_1-457c73c9.png",i="/assets/19th_nov_23_3-a64b63b3.png",r="/assets/19th_nov_23_2-a625fc70.png",h={class:"markdown-body"},c=s(`<p>So I <em>thought</em> I got my bases all covered but I forgot one thing… When a user registers with Auth0, the user is not being added to my PostgreSQL db, but into Auth0’s db instead.</p><p>Considering they are two separate databases, doing relational queries like “Fetch transactions belonging to specific user”, is harder to do.</p><p>So initially I had followed <a href="https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-registration-flow#store-the-auth0-user-id-in-a-remote-system">this tutorial</a> to add the registered user to my db after user has completed registration flow.</p><p>The tutorials mentions to add an action to the Post Registration flow, something like this:</p><pre><code class="">exports.onExecutePostUserRegistration = async (event) =&gt; {
    await axios.post(&quot;https://my-api.exampleco.com/users&quot;, { params: { email: event.user.email }});
};
</code></pre><p>And it worked… for users who <em>actually</em> went through the registration flow with an email and password. If the user “registers” using their Google account, technically, they would not go through this registration flow (after much manual testing). I wished the docs would’ve been clearer about this.</p><p>So instead, I’m going to follow <a href="https://community.auth0.com/t/problems-with-post-user-registration-action/101314">this suggestion</a> to use the <strong>Post Login flow</strong> instead of the Post Registration flow, by checking the number of logins when user logins. If the number of logins is 1, I will assume that the user has just registered and add their email to my db.</p><p>First, go to “Flows” on the Auth0 dashboard, then select the “Login” flow. Then on the right hand side, create an action for the flow like so:</p><p><img src="`+a+`" alt="Create action"></p><p>For the code I am using this:</p><pre><code class="">const axios = require(&quot;axios&quot;);

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
</code></pre><p>Notice that I’m using the Axios library. You can add dependencies by going to the sidebar and adding the Axios library like so:</p><p><img src="`+i+`" alt="Add action dependency"></p><p>But I had two other issues:</p><ol><li>I have not deployed my database nor my backend server anywhere yet. Up until now, I’ve been running it locally. How would Auth0 make requests to my local server to add the user into my db?</li><li>In the last few posts, I talked about protecting my APIs with an auth header. Where do I get the auth token to attach to the header?</li></ol><h1>Making your ExpressJs APIs publicly accessible</h1><p>So tackling issue 1: <a href="https://ngrok.com/">Ngrok</a>.</p><p>To summarize, Ngrok allows you to connect your local server to the internet, by providing you a publicly accessible URL.</p><p>Follow the instructions <a href="https://ngrok.com/download">here</a> to download Ngrok. For me I just simply ran <code class="">brew install ngrok/ngrok/ngrok</code>.</p><p>While downloading, go to Ngrok’s website and create a new account, its free!</p><p>Once you have created an account and downloaded Ngrok, go to your account dashboard and get your auth token. Add your token locally like this: <code class="">ngrok config add-authtoken {token}</code>.</p><p>When that’s done, starting it is as simple as doing this:</p><pre><code class="">// run expressjs locally
npm run dev

// connect your local server to the internet
// make sure you are pointing to the correct port that your expressjs app is running on
ngrok http 4000
</code></pre><p>You should see something like this after:</p><p><img src="`+r+`" alt="Ngrok terminal"></p><p>Use that URL in your code like so:</p><pre><code class="">exports.onExecutePostLogin = async (event, api) =&gt; {
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
</code></pre><p>For the client ID and secret, on the Auth0 dashboard, navigate to “Applications”. You should see two applications, one an SPA application and another a Machine to Machine application. Get your credentials from the <strong>Machine to Machine</strong> application.</p><p>Make sure you have also created an API with the audience <code class="">http://localhost:4000/graphql</code>. I talked about creating an API in my post <a href="https://fattynomnom.github.io/protecting-graphql-api-routes-with-auth0">Protecting GraphQL API routes with Auth0</a>.</p><p>And now we should be able to get the token! We can now attach the token to the header by using <code class="">response.data.access_token</code>.</p><p>The full code now looks like this:</p><pre><code class="">const axios = require(&quot;axios&quot;);

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
</code></pre><p>I’ve tested it, and now whenever someone logs in for the first time (whether by email/password or by social connections), their email would be added to my db.</p><p>Now onto actual development.</p><p><strong>Resources</strong>:</p><ul><li><a href="https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-registration-flow#store-the-auth0-user-id-in-a-remote-system">Store the Auth0 user ID in a remote system</a></li><li><a href="https://community.auth0.com/t/problems-with-post-user-registration-action/101314">Problems with post user registration action</a></li><li><a href="https://ngrok.com/download">Download Ngrok</a></li><li><a href="https://community.auth0.com/t/how-do-i-call-my-api-from-a-rule/41309">How do I call my API from a rule</a></li></ul>`,41),l=[c],m={title:"Adding registered Auth0 user to database",date:"19/11/23"},w="",y=t({__name:"19th_nov_23",setup(d,{expose:e}){return e({frontmatter:{title:"Adding registered Auth0 user to database",date:"19/11/23"},excerpt:void 0}),(p,u)=>(n(),o("div",h,l))}});export{y as default,w as excerpt,m as frontmatter};
