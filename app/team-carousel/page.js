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
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Team Carousel">
        {/*Team Carousel Page Start */}
        <section className="team-carousel-page">
            <div className="container">
                <Swiper {...swiperOptions} className="team-carousel-style thm-owl__carousel owl-theme owl-carousel carousel-dot-style">
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-1.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Christine R. King</Link></h3>
                                <p className="team-page__sub-title">Marketing Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-2.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Harold A. Robin</Link></h3>
                                <p className="team-page__sub-title">Business Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-3.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Robert K. Beber</Link></h3>
                                <p className="team-page__sub-title">Senior Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-4.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Rose M. Musser</Link></h3>
                                <p className="team-page__sub-title">Head of executive</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-5.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Bette H. Bailey</Link></h3>
                                <p className="team-page__sub-title">Startup Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-6.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Joann H. Hinojosa</Link></h3>
                                <p className="team-page__sub-title">Business Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-1.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Christine R. King</Link></h3>
                                <p className="team-page__sub-title">Marketing Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-2.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Harold A. Robin</Link></h3>
                                <p className="team-page__sub-title">Business Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                    {/*Team page Single Start*/}
                    <SwiperSlide>
                    <div className="item">
                        <div className="team-page__single">
                            <div className="team-page__img-box">
                                <div className="team-page__img">
                                    <img src="assets/images/team/team-page-1-3.jpg" alt=""/>
                                </div>
                                <div className="team-page__share-and-social-box">
                                    <div className="team-page__share-btn">
                                        <Link href="team-details"><span className="fas fa-share-alt"></span></Link>
                                    </div>
                                    <div className="team-page__social">
                                        <Link href="team-details"><span className="fab fa-linkedin"></span></Link>
                                        <Link href="team-details"><span className="fab fa-twitter"></span></Link>
                                        <Link href="team-details"><span className="fab fa-facebook-f"></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="team-page__content">
                                <h3 className="team-page__title"><Link href="team-details">Robert K. Beber</Link></h3>
                                <p className="team-page__sub-title">Senior Consultant</p>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                    {/*Team page Single End*/}
                </Swiper>
            </div>
        </section>
        {/*Team Carousel Page End */}

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
                                <h3 className="cta-one__title">Get Free Estimate</h3>
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