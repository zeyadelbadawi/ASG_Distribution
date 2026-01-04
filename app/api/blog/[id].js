'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function BlogDetails() {
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);
    const [blogData, setBlogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query; // Get the blog ID from the URL

    useEffect(() => {
        if (id) {
            // Fetch the blog details using the ID from the URL
            const fetchBlogDetails = async () => {
                try {
                    const response = await fetch(`/api/blog/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setBlogData(data);
                    } else {
                        console.error('Failed to fetch blog details');
                    }
                } catch (error) {
                    console.error('Error fetching blog details:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchBlogDetails();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                email: email,
                campaign: {
                    campaignId: 'kVfvu',
                },
            };

            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setSubmissionStatus("Form submitted successfully!");
                setEmail('');
            } else {
                const errorData = await response.json();
                setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
            }
        } catch (error) {
            setSubmissionStatus("An error occurred while submitting the form.");
        }
    };

    if (isLoading) {
        return <p>Loading blog details...</p>;
    }

    if (!blogData) {
        return <p>Blog not found</p>;
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Blog Details">
                <section className="blog-details">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-7">
                                <div className="blog-details__left">
                                    <div className="blog-details__content">
                                        <div className="blog-details__img-box">
                                            <div className="blog-details__img">
                                                <img src={blogData.imageUrl} alt={blogData.title} />
                                            </div>
                                            <div className="blog-details__meta">
                                                <Link href="#"><span className="icon-calender"></span>{blogData.date}</Link>
                                                <Link href="#"><span className="icon-tag"></span>{blogData.category}</Link>
                                                <Link href="#"><span className="icon-comment"></span>Comments ({blogData.commentsCount})</Link>
                                            </div>
                                        </div>
                                        <div className="blog-details__content-2">
                                            <h3 className="blog-details__title-1">{blogData.title}</h3>
                                            <p className="blog-details__text-1">{blogData.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Section */}
                            <div className="col-xl-4 col-lg-5">
                                <div className="sidebar">
                                    {/* Sidebar components (search, category, popular posts) can remain unchanged */}
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
                                        <h3 className="cta-one__title">Subscribe to Our Newsletter</h3>
                                        <p className="cta-one__text">Lorem Ipsum is simply is dumiomy is text Lorem Ipsum</p>
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
                                                        border: '2px solid #FFFFFF'
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
        </>
    );
}
