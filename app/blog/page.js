'use client'
import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);
    const [blogData, setBlogData] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [suggestions, setSuggestions] = useState([]); // State for suggestions

    const listId = 'kVfvu';

    useEffect(() => {
        // Fetch blog data from the API
        const fetchBlogData = async () => {
            try {
                const response = await fetch('/api/blog');
                if (response.ok) {
                    const data = await response.json();
                    setBlogData(data);
                    setFilteredBlogs(data); // Set initial blogs to be the full list

                    // Extract unique categories
                    const uniqueCategories = [...new Set(data.map(post => post.category))];
                    setCategories(uniqueCategories);
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
    }, []);

    // Use useEffect to update filteredBlogs whenever blogData, selectedCategory, or searchTerm changes
    useEffect(() => {
        let filteredData = blogData;

        if (selectedCategory) {
            filteredData = filteredData.filter(post => post.category === selectedCategory);
        }

        if (searchTerm) {
            filteredData = filteredData.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredBlogs(filteredData);
    }, [selectedCategory, blogData, searchTerm]);

    // Handle category selection
    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            resetFilter();
        } else {
            setSelectedCategory(category);
        }
    };

    // Reset filter
    const resetFilter = () => {
        setSelectedCategory(null); // Clear selected category
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter blogData based on the search term for suggestions
        if (value) {
            const filteredSuggestions = blogData.filter(post => 
                post.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    // Handle click on a suggestion
    const handleSuggestionClick = (postId) => {
        setSearchTerm(''); // Clear the search term
        setSuggestions([]); // Clear suggestions
        // Navigate to the blog post page
        window.location.href = `/blog/${postId}`;
    };

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
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Blog">
                <section className="blog-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-7">
                                <div className="blog-page__left">
                                    <div className="blog-page__left-content">
                                        {isLoading ? (
                                            <p>Loading blogs...</p>
                                        ) : filteredBlogs.length > 0 ? (
                                            filteredBlogs.map((post) => (
                                                <div className="blog-page__single" key={post.id}>
                                                    <div className="blog-page__img-box">
                                                        <div className="blog-page__img">
                                                            <img src={post.imageUrl} alt={post.title} />
                                                        </div>
                                                        <ul className="blog-page__meta list-unstyled">
                                                            <li>
                                                                <Link href={`/blog/${post.id}`}>
                                                                    <span className="icon-calender"></span>
                                                                    {post.date}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href={`/blog/${post.id}`}>
                                                                    <span className="icon-tag"></span>
                                                                    {post.category}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href={`/blog/${post.id}`}>
                                                                    <span className="icon-comment"></span>
                                                                    Comments ({post.comments})
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="blog-page__content">
                                                        <h3 className="blog-page__title">
                                                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                                        </h3>
                                                        <p className="blog-page__text">{post.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No blogs available for this category.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Section */}
                            <div className="col-xl-4 col-lg-5">
                                <div className="sidebar">
                                    {/* Search */}
                                    <div className="sidebar__single sidebar__search">
                                        <div className="sidebar__title-box">
                                            <h3 className="sidebar__title">Search Here</h3>
                                        </div>
                                        <form className="sidebar__search-form" onSubmit={(e) => e.preventDefault()}>
                                            <input
                                                type="search"
                                                placeholder="Search.."
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <button type="submit"><i className="icon-search"></i></button>
                                        </form>
                                        {/* Suggestions Dropdown */}
                                        {suggestions.length > 0 && (
                                            <ul className="suggestions-list">
                                                {suggestions.map((post) => (
                                                    <li 
                                                        key={post.id} 
                                                        onClick={() => handleSuggestionClick(post.id)}
                                                        style={{ cursor: 'pointer', padding: '5px 0' }}>
                                                        {post.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {/* Categories */}
                                    <div className="sidebar__single sidebar__category">
                                        <div className="sidebar__title-box">
                                            <h3 className="sidebar__title">Category</h3>
                                        </div>
                                        <ul className="sidebar__category-list list-unstyled">
                                            {categories.length > 0 ? (
                                                categories.map((category, index) => (
                                                    <li key={index}>
                                                        <button
                                                            onClick={() => handleCategoryClick(category)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                color: selectedCategory === category ? 'blue' : 'inherit',
                                                                cursor: 'pointer',
                                                                fontWeight: selectedCategory === category ? 'bold' : 'normal'
                                                            }}>
                                                            {category}
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No categories available</li>
                                            )}
                                        </ul>
                                        <button
                                            onClick={resetFilter}
                                            style={{
                                                marginTop: '10px',
                                                padding: '5px 10px',
                                                backgroundColor: '#FF6600',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}>
                                            Reset Filter
                                        </button>
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
                                                    <p className="sidebar__post-date"><span className="icon-calender"></span>October 19, 2022</p>
                                                    <h3 className="sidebar__post-title"><Link href="blog-details">Your safety is our priority</Link></h3>
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
                                            <Link href="">TechPros</Link>
                                            <Link href="">NetWorks</Link>
                                            <Link href="">CyberSafe</Link>
                                            <Link href="">Web</Link>
                                            <Link href="">InnovIT</Link>
                                            <Link href="">TechSavvy</Link>
                                            <Link href="">SoftwareMasters</Link>
                                        </div>
                                    </div>
                                    {/* Newsletter */}
                                    
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
