"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Service() {
  const [servicesContent, setServicesContent] = useState({ title: "", tagline: "", items: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        setServicesContent(data.services)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching services content:", error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <section className="services-one">
        <div className="container">
          <div className="section-title text-center">
            <div className="section-title__tagline-box">
              {loading ? (
                <div
                  className="skeleton-tagline"
                  style={{ width: "120px", height: "20px", margin: "0 auto", borderRadius: "4px" }}
                ></div>
              ) : (
                <span className="section-title__tagline">{servicesContent.tagline}</span>
              )}
            </div>
            {loading ? (
              <div
                className="skeleton-title"
                style={{ width: "300px", height: "40px", margin: "20px auto", borderRadius: "8px" }}
              ></div>
            ) : (
              <h2 className="section-title__title">{servicesContent.title}</h2>
            )}
          </div>
          <div className="row services-row">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="col-xl-4 col-lg-4 col-md-6">
                    <div
                      className="services-one__single"
                      style={{ height: "450px", backgroundColor: "#f9f9f9", borderRadius: "20px" }}
                    >
                      <div
                        className="skeleton-image"
                        style={{ height: "230px", background: "#eee", borderRadius: "20px 20px 0 0" }}
                      ></div>
                      <div style={{ padding: "30px" }}>
                        <div
                          className="skeleton-line"
                          style={{ height: "30px", width: "70%", marginBottom: "15px" }}
                        ></div>
                        <div
                          className="skeleton-line"
                          style={{ height: "20px", width: "90%", marginBottom: "10px" }}
                        ></div>
                        <div className="skeleton-line" style={{ height: "20px", width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                ))
              : servicesContent.items.map((service, index) => (
                  <div
                    key={index}
                    className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${
                      index % 3 === 0 ? "Left" : index % 3 === 1 ? "Up" : "Right"
                    }`}
                    data-wow-delay={`${100 * ((index % 3) + 1)}ms`}
                  >
                    <div className="services-one__single">
                      <div className="services-one__img-box">
                        <div className="services-one__img">
                          <img src={service.imagePath || "/placeholder.svg"} alt={service.title} />
                        </div>
                        <div className="services-one__icon">
                          <img
                            src={service.iconPath || "/placeholder.svg"}
                            style={{ width: "50px", height: "50px" }}
                            alt="icon"
                          />
                        </div>
                      </div>
                      <div className="services-one__content">
                        <h3 className="services-one__title">
                          <Link href={service.link}>{service.title}</Link>
                        </h3>
                        <p className="services-one__text">{service.description}</p>
                        <div className="services-one__btn-box">
                          <Link href={service.link} className="services-one__btn thm-btn">
                            Discover More<span className="icon-plus"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <style jsx>{`
                    .skeleton-tagline, .skeleton-title, .skeleton-line, .skeleton-image {
                        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                        background-size: 200% 100%;
                        animation: loading-pulse 1.5s infinite;
                    }
                    @keyframes loading-pulse {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
      </section>
    </>
  )
}
