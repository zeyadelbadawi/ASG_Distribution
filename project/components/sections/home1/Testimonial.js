"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
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
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 2 },
    991: { slidesPerView: 2 },
    1199: { slidesPerView: 2 },
    1350: { slidesPerView: 2 },
  },
}

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => setTestimonials(data.testimonials))
      .catch((error) => console.error("Error fetching testimonials:", error))
  }, [])

  return (
    <>
      <section className="testimonial-one">
        <div className="testimonial-one__shape-2 float-bob-y">
          <Image
            src="/assets/images/shapes/testimonial-one-shape-2.png"
            alt="Shape decoration"
            width={150}
            height={110}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="container">
          <div className="section-title text-left">
            <span className="section-title__tagline">CLIENTS REVIEWS</span>
            <h2 className="section-title__title">WHAT OUR CLIENTS SAY</h2>
          </div>

          <div className="testimonial-one__bottom">
            <Swiper {...swiperOptions} className="testimonial-one__carousel">
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="item"
                    style={{
                      height: "520px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "20px",
                      boxSizing: "border-box",
                      position: "relative",
                    }}
                  >
                    <div
                      className="testimonial-one__single"
                      style={{ height: "100%", display: "flex", flexDirection: "column" }}
                    >
                      <div className="testimonial-one__shape-1">
                        <Image
                          src="/assets/images/shapes/testimonial-one-shape-1.png"
                          alt="Shape decoration"
                          width={200}
                          height={200}
                          style={{ width: "auto", height: "auto" }}
                        />
                      </div>
                      <div className="testimonial-one__ratting-and-quote">
                        <div className="testimonial-one__ratting">
                          {Array(testimonial.rating)
                            .fill()
                            .map((_, i) => (
                              <i key={i} className="icon-star"></i>
                            ))}
                        </div>
                        <div className="testimonial-one__quote">
                          <span className="icon-quote"></span>
                        </div>
                      </div>
                      <p
                        className="testimonial-one__single-text"
                        style={{
                          flex: "1",
                          overflowY: "auto",
                          maxHeight: "320px",
                          marginBottom: "80px",
                          paddingRight: "10px",
                        }}
                      >
                        {testimonial.text}
                      </p>
                      <div
                        className="testimonial-one__client-box"
                        style={{
                          position: "absolute",
                          bottom: "20px",
                          left: "20px",
                          right: "20px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "inherit",
                          paddingTop: "10px",
                        }}
                      >
                        <div className="testimonial-one__client-img">
                          <Image
                            src={testimonial.imagePath || "/placeholder.svg"}
                            alt={testimonial.clientName}
                            width={50}
                            height={50}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                        </div>
                        <div className="testimonial-one__client-info">
                          <h3 style={{ margin: 0 }}>{testimonial.clientName}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}
