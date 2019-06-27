import express from 'express'
import http from 'http'
import https from 'https'
import fs from 'fs'

const app = express()
const distDir = "./dist"
const httpsKey = './keys/key.pem'
const httpsCert = './keys/cert.pem'
const httpPort = process.env.PORT || 8080
const httpsPort = process.env.PORT || 8443

process.title = 'app-server'

if (process.env.NODE_ENV == 'development') {
  console.log("Running in development mode")
}

app.use(express.static(distDir))

app.post('/api/hello', (req, res) => {
  res.send('Hello World!')
})

if (fs.existsSync(httpsKey) && fs.existsSync(httpsCert)) {
  console.log('Starting https server')
  https.createServer({ key: fs.readFileSync(httpsKey), cert: fs.readFileSync(httpsCert) }, app)
    .listen(httpsPort, () => console.log(`App listening on https port ${httpsPort}....`))
} else {
  console.log('Starting http server')
  http.createServer(app).listen(httpPort, () => console.log(`App listening on http port ${httpPort}....`))
}