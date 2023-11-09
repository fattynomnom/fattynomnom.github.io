---
title: Writing queries using Knex
date: 8/11/23
---

A short one for today, but something is better than nothing I guess!

So previously I had only used [Knex](https://knexjs.org/) for writing migration and seed files (following [this tutorial](https://medium.com/@yasirahboyce/node-express-knex-postgresql-22e10daf0817)). Querying was still being done via SQL.

So I decided its time to convert these SQL queries to use the Knex query builder.

First, setting up the config:

```
// database.ts
const Knex = knex({
    client: 'pg',
    connection: {
        user: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PW,
        host: process.env.POSTGRESQL_HOST,
        port: Number(process.env.POSTGRESQL_PORT),
        database: process.env.POSTGRESQL_DB
    }
})

export default Knex
```

And after doing a brief reading of the documentation, I converted these queries:

```
pool.query('SELECT * from users')
pool.query(
    'INSERT INTO users (email) VALUES ($1) RETURNING email',
    [user.email]
)
```

Into these:

```
Knex('users').select('*')
Knex('users').insert(user, '*')
```

Much easier to read and I don't have to worry about SQL syntax! Knex's query builder also looks a lot like Laravel's query builder... But its been awhile since Laravel for me, so I don't remember these things off the top of my head anymore.

**Next thing I'll be working on:**
Integrating Auth0 with Express
