"use client"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import Cta from "@/components/sections/home1/Cta" // Import the reusable Cta component

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
        const response = await fetch("/api/saveServerDataService") // Assuming this endpoint returns the services data
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
      breadcrumbTitle="Our Services"
      breadcrumbBg="/assets/Services.png" // Pass the background image for Breadcrumb
    >
      <div>
        {/* Services Page Start */}
        <section className="services-page">
          <div className="container">
            <div className="row">
              {/* Map through services and render dynamically */}
              {services.map((item, index) => (
                <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="services-one__single d-flex flex-column h-100">
                    <div className="services-one__img-box">
                      <div className="services-one__img">
                        <img src={`assets/images/services/${item.imageUrl}`} alt="" />
                      </div>
                    </div>
                    <div className="services-one__content flex-grow-1 d-flex flex-column">
                      <h3 className="services-one__title">
                        {item.title}
                      </h3>
                      <p className="services-one__text">{item.description}</p>
                   
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Services Page End */}

        <Cta />
      </div>
    </Layout>
  )
}
