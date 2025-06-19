'use client'
import { useState } from 'react';
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
    });
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);

    const listId = 'kVfvu';
    const listId2 = 'FZGec';
    const phonePattern = /^01[0-9]{9}$/; // Matches 11-digit Egyptian numbers starting with 01
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const validateForm = () => {
        let formErrors = {};

        if (!formData.name.trim()) {
            formErrors.name = "Name is required";
        }

        if (!phonePattern.test(formData.phone)) {
            formErrors.phone = "Enter a valid Egyptian phone number";
        }

        if (!emailPattern.test(formData.email)) {
            formErrors.email = "Enter a valid email address";
        }

        if (!formData.company.trim()) {
            formErrors.company = "Company name is required";
        }

        if (!formData.message.trim()) {
            formErrors.message = "Message is required";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Prepend +20 (Egypt country code) to the phone number before submission
                const formattedPhone = `+20${formData.phone.trim()}`;

                const requestBody = {
                    name: formData.name,
                    email: formData.email,
                    campaign: {
                        campaignId: listId2,
                    },
                    customFieldValues: [
                        {
                            customFieldId: '4qvEI',  // Company
                            value: [formData.company.trim()]
                        },
                        {
                            customFieldId: '4qhal',
                            value: [formattedPhone]  // Use the formatted phone with +20
                        },
                        {
                            customFieldId: '4qhVW',  // Comment
                            value: [formData.message.trim()]
                        }
                    ]
                };

                const response = await fetch('http://localhost:5000/api/contacts', { // Change to your backend URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    setSubmissionStatus("Form submitted successfully!");
                    console.log("Form data sent to GetResponse successfully!");
                    // Optionally, reset form fields here
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        message: ""

                    });

                } else {
                    const errorData = await response.json();
                    setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
                    console.error("Failed to submit form:", errorData);
                }
            } catch (error) {
                setSubmissionStatus("An error occurred while submitting the form.");
                console.error("Error:", error);
            }
        }
    };


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
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Contact">

                {/*Contact Page Start*/}
                <section className="contact-page">
                    <div className="container">
                        <div className="contact-page__inner">
                            <div className="contact-page__contact-info">
                            <div className="row">
    {/*Contact Page Contact Info Single Start*/}
    <div className="col-xl-4">
        <div
            className="contact-page__contact-info-single"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '250px',
                boxSizing: 'border-box',
                textAlign: 'center',
                gap: '10px', // Adds spacing between elements
            }}
        >
            <div
                className="contact-page__contact-info-icon"
                style={{
                    fontSize: '2rem', // Adjust icon size
                }}
            >
                <span className="icon-call-3"></span>
            </div>
            <div className="contact-page__contact-info-content">
                <h5>Contacts</h5>
                <p>
                    <Link href="tel:010 50638800">010 50638800</Link>
                </p>
            </div>
        </div>
    </div>
    {/*Contact Page Contact Info Single End*/}
    {/*Contact Page Contact Info Single Start*/}
    <div className="col-xl-4">
        <div
            className="contact-page__contact-info-single"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '250px',
                boxSizing: 'border-box',
                textAlign: 'center',
                gap: '10px', // Adds spacing between elements
            }}
        >
            <div
                className="contact-page__contact-info-icon"
                style={{
                    fontSize: '2rem', // Adjust icon size
                }}
            >
                <span className="icon-gmail"></span>
            </div>
            <div className="contact-page__contact-info-content">
                <h5>Email</h5>
                <p>
                    <Link href="mailto:info@asgdistribution.com">info@asgdistribution.com</Link>
                </p>
            </div>
        </div>
    </div>
    {/*Contact Page Contact Info Single End*/}
    {/*Contact Page Contact Info Single Start*/}
    <div className="col-xl-4">
        <div
            className="contact-page__contact-info-single"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '250px',
                boxSizing: 'border-box',
                textAlign: 'center',
                gap: '10px', // Adds spacing between elements
            }}
        >
            <div
                className="contact-page__contact-info-icon"
                style={{
                    fontSize: '2rem', // Adjust icon size
                }}
            >
                <span className="icon-home-pin"></span>
            </div>
            <div className="contact-page__contact-info-content">
                <h5>Address</h5>
                <p
                    style={{
                        fontSize: '0.85rem', // Smaller font size for address
                        lineHeight: '1.2', // Adjust line height for readability
                    }}
                >
                    4 Dr Mohamed Awad Street From Makram Abied in Front of City Center
                </p>
            </div>
        </div>
    </div>
    {/*Contact Page Contact Info Single End*/}
</div>


                            </div>
                            <div className="contact-page__bottom">
                                <form onSubmit={handleSubmit2} className="contact-page__form contact-form-validated">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="contact-page__input-box">
                                                <input type="text" placeholder="Name..." name="name" value={formData.name} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="contact-page__input-box">
                                                <input type="email" placeholder="Email..." name="email" value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="contact-page__input-box">
                                                <input type="text" placeholder="Phone..." name="phone" value={formData.phone} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="contact-page__input-box">
                                                <input type="text" placeholder="Company name..." name="company" value={formData.company} onChange={handleChange} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="contact-page__input-box text-message-box">
                                                <textarea name="message" placeholder="Massage...." value={formData.message} onChange={handleChange} ></textarea>
                                            </div>
                                            <div className="contact-page__btn-box">
                                                <button type="submit" className="thm-btn contact-page__btn">Send Massage</button>
                                            </div>
                                        </div>
                                    </div>
                                    {submissionStatus && <p>{submissionStatus}</p>} {/* Show submission status */}

                                </form>
                                <div className="result"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Contact Page End*/}

                {/*Google Map Start*/}
                <section className="contact-page-google-map">
                    <div className="container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4434.470934306312!2d31.34009727053525!3d30.069344079300453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f92ba92b499%3A0xe71112fc96b95222!2sASG%20Distribution!5e0!3m2!1sen!2seg!4v1727043503231!z=18"
                            className="google-map__two"
                            title="ASG Distribution"
                            aria-label="Interactive map showing the ASG Distribution location"
                        ></iframe>
                    </div>
                </section>

                {/*Google Map End*/}

                {/*CTA One Start */}
                <section className="cta-one">
                    <div className="container">
                        <div className="cta-one__inner">
                            <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6"></div>
                                <div className="col-xl-6 col-lg-6">
                                    <div className="cta-one__right">
                                        <h3 className="cta-one__title">Get Free Estimate</h3>
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
