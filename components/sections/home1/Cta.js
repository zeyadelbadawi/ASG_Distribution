'use client'
import { useState } from 'react';

export default function Cta() {
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
            {/*CTA One Start */}
            <section className="cta-one">
                <div className="container">
                    <div className="cta-one__inner">
                        <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                        <div className="row">
                            {/* Left Column with Image */}
                            <div className="col-xl-6 col-lg-6">
                                <div className="cta-one__image-container">
                                    <img 
                                        src="assets/images/resources/1.png" 
                                        alt=" " 
                                        className="cta-one__image" 
                                    />
                                </div>
                            </div>

                            {/* Right Column with Form */}
                            <div className="col-xl-6 col-lg-6">
                                <div className="cta-one__right">
                                    <h3 className="cta-one__title">Get Free Estimate</h3>
                                    <p className="cta-one__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
                                                    alignItems: 'center',
                                                }}
                                            />
                                            <button type="submit" className="cta-one__btn thm-btn">Submit</button>
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
        </>
    );
}
