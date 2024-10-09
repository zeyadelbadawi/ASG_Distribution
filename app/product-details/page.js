'use client'

import { useState } from 'react';
import Link from "next/link"
import Layout from "@/components/layout/Layout"

export default function Home() {
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);

    const listId = 'kVfvu';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                email: email,
                campaign: {
                    campaignId: listId,
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
                setEmail(''); // Reset email field after successful submission
            } else {
                const errorData = await response.json();
                setSubmissionStatus(`Failed to submit the form: ${errorData.message}`);
            }
        } catch (error) {
            setSubmissionStatus("An error occurred while submitting the form.");
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Product Details">
            {/* Product Details Start */}
            <section className="product-details">
                <div className="container">
                    <div className="product-details__top">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="product-details__top-left">
                                    <div className="product-details__top-img">
                                        <img src="assets/images/shop/product-details-top-img-1.jpg" alt="Product" />
                                    </div>
                                    <div className="product-details__search">
                                        <Link href="assets/images/shop/product-details-top-img-1.jpg" className="img-popup">
                                            <span className="icon-search"></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="product-details__top-right">
                                    <h3 className="product-details__title">School Bag</h3>
                                    <div className="product-details__review">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <span>(25 Customer Reviews)</span>
                                    </div>
                                    <div className="product-details__price">
                                        <h3>$19.99</h3>
                                    </div>
                                    <p className="product-details__text">
                                        In today’s online world, a brand’s success lies in combining 
                                        technological planning and social strategies to draw customers in—and keep them coming back.
                                    </p>
                                    <div className="product-details__quantity">
                                        <h3 className="product-details__quantity-title">Size & Fit</h3>
                                        <p className="product-details__quantity-text">The model (height 6′) is perfect for you.</p>
                                        <div className="product-details__quantity-and-btn">
                                            <div className="quantity-box">
                                                <button type="button" className="sub"><i className="fa fa-minus"></i></button>
                                                <input type="number" id="4" defaultValue="4" />
                                                <button type="button" className="add"><i className="fa fa-plus"></i></button>
                                            </div>
                                            <div className="product-details__quantity-btn-box">
                                                <Link href="#" className="product-details__quantity-btn thm-btn">Add to Cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-details__category">
                                        <ul className="product-details__category-list list-unstyled">
                                            <li><p><span>SKU:</span> 124224</p></li>
                                            <li><p><span>Category:</span> Crux Indoor Fast and Easy</p></li>
                                            <li><p><span>Tag:</span> accessories, business</p></li>
                                        </ul>
                                    </div>
                                    <div className="product-details__social">
                                        <span>Share:</span>
                                        <Link href="#"><span className="icon-facebook-app-symbol"></span></Link>
                                        <Link href="#"><span className="icon-instagram"></span></Link>
                                        <Link href="#"><span className="icon-twitter"></span></Link>
                                        <Link href="#"><span className="icon-youtube"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-details__text-box">
                        <h3>Our Description</h3>
                        <p className="product-details__text-box-text-1">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                        </p>
                        <p>
                            Et harum quidem rerum facilis est et expedita distinctio. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                        </p>
                    </div>
                    <div className="product-details__client-review-box">
                        <h3 className="product-details__client-review-title">Client Reviews</h3>
                        <div className="product-details__client-review">
                            <div className="product-details__client-img">
                                <img src="assets/images/shop/product-details-client-img.jpg" alt="Client" />
                            </div>
                            <div className="product-details__client-content">
                                <p><span>by David Parker / </span>March 28, 2022</p>
                                <div className="product-details__client-rating">
                                    <span className="icon-star-1"></span>
                                    <span className="icon-star-1"></span>
                                    <span className="icon-star-1"></span>
                                    <span className="icon-star-1"></span>
                                    <span className="icon-star-1"></span>
                                </div>
                                <p className="product-details__client-text">
                                    Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Dictum at tempor commodo ullamcorper. Sed risus pretium quam vulputate dignissim suspendisse.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Details End */}

            {/* Start Review Form */}
            <section className="cta-one">
                <div className="container">
                    <div className="cta-one__inner">
                        <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6"></div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="cta-one__right">
                                    <h3 className="cta-one__title">Get Free Estimate</h3>
                                    <p className="cta-one__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
                                    {submissionStatus && <p>{submissionStatus}</p>} {/* Show submission status */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Review Form */}
        </Layout>
    );
}
