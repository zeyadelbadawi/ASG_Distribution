'use client'
import Link from "next/link"
import { useState } from "react"
import Layout from "@/components/layout/Layout"


export default function Home() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

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
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Project Details">
                {/*Project Details Start*/}
                <section className="project-details">
                    <div className="container">
                        <div className="project-details__inner tabs-box">
                            <div className="project-details__tab-box clearfix">
                                <ul className="tab-buttons clearfix list-unstyled">
                                    <li className={activeIndex == 1 ? "tab-btn active-btn" : "tab-btn"} onClick={() => handleOnClick(1)}>
                                        <div className="project-details__tab-btn">
                                            <span>ALL</span>
                                        </div>
                                    </li>
                                    <li className={activeIndex == 2 ? "tab-btn active-btn" : "tab-btn"} onClick={() => handleOnClick(2)}>
                                        <div className="project-details__tab-btn">
                                            <span>Security Camera</span>
                                        </div>
                                    </li>
                                    <li className={activeIndex == 3 ? "tab-btn active-btn" : "tab-btn"} onClick={() => handleOnClick(3)}>
                                        <div className="project-details__tab-btn">
                                            <span>Control Camera</span>
                                        </div>
                                    </li>
                                    <li className={activeIndex == 4 ? "tab-btn active-btn" : "tab-btn"} onClick={() => handleOnClick(4)}>
                                        <div className="project-details__tab-btn">
                                            <span>Control app</span>
                                        </div>
                                    </li>
                                    <li className={activeIndex == 5 ? "tab-btn active-btn" : "tab-btn"} onClick={() => handleOnClick(5)}>
                                        <div className="project-details__tab-btn">
                                            <span>Ip Camera</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="project-details__bottom">
                                <div className="tabs-content">
                                    {/*tab*/}
                                    <div className={activeIndex == 1 ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}>
                                        <div className="project-details__img-box">
                                            <div className="project-details__img-1">
                                                <img src="assets/images/project/project-details-img-1.jpg" alt=""/>
                                            </div>
                                            <div className="project-details__list-box">
                                                <h3 className="project-details__list-title">Project Details</h3>
                                                <ul className="project-details__list list-unstyled">
                                                    <li>
                                                        <span>Name:</span>
                                                        <p>NetWorks</p>
                                                    </li>
                                                    <li>
                                                        <span>Author:</span>
                                                        <p>Rajin Saleh</p>
                                                    </li>
                                                    <li>
                                                        <span>Date:</span>
                                                        <p>23 December,2023</p>
                                                    </li>
                                                    <li>
                                                        <span>Tags:</span>
                                                        <p>DataMasters</p>
                                                    </li>
                                                    <li>
                                                        <span>Value:</span>
                                                        <p>$ 240</p>
                                                    </li>
                                                    <li>
                                                        <span>Review:</span>
                                                        <div className="ratting-list">
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="project-details__content">
                                            <h3 className="project-details__title-1">Guardians of your security</h3>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-1.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Security Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-2.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Control Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-details__pagination-box">
                                            <ul className="project-details__pagination list-unstyled clearfix">
                                                <li className="next">
                                                    <Link href="#" aria-label="Previous"><i
                                                            className="icon-arrow-right"></i>Previous</Link>
                                                </li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="previous">
                                                    <Link href="#" aria-label="Next">Next<i className="icon-arrow-right"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*tab*/}
                                    {/*tab*/}
                                    <div className={activeIndex == 2 ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}>
                                        <div className="project-details__img-box">
                                            <div className="project-details__img-1">
                                                <img src="assets/images/project/project-details-img-2.jpg" alt=""/>
                                            </div>
                                            <div className="project-details__list-box">
                                                <h3 className="project-details__list-title">Project Details</h3>
                                                <ul className="project-details__list list-unstyled">
                                                    <li>
                                                        <span>Name:</span>
                                                        <p>NetWorks</p>
                                                    </li>
                                                    <li>
                                                        <span>Author:</span>
                                                        <p>Rajin Saleh</p>
                                                    </li>
                                                    <li>
                                                        <span>Date:</span>
                                                        <p>23 December,2023</p>
                                                    </li>
                                                    <li>
                                                        <span>Tags:</span>
                                                        <p>DataMasters</p>
                                                    </li>
                                                    <li>
                                                        <span>Value:</span>
                                                        <p>$ 240</p>
                                                    </li>
                                                    <li>
                                                        <span>Review:</span>
                                                        <div className="ratting-list">
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="project-details__content">
                                            <h3 className="project-details__title-1">Guardians of your security</h3>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-1.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Security Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-2.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Control Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-details__pagination-box">
                                            <ul className="project-details__pagination list-unstyled clearfix">
                                                <li className="next">
                                                    <Link href="#" aria-label="Previous"><i
                                                            className="icon-arrow-right"></i>Previous</Link>
                                                </li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="previous">
                                                    <Link href="#" aria-label="Next">Next<i className="icon-arrow-right"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*tab*/}
                                    {/*tab*/}
                                    <div className={activeIndex == 3 ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}>
                                        <div className="project-details__img-box">
                                            <div className="project-details__img-1">
                                                <img src="assets/images/project/project-details-img-3.jpg" alt=""/>
                                            </div>
                                            <div className="project-details__list-box">
                                                <h3 className="project-details__list-title">Project Details</h3>
                                                <ul className="project-details__list list-unstyled">
                                                    <li>
                                                        <span>Name:</span>
                                                        <p>NetWorks</p>
                                                    </li>
                                                    <li>
                                                        <span>Author:</span>
                                                        <p>Rajin Saleh</p>
                                                    </li>
                                                    <li>
                                                        <span>Date:</span>
                                                        <p>23 December,2023</p>
                                                    </li>
                                                    <li>
                                                        <span>Tags:</span>
                                                        <p>DataMasters</p>
                                                    </li>
                                                    <li>
                                                        <span>Value:</span>
                                                        <p>$ 240</p>
                                                    </li>
                                                    <li>
                                                        <span>Review:</span>
                                                        <div className="ratting-list">
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="project-details__content">
                                            <h3 className="project-details__title-1">Guardians of your security</h3>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-1.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Security Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-2.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Control Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-details__pagination-box">
                                            <ul className="project-details__pagination list-unstyled clearfix">
                                                <li className="next">
                                                    <Link href="#" aria-label="Previous"><i
                                                            className="icon-arrow-right"></i>Previous</Link>
                                                </li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="previous">
                                                    <Link href="#" aria-label="Next">Next<i className="icon-arrow-right"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*tab*/}
                                    {/*tab*/}
                                    <div className={activeIndex == 4 ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}>
                                        <div className="project-details__img-box">
                                            <div className="project-details__img-1">
                                                <img src="assets/images/project/project-details-img-4.jpg" alt=""/>
                                            </div>
                                            <div className="project-details__list-box">
                                                <h3 className="project-details__list-title">Project Details</h3>
                                                <ul className="project-details__list list-unstyled">
                                                    <li>
                                                        <span>Name:</span>
                                                        <p>NetWorks</p>
                                                    </li>
                                                    <li>
                                                        <span>Author:</span>
                                                        <p>Rajin Saleh</p>
                                                    </li>
                                                    <li>
                                                        <span>Date:</span>
                                                        <p>23 December,2023</p>
                                                    </li>
                                                    <li>
                                                        <span>Tags:</span>
                                                        <p>DataMasters</p>
                                                    </li>
                                                    <li>
                                                        <span>Value:</span>
                                                        <p>$ 240</p>
                                                    </li>
                                                    <li>
                                                        <span>Review:</span>
                                                        <div className="ratting-list">
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="project-details__content">
                                            <h3 className="project-details__title-1">Guardians of your security</h3>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-1.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Security Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-2.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Control Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-details__pagination-box">
                                            <ul className="project-details__pagination list-unstyled clearfix">
                                                <li className="next">
                                                    <Link href="#" aria-label="Previous"><i
                                                            className="icon-arrow-right"></i>Previous</Link>
                                                </li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="previous">
                                                    <Link href="#" aria-label="Next">Next<i className="icon-arrow-right"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*tab*/}
                                    {/*tab*/}
                                    <div className={activeIndex == 5 ? "tab fadeInUp animated show active-tab" : "tab fadeInUp animated"}>
                                        <div className="project-details__img-box">
                                            <div className="project-details__img-1">
                                                <img src="assets/images/project/project-details-img-5.jpg" alt=""/>
                                            </div>
                                            <div className="project-details__list-box">
                                                <h3 className="project-details__list-title">Project Details</h3>
                                                <ul className="project-details__list list-unstyled">
                                                    <li>
                                                        <span>Name:</span>
                                                        <p>NetWorks</p>
                                                    </li>
                                                    <li>
                                                        <span>Author:</span>
                                                        <p>Rajin Saleh</p>
                                                    </li>
                                                    <li>
                                                        <span>Date:</span>
                                                        <p>23 December,2023</p>
                                                    </li>
                                                    <li>
                                                        <span>Tags:</span>
                                                        <p>DataMasters</p>
                                                    </li>
                                                    <li>
                                                        <span>Value:</span>
                                                        <p>$ 240</p>
                                                    </li>
                                                    <li>
                                                        <span>Review:</span>
                                                        <div className="ratting-list">
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                            <i className="icon-star"></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="project-details__content">
                                            <h3 className="project-details__title-1">Guardians of your security</h3>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-1.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Security Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <div className="project-details__single">
                                                        <p className="project-details__text-1">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                        <p className="project-details__text-2">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            print Lorem Ipsum is simply </p>
                                                        <div className="project-details__single-img">
                                                            <img src="assets/images/project/project-details-single-img-2.jpg"
                                                                alt=""/>
                                                        </div>
                                                        <p className="project-details__sub-title">Control Camera</p>
                                                        <p className="project-details__text-3">Lorem Ipsum is simply dummy text of
                                                            the printing and typesetting industry. Lorem Ipsum has been the
                                                            industry's standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galltype and scrambled it to make a type specimen
                                                            book. It has survived not only five centuries tinto electronic
                                                            typesetting remaining essentially unchanged</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-details__pagination-box">
                                            <ul className="project-details__pagination list-unstyled clearfix">
                                                <li className="next">
                                                    <Link href="#" aria-label="Previous"><i
                                                            className="icon-arrow-right"></i>Previous</Link>
                                                </li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="count"><Link href="#"></Link></li>
                                                <li className="previous">
                                                    <Link href="#" aria-label="Next">Next<i className="icon-arrow-right"></i></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*tab*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Project Details End*/}

                {/*CTA One Start */}
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
                                    {submissionStatus && <p>{submissionStatus}</p>} {/* Show submission status */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                {/*CTA One End */}

            </Layout>
        </>
    )
}