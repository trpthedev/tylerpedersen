import express from 'express'

// Routes are mounted under /api so the ingress can forward the /api prefix
// without a rewrite rule, and the browser stays on a single origin.
const app = express()
const port = Number(process.env.PORT ?? 3000)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

app.listen(port, () => {
  console.log(`api listening on ${port}`)
})
