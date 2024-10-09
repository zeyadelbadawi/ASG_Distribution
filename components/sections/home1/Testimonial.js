'use client';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.srn',
        prevEl: '.srp',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: { slidesPerView: 1 },
        575: { slidesPerView: 1 },
        767: { slidesPerView: 2 },
        991: { slidesPerView: 2 },
        1199: { slidesPerView: 2 },
        1350: { slidesPerView: 2 },
    },
};

export default function Testimonial() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => setTestimonials(data.testimonials))
            .catch(error => console.error('Error fetching testimonials:', error));
    }, []);

    return (
        <>
            <section className="testimonial-one">
                <div className="testimonial-one__shape-2 float-bob-y">
                    <img src="assets/images/shapes/testimonial-one-shape-2.png" alt="" />
                </div>
                <div className="container">
                    <div className="section-title text-left">
                        <span className="section-title__tagline">CLIENTS REVIEWS</span>
                        <h2 className="section-title__title">WHAT OUR CLIENT SAYS</h2>
                    </div>
                    <p className="testimonial-one__text">
                        A specialized military unit tasked with gathering information and conducting surveillance in high-risk areas.
                    </p>
                    <div className="testimonial-one__bottom">
                        <Swiper {...swiperOptions} className="testimonial-one__carousel">
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <div className="item">
                                        <div className="testimonial-one__single">
                                            <div className="testimonial-one__shape-1">
                                                <img src="assets/images/shapes/testimonial-one-shape-1.png" alt="" />
                                            </div>
                                            <div className="testimonial-one__ratting-and-quote">
                                                <div className="testimonial-one__ratting">
                                                    {Array(testimonial.rating).fill().map((_, i) => (
                                                        <i key={i} className="icon-star"></i>
                                                    ))}
                                                </div>
                                                <div className="testimonial-one__quote">
                                                    <span className="icon-quote"></span>
                                                </div>
                                            </div>
                                            <p className="testimonial-one__single-text">{testimonial.text}</p>
                                            <div className="testimonial-one__client-box">
                                                <div className="testimonial-one__client-img">
                                                    <img src={testimonial.imagePath} alt={testimonial.clientName} />
                                                </div>
                                                <div className="testimonial-one__client-info">
                                                    <h3>{testimonial.clientName}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}
