import{d as u,o as n,c as i,a as h,b as a,r as g,t as p,u as r,e as d,n as m,w as f,T as w,f as y,g as b,p as _,h as v}from"./index-3cbaead8.js";const I="/assets/7th_nov_23_1-5f319197.png",x={class:"markdown-body"},k=h('<p>Previously I’ve already created a front-end NextJs project called <a href="https://github.com/fattynomnom/itrack-nextjs">iTrack</a>.</p><p>For context, the purpose of the app is to track user’s expenses.</p><p>As of right now, the data is the app is mocked, so what I need to do next is create a backend for it, for which I already know I want to use GraphQL (GraphQL &gt; REST ftw).</p><p>From past experience, I’ve used Hasura for creating GraphQL APIs.</p><p><strong>Pros of using Hasura:</strong></p><ul><li>Minimal code writing. APIs, models and actions can all be created / managed via UI.</li><li>Able to connect a PostgreSQL database.</li><li>Automatically handles hosting of your database and APIs.</li></ul><p><strong>Cons of using Hasura:</strong></p><ul><li>Personally prefer writing code than using UI.</li><li>If I were to host my database and APIs on Hasura, whoever wants to try out my project would also need to host their own database and APIs on Hasura as well, would be easier if APIs and database can run locally.</li><li>Expanding on allowing users to run project locally, I am aware when using Hasura’s UI, our actions (eg. running SQL queries, creating tables) can be “recorded” into code, which can be backed up to another repo to allow replication. However, I find this entire structure very messy, managing our own migration files and code is easier. I could be wrong about this and just don’t know how to manage this well enough.</li></ul><p>Overall, I decided to forgo using a platform like Hasura. Plus could be a chance to test out my rusty SQL query skills.</p><p>First, I setup my ExpressJs app with Apollo so that I can start writing GraphQL APIs. I followed <a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">this tutorial</a>.</p><p>Then I setup a PostgreSQL database using <a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">these guidelines</a>.</p><p>After the database setup, I followed <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a> to setup Knex.</p><p>If you don’t know what Knex is, essentially it is query builder for many SQL databases, including PostgreSQL. Tbh, very reminiscent of Laravel days. <a href="https://knexjs.org/">Here is the Knex documentation</a> if you’re curious.</p><p>After setting up Knex, I replaced the static datasets with PostgreSQL queries, run <code class="">npm run dev</code> and tested my APIs on <a href="https://studio.apollographql.com/sandbox/explorer">Apollo’s GraphQL sandbox</a>:</p><p><img src="'+I+'" alt="Apollo sandbox testing result"></p><p>So far everything works!</p><p>I’ve commited my progress to this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next steps:</strong></p><ul><li>Learn how to use Knex’s query builder and replace PostgreSQL queries with Knex</li><li>Learn how to integrate <a href="https://auth0.com/">Auth0</a> into our backend application</li></ul><p><strong>Here’s a full list of resources I’ve referenced:</strong></p><ul><li><a href="https://knexjs.org/">Knex</a></li><li><a href="https://blog.logrocket.com/build-graphql-app-node-js-typescript-graphql-request/">Build a GraphQL app in Node.js with TypeScript and graphql-request</a></li><li><a href="https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667">Set up postgres + database on MacOS (M1)</a></li><li><a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">Node + Express + Knex + PostgreSQL</a></li></ul>',21),L=[k],c={title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},S=u({__name:"7th_nov_23",setup(e,{expose:t}){return t({frontmatter:{title:"GraphQL + PostgreSQL + ExpressJs setup",date:"7/11/23"},excerpt:void 0}),(o,s)=>(n(),i("div",x,L))}}),P={xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"1.5",class:"w-6 h-6",viewBox:"0 0 24 24"},Q=a("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"},null,-1),j=[Q];function q(e,t){return n(),i("svg",P,[...j])}const A={render:q},H=e=>(_("data-v-3db02377"),e=e(),v(),e),C={class:"divide-y px-28 py-36 h-full overflow-y-auto"},G=h('<section data-v-3db02377><h1 data-v-3db02377>Hey there!</h1><p data-v-3db02377> I&#39;m a part time software engineer and full time cat person who likes problem solving and puzzles. </p><p data-v-3db02377> I don&#39;t have any fancy repositories for you to see (I&#39;m sure you can understand as a software developer, most of our client works are proprietary), though you can still head over to my <a href="https://github.com/fattynomnom" data-v-3db02377>Github</a> to view my personal projects I&#39;m working on when I have the time! </p><p data-v-3db02377> I&#39;m a huge advocate for Typescript, object-oriented programming and clean coding practices (DRY, SOLID). I know writing it is a pain, but reading clean code is <i data-v-3db02377>*chefs kiss*</i>. Do I sit back sometimes and admire clean code structures? Yes, yes I do. </p><p data-v-3db02377> My hobbies are gardening, reading mangas, watching movies and starting 1001 coding projects that I don&#39;t finish. </p><p data-v-3db02377> I&#39;m trying to hold myself accountable by creating this site to document my learning process. Hopefully I&#39;ll be able to learn and update this space as much as possible (when life, work and cats doesn&#39;t get in the way). </p><p data-v-3db02377> Just in case you&#39;re curious, this site was made with VueJs and TailwindCss (both of which I <i data-v-3db02377>think</i> I&#39;m a master at). </p></section>',1),T=H(()=>a("h1",null,"What I'm learning",-1)),K={class:"space-y-5 p-10 rounded-lg bg-gray-50 overflow-hidden"},N={class:"text-sm text-gray-400"},V=u({__name:"HomeView",setup(e){const t=g(!1);return(o,s)=>(n(),i("main",C,[G,a("section",null,[T,a("div",K,[a("div",{class:"flex items-center justify-between cursor-pointer",onClick:s[0]||(s[0]=l=>t.value=!t.value)},[a("div",null,[a("p",N,p(r(c).date),1),a("h2",null,p(r(c).title),1)]),d(r(A),{class:m(["w-5 h-5 text-gray-500",{"rotate-180":t.value}])},null,8,["class"])]),d(w,null,{default:f(()=>[t.value?(n(),y(r(S),{key:0})):b("",!0)]),_:1})])])]))}});const E=(e,t)=>{const o=e.__vccOpts||e;for(const[s,l]of t)o[s]=l;return o},B=E(V,[["__scopeId","data-v-3db02377"]]);export{B as default};
