import{d as a,c as s,f as o,o as r}from"./index-5a3f0592.js";const n="/assets/7th_nov_23_1-5f319197.png",i={class:"markdown-body"},u={title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},d="",h=a({__name:"7th_nov_23",setup(p,{expose:t}){return t({frontmatter:{title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},excerpt:void 0}),(l,e)=>(r(),s("div",i,e[0]||(e[0]=[o('<p>Previously I’ve already created a front-end NextJs project called <a href="https://github.com/fattynomnom/itrack-nextjs">iTrack</a>.</p><p>For context, the purpose of the app is to track user’s expenses.</p><p>As of right now, the data is the app is mocked, so what I need to do next is create a backend for it, for which I already know I want to use GraphQL (GraphQL &gt; REST ftw).</p><p>From past experience, I’ve used Hasura for creating GraphQL APIs.</p><p><strong>Pros of using Hasura:</strong></p><ul><li>Minimal code writing. APIs, models and actions can all be created / managed via UI.</li><li>Able to connect a PostgreSQL database.</li><li>Automatically handles hosting of your database and APIs.</li></ul><p><strong>Cons of using Hasura:</strong></p><ul><li>Personally prefer writing code than using UI.</li><li>If I were to host my database and APIs on Hasura, whoever wants to try out my project would also need to host their own database and APIs on Hasura as well, would be easier if APIs and database can run locally.</li><li>Expanding on allowing users to run project locally, I am aware when using Hasura’s UI, our actions (eg. running SQL queries, creating tables) can be “recorded” into code, which can be backed up to another repo to allow replication. However, I find this entire structure very messy, managing our own migration files and code is easier. I could be wrong about this and just don’t know how to manage this well enough.</li></ul><p>Overall, I decided to forgo using a platform like Hasura. Plus, it could be a chance to test out my rusty SQL query skills.</p><p>First, I setup my ExpressJs app with Apollo so that I can start writing GraphQL APIs. I followed <a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">this tutorial</a>.</p><p>Then I setup a PostgreSQL database using <a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">these guidelines</a>.</p><p>After the database setup, I followed <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a> to setup Knex.</p><p>If you don’t know what Knex is, essentially it is a query builder for many SQL databases, including PostgreSQL. Tbh, very reminiscent of Laravel days. <a href="https://knexjs.org/">Here is the Knex documentation</a> if you’re curious.</p><p>After setting up Knex, I replaced the static datasets with PostgreSQL queries, run <code class="">npm run dev</code> and tested my APIs on <a href="https://studio.apollographql.com/sandbox/explorer">Apollo’s GraphQL sandbox</a>:</p><p><img src="'+n+'" alt="Apollo sandbox testing result"></p><p>So far everything works!</p><p>I’ve commited my progress to this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next steps:</strong></p><ul><li>Learn how to use Knex’s query builder and replace PostgreSQL queries with Knex</li><li>Learn how to integrate <a href="https://auth0.com/">Auth0</a> into our backend application</li></ul><p><strong>Here’s a full list of resources I’ve referenced:</strong></p><ul><li><a href="https://knexjs.org/">Knex</a></li><li><a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">Build a GraphQL app in Node.js with TypeScript and graphql-request</a></li><li><a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">Set up postgres + database on MacOS (M1)</a></li><li><a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">Node + Express + Knex + PostgreSQL</a></li></ul>',21)])))}});export{h as default,d as excerpt,u as frontmatter};
