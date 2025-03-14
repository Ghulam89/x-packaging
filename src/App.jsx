
import './App.css'
import Capabilities from './components/Capabilities'
import Category from './components/Category/Category'
import OfferCard from './components/common/OfferCard'
import Footer from './components/footer/Footer'
import GetPriceQuote from './components/GetPriceQuote/GetPriceQuote'
import Navbar from './components/Header/Navbar'
import TopNav from './components/Header/TopNav'
import SampleKit from './components/SampleKit'
import Home from './screen/home'

function App() {
  return (
    <>
    <TopNav/>
    <Navbar/>
     <Home/>
     <Category/>
     <OfferCard discount={'Get 30%'} title={'Off Your First Order!'} /> 
     <Category/>
     <OfferCard discount={'Save 30%'} title={'on Bulk Orders'} subTitle={'Need more this year?'} /> 
     <GetPriceQuote/>
     <Capabilities/>
     <SampleKit/>
     <Footer/>
    </>
  )
}

export default App
