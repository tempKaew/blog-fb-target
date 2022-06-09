import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>{CMS_NAME}</title>
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
        <Container>
          <Intro />
        </Container>
      </Layout>
    </>
  )
}
