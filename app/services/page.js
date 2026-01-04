"use client"
import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Cta from "@/components/sections/home1/Cta"

export default function Home() {
  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)
  const [services, setServices] = useState([])

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/services.json")
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
    <>
      <Layout
        headerStyle={3}
        footerStyle={1}
        breadcrumbTitle="Our Solutions"
        breadcrumbBg="/assets/images/solution.jpg" // Pass the background image for Breadcrumb
      >
        <div>
          <br></br> <br></br>
          <section className="services-one">
            <div className="container">
              <div className="row services-row">
                {services.map((item, index) => (
                  <div key={index} className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="100ms">
                    <div className="services-one__single">
                      <div className="services-one__img-box">
                        <div className="services-one__img">
                          <img src={item.imageUrl || "/placeholder.svg"} alt="" />
                        </div>
                        <div className="services-one__icon">
                          <img
                            src={item.iconUrl || "/placeholder.svg"}
                            alt={item.title}
                            style={{ width: "50px", height: "50px" }}
                          />{" "}
                          {/* Updated to display uploaded SVG icon */}
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
          <Cta />
        </div>
      </Layout>
    </>
  )
}
