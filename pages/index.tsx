import type { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import useSWR from 'swr'
import { fetcher } from 'lib/fetcher'
import axios from 'axios'

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
  const linkClipFromText = (text: string) => {
    const reg = new RegExp(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/, 'g')

    return text.match(reg)
  }

  const repoImageFromOgp = (urls: RegExpMatchArray | null) => {
    if (urls) {
      // console.log(urls[0].replace(/^([^#]*).*/, "$1").replace(/^[^?]*\??(.*)/, "$1"))
      const githubUrl = urls.find((val) => val.includes('github'))
      const url = githubUrl ? new URL(githubUrl) : ''
      
      return url as string
    }
  }

  const repoImageElement = (val: any) => {
    const img = repoImageFromOgp(linkClipFromText(val.message.attachments[0].text))
    return img
      ? <img src={img} alt="" />
      : ''
  }
  return (
    <div className="border-solid">
      <ul>
        {
          reactionList.map((val, index) => {
            return (
              <li key={index} className=" h-10 border-solid border-2 border-gray-300">
                <div>
                  {linkClipFromText(val.message.attachments[0].text)}
                  {repoImageElement(val)}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Home
