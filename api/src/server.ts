import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { ValidateError } from 'tsoa'
import { RegisterRoutes } from './generated/routes.js'

// Routes are mounted under /api so the ingress can forward the /api prefix
// without a rewrite rule, and the browser stays on a single origin. The /api
// prefix comes from routes.basePath in tsoa.json, so controllers declare paths
// relative to it.
const app = express()
const port = Number(process.env.PORT ?? 3000)

app.use(express.json())

RegisterRoutes(app)

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  // tsoa rejects requests whose params don't match the controller signature.
  if (err instanceof ValidateError) {
    res.status(422).json({ message: 'Validation failed', details: err.fields })
    return
  }

  if (err instanceof Error) {
    const status = (err as Error & { status?: number }).status ?? 500
    res.status(status).json({ message: err.message })
    return
  }

  next()
})

app.listen(port, () => {
  console.log(`api listening on ${port}`)
})
