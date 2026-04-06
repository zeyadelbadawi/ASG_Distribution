"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  const [aboutData, setAboutData] = useState(null)

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => setAboutData(data.about))
      .catch((error) => console.error("Error fetching About content:", error))
  }, [])

  if (!aboutData) {
    return (
      <section className="about-one">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div
                className="about-one__img-box skeleton-image"
                style={{ height: "550px", backgroundColor: "#f5f5f5", borderRadius: "20px", overflow: "hidden" }}
              >
                <div
                  className="skeleton-pulse"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                    backgroundSize: "200% 100%",
                    animation: "pulse 1.5s infinite",
                  }}
                ></div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-one__right">
                <div
                  className="skeleton-text"
                  style={{ width: "150px", height: "20px", marginBottom: "15px", borderRadius: "4px" }}
                ></div>
                <div
                  className="skeleton-text"
                  style={{ width: "100%", height: "50px", marginBottom: "25px", borderRadius: "8px" }}
                ></div>
                <div
                  className="skeleton-text"
                  style={{ width: "90%", height: "100px", marginBottom: "30px", borderRadius: "4px" }}
                ></div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="skeleton-text" style={{ height: "20px", marginBottom: "10px" }}></div>
                    <div className="skeleton-text" style={{ height: "20px", marginBottom: "10px" }}></div>
                  </div>
                  <div className="col-md-6">
                    <div className="skeleton-text" style={{ height: "20px", marginBottom: "10px" }}></div>
                    <div className="skeleton-text" style={{ height: "20px", marginBottom: "10px" }}></div>
                  </div>
                </div>
                <div
                  className="skeleton-btn"
                  style={{ width: "200px", height: "60px", marginTop: "40px", borderRadius: "30px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
                    .skeleton-text, .skeleton-btn {
                        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                        background-size: 200% 100%;
                        animation: pulse 1.5s infinite;
                    }
                    @keyframes pulse {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
      </section>
    )
  }

  return (
    <section className="about-one">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="about-one__left">
              <div className="about-one__img-box">
                <div className="about-one__img">
                  <Image
                    src={aboutData.image || "/placeholder.svg"}
                    alt="About Us"
                    width={600}
                    height={550}
                    style={{ width: "100%", height: "auto" }}
                    priority
                  />
                </div>
                <div className="about-one__happy-client">
                  <div className="about-one__happy-client-inner">
                    <div className="about-one__happy-client-count count-box">
                      <h3>30K</h3>
                      <span className="about-one__happy-client-plus">+&nbsp;&nbsp;</span>
                    </div>

                    <p className="about-one__happy-client-text">Happy Clients</p>
                  </div>
                </div>
                <div className="about-one__experience">
                  <div className="about-one__experience-count count-box">
                    <h3>15</h3>
                    <span className="about-one__experience-plus">+</span>
                  </div>
                  <p className="about-one__experience-text">YEARS OF EXPERIENCE</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="about-one__right">
              <div className="section-title text-left">
                <span className="section-title__tagline">about us</span>
                <h2 className="section-title__title">{aboutData.title}</h2>
              </div>
              <p className="about-one__text">{aboutData.text}</p>
              <div className="about-one__points-box">
                <ul className="about-one__points-list list-unstyled">
                  {aboutData.points.slice(0, 3).map((point, index) => (
                    <li key={index}>
                      <div className="icon">
                        <span className="icon-check"></span>
                      </div>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
                <ul className="about-one__points-list about-one__points-list-2 list-unstyled">
                  {aboutData.points.slice(3).map((point, index) => (
                    <li key={index}>
                      <div className="icon">
                        <span className="icon-check"></span>
                      </div>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="about-one__text-2">{aboutData.text2}</p>
              <div className="about-one__btn-box">
                <Link href="about" className="about-one__btn thm-btn">
                  {aboutData.buttonText} <span className="icon-plus"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
