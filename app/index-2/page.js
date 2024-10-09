
import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home2/About"
import Banner from "@/components/sections/home2/Banner"
import Blog from "@/components/sections/home2/Blog"
import Brand from "@/components/sections/home2/Brand"
import Cta from "@/components/sections/home2/Cta"
import Features from "@/components/sections/home2/Features"
import Features2 from "@/components/sections/home2/Features2"
import Features3 from "@/components/sections/home2/Features3"
import Projects from "@/components/sections/home2/Projects"
import Team from "@/components/sections/home2/Team"
import Testimonial from "@/components/sections/home2/Testimonial"
import Video from "@/components/sections/home2/Video"

export default function Home() {

    return (
        <>
            <div className="homestyle2">
                <Layout headerStyle={2} footerStyle={2}>
                    <Banner />
                    <Features />
                    <About />
                    <Features2 />
                    <Testimonial />
                    <Brand />
                    <Team />
                    <Projects />
                    <Features3 />
                    <Video />
                    <Blog />
                    <Cta />
                </Layout>
            </div>
        </>
    )
}