'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function About() {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => setAboutData(data.about))
            .catch(error => console.error('Error fetching About content:', error));
    }, []);

    if (!aboutData) return <div>Loading...</div>;

    return (
        <section className="about-one">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-one__left">
                            <div className="about-one__img-box">
                                <div className="about-one__img">
                                    <img src={aboutData.image} alt="About Us" />
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
                                <h2 className="section-title__title">{aboutData.title}</h2>
                            </div>
                            <p className="about-one__text">{aboutData.text}</p>
                            <div className="about-one__points-box">
                                <ul className="about-one__points-list list-unstyled">
                                    {aboutData.points.slice(0, 3).map((point, index) => (
                                        <li key={index}>
                                            <div className="icon"><span className="icon-check"></span></div>
                                            <p>{point}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="about-one__points-list about-one__points-list-2 list-unstyled">
                                    {aboutData.points.slice(3).map((point, index) => (
                                        <li key={index}>
                                            <div className="icon"><span className="icon-check"></span></div>
                                            <p>{point}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="about-one__text-2">{aboutData.text2}</p>
                            <div className="about-one__btn-box">
                                <Link href="about" className="about-one__btn thm-btn">
                                    {aboutData.buttonText} <span className="icon-plus"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
