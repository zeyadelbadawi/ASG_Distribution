import Link from "next/link"
import Layout from "@/components/layout/Layout"
export default function Home() {

    return (
        <>
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Checkout">
        {/* Product Start */}
        <section className="product">
            <div className="container">
                <div className="product__inner">
                    <div className="product__showing-result">
                        <div className="product__showing-text-box">
                            <p className="product__showing-text">Showing 1-8 of 16 results</p>
                        </div>
                        <div className="product__showing-sort-box">
                            <div className="product__showing-sort">
                                <div className="select-box">
                                    <select className="wide">
                                        <option data-display="Default shorting">Default shorting</option>
                                        <option value="1">Sort by popular</option>
                                        <option value="2">Sort by Price</option>
                                        <option value="3">Sort by Ratings</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product__showing-sort">
                                <div className="select-box">
                                    <select className="wide">
                                        <option data-display="12 Product of Per Page">12 Product of Per Page</option>
                                        <option value="1">Sort by popular</option>
                                        <option value="2">Sort by Price</option>
                                        <option value="3">Sort by Ratings</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product__all">
                        <div className="row">
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-1.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Lather Bag</Link>
                                            </h4>
                                            <p className="product__all-price">$325.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-2.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Eye Castal</Link>
                                            </h4>
                                            <p className="product__all-price">$25.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-3.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">High Heel
                                                    Baby</Link>
                                            </h4>
                                            <p className="product__all-price">$75.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-4.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">White
                                                    Shoes</Link>
                                            </h4>
                                            <p className="product__all-price">$325.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-5.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Black
                                                    Jacket</Link>
                                            </h4>
                                            <p className="product__all-price">$99.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-6.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Diamond
                                                    Ring</Link>
                                            </h4>
                                            <p className="product__all-price">$3325.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-7.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Makeup Box</Link>
                                            </h4>
                                            <p className="product__all-price">$85.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-8.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Sofa With
                                                    Balish</Link>
                                            </h4>
                                            <p className="product__all-price">$89.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                            {/* Product All Single Start */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="product__all-single">
                                    <div className="product__all-img-box">
                                        <div className="product__all-img">
                                            <img src="assets/images/shop/shop-product-1-9.jpg" alt=""/>
                                        </div>
                                        <div className="product__cart">
                                            <Link href="product-details">ADD TO CART</Link>
                                        </div>
                                    </div>
                                    <div className="product__all-content">
                                        <div className="product__all-title-box">
                                            <h4 className="product__all-title"><Link href="product-details">Baby
                                                    Sunglass</Link>
                                            </h4>
                                            <p className="product__all-price">$35.00</p>
                                        </div>
                                        <div className="product__all-review">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product All Single End */}
                        </div>
                    </div>
                    <div className="product__pagination">
                        <ul className="pg-pagination list-unstyled">
                            <li className="count"><Link href="#">1</Link></li>
                            <li className="count"><Link href="#">2</Link></li>
                            <li className="count"><Link href="#">3</Link></li>
                            <li className="next">
                                <Link href="#" aria-label="Next"><i className="icon-next"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        {/* Product End */}

            </Layout>
        </>
    )
}