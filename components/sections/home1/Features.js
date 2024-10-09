'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Features() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [featuresData, setFeaturesData] = useState(null);

    useEffect(() => {
        fetch('/api/getContent')
            .then(response => response.json())
            .then(data => setFeaturesData(data.features))
            .catch(error => console.error('Error fetching features content:', error));
    }, []);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    if (!featuresData) return <div>Loading...</div>;

    return (
        <>
            <section className="feature-one">
                <div className="container">
                <div className="section-title text-left" style={{ maxWidth: '70%', marginTop: '20px', position: 'relative', zIndex: 1 }}>
    <span className="section-title__tagline" style={{ marginBottom: '20px' }}>features</span>
    <h2 className="section-title__title" style={{ marginBottom: '30px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
        {featuresData.title}
    </h2>
</div>

                    <div className="feature-one__inner tabs-box">
                        <div className="feature-one__tab-box clearfix">
                            <ul className="tab-buttons clearfix list-unstyled">
                                {featuresData.tabs.map((tab, index) => (
                                    <li
                                        key={index}
                                        className={activeIndex === index ? "tab-btn active-btn" : "tab-btn"}
                                        onClick={() => handleOnClick(index)}
                                    >
                                        <div className="feature-one__tab-btn">
                                            <span>{tab.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="feature-one__bottom">
                            <div className="tabs-content">
                                {featuresData.tabs.map((tab, index) => (
                                    <div
                                        key={index}
                                        className={activeIndex === index ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}
                                    >
                                        <ul className="feature-one__feature-list list-unstyled">
                                            {tab.features.map((feature, idx) => (
                                                <li key={idx}>
                                                    <div
                                                        className="feature-one__single"
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <div
                                                            className="feature-one__icon"
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                borderRadius: '50%',
                                                                backgroundColor: '#f5f5f5',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                overflow: 'hidden'
                                                            }}
                                                        >
                                                            <img
                                                                src={feature.iconPath}
                                                                alt={feature.title}
                                                                style={{
                                                                    maxWidth: '80%', // Limits the image's width to fit within the container
                                                                    maxHeight: '80%', // Limits the image's height to fit within the container
                                                                    objectFit: 'contain', // Keeps the aspect ratio of the image
                                                                    display: 'block',
                                                                    margin: '0 auto' // Centers the image horizontally
                                                                }}
                                                            />
                                                        </div>
                                                        <h3 className="feature-one__title" style={{ marginTop: '10px' }}>
                                                            <Link href="services-details">{feature.title}</Link>
                                                        </h3>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
