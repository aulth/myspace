import Head from 'next/head'
import Items from '../components/Items'
import LandingPage from '../components/LandingPage';
import MobileNavbar from '../components/MobileNavbar';
import Navbar from '../components/Navbar'
// import Search from '../components/Search'
export default function Home({allItems, msg}) {

  return (
    <>
    <div className='home-page min-h-screen'>
      <Head>
        <title>MySpace</title>
        <meta name="description" content="Initial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingPage/>
       <Items allItems={allItems} msg={msg}/>
       <MobileNavbar/>
      </main>
    </div>
    </>
  )
}
export async function getServerSideProps(context) {
      const response = await fetch('https://myspacebook.vercel.app/api/getallitem');
      const data = await response.json();
      if(data.success){
          return {
              props:{allItems:data.item, msg:'Data Available'}
          }
      }
      return {
          props:{allItems:{}, msg:data.msg}
      }
}
