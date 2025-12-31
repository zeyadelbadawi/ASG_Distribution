"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
    subMenuKey: "",
  })

  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 768)

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile && isSidebar) {
      handleMobileMenu()
    }
  }, [isMobile, isSidebar, handleMobileMenu])

  const handleToggle = (key, subMenuKey = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({
        status: false,
        key: "",
        subMenuKey: "",
      })
    } else {
      setIsActive({
        status: true,
        key,
        subMenuKey,
      })
    }
  }

  if (!isMobile && isSidebar) {
    return (
      <>
        <div className="mobile-nav__wrapper">
          <div className="mobile-nav__overlay custom-nav-overlay" onClick={handleMobileMenu}></div>
          <div
            className="mobile-nav__content custom-nav-content"
            style={{ width: "350px", height: "100vh", overflowY: "auto" }}
          >
            <span className="mobile-nav__close custom-nav-close" onClick={handleMobileMenu}>
              <i className="fa fa-times"></i>
            </span>

            <div className="logo-box" style={{ marginBottom: "20px" }}>
              <Link href="/" aria-label="logo image">
                <img src="assets/images/resources/footer-logo-1.png" width="150" alt="Company Logo" />
              </Link>
            </div>

            {/* Sidebar Menu - Same as main menu */}
            <ul className="main-menu__list" style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                  Home
                </Link>
              </li>
              <li className="dropdown" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link
                    href="/Main_Vendors"
                    style={{ textDecoration: "none", display: "block", padding: "8px 0", flex: 1 }}
                  >
                    Partners
                  </Link>
                  <button
                    onClick={() => handleToggle("partners")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      padding: "0 5px",
                    }}
                  >
                    {isActive.key === "partners" ? "−" : "+"}
                  </button>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: "10px 0 10px 20px",
                    display: isActive.key === "partners" ? "block" : "none",
                  }}
                >
                  <li>
                    <Link href="/partners/dahua">Dahua Technology</Link>
                  </li>
                  <li>
                    <Link href="/partners/ruijiereyee">Ruijie | Reyee</Link>
                  </li>
                  <li>
                    <Link href="/partners/aruba">Aruba</Link>
                  </li>
                  <li>
                    <Link href="/partners/itc">ITC</Link>
                  </li>
                  <li>
                    <Link href="/partners/imou">Imou</Link>
                  </li>
                  <li>
                    <Link href="/partners/kstar">Kstar</Link>
                  </li>
                  <li>
                    <Link href="/partners/unitech">Unitech</Link>
                  </li>
                  <li>
                    <Link href="/partners/centurion">Centurion</Link>
                  </li>
                  <li>
                    <Link href="/partners/faac">FAAC Technologies</Link>
                  </li>
                  <li>
                    <Link href="/partners/magnetic">Magnetic</Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link
                    href="/services"
                    style={{ textDecoration: "none", display: "block", padding: "8px 0", flex: 1 }}
                  >
                    Solutions
                  </Link>
                  <button
                    onClick={() => handleToggle("solutions")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      padding: "0 5px",
                    }}
                  >
                    {isActive.key === "solutions" ? "−" : "+"}
                  </button>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: "10px 0 10px 20px",
                    display: isActive.key === "solutions" ? "block" : "none",
                  }}
                >
                  <li>
                    <Link href="/services-details?tab=1">Security System</Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=2">Networking</Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=3">Physical Security</Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=4">Audio Visual Solutions</Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=5">Automations</Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=6">Parking Solutions</Link>
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/about" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                  About
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/contact" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/gallery" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                  Gallery
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                  Blog
                </Link>
              </li>
            </ul>

            <hr className="custom-divider" style={{ margin: "20px 0" }} />

            {/* Search Bar */}
            <div className="mobile-nav__search modern-nav-search" style={{ marginBottom: "20px" }}>
              <form action="#">
                <div className="search-wrapper">
                  <input type="text" placeholder="Search here..." className="modern-search-input" />
                  <button type="submit" className="modern-search-btn">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Company Details */}
            <div
              className="custom-company-details"
              style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "18px" }}
            >
              Company Information
            </div>

            {/* Divider line */}
            <hr className="custom-divider" />

            <div className="custom-contact-info" style={{ marginBottom: "20px" }}>
              <p className="custom-contact-item">
                <i className="fa fa-map-marker-alt"></i>4 Dr Mohamed Awad Street, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In Front of City Center, <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nasr City, Egypt
              </p>

              {/* Divider line */}
              <hr className="custom-divider" />

              <p className="custom-contact-item">
                <i className="fa fa-phone-alt"></i>
                +201050638800
              </p>

              {/* Divider line */}
              <hr className="custom-divider" />

              <p className="custom-contact-item">
                <i className="fa fa-envelope"></i>
                info@asgdistribution.com
              </p>
            </div>

            {/* Divider line */}
            <hr className="custom-divider" />

            {/* Social Media Icons */}
            <div className="custom-nav-social full-width-icons">
              <Link href="https://www.facebook.com/asgdisty" className="fab fa-facebook"></Link>
              <Link href="https://www.instagram.com/asg.distribution/" className="fab fa-instagram"></Link>
              <Link href="https://www.linkedin.com/company/asg-distribution/" className="fab fa-linkedin"></Link>
              <Link href="#" className="fab fa-youtube"></Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay custom-nav-overlay" onClick={handleMobileMenu}></div>
        <div className="mobile-nav__content custom-nav-content">
          <span className="mobile-nav__close custom-nav-close" onClick={handleMobileMenu}>
            <i className="fa fa-times"></i>
          </span>

          <div className="logo-box" style={{ marginBottom: "20px" }}>
            <Link href="/" aria-label="logo image">
              <img src="assets/images/resources/footer-logo-1.png" width="150" alt="Company Logo" />
            </Link>
          </div>

          {/* Mobile Menu - Only Navigation, no company info */}
          <ul className="main-menu__list" style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                Home
              </Link>
            </li>
            <li className="dropdown" style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link
                  href="/Main_Vendors"
                  style={{ textDecoration: "none", display: "block", padding: "8px 0", flex: 1 }}
                >
                  Partners
                </Link>
                <button
                  onClick={() => handleToggle("partners")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "0 5px",
                  }}
                >
                  {isActive.key === "partners" ? "−" : "+"}
                </button>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: "10px 0 10px 20px",
                  display: isActive.key === "partners" ? "block" : "none",
                }}
              >
                <li>
                  <Link href="/partners/dahua">Dahua Technology</Link>
                </li>
                <li>
                  <Link href="/partners/ruijiereyee">Ruijie | Reyee</Link>
                </li>
                <li>
                  <Link href="/partners/aruba">Aruba</Link>
                </li>
                <li>
                  <Link href="/partners/itc">ITC</Link>
                </li>
                <li>
                  <Link href="/partners/imou">Imou</Link>
                </li>
                <li>
                  <Link href="/partners/kstar">Kstar</Link>
                </li>
                <li>
                  <Link href="/partners/unitech">Unitech</Link>
                </li>
                <li>
                  <Link href="/partners/centurion">Centurion</Link>
                </li>
                <li>
                  <Link href="/partners/faac">FAAC Technologies</Link>
                </li>
                <li>
                  <Link href="/partners/magnetic">Magnetic</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown" style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/services" style={{ textDecoration: "none", display: "block", padding: "8px 0", flex: 1 }}>
                  Solutions
                </Link>
                <button
                  onClick={() => handleToggle("solutions")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "0 5px",
                  }}
                >
                  {isActive.key === "solutions" ? "−" : "+"}
                </button>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: "10px 0 10px 20px",
                  display: isActive.key === "solutions" ? "block" : "none",
                }}
              >
                <li>
                  <Link href="/services-details?tab=1">Security System</Link>
                </li>
                <li>
                  <Link href="/services-details?tab=2">Networking</Link>
                </li>
                <li>
                  <Link href="/services-details?tab=3">Physical Security</Link>
                </li>
                <li>
                  <Link href="/services-details?tab=4">Audio Visual Solutions</Link>
                </li>
                <li>
                  <Link href="/services-details?tab=5">Automations</Link>
                </li>
                <li>
                  <Link href="/services-details?tab=6">Parking Solutions</Link>
                </li>
              </ul>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/about" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                About
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/contact" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                Contact
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/gallery" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                Gallery
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/blog" style={{ textDecoration: "none", display: "block", padding: "8px 0" }}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default MobileMenu
