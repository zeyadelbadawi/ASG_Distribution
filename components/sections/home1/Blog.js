"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [imageLoadStates, setImageLoadStates] = useState({})

  useEffect(() => {
    fetch("/api/getContent")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.blogs)
        const initialLoadStates = {}
        data.blogs.forEach((_, index) => {
          initialLoadStates[index] = false
        })
        setImageLoadStates(initialLoadStates)
      })
      .catch((error) => console.error("Error fetching blog data:", error))
  }, [])

  if (!blogs.length) return <div>Loading...</div>

  return (
    <>
      {/* Blog One Start */}
      <section className="blog-one">
        <div className="container">
          <div className="section-title text-center">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">Our Blogs</span>
            </div>
            <h2 className="section-title__title">
              Empowering you with
              <br /> cybersecurity
            </h2>
          </div>
          <div className="row">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className={`col-xl-4 col-lg-4 wow fadeIn${index === 0 ? "Left" : index === 1 ? "Up" : "Right"}`}
                data-wow-delay="100ms"
              >
                <div className="blog-one__single">
                  <div className="blog-one__img-box">
                    <div className="blog-one__img">
                      {!imageLoadStates[index] && (
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100%",
                            height: "300px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "8px",
                          }}
                        ></div>
                      )}
                      <Image
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        width={400}
                        height={300}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: imageLoadStates[index] ? "block" : "none",
                        }}
                        onLoad={() => setImageLoadStates((prev) => ({ ...prev, [index]: true }))}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="blog-one__content">
                    <ul className="blog-one__meta list-unstyled">
                      <li>
                        <Link href={blog.link}>
                          <span className="icon-user"></span>By {blog.author}
                        </Link>
                      </li>
                      <li>
                        <Link href={blog.link}>
                          <span className="icon-calender"></span>
                          {blog.date}
                        </Link>
                      </li>
                    </ul>
                    <h3 className="blog-one__title">
                      <Link href={blog.link}>{blog.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog One End */}
    </>
  )
}
