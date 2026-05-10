"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  loopAdditionalSlides: 20,
  speed: 5000,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    reverseDirection: false,
  },

  allowTouchMove: true,
  grabCursor: true,

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
    1350: { slidesPerView: 3 },
  },
}

export default function Storage() {
  const [storageContent, setStorageContent] = useState({
    title: "",
    tagline: "",
    items: [],
    bottomText: "",
  })
  const swiperRef = useRef(null)

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        setStorageContent(data.storage)
      })
      .catch((error) => console.error("Error fetching storage content:", error))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.autoplay.start()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.pause()
    }
  }

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.resume()
    }
  }

  const handleSwiperInit = (swiper) => {
    swiper.autoplay.start()
  }

  return (
    <>
      <section className="storage-one">
        <div className="container">
          <div className="section-title text-left">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">
                {storageContent.tagline}
              </span>
            </div>

            <h2 className="section-title__title">{storageContent.title}</h2>
          </div>

          <div
            className="storage-one__bottom"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Swiper
              ref={swiperRef}
              onInit={handleSwiperInit}
              {...swiperOptions}
              className="storage-one__carousel owl-carousel owl-theme thm-owl__carousel"
            >
              {storageContent.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="item">
                    <div className="storage-one__single">
                      <div className="storage-one__img-box">
                      <div
  className="storage-one__img"
  style={{
    width: "250px !important",
    height: "250px !important",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "10px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    padding: "20px",
  }}
>
  <Image
    src={item.imagePath || "/placeholder.svg"}
    alt={item.title}
    width={250}
    height={250}
    style={{
      width: "100% !important",
      height: "100% !important",
      objectFit: "contain",
      display: "block",
    }}
  />
</div>

                        <div className="storage-one__content">
                          <h3 className="storage-one__title">
                            <Link href={item.link}>{item.title}</Link>
                          </h3>

                          <p className="storage-one__text">
                            {item.description}
                          </p>

                          <div className="storage-one__arrow">
                            <Link
                              href={item.link}
                              className="icon-long-arrow-right"
                            ></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <p className="storage-one__bottom-text">
            {storageContent.bottomText}
          </p>
        </div>
      </section>

      <style jsx global>{`
        .storage-one__carousel .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .storage-one__bottom {
          position: relative;
          cursor: grab;
        }

        .storage-one__bottom.swiper-container-active {
          cursor: grabbing;
        }

        .storage-one__carousel {
          cursor: grab;
        }

        .storage-one__carousel.swiper-grabbing {
          cursor: grabbing;
        }

        .custom-storage-img {
          width: 250px !important;
          height: 250px !important;
          margin: 0 auto !important;
          overflow: hidden !important;
          border-radius: 10px !important;
          position: relative !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          background: #ffffff !important;
          padding: 20px !important;
        }

        .custom-storage-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          display: block !important;
        }
      `}</style>
    </>
  )
}
