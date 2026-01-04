"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Layout from "@/components/layout/Layout"
import partnersData from "@/data/partnersData"
import Cta from "@/components/sections/home1/Cta"

//test deploy
export default function PartnerPage() {
  const pathname = usePathname()
  const partnerId = pathname.split("/").pop()

  const [partnerData, setPartnerData] = useState(null)
  const [products, setProducts] = useState([])
  const [sortOption, setSortOption] = useState("")
  const [filterOption, setFilterOption] = useState("All")
  const [email, setEmail] = useState("")
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const data = partnersData.find((p) => p.id === partnerId)
    setPartnerData(data)
    if (data && data.products) {
      setProducts(data.products)
    }
  }, [partnerId])

  if (!partnerData) {
    return <div>Loading...</div>
  }

  // Sorting logic
  const sortProducts = (option) => {
    const sortedProducts = [...products]
    if (option === "name-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    } else if (option === "name-desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
    }
    setProducts(sortedProducts)
  }

  // Filtering logic
  const filterProducts = (category) => {
    if (category === "All" && partnerData) {
      setProducts(partnerData.products)
    } else {
      const filteredProducts = partnerData.products.filter((product) => product.category === category)
      setProducts(filteredProducts)
    }
  }

  // Extract unique categories from partnerData.products
  const categories = partnerData?.products ? [...new Set(partnerData.products.map((product) => product.category))] : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Your form submission logic here
  }

  return (
    <Layout headerStyle={3} footerStyle={1} breadcrumbTitle={partnerData.name} breadcrumbBg={partnerData.headerImage}>
      <div>
        {/* Description Section */}
        <section className="description-section" style={{ padding: "80px 0 40px" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="description-section__title">{partnerData.name}</h2>
                <p className="description-section__text">{partnerData.description}</p>
              </div>
            </div>
          </div>
        </section>

        {partnerData.products && partnerData.products.length > 0 && (
          <section className="controls-section" style={{ padding: "20px 0 40px" }}>
            <div className="container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #e5e5e0",
                }}
              >
                <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                  <div className="sort-control" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <label
                      htmlFor="sort"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Sort:
                    </label>
                    <select
                      id="sort"
                      onChange={(e) => sortProducts(e.target.value)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "0",
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        cursor: "pointer",
                        outline: "none",
                        borderBottom: "2px solid transparent",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#1a1a1a")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "transparent")}
                    >
                      <option value="">Featured</option>
                      <option value="name-asc">Alphabetical (A-Z)</option>
                      <option value="name-desc">Alphabetical (Z-A)</option>
                    </select>
                  </div>

                  <div className="filter-control" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <label
                      htmlFor="filter"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Category:
                    </label>
                    <select
                      id="filter"
                      onChange={(e) => filterProducts(e.target.value)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "0",
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        cursor: "pointer",
                        outline: "none",
                        borderBottom: "2px solid transparent",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#1a1a1a")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "transparent")}
                    >
                      <option value="All">All Collections</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ fontSize: "14px", color: "#999", fontWeight: "500" }}>
                  {products.length} Products Found
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Conditional Rendering for Products or Canva Embed */}
        {partnerData.products && partnerData.products.length > 0 ? (
          <section className="products-list-section" style={{ paddingBottom: "80px" }}>
            <div className="container">
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-xl-4 col-lg-4 col-md-6" style={{ marginBottom: "40px" }}>
                    <div
                      className="product-card"
                      style={{
                        backgroundColor: "#fff",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        border: "1px solid #f0f0ed",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)"
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.05)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      {/* Image Section */}
                      <div
                        className="product-card__img"
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          height: "250px",
                        }}
                      >
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"
                          }}
                        />
                      </div>

                      {/* Content Section */}
                      <div
                        className="product-card__content"
                        style={{
                          padding: "16px",
                          textAlign: "center",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            margin: "10px 0",
                            color: "#333",
                          }}
                        >
                          {product.name}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            marginBottom: "10px",
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
              <div dangerouslySetInnerHTML={{ __html: partnerData.embedCode }} />
            </div>
          </section>
        ) : (
          <p>No products or embedded content available for this partner.</p>
        )}

        {/* Reusable CTA component */}
        <Cta />
      </div>
    </Layout>
  )
}
