'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Import Swiper styles
import Link from 'next/link';

export default function Gallery() {
    const [galleryContent, setGalleryContent] = useState({ title: '', tagline: '', items: [] });

    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => {
                setGalleryContent(data.gallery);
            })
            .catch(error => console.error('Error fetching gallery content:', error));
    }, []);

    return (
        <>
            {/* Project One Start */}
            <section className="project-one">
                <div className="container">
                <div className="section-title text-center">
    <div className="section-title__tagline-box">
        <span className="section-title__tagline">{galleryContent.tagline}</span>
    </div>
    <h2 
        className="section-title__title"
        style={{ fontSize: '30px', fontWeight: 'bold', lineHeight: '1.2' }} // Adjust these values as needed
    >
        {galleryContent.title}
    </h2>
</div>

                    <Swiper spaceBetween={30} slidesPerView={4}>
                        {galleryContent.items.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="project-one__single">
                                    <div className="project-one__img-box">
                                        <div className="project-one__img">
                                            <img src={item.imagePath} alt={item.title} />
                                        </div>
                                        <div className="project-one__content">
                                            <h3 className="project-one__title">
                                                <Link href={item.link}>{item.title}</Link>
                                            </h3>
                                            <Link href={item.imagePath}></Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            {/* Project One End */}
        </>
    );
}
