'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/getContent') // Fetch from your API endpoint
            .then((response) => response.json())
            .then((data) => setBlogs(data.blogs)) // Assuming the JSON contains a "blogs" array
            .catch((error) => console.error('Error fetching blog data:', error));
    }, []);

    if (!blogs.length) return <div>Loading...</div>; // Show loading while fetching data

    return (
        <>
            {/* Blog One Start */}
            <section className="blog-one">
                <div className="container">
                    <div className="section-title text-center">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Our Blogs</span>
                        </div>
                        <h2 className="section-title__title">Empowering you with<br /> cybersecurity</h2>
                    </div>
                    <div className="row">
                        {blogs.map((blog, index) => (
                            <div key={index} className={`col-xl-4 col-lg-4 wow fadeIn${index === 0 ? 'Left' : index === 1 ? 'Up' : 'Right'}`} data-wow-delay="100ms">
                                <div className="blog-one__single">
                                    <div className="blog-one__img-box">
                                        <div className="blog-one__img">
                                            <img src={blog.image} alt="" />
                                        </div>
                                    </div>
                                    <div className="blog-one__content">
                                        <ul className="blog-one__meta list-unstyled">
                                            <li>
                                                <Link href={blog.link}><span className="icon-user"></span>By {blog.author}</Link>
                                            </li>
                                            <li>
                                                <Link href={blog.link}><span className="icon-calender"></span>{blog.date}</Link>
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
    );
}
