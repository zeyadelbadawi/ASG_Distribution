"use client"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 5,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    575: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
}

const brands = [
  { id: 1, image: "/assets/images/brand/brand-1-1.png", alt: "Brand 1" },
  { id: 2, image: "/assets/images/brand/brand-1-2.png", alt: "Brand 2" },
  { id: 3, image: "/assets/images/brand/brand-1-3.png", alt: "Brand 3" },
  { id: 4, image: "/assets/images/brand/brand-1-4.png", alt: "Brand 4" },
  { id: 5, image: "/assets/images/brand/brand-1-5.png", alt: "Brand 5" },
  { id: 6, image: "/assets/images/brand/brand-1-3.png", alt: "Brand 3" },
  { id: 7, image: "/assets/images/brand/brand-1-4.png", alt: "Brand 4" },
  { id: 8, image: "/assets/images/brand/brand-1-5.png", alt: "Brand 5" },
]

export default function AuditSlider1() {
  return (
    <>
      <Swiper {...swiperOptions} className="brand-one__carousel thm-owl__carousel owl-theme owl-carousel">
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="brand-one__single">
              <div className="brand-one__img">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.alt}
                  width={200}
                  height={100}
                  style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                  loading="lazy"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* If we need navigation buttons */}
    </>
  )
}
