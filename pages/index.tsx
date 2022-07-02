import type { InferGetStaticPropsType } from 'next'
import Image from 'next/image'

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
  console.log(reactionList.items[0].message.attachments)
  console.log(reactionList.items[0].message.reactions)
  return {
    props: {
      reactionList: reactionList.items
    }
  }
}

const Home = ({ reactionList }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // TODO: URLからOGPイメージを取得するようにする
  // TODO: URLから取得したOGPイメージをカード形式で表示するようにする
  // TODO: ページネーションを実装する一ページ20件ほどにしておく
  // TODO： リポジトリ情報が見やすい形にする
  console.log(reactionList)
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default Home
