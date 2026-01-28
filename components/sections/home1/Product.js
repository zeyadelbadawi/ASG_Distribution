"use client"

import { useState } from "react"

export default function Product() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [submissionStatus, setSubmissionStatus] = useState(null) // Track form submission status
  const [isLoading, setIsLoading] = useState(false) // Added loading state to track form submission

  // Regex patterns for validation (phone pattern updated to match Egyptian numbers)
  const phonePattern = /^01[0-9]{9}$/ // Matches 11-digit Egyptian numbers starting with 01
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Matches email addresses

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Form validation logic
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true) // Set loading to true when submission starts
      setSubmissionStatus(null)

      try {
        const formattedPhone = `+20${formData.phone.trim()}`

        const requestBody = {
          name: formData.name,
          phone: formattedPhone,
          email: formData.email,
          company: formData.company.trim(),
          message: formData.message.trim(),
        }

        const response = await fetch("/api/submit-to-sheets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        const result = await response.json()

        if (response.ok) {
          setSubmissionStatus("success")
          console.log("Form data sent to Google Sheets successfully!")
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
          })
          setErrors({})
        } else {
          setSubmissionStatus("error")
          console.error("Failed to submit form:", result.error)
        }
      } catch (error) {
        setSubmissionStatus("error")
        console.error("Error:", error)
      } finally {
        setIsLoading(false) // Set loading to false when submission completes
      }
    }
  }

  return (
    <>
      {/* Product One Start */}
      <section id="product-section" className="product-one">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="product-one__left">
                <div className="section-title text-left">
                  <div className="section-title__tagline-box">
                    <span className="section-title__tagline">Contact us</span>
                  </div>
                  <h2 className="section-title__title">Become one of our Success partners!</h2>
                </div>
                <p className="product-one__text">
                  Unlock a world of opportunities for growth and prosperity in the distribution industry.{" "}
                </p>
                <div className="product-one__img">
                  <img src="assets/images/resources/product-one-img-1.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="product-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                {/* Title */}

                <form onSubmit={handleSubmit} className="product-one__form contact-form-validated">
                  <div className="product-one__single-list">
                    <h1
                      style={{
                        textAlign: "left",
                        color: "#FFFFFF", // White text
                        fontSize: "35px", // Larger font size to match the screenshot
                        fontWeight: "bold", // Bold font weight
                        marginBottom: "20px", // Space below the title
                        lineHeight: "1.2", // Adjust line height for spacing between lines
                        fontFamily: "'Arial', sans-serif", // Clean font family for a professional look
                        padding: "20px",
                      }}
                    >
                      Get a Free Quote
                    </h1>
                    <div className="select-box">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="wide"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
                          height: "70px",
                          borderRadius: "5px",
                          padding: "0 20px",
                          width: "100%",
                          boxSizing: "border-box",
                          border: "2px solid #FFFFFF",
                          opacity: isLoading ? 0.6 : 1,
                        }}
                      />
                      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    </div>
                  </div>
                  <div className="product-one__single-list">
                    <div className="select-box">
                      <input
                        type="text"
                        name="company"
                        placeholder="Enter your company name"
                        className="wide"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isLoading}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
                          height: "70px",
                          borderRadius: "5px",
                          padding: "0 20px",
                          width: "100%",
                          boxSizing: "border-box",
                          border: "2px solid #FFFFFF",
                          opacity: isLoading ? 0.6 : 1,
                        }}
                      />
                      {errors.company && <p style={{ color: "red" }}>{errors.company}</p>}
                    </div>
                  </div>
                  <div className="product-one__single-list">
                    <div className="select-box">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="wide"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
                          height: "70px",
                          borderRadius: "5px",
                          padding: "0 20px",
                          width: "100%",
                          boxSizing: "border-box",
                          border: "2px solid #FFFFFF",
                          opacity: isLoading ? 0.6 : 1,
                        }}
                      />
                      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="product-one__single-list">
                    <div className="select-box">
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        className="wide"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
                          height: "70px",
                          borderRadius: "5px",
                          padding: "0 20px",
                          width: "100%",
                          boxSizing: "border-box",
                          border: "2px solid #FFFFFF",
                          opacity: isLoading ? 0.6 : 1,
                        }}
                      />
                      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div className="product-one__single-list">
                    <div className="select-box">
                      <input
                        type="text"
                        name="message"
                        placeholder="Enter your Message"
                        className="wide"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isLoading}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
                          height: "120px",
                          borderRadius: "5px",
                          padding: "0 20px",
                          width: "100%",
                          boxSizing: "border-box",
                          border: "2px solid #FFFFFF",
                          opacity: isLoading ? 0.6 : 1,
                        }}
                      />
                      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
                    </div>
                  </div>
                  <div className="product-one__btn-box">
                    <button
                      type="submit"
                      className="thm-btn product-one__btn"
                      disabled={isLoading}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        opacity: isLoading ? 0.8 : 1,
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                    >
                      {isLoading && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            border: "3px solid rgba(255, 255, 255, 0.3)",
                            borderTop: "3px solid #FFFFFF",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                          }}
                        />
                      )}
                      {isLoading ? "Sending..." : "Send"}
                    </button>
                  </div>
                  {submissionStatus === "success" && (
                    <div
                      style={{
                        padding: "15px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                        borderRadius: "5px",
                        marginTop: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        animation: "slideIn 0.5s ease-out",
                      }}
                    >
                      ✓ Form submitted successfully!
                    </div>
                  )}
                  {submissionStatus === "error" && (
                    <div
                      style={{
                        padding: "15px 20px",
                        backgroundColor: "#f44336",
                        color: "#FFFFFF",
                        borderRadius: "5px",
                        marginTop: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        animation: "slideIn 0.5s ease-out",
                      }}
                    >
                      ✗ Failed to submit the form. Please try again.
                    </div>
                  )}
                </form>
                <div className="result"></div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </>
  )
}
