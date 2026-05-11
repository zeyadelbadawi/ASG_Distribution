"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"

export default function Storage() {
  const [storageContent, setStorageContent] = useState({
    title: "",
    tagline: "",
    items: [],
    bottomText: "",
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const controller = new AbortController()
    fetch("/api/getContent", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        setStorageContent(data.storage)
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching storage content:", error)
        }
      })

    return () => {
      controller.abort()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const swiperConfig = {
    spaceBetween: isMobile ? 10 : 20,
    speed: isMobile ? 1000 : 800,
    autoplay: {
      delay: isMobile ? 4000 : 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: !isMobile,
    },
    loop: true,
    modules: [Autoplay],
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2 },
      1350: { slidesPerView: 3 },
    },
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

          <div className="storage-one__bottom">
            <Swiper {...swiperConfig}>
              {storageContent.items &&
                storageContent.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="storage-one__single">
                      <div className="storage-one__img-box">
                        <div className="storage-one__img">
                          <Image
                            src={item.imagePath || "/placeholder.svg"}
                            alt={item.title}
                            width={250}
                            height={250}
                            style={{
                              width: "100%",
                              maxWidth: "250px",
                              height: "auto",
                              maxHeight: "250px",
                              objectFit: "contain",
                            }}
                            loading="lazy"
                          />
                        </div>

                        <div className="storage-one__content">
                          <h3 className="storage-one__title">
                            <Link href={item.link || "#"}>{item.title}</Link>
                          </h3>

                          <p className="storage-one__text">
                            {item.description}
                          </p>

                          <div className="storage-one__arrow">
                            <Link
                              href={item.link || "#"}
                              className="icon-long-arrow-right"
                            ></Link>
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

      <style jsx>{`
        .storage-one__img {
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
      `}</style>
    </>
  )
}
