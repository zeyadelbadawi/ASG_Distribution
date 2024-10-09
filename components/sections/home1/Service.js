'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Service() {
    const [servicesContent, setServicesContent] = useState({ title: '', tagline: '', items: [] });

    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => {
                setServicesContent(data.services);
            })
            .catch(error => console.error('Error fetching services content:', error));
    }, []);

    return (
        <>
            <section className="services-one">
                <div className="container">
                    <div className="section-title text-center">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">{servicesContent.tagline}</span>
                        </div>
                        <h2 className="section-title__title">{servicesContent.title}</h2>
                    </div>
                    <div className="row">
                        {servicesContent.items.map((service, index) => (
                            <div key={index} className={`col-xl-4 col-lg-4 wow fadeIn${index % 3 === 0 ? 'Left' : index % 3 === 1 ? 'Up' : 'Right'}`} data-wow-delay={`${100 * (index % 3 + 1)}ms`}>
                                <div className="services-one__single">
                                    <div className="services-one__img-box">
                                        <div className="services-one__img">
                                            <img src={service.imagePath} alt={service.title} />
                                        </div>
                                        <div className="services-one__icon">
                                            <img src={service.iconPath}  style={{ width: '50px', height: '50px' }} alt="icon" />
                                        </div>
                                    </div>
                                    <div className="services-one__content">
                                        <h3 className="services-one__title">
                                            <Link href={service.link}>{service.title}</Link>
                                        </h3>
                                        <p className="services-one__text">{service.description}</p>
                                        <div className="services-one__btn-box">
                                            <Link href={service.link} className="services-one__btn thm-btn">Discover More<span className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
