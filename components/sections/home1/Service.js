"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"

export default function Service() {
  const [servicesContent, setServicesContent] = useState({ title: "", tagline: "", items: [] })
  const [loading, setLoading] = useState(true)
  const [visibleItems, setVisibleItems] = useState(6)
  const [animatingItems, setAnimatingItems] = useState([])
  const [loadingImages, setLoadingImages] = useState(new Set())
  const newCardsRef = useRef(null)

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        setServicesContent(data.services)
        setLoading(false)
        preloadImages(data.services.items.slice(0, 6))
      })
      .catch((error) => {
        console.error("Error fetching services content:", error)
        setLoading(false)
      })
  }, [])

  const preloadImages = (items) => {
    items.forEach((service) => {
      if (service.imagePath) {
        const img = new Image()
        img.src = service.imagePath
      }
      if (service.iconPath) {
        const icon = new Image()
        icon.src = service.iconPath
      }
    })
  }

  const handleShowMore = () => {
    const currentVisible = visibleItems
    const newVisible = currentVisible + 6
    const newItems = []

    for (let i = currentVisible; i < Math.min(newVisible, servicesContent.items.length); i++) {
      newItems.push(i)
      setLoadingImages((prev) => new Set(prev).add(i))
    }

    const nextBatch = servicesContent.items.slice(currentVisible, newVisible)
    preloadImages(nextBatch)

    setAnimatingItems(newItems)
    setVisibleItems(newVisible)

    setTimeout(() => {
      if (newCardsRef.current) {
        newCardsRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    }, 100)

    setTimeout(() => {
      setAnimatingItems([])
    }, 600)
  }

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const next = new Set(prev)
      next.delete(index)
      return next
    })
  }

  const handleShowLess = () => {
    setVisibleItems(6)
    const servicesSection = document.querySelector(".services-one")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const displayedItems = servicesContent.items.slice(0, visibleItems)
  const hasMoreItems = servicesContent.items.length > visibleItems
  const canShowLess = visibleItems > 6

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
              : displayedItems.map((service, index) => (
                  <div
                    key={index}
                    ref={index === visibleItems - 6 && index > 0 ? newCardsRef : null}
                    className={`col-xl-4 col-lg-4 col-md-6 service-item ${
                      animatingItems.includes(index) ? "service-item-animate" : ""
                    } wow fadeIn${index % 3 === 0 ? "Left" : index % 3 === 1 ? "Up" : "Right"}`}
                    data-wow-delay={`${100 * ((index % 3) + 1)}ms`}
                  >
                    <div className="services-one__single">
                      <div className="services-one__img-box">
                        <div className="services-one__img" style={{ position: "relative" }}>
                          {loadingImages.has(index) && (
                            <div
                              className="skeleton-image"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px 20px 0 0",
                                zIndex: 1,
                              }}
                            ></div>
                          )}
                          <img
                            src={service.imagePath || "/placeholder.svg"}
                            alt={service.title}
                            loading="lazy"
                            onLoad={() => handleImageLoad(index)}
                            onError={() => handleImageLoad(index)}
                            style={{
                              display: loadingImages.has(index) ? "none" : "block",
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        </div>
                        <div className="services-one__icon">
                          {loadingImages.has(index) ? (
                            <div
                              className="skeleton-icon"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            ></div>
                          ) : (
                            <img
                              src={service.iconPath || "/placeholder.svg"}
                              style={{ width: "50px", height: "50px" }}
                              alt="icon"
                              loading="lazy"
                            />
                          )}
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
          {!loading && hasMoreItems && (
            <div className="text-center button-container" style={{ marginTop: "40px" }}>
              <button onClick={handleShowMore} className="thm-btn show-more-btn" style={{ cursor: "pointer" }}>
                Show More<span className="icon-plus"></span>
              </button>
            </div>
          )}
          {!loading && canShowLess && (
            <div className="text-center button-container" style={{ marginTop: hasMoreItems ? "20px" : "40px" }}>
              <button onClick={handleShowLess} className="thm-btn show-less-btn" style={{ cursor: "pointer" }}>
                Show Less<span className="icon-minus"></span>
              </button>
            </div>
          )}
        </div>
        <style jsx>{`
          .skeleton-tagline, .skeleton-title, .skeleton-line, .skeleton-image, .skeleton-icon {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading-pulse 1.5s infinite;
          }
          @keyframes loading-pulse {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          .service-item {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .service-item-animate {
            animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .button-container {
            transition: all 0.3s ease;
          }

          .show-more-btn, .show-less-btn {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .show-more-btn:hover, .show-less-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .show-more-btn:active, .show-less-btn:active {
            transform: translateY(0);
          }

          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </section>
    </>
  )
}
