"use client"
import { useState } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Cta from "@/components/sections/home1/Cta"

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const phonePattern = /^01[0-9]{9}$/ // Matches 11-digit Egyptian numbers starting with 01
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // ... existing code ...

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
    if (!validateForm()) return

    setLoading(true)
    setSubmissionStatus(null)

    try {
      const response = await fetch("/api/submit-to-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmissionStatus("Form submitted successfully! We will contact you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        setSubmissionStatus(`Error: ${errorData.message || "Failed to submit form"}`)
      }
    } catch (error) {
      setSubmissionStatus("An error occurred. Please try again later.")
      console.error("[v0] Submission error:", error)
    } finally {
      setLoading(false)
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

        @keyframes spinner {
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

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .form-input:disabled,
        .form-textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spinner 0.6s linear infinite;
        }

        .status-message {
          margin-top: 20px;
          padding: 15px;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          animation: fadeIn 0.5s ease;
        }

        .status-success {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.2);
        }

        .status-error {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.2);
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
        headerStyle={3} // Specify the header style
        breadcrumbBg="/assets/images/resources/Company.png" // Pass the background image for Breadcrumb
        breadcrumbTitle="Success Cases" // Pass the title for Breadcrumb
        hideHomeBreadcrumb={true} // Hide the home breadcrumb for this page only
      >
        <section className="company-profile-section" style={{ padding: "80px 0", background: "#f8f9fa" }}>
          <div className="container">
            {/* Embedded Canva Presentation */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "0",
                paddingTop: "56.25%",
                paddingBottom: "0",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                marginBottom: "60px",
                overflow: "hidden",
                borderRadius: "16px",
                willChange: "transform",
                background: "#ffffff",
              }}
            >
              <iframe
                loading="lazy"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "0",
                  border: "none",
                  padding: "0",
                  margin: "0",
                }}
                src="https://www.canva.com/design/DAGQP8PiMmI/KMBNORba1XK6GMFVE-nA7A/view?embed"
                allowFullScreen
              ></iframe>
            </div>

          </div>
        </section>
        
        <Cta />
      </Layout>
    </>
  )
}
