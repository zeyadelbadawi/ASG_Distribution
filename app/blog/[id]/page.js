'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Import useParams for dynamic routing
import Layout from "@/components/layout/Layout";

export default function BlogDetails() {
    const [blog, setBlog] = useState(null); // State to store the selected blog post
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState(''); // State for email input
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);
    const params = useParams(); // Use useParams to get dynamic route parameters
    const id = params.id; // Extract the blog ID from the dynamic route

    useEffect(() => {
        if (!id) return; // Return early if no ID is found in the URL

        // Fetch blog data from the API
        const fetchBlogData = async () => {
            try {
                const response = await fetch('/api/blog');
                if (response.ok) {
                    const data = await response.json();
                    // Find the blog post that matches the ID
                    const selectedBlog = data.find(post => post.id === id);
                    setBlog(selectedBlog);
                } else {
                    console.error('Failed to fetch blog data');
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setIsLoading(false); // End loading state
            }
        };

        fetchBlogData();
    }, [id]); // Re-run the effect whenever the ID changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                email: email,
                campaign: {
                    campaignId: 'kVfvu', // Example campaign ID
                },
            };

            const response = await fetch('http://localhost:5000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setSubmissionStatus("Form submitted successfully!");
                console.log("Form data sent to GetResponse successfully!");
                setEmail(''); // Reset email field after successful submission
            } else {
                const errorData = await response.json();
                setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
                console.error("Failed to submit form:", errorData);
            }
        } catch (error) {
            setSubmissionStatus("An error occurred while submitting the form.");
            console.error("Error:", error);
        }
    };

    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Blog Details">
            {/* Blog Details Start */}
            <section className="blog-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="blog-details__left">
                                {isLoading ? (
                                    <p>Loading blog...</p>
                                ) : blog ? (
                                    <div className="blog-details__content">
                                        <div className="blog-details__img-box">
                                            <div className="blog-details__img">
                                                <img src={blog.imageUrl} alt={blog.title} />
                                            </div>
                                            <div className="blog-details__meta">
                                                <span className="icon-calender" style={{ marginRight: '5px' }}></span> {blog.date}
                                                <span className="icon-tag" style={{ margin: '0 5px' }}></span> {blog.category}
                                                <span className="icon-comment" style={{ margin: '0 5px' }}></span> Comments ({blog.comments})
                                            </div>
                                        </div>
                                        <div className="blog-details__content-2">
                                            <h3 className="blog-details__title-1">{blog.title}</h3>
                                            <p className="blog-details__text-1">{blog.description}</p>
                                            <div className="blog-details__img-and-text-box">
                                                {blog.multiImageUrls && blog.multiImageUrls.length > 0 && (
                                                    <div className="blog-details__text-img">
                                                        {blog.multiImageUrls.map((url, index) => (
                                                            <img
                                                                key={index}
                                                                src={url}
                                                                alt={`${blog.title} image ${index + 1}`}
                                                                style={{ width: '200px', height: '150px', objectFit: 'cover', margin: '5px' }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="blog-details__text-box">
                                            <p className="blog-details__text-3">{blog.description2}</p>
                                        </div>
                                        <div className="blog-details__review">
                                            <h3 className="blog-details__review-title">Reviews:</h3>
                                            {blog.reviews ? (
                                                blog.reviews.map((review, index) => (
                                                    <div key={index} className="blog-details__review-single">
                                                        <p>{review}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No reviews available.</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Blog not found.</p>
                                )}
                            </div>
                        </div>
                        {/* Sidebar */}
                        <div className="col-xl-4 col-lg-5">
                            <div className="sidebar">
                                
                                {/* Categories */}
                               {/* Categories */}
<div className="sidebar__single sidebar__category">
    <div className="sidebar__title-box">
        <h3 className="sidebar__title">Category
            
        </h3>
    </div>
    <ul className="sidebar__category-list list-unstyled">
        {blog && blog.category ? (
            <li>
                <a href="#">{blog.category}</a>
            </li>
        ) : (
            <li>No categories available</li>
        )}
    </ul>
</div>

                                {/* Popular Posts */}
                                <div className="sidebar__single sidebar__post">
                                    <div className="sidebar__title-box">
                                        <h3 className="sidebar__title">Popular Post</h3>
                                    </div>
                                    <ul className="sidebar__post-list list-unstyled">
                                        <li>
                                            <div className="sidebar__post-image">
                                                <img src="assets/images/news/lp-1.jpg" alt="" />
                                            </div>
                                            <div className="sidebar__post-content">
                                                <p className="sidebar__post-date"><span className="icon-calender"></span> October 19, 2022</p>
                                                <h3 className="sidebar__post-title"><a href="#">Your safety is our priority</a></h3>
                                            </div>
                                        </li>
                                        {/* Add more posts as needed */}
                                    </ul>
                                </div>
                                {/* Popular Tags */}
                                <div className="sidebar__single sidebar__tag">
                                    <div className="sidebar__title-box">
                                        <h3 className="sidebar__title">Popular Tags</h3>
                                    </div>
                                    <div className="sidebar__tag-list">
                                        <a href="#">TechPros</a>
                                        <a href="#">NetWorks</a>
                                        <a href="#">CyberSafe</a>
                                        <a href="#">Web</a>
                                        <a href="#">InnovIT</a>
                                        <a href="#">TechSavvy</a>
                                        <a href="#">SoftwareMasters</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="cta-one">
                <div className="container">
                    <div className="cta-one__inner">
                        <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6"></div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="cta-one__right">
                                    <h3 className="cta-one__title">Get Free Estimate</h3>
                                    <p className="cta-one__text">Lorem Ipsum is simply dummy text</p>
                                    <form className="cta-one__form mc-form" onSubmit={handleSubmit}>
                                        <div className="cta-one__form-input-box">
                                            <input
                                                type="email"
                                                placeholder="Your email..."
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{
                                                    backgroundColor: '#FF6600',
                                                    color: '#FFFFFF',
                                                    height: '50px',
                                                    borderRadius: '5px',
                                                    padding: '0 20px',
                                                    width: '100%',
                                                    boxSizing: 'border-box',
                                                    border: '2px solid #FFFFFF',
                                                }}
                                            />
                                            <button type="submit" className="cta-one__btn thm-btn">Message</button>
                                        </div>
                                        {errors && <p style={{ color: 'red' }}>{errors}</p>}
                                    </form>
                                    {submissionStatus && <p>{submissionStatus}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
