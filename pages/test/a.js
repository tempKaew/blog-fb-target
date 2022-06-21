function Page({}) {

    return (
        <div>
            test
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps({ req, query }) {
    return {
        redirect: {
            permanent: false,
            // destination: 'https://hotnewsatth.blogspot.com/2019/10/gps.html'
            // destination: 'https://hotnewsatth.blogspot.com/000'
            destination: 'https://xn--22ck6fqaa1b8bg.blogspot.com/'
        }
    }
}

export default Page