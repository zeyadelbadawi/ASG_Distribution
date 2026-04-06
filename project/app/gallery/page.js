"use client"
import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Cta from "@/components/sections/home1/Cta"

export default function Gallery() {
  const [galleryData, setGalleryData] = useState([])
  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)

  const listId = "kVfvu"

  // Fetch gallery data from the API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (response.ok) {
          const data = await response.json()
          setGalleryData(data)
        } else {
          console.error("Failed to fetch gallery data")
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error)
      }
    }

    fetchGalleryData()
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
      <Layout
        headerStyle={3}
        footerStyle={1}
        breadcrumbTitle="Gallery"
        breadcrumbBg="/assets/images/services/gallery.jpg"
      >
        {/*Gallery Page Start*/}
        <section className="gallery-page">
          <div className="container">
            <div className="row masonary-layout">
              {galleryData.map((item) => (
                <div className="col-xl-3 col-lg-6 col-md-6" key={item.id}>
                  <div className="gallery-page__single">
                    <div className="gallery-page__img">
                      <div className="gallery-page__img-box">
                        <img src={item.imageUrl || "/placeholder.svg"} alt={item.title || "Gallery Image"} />
                      </div>
                      <div className="gallery-page__icon">
                        <Link className="img-popup" href={item.imageUrl}>
                          <span className="fas fa-plus"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/*Gallery Page End*/}

        <Cta />
      </Layout>
    </>
  )
}
