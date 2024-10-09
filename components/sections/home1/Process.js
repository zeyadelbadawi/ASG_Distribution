'use client'
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Process() {
    // State to store dynamic image URLs
    const [images, setImages] = useState({
        img1: '',
        img2: '',
        img3: ''
    });

    // Fetch the image URLs dynamically
    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => {
                // Assuming data contains a 'processImages' section
                setImages({
                    img1: data.processImages.img1,
                    img2: data.processImages.img2,
                    img3: data.processImages.img3
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    return (
        <>
        {/*Process One Start */}
        <section className="process-one">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="process-one__left">
                            <div className="section-title text-left">
                                <div className="section-title__tagline-box">
                                </div>
                                <h2 className="section-title__title">Our Values</h2>
                            </div>
                            <p className="process-one__text-1">At ASG Distribution, we uphold integrity, excellence, and customer-centricity as core values guiding every aspect of our operations</p>
                            <ul className="process-one__process-list list-unstyled">
                                <li className="wow fadeInLeft" data-wow-delay="100ms">
                                    <div className="process-one__count"></div>
                                    <div className="icon">
                                        <span className="icon-peace-mind"></span>
                                    </div>
                                    <h3><Link href="about">Customer Satisfaction</Link></h3>
                                </li>
                                <li className="wow fadeInLeft" data-wow-delay="300ms">
                                    <div className="process-one__count"></div>
                                    <div className="icon">
                                        <span className="icon-shoes"></span>
                                    </div>
                                    <h3><Link href="about">Quality Products</Link></h3>
                                </li>
                                <li className="wow fadeInLeft" data-wow-delay="600ms">
                                    <div className="process-one__count"></div>
                                    <div className="icon">
                                        <span className="icon-emil-2"></span>
                                    </div>
                                    <h3><Link href="about">Partnership Development</Link></h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="process-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="process-one__img-box">
                                        <div className="process-one__img">
                                            <img src={images.img1} alt="Process Image 1"/>
                                        </div>
                                        <div className="process-one__count-box">
                                            <p className="process-one__count-text">Trusted By</p>
                                            <div className="process-one__count-2 count-box">
                                                <h3>10</h3>
                                                <span className="process-one__count-plus">k</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="process-one__img-box-2">
                                        <div className="process-one__img-2">
                                            <img src={images.img2} alt="Process Image 2"/>
                                        </div>
                                        <div className="process-one__img-3">
                                            <img src={images.img3} alt="Process Image 3"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Process One End */}
        </>
    )
}
