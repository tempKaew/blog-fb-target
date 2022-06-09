import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`A statically generated blog example using Next.js and ${CMS_NAME}.`}
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <meta
        property="og:image:alt"
        content={`${CMS_NAME}`}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta
        name="og:title"
        content={`A statically generated blog example using Next.js and ${CMS_NAME}.`}
      />
      <meta
        name="og:description"
        content={`A statically generated blog example using Next.js and ${CMS_NAME}.`}
      />
      <meta property="og:url" content="" />
      <meta property="og:site_name" content="" />
      <meta property="article:section" content="Animal" />
    </Head>
  )
}
