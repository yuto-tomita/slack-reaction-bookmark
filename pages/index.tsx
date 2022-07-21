import type { InferGetStaticPropsType } from 'next'

export interface SlackReactionData {
  ok: boolean
  items: {
    type: string
    channel: string
    message: {
      type: string
      subtype: string
      text: string
      ts: string
      username: string
      icons: {
        image_36: string
        image_48: string
        image_72: string
      }
      bot_id: string
      attachments: {
        from_url: string
        ts: number
        id: number
        original_url: string
        fallback: string
        text: string
        pretext: string
        title: string
        title_link: string
        author_name: string
        author_link: string
        author_icon: string
        author_subname: string
        service_name: string
        service_url: string
        mrkdwn_in: string[],
        footer: string[],
        footer_icon: string
      }[]
      reactions: {
        name: string
        users: string[]
        count: number
      }[]
      permalink: string
    }
  }[]
  response_metadata: {
    next_cursor: string
  }
}

export async function getStaticProps() {
  const res = await fetch(`https://slack.com/api/reactions.list?user=${process.env.USER_ID}&pretty=1`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.BOT_USER_OAUTH_TOKEN}`,
    }
  })
  const reactionList: SlackReactionData = await res.json()

  const findRepoUrlFromGithubUrl = async(text: string) => {
    const urlReg = new RegExp(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/, 'g')
    const githubUrl = text.match(urlReg)

    if (githubUrl) {
      const u = encodeURI(githubUrl[0])
      const res = await fetch(u, {
        headers: {
          'User-Agent': 'bot',
          'Content-Type': 'text/html'
        }
      })

      const html = await res.text()

      const metaImageTagReg = new RegExp(/<meta property="og:image" content="(.*?)"/, 'g')
      const metaImageTag = html.match(metaImageTagReg)

      const repoTitleTagReg = new RegExp(/<meta property="og:title" content="(.*?)"/, 'g')
      const repoTitle = html.match(repoTitleTagReg)

      if (metaImageTag && repoTitle) {
        const imageUrl = metaImageTag[0].substring(35, metaImageTag[0].length - 1)

        return {
          imageUrl,
          repoTitle: repoTitle[0].substring(35, repoTitle[0].length - 1)
        }
      } else {
        return {
          imageUrl: null,
          repoTitle: null
        }
      }
    } else {
      return {
        imageUrl: null,
        repoTitle: null
      }
    }
  }

  const displayData = async() => {
    let tmp: { imageUrl: string, repoTitle: string }[]

    const starRepos = reactionList.items.map(async(val) => await findRepoUrlFromGithubUrl(val.message.attachments[0].text))

    await Promise.all(starRepos).then((val) => {
      tmp = val
    })

    return tmp
  }
  const data = await displayData()
  console.log(data)

  return {
    props: {
      displayData: data
    }
  }
}

const Home = ({ displayData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // TODO: URLからOGPイメージを取得するようにする
  // TODO: URLから取得したOGPイメージをカード形式で表示するようにする
  // TODO: ページネーションを実装する一ページ20件ほどにしておく
  // TODO： リポジトリ情報が見やすい形にする
  console.log(displayData)
  return (
    <div className="border-solid">
      <ul>
        {
          displayData.map((val, index) => {
            return (
              <li key={index} className="h-60 border-solid border-2 border-gray-300">
                {val.repoTitle ? <span>{val.repoTitle}</span> : ''}
                {/* <span>{val.repoTitle}</span> */}
                {val.imageUrl ? <img src={val.imageUrl} width="300px" height="800" /> : ''}
                {/* {val.imageUrl} */}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Home
