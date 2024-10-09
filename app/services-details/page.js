'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [services, setServices] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        fetch('/services.json')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) {
            setActiveIndex(parseInt(tab, 10));
        }
    }, [searchParams]);


    const handleOnClick = (tabNumber) => {
        setActiveIndex(tabNumber);
        router.push(`/services-details?tab=${tabNumber}`, { shallow: true });
    };

    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);
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
                setEmail('');
            } else {
                const errorData = await response.json();
                setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
            }
        } catch (error) {
            setSubmissionStatus("An error occurred while submitting the form.");
        }
    };

    return (
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Service Details">
                <div>
                    <section className="services-details">
                        <div className="container">
                            <h3 className="services-details__top-title">Service lists</h3>
                            <div className="services-details__inner tabs-box">
                                <div className="services-details__tab-box clearfix">
                                    <ul className="tab-buttons clearfix list-unstyled">
                                        {services.map((service) => (
                                            <li
                                                key={service.id}
                                                className={activeIndex === service.tabNumber ? "tab-btn active-btn" : "tab-btn"}
                                                onClick={() => handleOnClick(service.tabNumber)}
                                            >
                                                <div className="services-details__tab-btn">
                                                    <span>{service.title}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="services-details__bottom">
                                    <div className="tabs-content">
                                        {services.map((service) => (
                                            <div
                                                key={service.id}
                                                className={activeIndex === service.tabNumber ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}
                                            >
                                                <div className="row">
                                                    <div className="col-xl-8 col-lg-7">
                                                        <div className="services-details__left">
                                                            <div className="services-details__img-1">
                                                                <img src={service.imageUrl} alt={service.title} />
                                                                <div className="services-details__icon" style={{ textAlign: 'center' }}>
                                                                    <img src={service.iconUrl} alt={service.title + " icon"} style={{ display: 'block', margin: '0 auto', maxWidth: '80px', height: 'auto' }} />
                                                                </div>



                                                            </div>
                                                            <h3 className="services-details__title-1">{service.title}</h3>
                                                            <p className="services-details__text">{service.description1}</p>
                                                            <div className="services-details__points-box">
                                                                <ul className="services-details__points list-unstyled">
                                                                    {service.points.map((point, index) => (
                                                                        <li key={index}>
                                                                            <div className="icon">
                                                                                <span className="icon-check-2"></span>
                                                                            </div>
                                                                            <p>{point}</p>
                                                                            <br></br>


                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <p className="services-details__text">{service.description2}</p>
                                                            <br></br>
                                                            <h3 className="services-details__title-2">Benefits of {service.title}:</h3>
                                                            <ul className="process-one__process-list list-unstyled">
                                                                {service.benefits.map((benefit, index) => (
                                                                    <li key={index}>
                                                                        <div className="process-one__count"></div>
                                                                        <div className="icon">
                                                                            <span className="icon-peace-mind"></span>
                                                                        </div>
                                                                        <h3>{benefit}</h3>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-5">
                                                        <div className="services-details__right">
                                                            {/* Static Popular Solutions */}
                                                            <div className="services-details__popular-services">
                                                                <h3 className="services-details__popular-services-title">Popular Solutions</h3>
                                                                <ul className="services-details__popular-services-list list-unstyled">
                                                                    <li>
                                                                        <div className="services-details__popular-services-img">
                                                                            <img src="assets/images/services/services-lp-1-1.jpg" alt="/services-details?tab=2" />
                                                                        </div>
                                                                        <div className="services-details__popular-services-content">
                                                                            <h3><Link href="/services-details?tab=2">Networking</Link></h3>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="services-details__popular-services-img">
                                                                            <img src="assets/images/services/services-lp-1-2.jpg" alt="/services-details?tab=5" />
                                                                        </div>
                                                                        <div className="services-details__popular-services-content">
                                                                            <h3><Link href="/services-details?tab=5">Automations</Link></h3>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Static Get in Touch */}
                                                            <div className="services-details__get-in-touch">
                                                                <h3 className="services-details__popular-services-title">Get in Touch</h3>
                                                                <ul className="services-details__get-in-touch-list list-unstyled">
                                                                    <li>
                                                                        <div className="icon">
                                                                            <span className="icon-call"></span>
                                                                        </div>
                                                                        <p><Link href="tel:+201050638800">+201050638800</Link></p>
                                                                    </li>
                                                                    <li>
                                                                        <div className="icon">
                                                                            <span className="icon-email"></span>
                                                                        </div>
                                                                        <p><Link href="mailto:info@asgdistribution.com">info@asgdistribution.com</Link></p>
                                                                    </li>
                                                                    <li>
                                                                        <div className="icon">
                                                                            <span className="icon-clock"></span>
                                                                        </div>
                                                                        <p>Sun-Thursday: 9AM-5PM</p>
                                                                    </li>
                                                                    <li>
                                                                        <div className="icon">
                                                                            <span className="icon-pin"></span>
                                                                        </div>
                                                                        <p>4 Dr Mohamed Awad Street in Front of City Center</p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="cta-one">
                        <div className="container">
                            <div className="cta-one__inner">
                                <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6"></div>
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="cta-one__right">
                                            <h3 className="cta-one__title">Get Free Estimate</h3>
                                            <p className="cta-one__text">Lorem Ipsum is simply dummy text Lorem Ipsum</p>
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
                                                            border: '2px solid #FFFFFF',
                                                        }}
                                                    />
                                                    <button type="submit" className="cta-one__btn thm-btn">Message</button>
                                                </div>
                                                {errors && <p style={{ color: 'red' }}>{errors}</p>}
                                            </form>
                                            {submissionStatus && <p>{submissionStatus}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
