import express, { Express, RequestHandler } from 'express'

interface Opts {
  nextHandler: RequestHandler
}

export default function createServer({ nextHandler }: Opts): Express {
  const server = express()

  server.disable('x-powered-by')
  server.set('trust-proxy', true)
  server.all('*', nextHandler)

  return server
}
