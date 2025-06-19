'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module

export default function Gallery() {
    const [galleryContent, setGalleryContent] = useState({ title: '', tagline: '', items: [] });
    const [activeModal, setActiveModal] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [disableHover, setDisableHover] = useState(false); // Temporarily disable hover after closing

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check on component mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch('/api/getContent')
            .then((response) => response.json())
            .then((data) => {
                setGalleryContent(data.gallery);
            })
            .catch((error) => console.error('Error fetching gallery content:', error));
    }, []);

    const closeModal = () => {
        setActiveModal(null);
        setDisableHover(true); // Disable hover temporarily
        setTimeout(() => setDisableHover(false), 300); // Re-enable hover after 300ms
    };

    const handleItemAction = (index) => {
        setActiveModal(index);
    };

    const handleHover = (index) => {
        if (!isMobile && !disableHover) {
            setActiveModal(index); // Open modal on hover in desktop mode
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setActiveModal(null); // Close modal when mouse leaves in desktop mode
        }
    };

    return (
        <>
            <section className="project-one">
                <div className="container">
                    <div className="section-title text-center">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">{galleryContent.tagline}</span>
                        </div>
                        <h2
                            className="section-title__title"
                                                        style={{ fontSize: '30px', fontWeight: 'bold', lineHeight: '1.2', marginLeft: '90px', marginRight: '90px' }}

                        >
                            {galleryContent.title}
                        </h2>
                    </div>

                    <Swiper
                        spaceBetween={20}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        modules={[Autoplay]}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                      {galleryContent.items.map((item, index) => (
                        <SwiperSlide key={index} style={{ position: 'relative' }}>
                            <div
                                className="project-one__single"
                                style={{ position: 'relative' }}
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => isMobile && handleItemAction(index)} // Open modal on click for mobile
                            >
                                <div className="project-one__img-box">
                                    <div className="project-one__img">
                                        <img
                                            src={item.imagePath}
                                            alt={item.title}
                                            style={{
                                                width: '338px',
                                                height: '420px',
                                                objectFit: 'contain', // Ensures the image maintains its aspect ratio
                                            }}
                                        />
                                    </div>
                                    {activeModal === index && (
                                        <div
                                            className="modal-overlay show"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div
                                                className="modal-content"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    className="close-modal"
                                                    onClick={closeModal}
                                                >
                                                    &times;
                                                </button>
                                                <h3 className="modal-title">Client Details</h3>
                                                <ul className="modal-list">
                                                    <li>
                                                        <span>Name:</span>
                                                        <p>{item.modalData.name}</p>
                                                    </li>
                                                    <li>
                                                        <span>Number:</span>
                                                        <p>
                                                            {Array.isArray(item.modalData.number)
                                                                ? item.modalData.number.join(' - ')
                                                                : item.modalData.number}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <span>Address:</span>
                                                        <p style={{ direction: 'rtl', textAlign: 'right' }}>
                                                            {Array.isArray(item.modalData.address)
                                                                ? item.modalData.address.map((addr, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        style={{
                                                                            display: 'block',
                                                                        }}
                                                                    >
                                                                        {addr}
                                                                    </span>
                                                                ))
                                                                : item.modalData.address}
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                </div>
            </section>

            <style jsx>{`
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    border-radius: 16px;
                }

                .modal-content {
                    background: #ffffff;
                    padding: 25px;
                    border-radius: 16px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 400px;
                    animation: fadeIn 0.4s ease-in-out;
                    text-align: left;
                    position: relative;
                }

                .modal-title {
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    color: #222;
                    text-align: center;
                    border-bottom: 2px solid #f7941d;
                    padding-bottom: 8px;
                    letter-spacing: 0.5px;
                }

                .modal-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .modal-list li {
                    margin-bottom: 12px;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    color: #555;
                }

                .modal-list li span {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 4px;
                }

                .modal-list li p {
                    margin: 0;
                    color: #666;
                    font-size: 15px;
                    line-height: 1.4;
                }

                .close-modal {
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    background: #f7941d;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    transition: transform 0.2s ease, background 0.3s ease;
                }

                .close-modal:hover {
                    background: #e5831b;
                    transform: scale(1.1);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
}
