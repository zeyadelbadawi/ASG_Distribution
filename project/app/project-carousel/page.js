'use client'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 30,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.srn',
        prevEl: '.srp',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        767: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 3,
            // spaceBetween: 30,
        },
    }



}
export default function Home() {

    return (
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Project Carousel">
                {/*Project Carousel Page Start */}
                <section className="project-carousel-page">
                    <div className="container">
                        <Swiper {...swiperOptions} className="project-carousel-style thm-owl__carousel owl-theme owl-carousel carousel-dot-style">
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-1.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-1.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-2.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-2.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-3.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-3.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-4.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-4.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-1.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-1.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-2.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-2.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                            {/*Project One Single Start*/}
                            <SwiperSlide>
                            <div className="item">
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src="assets/images/project/project-1-3.jpg" alt=""/>
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title"><Link href="project-details">Las vegas Project</Link>
                                            </h3>
                                            <Link href="assets/images/project/project-1-3.jpg" className="
                                                project-one__plus img-popup"><span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </SwiperSlide>
                            {/*Project One Single End*/}
                        </Swiper>
                    </div>
                </section>
                {/*Project Carousel Page End */}

                {/*CTA One Start */}
                <section className="cta-one">
                    <div className="container">
                        <div className="cta-one__inner">
                            <div className="cta-one__bg"  style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }} >
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6"></div>
                                <div className="col-xl-6 col-lg-6">
                                    <div className="cta-one__right">
                                        <h3 className="cta-one__title">Subscribe to Our Newsletter</h3>
                                        <p className="cta-one__text">Lorem Ipsum is simply is dumiomy is text Lorem Ipsum </p>
                                        <form className="cta-one__form mc-form" data-url="MC_FORM_URL">
                                            <div className="cta-one__form-input-box">
                                                <input type="email" placeholder="Your email..." name="email"/>
                                                <button type="submit" className="cta-one__btn thm-btn">Message</button>
                                            </div>
                                        </form>
                                        <div className="mc-form__response"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*CTA One End */}

            </Layout>
        </>
    )
}