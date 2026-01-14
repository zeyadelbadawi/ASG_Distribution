"use client"
import { useState, useEffect } from "react"

export default function PartnerForm({ partner, onSave, existingPartners }) {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null) // Partner image file
  const [imageUrl, setImageUrl] = useState("") // Partner image URL
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productImage, setProductImage] = useState(null) // Product image file
  const [productImageUrl, setProductImageUrl] = useState("") // Product image URL
  const [idError, setIdError] = useState("") // Validation error for ID

  useEffect(() => {
    if (partner) {
      setId(partner.id)
      setName(partner.name)
      setDescription(partner.description)
      setImageUrl(partner.image) // Set the existing partner image URL if editing
      setProducts(partner.products || []) // Set the existing products if editing
    } else {
      setId("")
      setName("")
      setDescription("")
      setImage(null)
      setImageUrl("")
      setProducts([])
    }
  }, [partner])

  // Validate Partner ID (ensure uniqueness)
  const handleIdChange = (e) => {
    const newId = e.target.value
    setId(newId)
    const idExists = existingPartners.some((p) => p.id === newId)
    if (idExists && (!partner || partner.id !== newId)) {
      setIdError("Partner ID already exists.")
    } else {
      setIdError("")
    }
  }

  // Function to handle partner image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        return data.filePath // Return the partner image file path
      } else {
        console.error("Partner image upload failed")
        return null
      }
    } catch (error) {
      console.error("Error during image upload:", error)
      return null
    }
  }

  // Function to handle product image upload
  const handleProductImageUpload = async (imageFile) => {
    const formData = new FormData()
    formData.append("file", imageFile)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        return data.filePath // This is the relative path of the image
      } else {
        throw new Error("Product image upload failed")
      }
    } catch (error) {
      console.error("Product image upload failed", error)
      throw error
    }
  }

  // Add new product to the product list
  const handleAddProduct = async () => {
    let uploadedProductImageUrl = productImageUrl // Use existing image if not changed

    if (productImage) {
      uploadedProductImageUrl = await handleProductImageUpload(productImage) // Upload the new product image
    }

    const newProduct = {
      id: Date.now().toString(), // Generate a new ID for the product
      name: productName,
      description: productDescription,
      category: productCategory,
      image: uploadedProductImageUrl,
    }

    // Check if productName is not empty to avoid adding empty products
    if (!productName) {
      alert("Please enter product name!")
      return
    }

    // Add the new product to the list of products
    setProducts([...products, newProduct])

    // Clear product fields
    setProductName("")
    setProductDescription("")
    setProductCategory("")
    setProductImage(null)
    setProductImageUrl("")
  }

  // Delete product from the product list
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId)
    setProducts(updatedProducts) // Update the products list after deletion
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let uploadedImageUrl = imageUrl // Use existing image if not changed

    // If a new image is selected, upload it
    if (image) {
      uploadedImageUrl = await handleImageUpload(image)
    }

    // Prepare the partner object with the uploaded image URL
    const newPartner = {
      id: id || Date.now().toString(), // Allow admin to set custom ID or generate a new one
      name,
      description,
      image: uploadedImageUrl, // Save the partner image URL
      products, // Ensure products list is added directly
    }

    onSave(newPartner) // Save the partner data
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Partner ID */}
      <div className="mb-3">
        <label className="form-label">Partner ID</label>
        <input type="text" className="form-control" value={id} onChange={handleIdChange} required />
        {idError && <p style={{ color: "red" }}>{idError}</p>}
      </div>

      {/* Partner Name */}
      <div className="mb-3">
        <label className="form-label">Partner Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      {/* Partner Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Partner Image */}
      <div className="mb-3">
        <label className="form-label">Upload Partner Image</label>
        <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      {/* Display the existing partner image */}
      {imageUrl && (
        <div>
          <img src={imageUrl || "/placeholder.svg"} alt="Partner" width="200px" />
          <p>Current Image</p>
        </div>
      )}

      <hr />

      {/* Products Section */}
      <h4>Products</h4>
      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}
            >
              <span>
                {product.name} - {product.description} (Category: {product.category})
              </span>
              {product.image && (
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width="100px"
                  style={{ marginTop: "10px" }}
                />
              )}

              <button
                type="button"
                className="btn btn-danger"
                style={{
                  backgroundColor: "#fd6909",
                  borderColor: "#fd6909",
                  color: "#fff",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff7e30")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fd6909")}
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Product Name */}
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Product Description */}
      <div className="mb-3">
        <label className="form-label">Product Description</label>
        <textarea
          className="form-control"
          rows="2"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Product Category */}
      <div className="mb-3">
        <label className="form-label">Product Category</label>
        <input
          type="text"
          className="form-control"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
      </div>

      {/* Product Image */}
      <div className="mb-3">
        <label className="form-label">Upload Product Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
      </div>

      {/* Add Product Button */}
      <button
        type="button"
        className="btn btn-secondary"
        style={{
          backgroundColor: "#fd6909",
          borderColor: "#fd6909",
          color: "#fff",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff7e30")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fd6909")}
        onClick={handleAddProduct}
      >
        Add Product
      </button>

      <hr />

      {/* Submit Partner */}
      <button
        type="submit"
        className="btn btn-primary"
        style={{
          backgroundColor: "#fd6909",
          borderColor: "#fd6909",
          color: "#fff",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff7e30")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fd6909")}
      >
        {partner ? "Update Partner" : "Add Partner"}
      </button>
    </form>
  )
}
