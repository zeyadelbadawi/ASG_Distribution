'use client'

import Layout from "@/components/layout/Layout"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from "next/link"
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react"
import BrandSlider from "@/components/slider/BrandSlider"


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
            slidesPerView: 2,
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

export default function About() {
    const [isOpen, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)
    const [aboutData, setAboutData] = useState(null); // Move here
    const [storageContent, setStorageContent] = useState({ title: '', tagline: '', items: [], bottomText: '' });
    const [images, setImages] = useState({
        img1: '',
        img2: '',
        img3: ''
    });
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);




    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data =>{
                 setAboutData(data.about)
                 setStorageContent(data.storage);
                 setImages({
                    img1: data.processImages.img1,
                    img2: data.processImages.img2,
                    img3: data.processImages.img3
                });
                })
            .catch(error => console.error('Error fetching About content:', error));
    }, []);




    const listId = 'kVfvu';


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const requestBody = {
                email: email,
                campaign: {
                    campaignId: listId,
                },

            };

            const response = await fetch('http://localhost:5000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setSubmissionStatus("Form submitted successfully!");
                console.log("Form data sent to GetResponse successfully!");
                setEmail(''); // Reset email field after successful submission

            } else {
                const errorData = await response.json();
                setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
                console.error("Failed to submit form:", errorData);
            }
        } catch (error) {
            setSubmissionStatus("An error occurred while submitting the form.");
            console.error("Error:", error);
        }
    };

    return (
        <>
 

 <Layout
            headerStyle={3} // Specify the header style
            footerStyle={1} // Specify the footer style
            breadcrumbTitle="About Us"
            breadcrumbBg="/assets/images/about.jpg" // Pass the background image for Breadcrumb
        >
                {/*About One Start */}
                <section className="about-one">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="about-one__left">
                                    <div className="about-one__img-box">
                                        <div className="about-one__img">
                                            {aboutData && aboutData.image ? (
                                                <img src={aboutData.image} alt="About Us" />
                                            ) : (
                                                <p>Loading...</p> // Or any placeholder content you prefer
                                            )}
                                        </div>
                                        <div className="about-one__happy-client">
                                            <div className="about-one__happy-client-inner">
                                                <div className="about-one__happy-client-count count-box">
                                                    <h3>30K</h3>
                                                    <span className="about-one__happy-client-plus">+&nbsp;&nbsp;</span>
                                                </div>

                                                <p className="about-one__happy-client-text">Happy Clients</p>
                                            </div>
                                        </div>
                                        <div className="about-one__experience">
                                            <div className="about-one__experience-count count-box">
                                                <h3>15</h3>
                                                <span className="about-one__experience-plus">+</span>
                                            </div>
                                            <p className="about-one__experience-text">YEARS OF EXPERIENCE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="about-one__right">
                                    <div className="section-title text-left">
                                        <span className="section-title__tagline">about us</span>
                                        {aboutData && aboutData.title ? (

                                            <h2 className="section-title__title">{aboutData.title}</h2>
                                        ) : (
                                            <h2 className="section-title__title">Loading...</h2>
                                        )}

                                    </div>
                                    {aboutData && aboutData.text ? (

                                        <p className="about-one__text">{aboutData.text}
                                        </p>
                                    ) : (
                                        <p className="about-one__text">Loading...</p>
                                    )}

                                    <div className="about-one__points-box">
                                        <ul className="about-one__points-list list-unstyled">
                                            {aboutData && aboutData.points ? (
                                                aboutData.points.slice(0, 3).map((point, index) => (
                                                    <li key={index}>
                                                        <div className="icon"><span className="icon-check"></span></div>
                                                        <p>{point}</p>
                                                    </li>
                                                ))
                                            ) : (
                                                <p>Loading points...</p> // Fallback content for the first list
                                            )}
                                        </ul>
                                        <ul className="about-one__points-list about-one__points-list-2 list-unstyled">
                                            {aboutData && aboutData.points ? (
                                                aboutData.points.slice(3).map((point, index) => (
                                                    <li key={index}>
                                                        <div className="icon"><span className="icon-check"></span></div>
                                                        <p>{point}</p>
                                                    </li>
                                                ))
                                            ) : (
                                                <p>Loading points...</p> // Fallback content for the second list
                                            )}
                                        </ul>
                                    </div>
                                    <p className="about-one__text-2">
                                        {aboutData && aboutData.text2 ? aboutData.text2 : "Loading..."}
                                    </p>  
                                    <div className="about-one__btn-box">
    <Link href="about" className="about-one__btn thm-btn">
        {aboutData && aboutData.buttonText ? aboutData.buttonText : "Loading..."} 
        <span className="icon-plus"></span>
    </Link>
</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*About One End */}

                {/*Feature One Start */}
                {/*Feature One Start */}
                <section className="storage-one">
                <div className="container">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">{storageContent.tagline}</span>
                        </div>
                        <h2 className="section-title__title">{storageContent.title}</h2>
                    </div>
                    <div className="storage-one__bottom">
                        <Swiper {...swiperOptions} className="storage-one__carousel owl-carousel owl-theme thm-owl__carousel">
                            {storageContent.items.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="item">
                                        <div className="storage-one__single">
                                            <div className="storage-one__img-box">
                                                <div className="storage-one__img">
                                                    <img src={item.imagePath} alt={item.title} />
                                                </div>
                                                <div className="storage-one__content">
                                                    <h3 className="storage-one__title"><Link href={item.link}>{item.title}</Link></h3>
                                                    <p className="storage-one__text">{item.description}</p>
                                                    <div className="storage-one__arrow">
                                                        <Link href={item.link} className="icon-long-arrow-right"></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <p className="storage-one__bottom-text">{storageContent.bottomText}</p>
                </div>
            </section>

                {/*Feature One End */}


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
                                        <img src="/assets/images/i1.png" alt="Customer Satisfaction" />
                                    </div>
                                    <h3><Link href="about">Customer Satisfaction</Link></h3>
                                </li>
                                <li className="wow fadeInLeft" data-wow-delay="300ms">
                                    <div className="process-one__count"></div>
                                    <div className="icon">
                                       <img src="/assets/images/i2.png" alt="Quality Products Icon" />
                                    </div>
                                    <h3><Link href="about">Quality Products</Link></h3>
                                </li>
                                <li className="wow fadeInLeft" data-wow-delay="600ms">
                                    <div className="process-one__count"></div>
                                    <div className="icon">
                                        <img src="/assets/images/i3.png" alt="Partnership Development" />
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
                                                <h3>30</h3>
                                                <span className="process-one__count-plus">K</span>
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


                {/*CTA One Start */}
                <section className="cta-one">
                    <div className="container">
                        <div className="cta-one__inner">
                            <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6"></div>
                                <div className="col-xl-6 col-lg-6">
                                    <div className="cta-one__right">
                                        <h3 className="cta-one__title">Subscribe to Our Newsletter</h3>
                                        <p className="cta-one__text">Lorem Ipsum is simply is dumiomy is text Lorem Ipsum</p>
                                        <form className="cta-one__form mc-form" onSubmit={handleSubmit}>
                                            <div className="cta-one__form-input-box">
                                                <input
                                                    type="email"
                                                    placeholder="Your email..."
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={{
                                                        backgroundColor: '#FF6600',
                                                        color: '#FFFFFF',
                                                        height: '50px',
                                                        borderRadius: '5px',
                                                        padding: '0 20px',
                                                        width: '100%',
                                                        boxSizing: 'border-box',
                                                        border: '2px solid #FFFFFF'
                                                    }}
                                                />
                                                <button type="submit" className="cta-one__btn thm-btn">Message</button>
                                            </div>
                                            {errors && <p style={{ color: 'red' }}>{errors}</p>}
                                        </form>
                                        {submissionStatus && <p>{submissionStatus}</p>} {/* Show submission status */}
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


