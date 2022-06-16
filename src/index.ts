import express from 'express'
import axios from 'axios'
import 'dotenv/config'

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log('Start on port 3000.')
})

app.post('/', (req, res) => {
  console.log(req.body)
  console.log(req)
  res.header('Content-type', 'application/json')
  res.set('Content-type', 'application/json')

  res.status(200).json({ challenge: req.body.challenge })
})

app.get('/slack/reactions', async(req, res) => {
  const endPoint = `https://slack.com/api/reactions.list?user=${process.env.USER_ID}&pretty=1`
  console.log(process.env.USER_ID)
  const reactions = await axios.get(endPoint, {
    headers: {
      Authorization: `Bearer ${process.env.BOT_USER_OAUTH_TOKEN}`,
    }
  }).then((res) => {
    console.log(res.data)
  })

  return reactions
})
