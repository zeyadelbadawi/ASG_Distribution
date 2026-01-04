"use client"
import { useState } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Cta from "@/components/sections/home1/Cta"

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  })
  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)

  const listId = "kVfvu"
  const listId2 = "FZGec"
  const phonePattern = /^01[0-9]{9}$/ // Matches 11-digit Egyptian numbers starting with 01
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // ... existing code ...

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const formErrors = {}

    if (!formData.name.trim()) {
      formErrors.name = "Name is required"
    }

    if (!phonePattern.test(formData.phone)) {
      formErrors.phone = "Enter a valid Egyptian phone number"
    }

    if (!emailPattern.test(formData.email)) {
      formErrors.email = "Enter a valid email address"
    }

    if (!formData.company.trim()) {
      formErrors.company = "Company name is required"
    }

    if (!formData.message.trim()) {
      formErrors.message = "Message is required"
    }

    setErrors(formErrors)

    return Object.keys(formErrors).length === 0
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        // Prepend +20 (Egypt country code) to the phone number before submission
        const formattedPhone = `+20${formData.phone.trim()}`

        const requestBody = {
          name: formData.name,
          email: formData.email,
          campaign: {
            campaignId: listId2,
          },
          customFieldValues: [
            {
              customFieldId: "4qvEI", // Company
              value: [formData.company.trim()],
            },
            {
              customFieldId: "4qhal",
              value: [formattedPhone], // Use the formatted phone with +20
            },
            {
              customFieldId: "4qhVW", // Comment
              value: [formData.message.trim()],
            },
          ],
        }

        const response = await fetch("http://localhost:5000/api/contacts", {
          // Change to your backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        if (response.ok) {
          setSubmissionStatus("Form submitted successfully!")
          console.log("Form data sent to GetResponse successfully!")
          // Optionally, reset form fields here
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
          })
        } else {
          const errorData = await response.json()
          setSubmissionStatus(`Failed to submit the form: ${errorData.message}`)
          console.error("Failed to submit form:", errorData)
        }
      } catch (error) {
        setSubmissionStatus("An error occurred while submitting the form.")
        console.error("Error:", error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const requestBody = {
        email: email,
        campaign: {
          campaignId: listId,
        },
      }

      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        setSubmissionStatus("Form submitted successfully!")
        console.log("Form data sent to GetResponse successfully!")
        setEmail("") // Reset email field after successful submission
      } else {
        const errorData = await response.json()
        setSubmissionStatus(`Failed to submit the form: ${errorData.message}`)
        console.error("Failed to submit form:", errorData)
      }
    } catch (error) {
      setSubmissionStatus("An error occurred while submitting the form.")
      console.error("Error:", error)
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .contact-enhanced-section {
          position: relative;
          padding: 100px 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%);
          overflow: hidden;
        }

        .contact-enhanced-section::before {
          content: '';
          position: absolute;
          top: -150px;
          right: -150px;
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #FF6600 0%, #ff8533 100%);
          border-radius: 50%;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .contact-enhanced-section::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 50%;
          opacity: 0.08;
          animation: float 8s ease-in-out infinite reverse;
        }

        .shape-decoration {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        .shape-circle-1 {
          top: 10%;
          left: 5%;
          width: 80px;
          height: 80px;
          border: 3px solid #FF6600;
          border-radius: 50%;
          opacity: 0.3;
          animation: pulse 3s ease-in-out infinite;
        }

        .shape-circle-2 {
          bottom: 15%;
          right: 8%;
          width: 120px;
          height: 120px;
          border: 4px dashed #1a1a2e;
          border-radius: 50%;
          opacity: 0.2;
          animation: rotate 20s linear infinite;
        }

        .shape-square {
          top: 40%;
          right: 3%;
          width: 60px;
          height: 60px;
          background: #FF6600;
          opacity: 0.15;
          transform: rotate(45deg);
          animation: float 5s ease-in-out infinite;
        }

        .shape-triangle {
          bottom: 30%;
          left: 8%;
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 70px solid #1a1a2e;
          opacity: 0.1;
          animation: float 7s ease-in-out infinite;
        }

        .contact-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .contact-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .contact-right {
          animation: slideInRight 0.8s ease-out;
        }

        .section-header {
          margin-bottom: 30px;
        }

        .section-tag {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, #FF6600 0%, #ff8533 100%);
          color: white;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
          box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3);
        }

        .section-main-title {
          font-size: 42px;
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .section-description {
          font-size: 16px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 102, 0, 0.15);
          border-color: #FF6600;
        }

        .info-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #FF6600 0%, #ff8533 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .info-card:hover .info-icon {
          transform: rotate(10deg) scale(1.1);
        }

        .info-content h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 5px;
        }

        .info-content p {
          font-size: 15px;
          color: #666;
          margin: 0;
        }

        .info-content a {
          color: #FF6600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .info-content a:hover {
          color: #ff8533;
          text-decoration: underline;
        }

        .map-container {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 3px solid white;
        }

        .map-container iframe {
          width: 100%;
          height: 400px;
          border: 0;
        }

        .form-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 50px;
          border-radius: 25px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .form-container::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 102, 0, 0.1) 0%, transparent 70%);
          animation: rotate 30s linear infinite;
        }

        .form-content {
          position: relative;
          z-index: 2;
        }

        .form-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 10px;
        }

        .form-subtitle {
          color: #B8B8B8;
          font-size: 16px;
          margin-bottom: 35px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 18px 25px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #FF6600;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(255, 102, 0, 0.3);
        }

        .form-textarea {
          min-height: 140px;
          resize: vertical;
        }

        .error-message {
          color: #ffcccc;
          font-size: 14px;
          margin-top: 5px;
          margin-bottom: -10px;
        }

        .submit-button {
          width: 100%;
          padding: 18px 35px;
          background: linear-gradient(135deg, #FF6600 0%, #ff8533 100%);
          color: white;
          font-size: 18px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(255, 102, 0, 0.4);
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 102, 0, 0.5);
        }

        .submit-button:active {
          transform: translateY(-1px);
        }

        .success-message {
          color: #4ade80;
          text-align: center;
          margin-top: 20px;
          font-size: 16px;
          font-weight: 600;
          animation: fadeIn 0.5s ease;
        }

        @media (max-width: 768px) {
          .section-main-title {
            font-size: 32px;
          }

          .form-container {
            padding: 35px 25px;
          }

          .form-title {
            font-size: 28px;
          }

          .contact-enhanced-section {
            padding: 60px 0;
          }
        }
      `}</style>

      <Layout
        headerStyle={3}
        footerStyle={1}
        breadcrumbTitle="Contact Us"
        breadcrumbBg="/assets/images/brandsheader/contact.jpg"
      >
        <section className="contact-enhanced-section">
          <div className="shape-decoration shape-circle-1"></div>
          <div className="shape-decoration shape-circle-2"></div>
          <div className="shape-decoration shape-square"></div>
          <div className="shape-decoration shape-triangle"></div>

          <div className="contact-container">
            <div className="contact-grid">
              <div className="contact-left">
                <div className="section-header">
                  <span className="section-tag">Get in Touch</span>
                  <h2 className="section-main-title">Let's Build Something Great Together</h2>
                  <p className="section-description">
                    Whether you need security solutions, networking infrastructure, or parking management systems, our
                    team is ready to help transform your business.
                  </p>
                </div>

                <div className="info-cards">
                  <div className="info-card">
                    <div className="info-icon">
                      <span className="icon-gmail"></span>
                    </div>
                    <div className="info-content">
                      <h4>Email</h4>
                      <p>
                        <Link href="mailto:info@asgdistribution.com">info@asgdistribution.com</Link>
                      </p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <span className="icon-call-3"></span>
                    </div>
                    <div className="info-content">
                      <h4>Phone</h4>
                      <p>
                        <Link href="tel:01050638800">010 50638800</Link>
                      </p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <span className="icon-home-pin"></span>
                    </div>
                    <div className="info-content">
                      <h4>Address</h4>
                      <p>4 Dr Mohamed Awad Street From Makram Abied in Front of City Center</p>
                    </div>
                  </div>
                </div>

                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4434.470934306312!2d31.34009727053525!3d30.069344079300453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f92ba92b499%3A0xe71112fc96b95222!2sASG%20Distribution!5e0!3m2!1sen!2seg!4v1727043503231!z=18"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ASG Distribution Location"
                  ></iframe>
                </div>
              </div>

              <div className="contact-right">
                <div className="form-container">
                  <div className="form-content">
                    <h3 className="form-title">Send us a Message</h3>
                    <p className="form-subtitle">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit2}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input"
                        />
                        {errors?.name && <p className="error-message">{errors.name}</p>}
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input"
                        />
                        {errors?.email && <p className="error-message">{errors.email}</p>}
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                        />
                        {errors?.phone && <p className="error-message">{errors.phone}</p>}
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="company"
                          placeholder="Company Name *"
                          value={formData.company}
                          onChange={handleChange}
                          className="form-input"
                        />
                        {errors?.company && <p className="error-message">{errors.company}</p>}
                      </div>

                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder="Your Message *"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-textarea"
                        />
                        {errors?.message && <p className="error-message">{errors.message}</p>}
                      </div>

                      <button type="submit" className="submit-button">
                        Send Message
                        <span className="icon-arrow-right"></span>
                      </button>

                      {submissionStatus && <p className="success-message">{submissionStatus}</p>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Cta />
      </Layout>
    </>
  )
}
