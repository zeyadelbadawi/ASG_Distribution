"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Process() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
  })
  const [imageLoadStates, setImageLoadStates] = useState({
    img1: false,
    img2: false,
    img3: false,
    icon1: false,
    icon2: false,
    icon3: false,
  })

  const fixImagePath = (path) => {
    if (!path) return "/placeholder.svg"
    if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://")) {
      return path
    }
    return `/${path}`
  }

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        console.log("[v0] Process data loaded:", data.processImages)
        setImages({
          img1: fixImagePath(data.processImages?.img1),
          img2: fixImagePath(data.processImages?.img2),
          img3: fixImagePath(data.processImages?.img3),
        })
        setIsDataLoaded(true)
      })
      .catch((error) => {
        console.error("Error fetching images:", error)
        setIsDataLoaded(true) // Still mark as loaded to show fallbacks
      })
  }, [])

  const handleImageLoad = (key) => {
    console.log(`[v0] Image ${key} loaded successfully`)
    setImageLoadStates((prev) => ({ ...prev, [key]: true }))
  }

  const handleImageError = (key, src) => {
    console.error(`[v0] Failed to load ${key}:`, src)
    setImageLoadStates((prev) => ({ ...prev, [key]: true }))
  }

  return (
    <>
      <section className="process-one">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="process-one__left">
                <div className="section-title text-left">
                  <div className="section-title__tagline-box"></div>
                  <h2 className="section-title__title">Our Values</h2>
                </div>
                <p className="process-one__text-1">
                  At ASG Distribution, we uphold integrity, excellence, and customer-centricity as core values guiding
                  every aspect of our operations
                </p>
                <ul className="process-one__process-list list-unstyled">
                  <li className="wow fadeInLeft" data-wow-delay="100ms">
                    <div className="process-one__count"></div>
                    <div className="icon" style={{ position: "relative", width: "60px", height: "60px" }}>
                      {!imageLoadStates.icon1 && (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "8px",
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        ></div>
                      )}
                      <Image
                        src="/assets/images/i1.png"
                        alt="Customer Satisfaction"
                        width={60}
                        height={60}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain",
                          opacity: imageLoadStates.icon1 ? 1 : 0,
                          position: imageLoadStates.icon1 ? "static" : "absolute",
                          top: 0,
                          left: 0,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                        onLoad={() => handleImageLoad("icon1")}
                        onError={(e) => {
                          handleImageError("icon1", "/assets/images/i1.png")
                          e.target.style.display = "none"
                        }}
                        priority
                      />
                    </div>
                    <h3>
                      <Link href="about">Customer Satisfaction</Link>
                    </h3>
                  </li>
                  <li className="wow fadeInLeft" data-wow-delay="300ms">
                    <div className="process-one__count"></div>
                    <div className="icon" style={{ position: "relative", width: "60px", height: "60px" }}>
                      {!imageLoadStates.icon2 && (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "8px",
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        ></div>
                      )}
                      <Image
                        src="/assets/images/i2.png"
                        alt="Quality Products Icon"
                        width={60}
                        height={60}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain",
                          opacity: imageLoadStates.icon2 ? 1 : 0,
                          position: imageLoadStates.icon2 ? "static" : "absolute",
                          top: 0,
                          left: 0,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                        onLoad={() => handleImageLoad("icon2")}
                        onError={(e) => {
                          handleImageError("icon2", "/assets/images/i2.png")
                          e.target.style.display = "none"
                        }}
                        priority
                      />
                    </div>
                    <h3>
                      <Link href="about">Quality Products</Link>
                    </h3>
                  </li>

                  <li className="wow fadeInLeft" data-wow-delay="600ms">
                    <div className="process-one__count"></div>
                    <div className="icon" style={{ position: "relative", width: "60px", height: "60px" }}>
                      {!imageLoadStates.icon3 && (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "8px",
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        ></div>
                      )}
                      <Image
                        src="/assets/images/i3.png"
                        alt="Partnership Development"
                        width={60}
                        height={60}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain",
                          opacity: imageLoadStates.icon3 ? 1 : 0,
                          position: imageLoadStates.icon3 ? "static" : "absolute",
                          top: 0,
                          left: 0,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                        onLoad={() => handleImageLoad("icon3")}
                        onError={(e) => {
                          handleImageError("icon3", "/assets/images/i3.png")
                          e.target.style.display = "none"
                        }}
                        priority
                      />
                    </div>
                    <h3>
                      <Link href="about">Partnership Development</Link>
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 hidden md:block">
              <div className="process-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="process-one__img-box">
                      <div className="process-one__img" style={{ position: "relative" }}>
                        {(!isDataLoaded || !imageLoadStates.img1) && (
                          <div
                            className="skeleton-box"
                            style={{
                              width: "100%",
                              height: "300px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            }}
                          ></div>
                        )}
                        {isDataLoaded && (
                          <Image
                            src={images.img1 || "/placeholder.svg"}
                            alt="Process Image 1"
                            width={400}
                            height={500}
                            style={{
                              width: "100%",
                              height: "auto",
                              opacity: imageLoadStates.img1 ? 1 : 0,
                              position: imageLoadStates.img1 ? "static" : "absolute",
                              top: 0,
                              left: 0,
                              transition: "opacity 0.3s ease-in-out",
                            }}
                            onLoad={() => handleImageLoad("img1")}
                            onError={() => handleImageError("img1", images.img1)}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="process-one__count-box">
                        <p className="process-one__count-text">Trusted By</p>
                        <div className="process-one__count-2 count-box">
                          <h3>30</h3>
                          <span className="process-one__count-plus">K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="process-one__img-box-2">
                      <div className="process-one__img-2" style={{ position: "relative" }}>
                        {(!isDataLoaded || !imageLoadStates.img2) && (
                          <div
                            className="skeleton-box"
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            }}
                          ></div>
                        )}
                        {isDataLoaded && (
                          <Image
                            src={images.img2 || "/placeholder.svg"}
                            alt="Process Image 2"
                            width={400}
                            height={300}
                            style={{
                              width: "100%",
                              height: "auto",
                              opacity: imageLoadStates.img2 ? 1 : 0,
                              position: imageLoadStates.img2 ? "static" : "absolute",
                              top: 0,
                              left: 0,
                              transition: "opacity 0.3s ease-in-out",
                            }}
                            onLoad={() => handleImageLoad("img2")}
                            onError={() => handleImageError("img2", images.img2)}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="process-one__img-3" style={{ position: "relative", marginTop: "20px" }}>
                        {(!isDataLoaded || !imageLoadStates.img3) && (
                          <div
                            className="skeleton-box"
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "8px",
                              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            }}
                          ></div>
                        )}
                        {isDataLoaded && (
                          <Image
                            src={images.img3 || "/placeholder.svg"}
                            alt="Process Image 3"
                            width={400}
                            height={300}
                            style={{
                              width: "100%",
                              height: "auto",
                              opacity: imageLoadStates.img3 ? 1 : 0,
                              position: imageLoadStates.img3 ? "static" : "absolute",
                              top: 0,
                              left: 0,
                              transition: "opacity 0.3s ease-in-out",
                            }}
                            onLoad={() => handleImageLoad("img3")}
                            onError={() => handleImageError("img3", images.img3)}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
