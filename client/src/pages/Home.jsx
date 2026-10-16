import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import DigitalCockpit from '../components/DigitalCockpit'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import TrustedBrands from '../components/TrustedBrands'
import HowItWorks from '../components/HowItWorks'
import FeatureStrip from '../components/FeatureStrip'
import WhyChooseUs from '../components/WhyChooseUs'

const Home = () => {
  return (
    <div className='bg-light min-h-screen'>
      <Hero />
      <TrustedBrands />
      <FeaturedSection />
      <WhyChooseUs />
      <FeatureStrip />
      <HowItWorks />
      <DigitalCockpit />
      <Testimonial />
      <Newsletter />
    </div>
  )
}

export default Home
