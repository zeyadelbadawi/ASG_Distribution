"use client"

import Image from "next/image"
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { useState } from "react"

export default function Home() {
  const [imageLoadStates, setImageLoadStates] = useState({})

  const handleImageLoad = (index) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: true }))
  }

  // Product data array for easier mapping
  const products = [
    { id: 1, name: "Lather Bag", price: "$325.00", image: "/assets/images/shop/shop-product-1-1.jpg" },
    { id: 2, name: "Eye Castal", price: "$25.00", image: "/assets/images/shop/shop-product-1-2.jpg" },
    { id: 3, name: "High Heel Baby", price: "$75.00", image: "/assets/images/shop/shop-product-1-3.jpg" },
    { id: 4, name: "White Shoes", price: "$325.00", image: "/assets/images/shop/shop-product-1-4.jpg" },
    { id: 5, name: "Black Jacket", price: "$99.00", image: "/assets/images/shop/shop-product-1-5.jpg" },
    { id: 6, name: "Diamond Ring", price: "$3325.00", image: "/assets/images/shop/shop-product-1-6.jpg" },
    { id: 7, name: "Makeup Box", price: "$85.00", image: "/assets/images/shop/shop-product-1-7.jpg" },
    { id: 8, name: "Sofa With Balish", price: "$89.00", image: "/assets/images/shop/shop-product-1-8.jpg" },
    { id: 9, name: "Baby Sunglass", price: "$35.00", image: "/assets/images/shop/shop-product-1-9.jpg" },
  ]

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
                  {products.map((product, index) => (
                    <div key={product.id} className="col-xl-4 col-lg-4 col-md-6">
                      <div className="product__all-single">
                        <div className="product__all-img-box">
                          <div className="product__all-img">
                            {!imageLoadStates[index] && (
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "100%",
                                  height: "300px",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "8px",
                                  animation: "pulse 1.5s ease-in-out infinite",
                                }}
                              ></div>
                            )}
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={400}
                              height={400}
                              style={{
                                width: "100%",
                                height: "auto",
                                display: imageLoadStates[index] ? "block" : "none",
                              }}
                              onLoad={() => handleImageLoad(index)}
                              loading="lazy"
                            />
                          </div>
                          <div className="product__cart">
                            <Link href="product-details">ADD TO CART</Link>
                          </div>
                        </div>
                        <div className="product__all-content">
                          <div className="product__all-title-box">
                            <h4 className="product__all-title">
                              <Link href="product-details">{product.name}</Link>
                            </h4>
                            <p className="product__all-price">{product.price}</p>
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
                  ))}
                </div>
              </div>
              <div className="product__pagination">
                <ul className="pg-pagination list-unstyled">
                  <li className="count">
                    <Link href="#">1</Link>
                  </li>
                  <li className="count">
                    <Link href="#">2</Link>
                  </li>
                  <li className="count">
                    <Link href="#">3</Link>
                  </li>
                  <li className="next">
                    <Link href="#" aria-label="Next">
                      <i className="icon-angle-left"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Product End */}
        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </Layout>
    </>
  )
}
