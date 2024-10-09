'use client'
import { useState } from 'react'
import Layout from "@/components/layout/Layout"
export default function Faq() {
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

    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Faq">
            {/*Search Field Start*/}
            <section className="search-field">
                <div className="container">
                    <div className="search-field__inner">
                        <div className="search-field__img">
                            <img src="assets/images/resources/search-field-img.jpg" alt=""/>
                        </div>
                        <div className="search-field__search-box">
                            <h3 className="search-field__search-title">How can we help you</h3>
                            <form action="#" className="search-field__search-form">
                                <input type="search" placeholder="Search your query*"/>
                                <button type="submit"><i className="icon-search"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/*Search Field End*/}

                {/*FAQ Page Start*/}
                <section className="faq-page">
                    <div className="container">
                        <div className="section-title text-center">
                            <div className="section-title__tagline-box">
                                <span className="section-title__tagline">general questions</span>
                            </div>
                            <h2 className="section-title__title">client frequent question</h2>
                        </div>
                        <div className="faq-page__inner">
                            <div className="accrodion-grp faq-one-accrodion" data-grp-name="faq-one-accrodion">
                            <div className={isActive.key == 1 ? "accrodion active" : "accrodion"} onClick={() => handleToggle(1)}>
                                    <div className="accrodion-title">
                                        <h4>How can we improve our digital presence?</h4>
                                    </div>
                                    <div className="accrodion-content">
                                        <div className="inner">
                                            <p>Dignissim mollis taciti netus nisl congue cubilia antena dictum porta vehicula
                                                name cubilia lorem mattis fermentum mauris pulvinar montes tortor rhoncus
                                                vulputate platea faucibus vitae ullamcorper urna montes facilisi aenean agna
                                                purus enime ton amet ridiculus penatibus lacinia an adipiscing libero erose
                                                massa conubia phasellus adipisci nulla aliquam quisque curabitur quis convallis
                                                diam natoque sed.metus</p>
                                        </div>{/* /.inner */}
                                    </div>
                                    <div className="faq-page__count"></div>
                                </div>
                                <div className={isActive.key == 2 ? "accrodion active" : "accrodion"} onClick={() => handleToggle(2)}>
                                    <div className="accrodion-title">
                                        <h4>How can we increase our profitability and revenue?</h4>
                                    </div>
                                    <div className="accrodion-content" onClick={() => handleToggle(2)}>
                                        <div className="inner">
                                            <p>Dignissim mollis taciti netus nisl congue cubilia antena dictum porta vehicula
                                                name cubilia lorem mattis fermentum mauris pulvinar montes tortor rhoncus
                                                vulputate platea faucibus vitae ullamcorper urna montes facilisi aenean agna
                                                purus enime ton amet ridiculus penatibus lacinia an adipiscing libero erose
                                                massa conubia phasellus adipisci nulla aliquam quisque curabitur quis convallis
                                                diam natoque sed.metus</p>
                                        </div>{/* /.inner */}
                                    </div>
                                    <div className="faq-page__count"></div>
                                </div>
                                <div className={isActive.key == 3 ? "accrodion active" : "accrodion"} onClick={() => handleToggle(3)}>
                                    <div className="accrodion-title">
                                        <h4>How can we optimize our supply chain costs?</h4>
                                    </div>
                                    <div className="accrodion-content">
                                        <div className="inner">
                                            <p>Dignissim mollis taciti netus nisl congue cubilia antena dictum porta vehicula
                                                name cubilia lorem mattis fermentum mauris pulvinar montes tortor rhoncus
                                                vulputate platea faucibus vitae ullamcorper urna montes facilisi aenean agna
                                                purus enime ton amet ridiculus penatibus lacinia an adipiscing libero erose
                                                massa conubia phasellus adipisci nulla aliquam quisque curabitur quis convallis
                                                diam natoque sed.metus</p>
                                        </div>{/* /.inner */}
                                    </div>
                                    <div className="faq-page__count"></div>
                                </div>
                                <div className={isActive.key == 4 ? "accrodion active" : "accrodion"} onClick={() => handleToggle(4)}>
                                    <div className="accrodion-title">
                                        <h4>What are the effective ways to manage our employees?</h4>
                                    </div>
                                    <div className="accrodion-content">
                                        <div className="inner">
                                            <p>Dignissim mollis taciti netus nisl congue cubilia antena dictum porta vehicula
                                                name cubilia lorem mattis fermentum mauris pulvinar montes tortor rhoncus
                                                vulputate platea faucibus vitae ullamcorper urna montes facilisi aenean agna
                                                purus enime ton amet ridiculus penatibus lacinia an adipiscing libero erose
                                                massa conubia phasellus adipisci nulla aliquam quisque curabitur quis convallis
                                                diam natoque sed.metus</p>
                                        </div>{/* /.inner */}
                                    </div>
                                    <div className="faq-page__count"></div>
                                </div>
                                <div className={isActive.key == 5 ? "accrodion active" : "accrodion"} onClick={() => handleToggle(5)}>
                                    <div className="accrodion-title">
                                        <h4>How can we develop and implement business strategy?</h4>
                                    </div>
                                    <div className="accrodion-content">
                                        <div className="inner">
                                            <p>Dignissim mollis taciti netus nisl congue cubilia antena dictum porta vehicula
                                                name cubilia lorem mattis fermentum mauris pulvinar montes tortor rhoncus
                                                vulputate platea faucibus vitae ullamcorper urna montes facilisi aenean agna
                                                purus enime ton amet ridiculus penatibus lacinia an adipiscing libero erose
                                                massa conubia phasellus adipisci nulla aliquam quisque curabitur quis convallis
                                                diam natoque sed.metus</p>
                                        </div>{/* /.inner */}
                                    </div>
                                    <div className="faq-page__count"></div>
                                </div>
                                <div className={isActive.key == 6 ? "accrodion active" : "accrodion"} onClick={() => handleToggle(6)}>
                                    <div className="accrodion-title">
                                        <h4>What are the current and best practices in our industry?</h4>
                                    </div>
                                    <div className="accrodion-content">
                                        <div className="inner">
                                            <p>Dignissim mollis taciti netus nisl congue cubilia antena dictum porta vehicula
                                                name cubilia lorem mattis fermentum mauris pulvinar montes tortor rhoncus
                                                vulputate platea faucibus vitae ullamcorper urna montes facilisi aenean agna
                                                purus enime ton amet ridiculus penatibus lacinia an adipiscing libero erose
                                                massa conubia phasellus adipisci nulla aliquam quisque curabitur quis convallis
                                                diam natoque sed.metus</p>
                                        </div>{/* /.inner */}
                                    </div>
                                    <div className="faq-page__count"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*FAQ Page End*/}

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