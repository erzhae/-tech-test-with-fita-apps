import { server } from './loader'

server.start().catch((err) => {
  console.error(err)
})
