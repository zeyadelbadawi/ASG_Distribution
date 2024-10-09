
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect } from 'react';


const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
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



}
export default function Banner() {
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        fetch('/api/getContent')
            .then((response) => response.json())
            .then((data) => setBannerData(data.banner)) // Assuming `banner` is a key in the JSON file
            .catch((error) => console.error('Error fetching banner content:', error));
    }, []);

    if (!bannerData) return <div>Loading...</div>;

    return (
        <>
            <section className="main-slider">
                <Swiper {...swiperOptions} className="main-slider__carousel owl-carousel owl-theme thm-owl__carousel">
                    {bannerData.slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="item main-slider__slide-1">
                                <div
                                    className="main-slider__bg"
                                    style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                                ></div>
                                <div
                                    className="main-slider__bg-two"
                                    style={{ backgroundImage: `url(${slide.backgroundImageTwo})` }}
                                ></div>
                                <div className="main-slider__shape-1">
                                    <img src={slide.shape1} alt="" />
                                </div>
                                <div className="main-slider__shape-2">
                                    <img src={slide.shape2} alt="" />
                                </div>
                                <div className="main-slider__shape-3">
                                    <img src={slide.shape3} alt="" />
                                </div>
                                <div className="main-slider__shape-4">
                                    <img src={slide.shape4} alt="" />
                                </div>
                                <div className="container">
                                    <div className="main-slider__content">
                                        <p className="main-slider__sub-title">{slide.subTitle}</p>
                                        <h2
                                            className="main-slider__title"
                                            dangerouslySetInnerHTML={{ __html: slide.title }}
                                        ></h2>
                                        <p
                                            className="main-slider__text"
                                            dangerouslySetInnerHTML={{ __html: slide.text }}
                                        ></p>
                                        <div className="main-slider__btn-and-call-box">
                                            <div className="main-slider__btn-box">
                                                <Link href={slide.buttonLink} className="main-slider__btn thm-btn">
                                                    {slide.buttonText}
                                                </Link>
                                            </div>
                                            <div className="main-slider__call">
                                                <div className="main-slider__call-icon">
                                                    <span className="icon-call"></span>
                                                </div>
                                                <div className="main-slider__call-content">
                                                    <p className="main-slider__call-sub-title">Need help?</p>
                                                    <h5 className="main-slider__call-number">
                                                        <Link href={`tel:${slide.phoneNumber}`}>{slide.phoneNumber}</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </>
    );
}
