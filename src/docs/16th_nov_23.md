---
title: Generate typings from GraphQL schema
date: 16/11/23
---

As mentioned, I am a huge Typescript fan. So when I accidentally came across [this tutorial](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/) to generate typings from my GraphQL schema using Codegen... I just had to. A little sidetracked from my previous goal, but this was easy enough to do.

So without Codegen, I was doing this:

```
// src/Schema.ts
const Schema = `#graphql
    type User {
        email: String!
    }
    type Query {
        getAllUsers: [User]
    }
    type Mutation {
        addUser(email: String): User
    }
`
export default Schema
```

```
// src/models.ts
export interface User {
    email: string
}
```

At this stage, since I only had one model `User`, it is still maintainable.

But when I start adding more models, it can easily get out of hand. There would be two separate files with many different models that I need to maintain. Its more work, and frankly people aren't perfect, we're a lot more prone to making errors.

So it makes sense to use Codegen to automatically generate typings based on the schema. Define it once and never do it again.

The [tutorial](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/) was pretty straightforward so I won't go into it, but here's my config anyway for reference:

```
// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'src/Schema.graphql',
    generates: {
        'src/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-resolvers']
        }
    }
}

export default config
```

And my scripts:

```
// package.json
...
"scripts": {
    ...
    "codegen": "graphql-codegen --config codegen.ts",
    "build": "npm run codegen && tsc",
    "start": "npm run build && node dist/index.js"
},
```

Then all I needed to do was run `npm run codegen` to generate my typings in `src/generated/graphql.ts`.

With this, I can remove my `src/models.ts` file. This is how I used the generated types:

```
// src/Resolvers.ts
import { MutationAddUserArgs, Resolvers } from './generated/graphql'

const Resolvers: Resolvers = {
    Query: {
        getAllUsers: async () => {
            ...
        }
    },
    Mutation: {
        addUser: async (_: unknown, user: MutationAddUserArgs) => {
            ...
        }
    }
}

export default Resolvers
```

```
// src/index.ts
import { User } from './generated/graphql'

interface ApolloContext {
    user: User
}
```

I finished up by adding my generated types file to my Eslint ignore list as well as my `.gitignore`.

I've committed my changes to [this repo](https://github.com/fattynomnom/itrack-expressjs).

Ok now onto the next thing: adding user details to token claims.
