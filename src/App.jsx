
import './App.css'
import Capabilities from './components/Capabilities'
import Category from './components/Category/Category'
import OfferCard from './components/common/OfferCard'
import FeaturesPackaging from './components/FeaturesPackaging/FeaturesPackaging'
import Footer from './components/footer/Footer'
import GetPriceQuote from './components/GetPriceQuote/GetPriceQuote'
import Navbar from './components/Header/Navbar'
import TopNav from './components/Header/TopNav'
import InspiringStories from './components/InspiringStories/InspiringStories'
import SampleKit from './components/SampleKit'
import Home from './screen/home'
import google from './assets/images/footer/google-reviws-logo.webp';
import Testimonials from './components/Testimonials'
function App() {
  return (
    <>
    <TopNav/>
    <Navbar/>
     <Home/>
     <Category/>
     <OfferCard discount={'Get 30%'} title={'Off Your First Order!'} /> 
     <FeaturesPackaging/>
     <OfferCard discount={'Save 30%'} title={'on Bulk Orders'} subTitle={'Need more this year?'} />
     <div className="  mt-8  sm:max-w-7xl bg-[#F6F6F6] p-8 flex sm:flex-row flex-col gap-5 justify-between items-center rounded-xl max-w-[95%] mx-auto">
       <div>
        <img src={google} alt='' />
      </div>
      <div>
        <button className='px-6 py-2.5 rounded-lg flex bg-blue-500 text-white  hover:bg-[#EE334B] hover:text-white hover:border-[#EE334B] text-sm items-center justify-center gap-2 
      transition-all duration-300 ease-in-out transform 
      hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'>Review us on Google</button> 
        </div> 
     </div> 
     <Testimonials/>
     <InspiringStories/>
     <GetPriceQuote/>
     <Capabilities/>
     <SampleKit/>
     <Footer/>
    </>
  )
}

export default App
