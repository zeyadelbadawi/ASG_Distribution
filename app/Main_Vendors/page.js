"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)
  const [services, setServices] = useState([]) // State to store fetched services data

  const listId = "kVfvu"

  useEffect(() => {
    // Fetch services data
    async function fetchServices() {
      try {
        const response = await fetch("/api/saveServerDataVendor") // Assuming this endpoint returns the services data
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        } else {
          console.error("Failed to fetch services:", response.statusText)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

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
        setEmail("") // Reset email field after successful submission
      } else {
        const errorData = await response.json()
        setSubmissionStatus(`Failed to submit the form: ${errorData.message}`)
      }
    } catch (error) {
      setSubmissionStatus("An error occurred while submitting the form.")
    }
  }

  return (
    <Layout
      headerStyle={3} // Specify the header style
      footerStyle={1} // Specify the footer style
      breadcrumbTitle="Our Partners"
      breadcrumbBg="/assets/PHeader.jpg" // Pass the background image for Breadcrumb
    >
      <div>
        {/* Services Page Start */}
        <section className="services-page">
          <div className="container">
            <div className="row">
              {/* Map through services and render dynamically */}
              {services.map((item, index) => (
                <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="services-one__single d-flex flex-column h-100">
                    <div className="services-one__img-box">
                      <div className="services-one__img">
                        <img src={`assets/images/services/${item.imageUrl}`} alt="" />
                      </div>
                    </div>
                    <div className="services-one__content flex-grow-1 d-flex flex-column">
                      <h3 className="services-one__title">
                        <Link href={`/partners/${item.slug || item.id}`}>{item.title}</Link>
                      </h3>
                      <p className="services-one__text">{item.description}</p>
                      <div className="services-one__btn-box mt-auto">
                        <Link href={`/partners/${item.slug || item.id}`} className="services-one__btn thm-btn">
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
        {/* Services Page End */}

        {/* CTA One Start */}
        <section className="cta-one">
          <div className="container">
            <div className="cta-one__inner">
              <div
                className="cta-one__bg"
                style={{ backgroundImage: "url(assets/images/backgrounds/cta-one-bg.jpg)" }}
              ></div>
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
                            backgroundColor: "#FF6600",
                            color: "#FFFFFF",
                            height: "50px",
                            borderRadius: "5px",
                            padding: "0 20px",
                            width: "100%",
                            boxSizing: "border-box",
                            border: "2px solid #FFFFFF",
                          }}
                        />
                        <button type="submit" className="cta-one__btn thm-btn">
                          Message
                        </button>
                      </div>
                      {errors && <p style={{ color: "red" }}>{errors}</p>}
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
  )
}
