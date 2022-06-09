import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../components/container'
import PostBody from '../components/post-body'
import PostHeader from '../components/post-header'
import Layout from '../components/layout'
import { getPostBySlug, getAllPosts } from '../lib/api'
import PostTitle from '../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import markdownToHtml from '../lib/markdownToHtml'
import { useEffect } from 'react'

export default function Post({ post, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  var utm_source = router.query?.utm_source
  console.log(router);
  useEffect(() => {
    window.location.href = post.redirectToSite;
    console.log(window.document.referrer);
    if (
      utm_source==='fb'
      || document.referrer?.toLowerCase().includes("facebook")
    ) {
      window.location.href = post.redirectToSite;
    }
  },[]);

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-16 mt-4">
              <Head>
                <title>
                  {post.title} | {CMS_NAME}
                </title>
                <meta
                  name="description"
                  content={`${post.title}`}
                />
                <meta property="og:image" content={post.coverImage} />
                <meta
                  property="og:image:alt"
                  content={`${post.title}`}
                />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="article" />
                <meta
                  name="og:title"
                  content={`${post.title} | ${CMS_NAME}`}
                />
                <meta
                  name="og:description"
                  content={`${post.title}`}
                />
                <meta property="og:url" content="" />
                <meta property="og:site_name" content="" />
                <meta property="article:section" content="Animal" />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, query }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'slug',
    'content',
    'coverImage',
    'redirectToSite'
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
