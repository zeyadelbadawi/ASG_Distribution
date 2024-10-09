'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import partnersData from '@/data/partnersData';

export default function PartnerPage() {
    const pathname = usePathname();

    // Extract the partner ID from the URL
    const partner = pathname.split('/').pop();

    const [partnerData, setPartnerData] = useState(null);
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('All');
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (partner) {
            const data = partnersData.find(p => p.id === partner);
            setPartnerData(data);
            if (data && data.products) {
                setProducts(data.products);
            }
        }
    }, [partner]);

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

    if (!partnerData) {
        return <div>Loading...</div>;
    }

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

                {/* Sorting and Filtering Controls */}
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

                {/* Products List Section */}
                <section className="products-list-section">
                    <div className="container">
                        <div className="row">
                            {/* Ensure products is not undefined or null */}
                            {products && products.length > 0 ? (
                                products.map(product => (
                                    <div className="col-xl-4 col-lg-4 col-md-6" key={product.id}>
                                        <div className="product-item">
                                            <div className="product-item__img">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/placeholder.png" // Fallback image if none is provided
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="product-item__content">
                                                <h3 className="product-item__title">{product.name}</h3>
                                                <p className="product-item__text">{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products available</p>
                            )}
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
