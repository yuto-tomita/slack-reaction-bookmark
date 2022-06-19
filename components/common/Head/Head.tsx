import { FC } from 'react'
import NextHead from 'next/head'

const Head: FC = () => {
  return (
    <NextHead>
      <title>Slack Reaction Bookmark</title>
      <meta name="description" content="SlackでリアクションをしたGithubリポジトリ情報を一覧で確認できるツール" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}

export default Head