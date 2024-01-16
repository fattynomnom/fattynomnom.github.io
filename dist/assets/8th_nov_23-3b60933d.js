import{d as t,c as n,o as s,f as o}from"./index-a8b18d63.js";const r={class:"markdown-body"},a=o(`<p>A short one for today, but something is better than nothing I guess!</p><p>So previously I had only used <a href="https://knexjs.org/">Knex</a> for writing migration and seed files (following <a href="https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817">this tutorial</a>). Querying was still being done via SQL.</p><p>So I decided its time to convert these SQL queries to use the Knex query builder.</p><p>First, setting up the config:</p><pre><code class="">// database.ts
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
</code></pre><p>Much easier to read and I don’t have to worry about SQL syntax! Knex’s query builder also looks a lot like Laravel’s query builder… But its been awhile since Laravel for me, so I don’t remember these things off the top of my head anymore.</p><p>View the changes I’ve made in this repo: <a href="https://github.com/fattynomnom/itrack-expressjs">itrack-expressjs</a>.</p><p><strong>Next thing I’ll be working on:</strong> Integrating Auth0 with Express</p>`,12),i=[a],h={title:"Writing queries using Knex",date:"8/11/23"},l="",m=t({__name:"8th_nov_23",setup(p,{expose:e}){return e({frontmatter:{title:"Writing queries using Knex",date:"8/11/23"},excerpt:void 0}),(d,c)=>(s(),n("div",r,i))}});export{m as default,l as excerpt,h as frontmatter};
