import React from 'react'
import BottomHero from '../../components/common/BottomHero'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/footer/Footer'
import SampleKit from '../../components/SampleKit'

const CategoryPackaging = () => {
  return (
    <>
      <Navbar/>
      <section>
        <div className=' flex sm:flex-row flex-col justify-between'>
            <div className=' w-6/12'>

              <h2>Cosmetic Packaging</h2>

              <p>Luxurious and stunning high-quality cosmetic packaging to influence and indulge potential customers instantly. Stand out from the competition by using packaging with sturdy construction and eye-catching designs.

</p>


            </div>
        </div>
      </section>
     <BottomHero/>
     <SampleKit/>
     <Footer/> 
    </>
  )
}

export default CategoryPackaging