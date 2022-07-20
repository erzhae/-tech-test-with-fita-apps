import { createServer } from '@graphql-yoga/node'
import { makeSchema } from 'nexus'

import { join } from 'path'

import * as types from './../graphql'

const projDir = process.cwd()
const schema = makeSchema({
  types,
  outputs: {
    typegen: join(projDir, 'src/models', 'index.ts'),
    schema: join(projDir, 'src/graphql', '_schema.graphql')
  }
})

const server = createServer({
  schema,
  graphiql: true
})

export { schema, server }
