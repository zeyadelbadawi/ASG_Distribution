'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    }
}
export default function AuditSlider1() {
    return (
        <>

                    <Swiper {...swiperOptions} className="brand-one__carousel thm-owl__carousel owl-theme owl-carousel">
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-1.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-2.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-3.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-4.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-5.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-3.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-4.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                        {/*Brand One Single*/}
                        <SwiperSlide>
                        <div className="brand-one__single">
                            <div className="brand-one__img">
                                <img src="assets/images/brand/brand-1-5.png" alt=""/>
                            </div>
                        </div>
                        </SwiperSlide>
                    </Swiper>
                    {/* If we need navigation buttons */}
        </>
    )
}
