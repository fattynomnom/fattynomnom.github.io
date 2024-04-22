---
title: Setting up PrismaORM
date: 21/04/24
---

Recently, I've started using Prisma at work, and I have to say that I liked it so much, that I'm migrating from using Knex to Prisma in my personal project.

While Knex is simple and easy to use, I prefer Prisma because it was designed with Typescript in mind and I prioritize type-safety over simplicity.

Migrating is still easy to do at this stage because I don't have a production database with real data yet, but obviously if you do, more care should be taken to migrating the data as well. In the context of this post, I will not go into data migration, but more on the setup side.

# Setting up

First things first, install and initialize Prisma:

```
npm install prisma -D
npx prisma init
```

Then I updated my `.env` with my db credentials:

```
DATABASE_URL="postgresql://admin@localhost:5432/itrack?schema=public"
```

And because I already have an existing local db, I ran `npx prisma db pull`. This created a Prisma schema off my existing db, instead of having to write an entire schema from scratch.

But I did still need to cleanup the schema a bit and use some of Prisma model utilities that I haven't been able to do with Knex before.

# Updating Prisma schema

These are some of the things I did with my schema, which is simple enough so I won't go through it:

-   Using [`@map` attribute](https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping#mapping-collectiontable-and-fieldcolumn-names) to map model names to table names
-   Using [`@default` attribute](https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping#using-default-constraint-names) to assign default values to columns so that these columns will be auto-populated on insert
-   Using [`uuid()` attribute function](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#uuid) together with `@default` attribute to auto-generate UUID
-   Using [`@unique` attribute](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique) to define which columns/combination of columns should be unique
-   Using and defining [enums](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#enum) for column values

This is the schema I ended up with after updating it:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
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
  @@map("categories")
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

  @@map("transactions")
}

model User {
  id           String        @id
  email        String        @unique
  categories   Category[]
  transactions Transaction[]

  @@map("users")
}
```

You can check out the entire schema on [this repo](https://github.com/fattynomnom/itrack-expressjs) as well.

# Seeding

I also setup seeding following [this documentation](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate).

I think their documentation is direct and easy to understand, so I won't elaborate on it. This is another reason why I love Prisma - good, clear documentation.

# Linting and formatting

To help with linting and detecting errors in the Prisma schema file, you can:

-   Install extension `Prisma.prisma` in VSCode
-   Run `npx prisma validate`

And you can also use `npx prisma format` to auto-format your Prisma schema.

# Generating Prisma types and client

Now I need to replace all my Knex queries with Prisma. To do this, I need to generate the Prisma client. I did this by running `npx prisma generate`.

This command will install the `@prisma/client` dependency (if you don't already have it) and also generate the model types.

Then I updated my `src/database.ts` file to initialize the Prisma client to re-use across my entire application:

```
// src/database.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
```

And used it like this:

```
// resolvers/users.ts
import { prisma } from 'src/database'

const Resolvers = {
  Query: {
      getAllUsers: async () => {
          const rows = await prisma.user.findMany({
              include: { categories: true }
          })

          return rows
      }
  }
}
```

The reason why I'm re-using one Prisma client instance across the entire application is so that I do not create/open multiple connections to my Postgres db. You can read more [here on connection pools](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool#manual-database-connection-handling), but the gist of it is the less connections that are opened, the better as there are limits to how many connections can be opened.

# Running migrations

As I've mentioned, my local db does not contain any live data yet, so I will not be migrating any data. What I did was simply removed all existing tables creating via Knex, and run Prisma migrations with `npx prisma migrate dev`.

This will create new tables based off my Prisma schema, and also create migration files in the `prisma/migrations` directory. The migration files basically contain the SQL queries used to run migrations.

This is a short snippet of my migration file generated after running the command:

```
// prisma/migrations/20240422033926_init/migration.sql
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('EXPENSE', 'INCOME');

-- CreateTable
CREATE TABLE "categories" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "color" "Color" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_user_id_name_key" ON "categories"("user_id", "name");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

It is also important to [commit the generated migrations](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories#committing-the-migration-history-to-source-control) to your repository. This is because running migrations on local vs staging/production environments is handled differently by Prisma.

On local, you would need to run `npx prisma migrate dev`. This generates new migration files and executes the queries contained in the migration files against your local db.

On staging/production environments, you need to run `npx prisma migrate deploy`. This does not generate any new migration files, but uses your **existing** migration files to execute the queries against your staging/production db.

I know this sounds confusing and I had to do a bit of a deep dive into it, but the gist of it is: You will always need to run `npx prisma migrate dev` before `npx prisma migrate deploy`, and you must commit the files generated by `migrate dev` to maintain historical migration accuracy.

If you want more of an in-depth explanation, here are the docs that helped me:

-   [`migrate dev` vs `migrate deploy`](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)
-   [How migration histories work in a team collaboration setting](https://www.prisma.io/docs/orm/prisma-migrate/workflows/team-development)

# Cleaning up

To clean up, I just uninstalled the `knex` and `pg` packages, replaced all Knex usage and queries, and removed all my Knex-related files and config.

# Conclusion

Overall, understanding how to use Prisma (especially the migration part), the schema and all the different commands does take a bit of time, compared to Knex where the setup was so straightforward. But once I got the hang of it, everything else came easily.

Plus with type-safety, I would say the relatively steeper learning curve was worth it. However, if you're working with smaller projects or Javascript, Knex would probably be the better option.

You check out my entire Prisma setup [this repo](https://github.com/fattynomnom/itrack-expressjs).
