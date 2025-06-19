
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import partnersData from '@/data/partnersData';

export default function PartnerPage() {
    const pathname = usePathname();
    const partnerId = pathname.split('/').pop();

    const [partnerData, setPartnerData] = useState(null);
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('All');
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);
    
    useEffect(() => {
        const data = partnersData.find(p => p.id === partnerId);
        setPartnerData(data);
    }, [partnerId]);

    if (!partnerData) {
        return <div>Loading...</div>;
    }







    // Sorting logic
    const sortProducts = (option) => {
        let sortedProducts = [...products];
        if (option === 'name-asc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (option === 'name-desc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        setProducts(sortedProducts);
    };

    // Filtering logic
    const filterProducts = (category) => {
        if (category === 'All' && partnerData) {
            setProducts(partnerData.products);
        } else {
            const filteredProducts = partnerData.products.filter(product => product.category === category);
            setProducts(filteredProducts);
        }
    };

    // Extract unique categories from partnerData.products
    const categories = partnerData?.products
        ? [...new Set(partnerData.products.map(product => product.category))]
        : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Your form submission logic here
    };





    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle={partnerData.name}>
            <div>
                {/* Description Section */}
                <section className="description-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="description-section__title">{partnerData.name}</h2>
                                <p className="description-section__text">{partnerData.description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="controls-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="sort-control">
                                <label htmlFor="sort">Sort By:</label>
                                <select id="sort" onChange={(e) => sortProducts(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="name-asc">Name: A-Z</option>
                                    <option value="name-desc">Name: Z-A</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="filter-control">
                                <label htmlFor="filter">Filter By:</label>
                                <select id="filter" onChange={(e) => filterProducts(e.target.value)}>
                                    <option value="All">All</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


                {/* Conditional Rendering for Products or Canva Embed */}
                {partnerData.products && partnerData.products.length > 0 ? (
                    <section className="products-list-section">
                        <div className="container">
                            <div className="row">
                                {partnerData.products.map(product => (
                                    <div
                                        key={product.id}
                                        className="col-xl-4 col-lg-4 col-md-6"
                                        style={{ marginBottom: '30px' }}
                                    >
                                        <div
                                            className="product-card"
                                            style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '100%',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-10px)';
                                                e.currentTarget.style.boxShadow =
                                                    '0 15px 30px rgba(0, 0, 0, 0.2)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow =
                                                    '0 8px 20px rgba(0, 0, 0, 0.1)';
                                            }}
                                        >
                                            {/* Image Section */}
                                            <div
                                                className="product-card__img"
                                                style={{
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    height: '250px',
                                                }}
                                            >
                                                <img
                                                    src={product.image || '/placeholder.png'}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.3s ease-in-out',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }}
                                                />
                                            </div>

                                            {/* Content Section */}
                                            <div
                                                className="product-card__content"
                                                style={{
                                                    padding: '16px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        fontSize: '18px',
                                                        fontWeight: 'bold',
                                                        margin: '10px 0',
                                                        color: '#333',
                                                    }}
                                                >
                                                    {product.name}
                                                </h3>
                                                <p
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#666',
                                                        marginBottom: '10px',
                                                    }}
                                                >
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ) : partnerData.embedCode ? (
                    <section className="embed-section">
                        <div className="container">
                            <div
                                dangerouslySetInnerHTML={{ __html: partnerData.embedCode }}
                            />
                        </div>
                    </section>
                ) : (
                    <p>No products or embedded content available for this partner.</p>
                )}

<section className="cta-one">
                    <div className="container">
                        <div className="cta-one__inner">
                            <div className="cta-one__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }}></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6"></div>
                                <div className="col-xl-6 col-lg-6">
                                    <div className="cta-one__right">
                                        <h3 className="cta-one__title">Get Free Estimate</h3>
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
            </div>
        </Layout>
    );
}
