"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 2 },
    991: { slidesPerView: 2 },
    1199: { slidesPerView: 2 },
    1350: { slidesPerView: 3 },
  },
}

export default function Storage() {
  const [storageContent, setStorageContent] = useState({ title: "", tagline: "", items: [], bottomText: "" })

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        setStorageContent(data.storage)
      })
      .catch((error) => console.error("Error fetching storage content:", error))
  }, [])

  return (
    <>
      <section className="storage-one">
        <div className="container">
          <div className="section-title text-left">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">{storageContent.tagline}</span>
            </div>
            <h2 className="section-title__title">{storageContent.title}</h2>
          </div>
          <div className="storage-one__bottom">
            <Swiper {...swiperOptions} className="storage-one__carousel owl-carousel owl-theme thm-owl__carousel">
              {storageContent.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="item">
                    <div className="storage-one__single">
                      <div className="storage-one__img-box">
                        <div className="storage-one__img">
                          <Image
                            src={item.imagePath || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={300}
                            style={{ width: "100%", height: "auto" }}
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
          </div>
          <p className="storage-one__bottom-text">{storageContent.bottomText}</p>
        </div>
      </section>
    </>
  )
}
