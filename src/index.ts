// import 'dotenv/config'
// import { App } from '@slack/bolt'

// const app = new App({
//   token: process.env.BOT_USER_OAUTH_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode: true,
//   appToken: process.env.SLACK_APP_TOKEN,
//   port: 3000
// })

// app.message(':wave:', async({ message, say }) => {
//   console.log(message)
// })
	
// ;(async() => {
//   await app.start()
//   console.log('Bolt app is Running!')
// })()

import express from 'express'
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.listen(3000, () => {
  console.log('Start on port 3000.')
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.header('Content-type', 'application/json')
  res.set('Content-type', 'application/json')

  res.status(200).json({ challenge: req.body.challenge })
})
