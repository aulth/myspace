import Head from 'next/head'
import Items from '../components/Items'
import LandingPage from '../components/LandingPage';
import MobileNavbar from '../components/MobileNavbar';
import Navbar from '../components/Navbar'
// import Search from '../components/Search'
export default function Home({allItems, msg}) {
  const collectIpAndGeolocation =  ()=>{
    if(typeof window!=='undefined'){
      getLocation()
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async(position)=>{
            console.log(position.coords.latitude);
            console.log(position.coords.longitude)
            let reverseGeoData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en&key=${process.env.bigdatacloudapi}`)
            let reverseGeoDataJson = await reverseGeoData.json();
            console.log(reverseGeoDataJson.localityInfo)
            
          });
        } else {
           console.log("Your browser does not support Geolocation or you have not given the permission for access for your location")
        }
      }
    }

  }

  collectIpAndGeolocation()
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
