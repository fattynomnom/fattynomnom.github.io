---
title: Integration testing with GraphQL
date: 27/04/24
---

Along with Typescript, writing tests is the best way to go to ensure that your code is as error-proof as it can get. I didn't really come from a testing background (having been spoiled by QA testing), but when I transitioned into a new company, it was required. And I have to say, it does make a difference.

With so many tutorials and docs on how to setup Jest for testing with different frameworks, I'm going to document my own so that I can use this as a guide to refer back to later.

# Setting up Jest with Typescript

Install the required dependencies:

```
npm install -D @types/jest jest ts-jest
```

And setup your `jest.config.js` file in the root of your project's directory:

```
// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config']
}
```

Then add this command in the `scripts` section of your `package.json`:

```
{
    "scripts": {
        "test": "jest"
    }
}
```

With this setup, you'll be able to start writing Jest tests and run tests with `npm run test`.

# Using integration testing with GraphQL for unit testing resolvers

I found [this documentation](https://www.apollographql.com/docs/apollo-server/testing/testing/) on integration testing. What Apollo intended for was to be enable users to do a full integration test of their GraphQL resolvers pipeline.

Previously I talked about implementing [middlewares for my GraphQL resolvers](https://fattynomnom.github.io/adding-middlewares-to-graphql-resolvers). While you can certainly use Apollo's integrated testing to test the entire pipeline (from middlewares to resolvers), I'm not going to do that. Technically, I will be using their integrated testing utility to "unit" test my resolvers.

I know it kind of defeats the purpose, but just as a personal preference, I prefer to make sure each step in my pipeline is well unit tested. I feel that with integrated testing, I am unable to write concise tests that specifically tests for a particular outcome because an integrated test tends to become quite large. Unit testing feels easier to maintain for me while making sure each part of the code is doing what it should do.

Justification aside, here's how I'm unit testing my resolver:

```
// resolvers/transactions.test.ts
import { ApolloContext } from '../middlewares/setApolloContext'
import { ApolloServer } from '@apollo/server'
import resolvers from '.'
import typeDefs from '../typeDefs'
import { prisma } from '../database'
import { TransactionFixture } from '../__fixtures__/TransactionFixture'
import MockDate from 'mockdate'

jest.mock('../database', () => ({
    prisma: {
        transaction: {
            findMany: jest.fn()
        }
    }
}))

describe('transactions', () => {
    const testServer = new ApolloServer<ApolloContext>({
        typeDefs,
        resolvers // You can see that I am excluding my middlewares here just to test my resolvers alone
    })
    const contextValue = {
        user: {
            id: 'user_id'
        }
    }

    it('returns transactions belonging to the user', async () => {
        jest.mocked(prisma.transaction.findMany).mockResolvedValueOnce([
            TransactionFixture
        ])

        const response = await testServer.executeOperation(
            {
                query: `
                    query testGetTransactions {
                        getTransactions {
                            uid
                        }
                    }
                `
            },
            {
                contextValue
            }
        )

        expect(prisma.transaction.findMany).toHaveBeenCalledWith({
            where: {
                user_id: 'user_id'
            }
        })
        expect(response.body).toMatchObject({
            singleResult: {
                data: {
                    getTransactions: [TransactionFixture]
                }
            }
        })
    })
})
```

And thats it! It seems simple but I spent a long time trying to find a way to "unit" test my resolvers. Like should I be using Supertest? Should I start the Express server? How do I start the Apollo server for testing? But eventually I found my way here and what works for me.

You can find my implementation in [this repo](https://github.com/fattynomnom/itrack-expressjs).
