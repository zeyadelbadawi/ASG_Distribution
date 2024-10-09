import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home1/About"
import Banner from "@/components/sections/home1/Banner"
import Service from "@/components/sections/home1/Service"
import Blog from "@/components/sections/home1/Blog"

import Testimonial from "@/components/sections/home1/Testimonial"
import Features from "@/components/sections/home1/Features"
import Storage from "@/components/sections/home1/Storage"
import Process from "@/components/sections/home1/Process"
import Gallery from "@/components/sections/home1/Gallery"
import Product from "@/components/sections/home1/Product"
import Cta from "@/components/sections/home1/Cta"

export default function Home() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <Banner />
                <About />
                <Features/>
                <Storage />
                <Service />
                <Process />
                <Gallery />
                <Product />
                <Testimonial />
                <Blog />
                <Cta />
                
            </Layout>

        </>
    )
}