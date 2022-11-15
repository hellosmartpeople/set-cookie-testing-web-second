import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { setCookie, getCookie} from 'cookies-next';
const querystring = require('querystring');


export const getServerSideProps = (context) => {
  const req = context.req
  const res = context.res
  const userCookie = getCookie('iodUsers', { req, res });
  const host = context.req.headers.host
  const url = context.req.url
  const fullURL = host+url
  const referer = context.req.headers.referer
  const { query } = context
  const queryRedirection = {}

  if (!userCookie && !('_gl' in query)) {
    if (referer){
      if (fullURL.includes("?")){
        fullURL = fullURL+'&referer='+referer
      }else{
        fullURL = fullURL+'?referer='+referer
      }
    }
    queryRedirection.sourceweb = fullURL

    const searchParams = querystring.stringify(queryRedirection);

    return {
      redirect: {
        permanent: false,
        destination: 'https://wondrous-cendol-36fe15.netlify.app/redirection?'+searchParams,
      },
    };
  }

  setCookie('iodUsers', 'true', { req, res, maxAge: 60 * 60 * 24 * 400, httpOnly: true});

  return { props: {} };
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />

        <script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-TD263X2");`}
        </script>

        <script id="analyticsjs" strategy="afterInteractive">
        {`(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "G-004ZVSZ5S4", "auto");`}
        </script> 
      </Head>

      <main>
        <Header title="Welcome to my web 2!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
