import { existsSync, readFileSync } from 'fs';
import ErrorPage from 'next/error'
import Container from '../components/container'
import PostBody from '../components/post-body'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import PostTitle from '../components/post-title'

function Page({ data }) {

    if (!data) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout>
            <Container>
                <>
                    <article className="mb-16 mt-4">
                        <Head>
                            <title>
                                {data.title} | {CMS_NAME}
                            </title>
                            <meta
                                name="description"
                                content={`${data.title}`}
                            />
                            <meta property="og:image" content={data.coverImage} />
                            <meta
                                property="og:image:alt"
                                content={`${data.title}`}
                            />
                            <meta property="og:locale" content="en_US" />
                            <meta property="og:type" content="article" />
                            <meta
                                name="og:title"
                                content={`${data.title} | ${CMS_NAME}`}
                            />
                            <meta
                                name="og:description"
                                content={`${data.title}`}
                            />
                            <meta property="og:url" content="" />
                            <meta property="og:site_name" content="" />
                            <meta property="article:section" content="Animal" />
                        </Head>
                        <PostTitle>{data.title}</PostTitle>
                        <PostBody content={data.content} />
                    </article>
                </>
            </Container>
        </Layout>
    )
}

// This gets called on every request
export async function getServerSideProps({ req, query }) {
    let noContent = false
    const post_id = query.pid
    let data = {};
    let redirect = req?.headers?.referer?.toLowerCase().includes("facebook") || query.redirect;

    var filePath = `data/posts.json`
    if (
        existsSync(filePath)
        && redirect
    ) {
        console.log('file');
        const content = readFileSync(filePath, 'utf8');
        let posts = JSON.parse(content)
        data = posts.filter((p) => p.pid.toString() === post_id);
        if (data.length) {
            noContent = true
            data = {
                ...data[0],
                'url' : `https://hotnewsatth.blogspot.com/${data[0].url}`
            }
        }
    }

    if (
        noContent==false
        && post_id
    ) {
        console.log('fetching');
        const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${post_id}?key=${process.env.BLOG_API_KEY}`)
        data = await res.json()

        const regex = /\/\/(\S+?(?:jpe?g|png|gif))/gm;
        var coverImage = regex.exec(data.content)
        data = {
            ...data,
            'coverImage' : (coverImage&&coverImage.length) ? coverImage[0] : ''
        }
    }
    if(redirect&&data?.url){
        return {
            redirect: {
                permanent: false,
                destination: data?.url
            }
        }
    }
    return { props: { data } }
}

export default Page