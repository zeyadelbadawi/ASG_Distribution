'use client';
import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/services.json');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error('Failed to fetch services:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    fetchServices();
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
        setEmail(''); // Reset email field after successful submission
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
      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Our Solutions" breadcrumbBg="/assets/images/solution.jpg" // Pass the background image for Breadcrumb
      >
        <div>
          <br></br> <br></br>
          <section className="services-one">
            <div className="container">
              <div className='row services-row'>
                {services.map((item, index) => (
                  <div key={index} className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="100ms">
                    <div className="services-one__single">
                      <div className="services-one__img-box">
                        <div className="services-one__img">
                          <img src={item.imageUrl} alt="" />
                        </div>
                        <div className="services-one__icon">
                          <img src={item.iconUrl} alt={item.title} style={{ width: '50px', height: '50px' }} /> {/* Updated to display uploaded SVG icon */}
                        </div>
                      </div>
                      <div className="services-one__content">
                        <h3 className="services-one__title">
                          <Link href={`/services-details?tab=${item.tabNumber}`}>{item.title}</Link>
                        </h3>
                        <p className="services-one__text">{item.description}</p>
                        <div className="services-one__btn-box">
                          <Link href={`/services-details?tab=${item.tabNumber}`} className="services-one__btn thm-btn">
                            Discover More<span className="icon-plus"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA One Start */}
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
          {/* CTA One End */}
        </div>
      </Layout>
    </>
  );
}
