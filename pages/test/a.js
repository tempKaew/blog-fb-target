function Page({}) {

    return (
        <div>
            test
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    return {
        redirect: {
            // destination: 'https://hotnewsatth.blogspot.com/2019/10/gps.html'
            destination: 'https://hotnewsatth.blogspot.com/000',
            statusCode: 303
        }
    }
}

export default Page