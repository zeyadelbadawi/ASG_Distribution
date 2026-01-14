import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home1/Banner"
import About from "@/components/sections/home1/About"
import Features from "@/components/sections/home1/Features"
import Storage from "@/components/sections/home1/Storage"
import Service from "@/components/sections/home1/Service"
import Process from "@/components/sections/home1/Process"
import Gallery from "@/components/sections/home1/Gallery"
import Product from "@/components/sections/home1/Product"
import Testimonial from "@/components/sections/home1/Testimonial"
import Cta from "@/components/sections/home1/Cta"

export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <Banner />
        <About />
        <Features />
        <Storage />
        <Service />
        <Process />
        <Gallery />
        <Product />
        <Testimonial />
        <Cta />
      </Layout>
    </>
  )
}
