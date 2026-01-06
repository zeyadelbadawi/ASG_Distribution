"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import Cta from "@/components/sections/home1/Cta"

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [services, setServices] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    fetch("/services.json")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error))
  }, [])

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveIndex(Number.parseInt(tab, 10))
    }
  }, [searchParams])

  const handleOnClick = (tabNumber) => {
    setActiveIndex(tabNumber)
    router.push(`/services-details?tab=${tabNumber}`, { shallow: true })
  }

  const benefitIcons = {
    "Enhanced Safety": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M9 12L11 14L15 10" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Deterrence: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="#FF6600" strokeWidth="2" />
        <path
          d="M12 5V3M12 21V19M19 12H21M3 12H5M17.66 17.66L19.07 19.07M4.93 4.93L6.34 6.34M17.66 6.34L19.07 4.93M4.93 19.07L6.34 17.66"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Remote Monitoring": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#FF6600" strokeWidth="2" />
        <path d="M8 21H16M12 17V21" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="10" r="3" stroke="#FF6600" strokeWidth="2" />
      </svg>
    ),
    "Improved Efficiency": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "Cost-Efficiency": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
        <path d="M12 6V12L16 14" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 16H15" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    "Improved Productivity": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13L9 19L21 7" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 7L9 13" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Scalability: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"
          stroke="#FF6600"
          strokeWidth="2"
        />
        <path d="M7 10L12 14L17 10" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Enhanced Connectivity": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2" fill="#FF6600" />
        <path
          d="M8.5 8.5C10.3 6.7 13.7 6.7 15.5 8.5M5 5C8.9 1.1 15.1 1.1 19 5M12 19V15"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Crime Prevention": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
          stroke="#FF6600"
          strokeWidth="2"
        />
        <path d="M9 9L15 15M15 9L9 15" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    "Asset Protection": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="11" width="14" height="11" rx="2" stroke="#FF6600" strokeWidth="2" />
        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#FF6600" strokeWidth="2" />
        <circle cx="12" cy="16" r="1" fill="#FF6600" />
      </svg>
    ),
    "Regulatory Compliance": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
          stroke="#FF6600"
          strokeWidth="2"
        />
        <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    "Enhanced Communication": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z"
          stroke="#FF6600"
          strokeWidth="2"
        />
        <path d="M22 22L17 17" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    "Engagement and Impact": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21L3 13.5V7L12 2L21 7V13.5L12 21Z" stroke="#FF6600" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="3" stroke="#FF6600" strokeWidth="2" />
      </svg>
    ),
    "Flexibility and Versatility": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 9L2 12L5 15M19 9L22 12L19 15M12 3V21"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "Efficiency and Productivity": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
        <path d="M12 6V12L16 16" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    "Cost Savings": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
        <path d="M12 6V12M8 15H16" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M15 8.5C15 7.67157 13.6569 7 12 7C10.3431 7 9 7.67157 9 8.5C9 9.32843 10.3431 10 12 10C13.6569 10 15 10.6716 15 11.5C15 12.3284 13.6569 13 12 13C10.3431 13 9 12.3284 9 11.5"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Enhanced Security": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
          stroke="#FF6600"
          strokeWidth="2"
        />
        <circle cx="12" cy="11" r="3" stroke="#FF6600" strokeWidth="2" />
      </svg>
    ),
    "Personalized Experiences": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="#FF6600" strokeWidth="2" />
        <path
          d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M15 11L17 13L20 10" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Optimized Space Utilization": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" stroke="#FF6600" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" stroke="#FF6600" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" stroke="#FF6600" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" stroke="#FF6600" strokeWidth="2" />
      </svg>
    ),
    "Improved User Experience": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
        <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="9" r="1" fill="#FF6600" />
        <circle cx="15" cy="9" r="1" fill="#FF6600" />
      </svg>
    ),
    "Increased Revenue": (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17L9 11L13 15L21 7" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7H21V12" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }

  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)
  const listId = "kVfvu"

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
        setEmail("")
      } else {
        const errorData = await response.json()
        setSubmissionStatus(`Failed to submit the form: ${errorData.message}`)
      }
    } catch (error) {
      setSubmissionStatus("An error occurred while submitting the form.")
    }
  }

  return (
    <>
      <Layout
        headerStyle={3}
        footerStyle={1}
        breadcrumbTitle="Solution Details"
        breadcrumbBg="/assets/ServicesHeader.png" // Pass the background image for Breadcrumb
      >
        <div>
          <section className="services-details">
            <div className="container">
              <h3 className="services-details__top-title">Service lists</h3>
              <div className="services-details__inner tabs-box">
                <div className="services-details__tab-box clearfix">
                  <ul className="tab-buttons clearfix list-unstyled">
                    {services.map((service) => (
                      <li
                        key={service.id}
                        className={activeIndex === service.tabNumber ? "tab-btn active-btn" : "tab-btn"}
                        onClick={() => handleOnClick(service.tabNumber)}
                      >
                        <div className="services-details__tab-btn">
                          <span>{service.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="services-details__bottom">
                  <div className="tabs-content">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={
                          activeIndex === service.tabNumber
                            ? "tab fadeInUp animated show active-tab"
                            : "tab fadeInUp animated"
                        }
                      >
                        <div className="row">
                          <div className="col-xl-8 col-lg-7">
                            <div className="services-details__left">
                              <div className="services-details__img-1">
                                <img src={service.imageUrl || "/placeholder.svg"} alt={service.title} />
                                <div className="services-details__icon" style={{ textAlign: "center" }}>
                                  <img
                                    src={service.iconUrl || "/placeholder.svg"}
                                    alt={service.title + " icon"}
                                    style={{ display: "block", margin: "0 auto", maxWidth: "80px", height: "auto" }}
                                  />
                                </div>
                              </div>
                              <h3 className="services-details__title-1">{service.title}</h3>
                              <p className="services-details__text">{service.description1}</p>
                              <div className="services-details__points-box">
                                <ul className="services-details__points list-unstyled">
                                  {service.points.map((point, index) => (
                                    <li key={index}>
                                      <div className="icon">
                                        <span className="icon-check-2"></span>
                                      </div>
                                      <p>{point}</p>
                                      <br></br>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="services-details__text">{service.description2}</p>
                              <br></br>
                              <h3 className="services-details__title-2">Benefits of {service.title}:</h3>
                              <ul className="process-one__process-list list-unstyled">
                                {service.benefits.map((benefit, index) => (
                                  <li key={index}>
                                    <div className="process-one__count"></div>
                                    <div
                                      className="icon"
                                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                      {benefitIcons[benefit] || (
                                        <svg
                                          width="40"
                                          height="40"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
                                          <path
                                            d="M12 8V12M12 16H12.01"
                                            stroke="#FF6600"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                    <h3>{benefit}</h3>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-5">
                            <div className="services-details__right">
                              {/* Static Popular Solutions */}
                              <div className="services-details__popular-services">
                                <h3 className="services-details__popular-services-title">Popular Solutions</h3>
                                <ul className="services-details__popular-services-list list-unstyled">
                                  <li>
                                    <div className="services-details__popular-services-img">
                                      <img src="assets/images/services/Parking.png" alt="/services-details?tab=2" />
                                    </div>
                                    <div className="services-details__popular-services-content">
                                      <h3>
                                        <Link href="/services-details?tab=2">Parking Management</Link>
                                      </h3>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="services-details__popular-services-img">
                                      <img src="assets/images/services/Automations.png" alt="/services-details?tab=5" />
                                    </div>
                                    <div className="services-details__popular-services-content">
                                      <h3>
                                        <Link href="/services-details?tab=5">Automations</Link>
                                      </h3>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              {/* Static Get in Touch */}
                              <div className="services-details__get-in-touch">
                                <h3 className="services-details__popular-services-title">Get in Touch</h3>
                                <ul className="services-details__get-in-touch-list list-unstyled">
                                  <li>
                                    <div className="icon">
                                      <span className="icon-call"></span>
                                    </div>
                                    <p>
                                      <Link href="tel:+201050638800">+201050638800</Link>
                                    </p>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <span className="icon-email"></span>
                                    </div>
                                    <p>
                                      <Link href="mailto:info@asgdistribution.com">info@asgdistribution.com</Link>
                                    </p>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <span className="icon-clock"></span>
                                    </div>
                                    <p>Sun-Thursday: 9AM-5PM</p>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <span className="icon-pin"></span>
                                    </div>
                                    <p>4 Dr Mohamed Awad Street in Front of City Center</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Cta />

        </div>
      </Layout>
    </>
  )
}
