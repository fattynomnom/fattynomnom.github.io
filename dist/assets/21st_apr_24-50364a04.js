import{d as t,c as a,o as i,f as o}from"./index-4e9bca00.js";const n={class:"markdown-body"},s=o(`<p>Recently, I’ve started using Prisma at work, and I have to say that I liked it so much, that I’m migrating from using Knex to Prisma in my personal project.</p><p>While Knex is simple and easy to use, I prefer Prisma because it was designed with Typescript in mind and I prioritize type-safety over simplicity.</p><p>Migrating is still easy to do at this stage because I don’t have a production database with real data yet, but obviously if you do, more care should be taken to migrating the data as well. In the context of this post, I will not go into data migration, but more on the setup side.</p><h1>Setting up</h1><p>First things first, install and initialize Prisma:</p><pre><code class="">npm install prisma -D
npx prisma init
</code></pre><p>Then I updated my <code class="">.env</code> with my db credentials:</p><pre><code class="">DATABASE_URL=&quot;postgresql://admin@localhost:5432/itrack?schema=public&quot;
</code></pre><p>And because I already have an existing local db, I ran <code class="">npx prisma db pull</code>. This created a Prisma schema off my existing db, instead of having to write an entire schema from scratch.</p><p>But I did still need to cleanup the schema a bit and use some of Prisma model utilities that I haven’t been able to do with Knex before.</p><h1>Updating Prisma schema</h1><p>These are some of the things I did with my schema, which is simple enough so I won’t go through it:</p><ul><li>Using <a href="https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping#mapping-collectiontable-and-fieldcolumn-names"><code class="">@map</code> attribute</a> to map model names to table names</li><li>Using <a href="https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping#using-default-constraint-names"><code class="">@default</code> attribute</a> to assign default values to columns so that these columns will be auto-populated on insert</li><li>Using <a href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid"><code class="">uuid()</code> attribute function</a> together with <code class="">@default</code> attribute to auto-generate UUID</li><li>Using <a href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique"><code class="">@unique</code> attribute</a> to define which columns/combination of columns should be unique</li><li>Using and defining <a href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#enum">enums</a> for column values</li></ul><p>This is the schema I ended up with after updating it:</p><pre><code class="">generator client {
  provider = &quot;prisma-client-js&quot;
}

datasource db {
  provider = &quot;postgresql&quot;
  url      = env(&quot;DATABASE_URL&quot;)
}

enum CategoryType {
  EXPENSE
  INCOME
}

model Category {
  uid          String        @id @default(uuid())
  name         String
  type         CategoryType
  color        String
  user_id      String
  users        User          @relation(fields: [user_id], references: [id])
  transactions Transaction[]

  @@unique([user_id, name])
  @@map(&quot;categories&quot;)
}

model Transaction {
  uid          String   @id @default(uuid())
  name         String
  amount       Float
  date         DateTime @db.Timestamptz
  category_uid String
  user_id      String
  categories   Category @relation(fields: [category_uid], references: [uid])
  users        User     @relation(fields: [user_id], references: [id])

  @@map(&quot;transactions&quot;)
}

model User {
  id           String        @id
  email        String        @unique
  categories   Category[]
  transactions Transaction[]

  @@map(&quot;users&quot;)
}
</code></pre><p>You can check out the entire schema on <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a> as well.</p><h1>Seeding</h1><p>I also setup seeding following <a href="https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate">this documentation</a>.</p><p>I think their documentation is direct and easy to understand, so I won’t elaborate on it. This is another reason why I love Prisma - good, clear documentation.</p><h1>Linting and formatting</h1><p>To help with linting and detecting errors in the Prisma schema file, you can:</p><ul><li>Install extension <code class="">Prisma.prisma</code> in VSCode</li><li>Run <code class="">npx prisma validate</code></li></ul><p>And you can also use <code class="">npx prisma format</code> to auto-format your Prisma schema.</p><h1>Generating Prisma types and client</h1><p>Now I need to replace all my Knex queries with Prisma. To do this, I need to generate the Prisma client. I did this by running <code class="">npx prisma generate</code>.</p><p>This command will install the <code class="">@prisma/client</code> dependency (if you don’t already have it) and also generate the model types.</p><p>Then I updated my <code class="">src/database.ts</code> file to initialize the Prisma client to re-use across my entire application:</p><pre><code class="">// src/database.ts
import { PrismaClient } from &#39;@prisma/client&#39;

export const prisma = new PrismaClient()
</code></pre><p>And used it like this:</p><pre><code class="">// resolvers/users.ts
import { prisma } from &#39;src/database&#39;

const Resolvers = {
  Query: {
      getAllUsers: async () =&gt; {
          const rows = await prisma.user.findMany({
              include: { categories: true }
          })

          return rows
      }
  }
}
</code></pre><p>The reason why I’m re-using one Prisma client instance across the entire application is so that I do not create/open multiple connections to my Postgres db. You can read more <a href="https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool#manual-database-connection-handling">here on connection pools</a>, but the gist of it is the less connections that are opened, the better as there are limits to how many connections can be opened.</p><h1>Running migrations</h1><p>As I’ve mentioned, my local db does not contain any live data yet, so I will not be migrating any data. What I did was simply removed all existing tables creating via Knex, and run Prisma migrations with <code class="">npx prisma migrate dev</code>.</p><p>This will create new tables based off my Prisma schema, and also create migration files in the <code class="">prisma/migrations</code> directory. The migration files basically contain the SQL queries used to run migrations.</p><p>This is a short snippet of my migration file generated after running the command:</p><pre><code class="">// prisma/migrations/20240422033926_init/migration.sql
-- CreateEnum
CREATE TYPE &quot;CategoryType&quot; AS ENUM (&#39;EXPENSE&#39;, &#39;INCOME&#39;);

-- CreateTable
CREATE TABLE &quot;categories&quot; (
    &quot;uid&quot; TEXT NOT NULL,
    &quot;name&quot; TEXT NOT NULL,
    &quot;type&quot; &quot;CategoryType&quot; NOT NULL,
    &quot;color&quot; &quot;Color&quot; NOT NULL,
    &quot;user_id&quot; TEXT NOT NULL,

    CONSTRAINT &quot;categories_pkey&quot; PRIMARY KEY (&quot;uid&quot;)
);

-- CreateIndex
CREATE UNIQUE INDEX &quot;categories_user_id_name_key&quot; ON &quot;categories&quot;(&quot;user_id&quot;, &quot;name&quot;);

-- AddForeignKey
ALTER TABLE &quot;categories&quot; ADD CONSTRAINT &quot;categories_user_id_fkey&quot; FOREIGN KEY (&quot;user_id&quot;) REFERENCES &quot;users&quot;(&quot;id&quot;) ON DELETE RESTRICT ON UPDATE CASCADE;
</code></pre><p>It is also important to <a href="https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories#committing-the-migration-history-to-source-control">commit the generated migrations</a> to your repository. This is because running migrations on local vs staging/production environments is handled differently by Prisma.</p><p>On local, you would need to run <code class="">npx prisma migrate dev</code>. This generates new migration files and executes the queries contained in the migration files against your local db.</p><p>On staging/production environments, you need to run <code class="">npx prisma migrate deploy</code>. This does not generate any new migration files, but uses your <strong>existing</strong> migration files to execute the queries against your staging/production db.</p><p>I know this sounds confusing and I had to do a bit of a deep dive into it, but the gist of it is: You will always need to run <code class="">npx prisma migrate dev</code> before <code class="">npx prisma migrate deploy</code>, and you must commit the files generated by <code class="">migrate dev</code> to maintain historical migration accuracy.</p><p>If you want more of an in-depth explanation, here are the docs that helped me:</p><ul><li><a href="https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production"><code class="">migrate dev</code> vs <code class="">migrate deploy</code></a></li><li><a href="https://www.prisma.io/docs/orm/prisma-migrate/workflows/team-development">How migration histories work in a team collaboration setting</a></li></ul><h1>Cleaning up</h1><p>To clean up, I just uninstalled the <code class="">knex</code> and <code class="">pg</code> packages, replaced all Knex usage and queries, and removed all my Knex-related files and config.</p><h1>Conclusion</h1><p>Overall, understanding how to use Prisma (especially the migration part), the schema and all the different commands does take a bit of time, compared to Knex where the setup was so straightforward. But once I got the hang of it, everything else came easily.</p><p>Plus with type-safety, I would say the relatively steeper learning curve was worth it. However, if you’re working with smaller projects or Javascript, Knex would probably be the better option.</p><p>You check out my entire Prisma setup <a href="https://github.com/fattynomnom/itrack-expressjs">this repo</a>.</p>`,48),r=[s],p={title:"Setting up PrismaORM",date:"21/04/24"},u="",h=t({__name:"21st_apr_24",setup(d,{expose:e}){return e({frontmatter:{title:"Setting up PrismaORM",date:"21/04/24"},excerpt:void 0}),(c,l)=>(i(),a("div",n,r))}});export{h as default,u as excerpt,p as frontmatter};
