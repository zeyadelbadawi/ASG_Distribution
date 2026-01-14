"use client"

import Image from "next/image"
import Layout from "@/components/layout/Layout"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Cta from "@/components/sections/home1/Cta"

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".srn",
    prevEl: ".srp",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    575: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 2,
    },
    1199: {
      slidesPerView: 2,
    },
    1350: {
      slidesPerView: 3,
    },
  },
}

export default function About() {
  const [isOpen, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(1)
  const [aboutData, setAboutData] = useState(null)
  const [storageContent, setStorageContent] = useState({ title: "", tagline: "", items: [], bottomText: "" })
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState({
    aboutImg: false,
    img1: false,
    img2: false,
    img3: false,
    storageImages: {},
  })

  const handleOnClick = (index) => {
    setActiveIndex(index)
  }
  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)

  const handleImageLoad = (imageName) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [imageName]: true,
    }))
  }

  const handleStorageImageLoad = (index) => {
    setImagesLoaded((prev) => ({
      ...prev,
      storageImages: {
        ...prev.storageImages,
        [index]: true,
      },
    }))
  }

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        setAboutData(data.about)
        setStorageContent(data.storage)
        setImages({
          img1: data.processImages.img1,
          img2: data.processImages.img2,
          img3: data.processImages.img3,
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching About content:", error)
        setIsLoading(false)
      })
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
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="About Us" breadcrumbBg="/assets/images/about.jpg">
        {/*About One Start */}
        <section className="about-one">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <div className="about-one__left">
                  <div className="about-one__img-box">
                    <div className="about-one__img">
                      {!imagesLoaded.aboutImg && (
                        <div
                          className="skeleton-loader"
                          style={{
                            width: "100%",
                            height: "500px",
                            backgroundColor: "#e0e0e0",
                            animation: "pulse 1.5s ease-in-out infinite",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                      {aboutData && aboutData.image && (
                        <Image
                          src={aboutData.image || "/placeholder.svg"}
                          alt="About Us"
                          width={600}
                          height={700}
                          onLoad={() => handleImageLoad("aboutImg")}
                          style={{
                            width: "100%",
                            height: "auto",
                            display: imagesLoaded.aboutImg ? "block" : "none",
                            opacity: imagesLoaded.aboutImg ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                          }}
                          loading="eager"
                        />
                      )}
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
                  {isLoading ? (
                    <>
                      <div
                        className="skeleton-loader"
                        style={{
                          width: "150px",
                          height: "30px",
                          backgroundColor: "#e0e0e0",
                          animation: "pulse 1.5s ease-in-out infinite",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                      />
                      <div
                        className="skeleton-loader"
                        style={{
                          width: "80%",
                          height: "40px",
                          backgroundColor: "#e0e0e0",
                          animation: "pulse 1.5s ease-in-out infinite",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                      />
                      <div
                        className="skeleton-loader"
                        style={{
                          width: "100%",
                          height: "100px",
                          backgroundColor: "#e0e0e0",
                          animation: "pulse 1.5s ease-in-out infinite",
                          borderRadius: "4px",
                          marginBottom: "20px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="section-title text-left">
                        <span className="section-title__tagline">about us</span>
                        <h2 className="section-title__title">{aboutData?.title || "Loading..."}</h2>
                      </div>
                      <p className="about-one__text">{aboutData?.text || "Loading..."}</p>

                      <div className="about-one__points-box">
                        <ul className="about-one__points-list list-unstyled">
                          {aboutData?.points?.slice(0, 3).map((point, index) => (
                            <li key={index}>
                              <div className="icon">
                                <span className="icon-check"></span>
                              </div>
                              <p>{point}</p>
                            </li>
                          ))}
                        </ul>
                        <ul className="about-one__points-list about-one__points-list-2 list-unstyled">
                          {aboutData?.points?.slice(3).map((point, index) => (
                            <li key={index}>
                              <div className="icon">
                                <span className="icon-check"></span>
                              </div>
                              <p>{point}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="about-one__text-2">{aboutData?.text2 || "Loading..."}</p>
                      <div className="about-one__btn-box">
                        <Link href="about" className="about-one__btn thm-btn">
                          {aboutData?.buttonText || "Loading..."}
                          <span className="icon-plus"></span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*About One End */}

        {/*Feature One Start */}
        <section className="storage-one">
          <div className="container">
            {isLoading ? (
              <>
                <div
                  className="skeleton-loader"
                  style={{
                    width: "200px",
                    height: "30px",
                    backgroundColor: "#e0e0e0",
                    animation: "pulse 1.5s ease-in-out infinite",
                    borderRadius: "4px",
                    marginBottom: "20px",
                  }}
                />
                <div
                  className="skeleton-loader"
                  style={{
                    width: "60%",
                    height: "40px",
                    backgroundColor: "#e0e0e0",
                    animation: "pulse 1.5s ease-in-out infinite",
                    borderRadius: "4px",
                    marginBottom: "40px",
                  }}
                />
              </>
            ) : (
              <div className="section-title text-left">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">{storageContent.tagline}</span>
                </div>
                <h2 className="section-title__title">{storageContent.title}</h2>
              </div>
            )}
            <div className="storage-one__bottom">
              {isLoading ? (
                <div className="row">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="col-xl-4 col-lg-4">
                      <div
                        className="skeleton-loader"
                        style={{
                          width: "100%",
                          height: "400px",
                          backgroundColor: "#e0e0e0",
                          animation: "pulse 1.5s ease-in-out infinite",
                          borderRadius: "8px",
                          marginBottom: "20px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Swiper {...swiperOptions} className="storage-one__carousel owl-carousel owl-theme thm-owl__carousel">
                  {storageContent.items.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="item">
                        <div className="storage-one__single">
                          <div className="storage-one__img-box">
                            <div className="storage-one__img">
                              {!imagesLoaded.storageImages[index] && (
                                <div
                                  className="skeleton-loader"
                                  style={{
                                    width: "100%",
                                    height: "300px",
                                    backgroundColor: "#e0e0e0",
                                    animation: "pulse 1.5s ease-in-out infinite",
                                    borderRadius: "8px",
                                  }}
                                />
                              )}
                              <Image
                                src={item.imagePath || "/placeholder.svg"}
                                alt={item.title}
                                width={400}
                                height={500}
                                onLoad={() => handleStorageImageLoad(index)}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  display: imagesLoaded.storageImages[index] ? "block" : "none",
                                  opacity: imagesLoaded.storageImages[index] ? 1 : 0,
                                  transition: "opacity 0.5s ease-in-out",
                                }}
                                loading="lazy"
                              />
                            </div>
                            <div className="storage-one__content">
                              <h3 className="storage-one__title">
                                <Link href={item.link}>{item.title}</Link>
                              </h3>
                              <p className="storage-one__text">{item.description}</p>
                              <div className="storage-one__arrow">
                                <Link href={item.link} className="icon-long-arrow-right"></Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            {!isLoading && <p className="storage-one__bottom-text">{storageContent.bottomText}</p>}
          </div>
        </section>
        {/*Feature One End */}

        {/*Process One Start */}
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
                      <div className="icon">
                        <Image
                          src="/assets/images/i1.png"
                          alt="Customer Satisfaction"
                          width={60}
                          height={60}
                          style={{ width: "auto", height: "auto" }}
                          loading="lazy"
                        />
                      </div>
                      <h3>
                        <Link href="about">Customer Satisfaction</Link>
                      </h3>
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="300ms">
                      <div className="process-one__count"></div>
                      <div className="icon">
                        <Image
                          src="/assets/images/i2.png"
                          alt="Quality Products Icon"
                          width={60}
                          height={60}
                          style={{ width: "auto", height: "auto" }}
                          loading="lazy"
                        />
                      </div>
                      <h3>
                        <Link href="about">Quality Products</Link>
                      </h3>
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="600ms">
                      <div className="process-one__count"></div>
                      <div className="icon">
                        <Image
                          src="/assets/images/i3.png"
                          alt="Partnership Development"
                          width={60}
                          height={60}
                          style={{ width: "auto", height: "auto" }}
                          loading="lazy"
                        />
                      </div>
                      <h3>
                        <Link href="about">Partnership Development</Link>
                      </h3>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="process-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="process-one__img-box">
                        <div className="process-one__img">
                          {!imagesLoaded.img1 && (
                            <div
                              className="skeleton-loader"
                              style={{
                                width: "100%",
                                height: "300px",
                                backgroundColor: "#e0e0e0",
                                animation: "pulse 1.5s ease-in-out infinite",
                                borderRadius: "8px",
                              }}
                            />
                          )}
                          <Image
                            src={images.img1 || "/placeholder.svg"}
                            alt="Process Image 1"
                            width={400}
                            height={500}
                            onLoad={() => handleImageLoad("img1")}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: imagesLoaded.img1 ? "block" : "none",
                              opacity: imagesLoaded.img1 ? 1 : 0,
                              transition: "opacity 0.5s ease-in-out",
                            }}
                            loading="lazy"
                          />
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
                        <div className="process-one__img-2">
                          {!imagesLoaded.img2 && (
                            <div
                              className="skeleton-loader"
                              style={{
                                width: "100%",
                                height: "200px",
                                backgroundColor: "#e0e0e0",
                                animation: "pulse 1.5s ease-in-out infinite",
                                borderRadius: "8px",
                                marginBottom: "20px",
                              }}
                            />
                          )}
                          <Image
                            src={images.img2 || "/placeholder.svg"}
                            alt="Process Image 2"
                            width={400}
                            height={300}
                            onLoad={() => handleImageLoad("img2")}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: imagesLoaded.img2 ? "block" : "none",
                              opacity: imagesLoaded.img2 ? 1 : 0,
                              transition: "opacity 0.5s ease-in-out",
                            }}
                            loading="lazy"
                          />
                        </div>
                        <div className="process-one__img-3">
                          {!imagesLoaded.img3 && (
                            <div
                              className="skeleton-loader"
                              style={{
                                width: "100%",
                                height: "200px",
                                backgroundColor: "#e0e0e0",
                                animation: "pulse 1.5s ease-in-out infinite",
                                borderRadius: "8px",
                              }}
                            />
                          )}
                          <Image
                            src={images.img3 || "/placeholder.svg"}
                            alt="Process Image 3"
                            width={400}
                            height={300}
                            onLoad={() => handleImageLoad("img3")}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: imagesLoaded.img3 ? "block" : "none",
                              opacity: imagesLoaded.img3 ? 1 : 0,
                              transition: "opacity 0.5s ease-in-out",
                            }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Process One End */}
        <Cta />


        {/*CTA One End */}

        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </Layout>
    </>
  )
}
