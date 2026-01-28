'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Features() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [featuresData, setFeaturesData] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
                                                            textAlign: 'center',
                                                            padding: '20px',
                                                            borderRadius: '10px',
                                                            transition: 'all 0.3s ease-in-out',
                                                            transform: hoveredIndex === idx ? 'scale(1.05)' : 'scale(1)',
                                                            backgroundColor: '#fff',
                                                            boxShadow: hoveredIndex === idx ? '0 10px 20px rgba(0,0,0,0.15)' : '0 5px 10px rgba(0,0,0,0.1)',
                                                            cursor: 'pointer',
                                                            color: hoveredIndex === idx ? '#EB7230' : '#000' // Change text color on hover
                                                        }}
                                                        onMouseEnter={() => setHoveredIndex(idx)}
                                                        onMouseLeave={() => setHoveredIndex(null)}
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
                                                                src={hoveredIndex === idx ? feature.hoverIconPath : feature.iconPath}
                                                                alt={feature.title}
                                                                style={{
                                                                    maxWidth: '80%',
                                                                    maxHeight: '80%',
                                                                    objectFit: 'contain',
                                                                    display: 'block',
                                                                    margin: '0 auto'
                                                                }}
                                                            />
                                                        </div>
                                                        <h3 
                                                            className="feature-one__title" 
                                                            style={{ 
                                                                marginTop: '10px',
                                                                transition: 'color 0.3s ease-in-out',
                                                                color: 'inherit' // Inherits hover color from the parent div
                                                            }}
                                                        >
                                                            <Link href="services-details" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                                {feature.title}
                                                            </Link>
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
