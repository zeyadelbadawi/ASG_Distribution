"use client"
import Image from "next/image"
import { useState } from "react"

export default function Cta() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    if (!isValidEmail(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/submit-to-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          type: "newsletter",
        }),
      })

      if (response.ok) {
        setStatus({ type: "success", message: "Thank you for subscribing!" })
        setEmail("")
        setTimeout(() => {
          window.open("/company-profile", "_blank")
        }, 500)
      } else {
        const errorData = await response.json()
        setStatus({ type: "error", message: errorData.error || "Failed to subscribe." })
      }
    } catch (error) {
      setStatus({ type: "error", message: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/*CTA One Start */}
      <section className="cta-one" style={{ marginTop: "100px" }}>
        <style jsx>{`
          @media (max-width: 991px) {
            .cta-one__inner {
              position: relative !important;
              overflow: visible !important;
            }

            .cta-one__image-container {
              display: none !important;
            }

            .cta-one-mobile-col {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding: 40px 20px;
            }

            .cta-one__right {
              width: 100%;
              padding: 20px;
            }
          }

          @media (max-width: 576px) {
            .cta-one-mobile-col {
              padding: 30px 15px;
            }

            .cta-one__title {
              font-size: 24px;
            }

            .cta-one__form-input-box {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            .cta-one__form-input-box input {
              width: 100% !important;
            }

            .cta-one__btn {
              width: 100% !important;
            }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes fadeInDown {
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
        <div className="container">
          <div className="cta-one__inner" style={{ position: "relative", overflow: "visible" }}>
            <div
              className="cta-one__bg"
              style={{ backgroundImage: "url(/assets/images/backgrounds/cta-one-bg.jpg)" }}
            ></div>
            <div className="row">
              {/* Left Column with Image - Hidden on Mobile */}
              <div className="col-xl-6 col-lg-6 d-none d-lg-block">
                <div
                  className="cta-one__image-container"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "30px",
                    width: "45%",
                    height: "auto",
                    zIndex: "20",
                  }}
                >
                  <Image
                    src="/assets/images/resources/cta-one-bg.png"
                    alt="Company Profile"
                    className="cta-one__image"
                    width={500}
                    height={600}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      position: "relative",
                      paddingBottom: "20px",
                      zIndex: "21",
                    }}
                    loading="lazy"
                    priority={false}
                  />
                </div>
              </div>

              {/* Right Column with Form - Full Width on Mobile */}
              <div className="col-xl-6 col-lg-6 col-12 cta-one-mobile-col">
                <div className="cta-one__right">
                  <h3 className="cta-one__title">Subscribe to Our Newsletter</h3>
                  <p className="cta-one__text">
                    Stay updated with the latest products, offers, and smart solutions delivered straight to your inbox!
                  </p>
                  <form className="cta-one__form mc-form" onSubmit={handleSubmit}>
                    <div
                      className="cta-one__form-input-box"
                      style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}
                    >
                      <input
                        type="email"
                        placeholder="Your email..."
                        name="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
                          height: "50px",
                          borderRadius: "5px",
                          padding: "0 20px",
                          width: "100%",
                          boxSizing: "border-box",
                          border: "2px solid #FFFFFF",
                          alignItems: "center",
                          opacity: isSubmitting ? 0.7 : 1,
                          flex: 1,
                        }}
                      />
                      <button
                        type="submit"
                        className="cta-one__btn thm-btn"
                        disabled={isSubmitting}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          minWidth: "120px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                              style={{
                                width: "1rem",
                                height: "1rem",
                                border: "2px solid currentColor",
                                borderRightColor: "transparent",
                                borderRadius: "50%",
                                display: "inline-block",
                                animation: "spin 1s linear infinite",
                              }}
                            ></span>
                            <span>Sending...</span>
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                  {status && (
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        backgroundColor:
                          status.type === "success" ? "rgba(76, 175, 80, 0.15)" : "rgba(244, 67, 54, 0.15)",
                        color: status.type === "success" ? "#4caf50" : "#f44336",
                        borderLeft: `4px solid ${status.type === "success" ? "#4caf50" : "#f44336"}`,
                        animation: "fadeInDown 0.4s ease-out",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {status.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*CTA One End */}
    </>
  )
}
