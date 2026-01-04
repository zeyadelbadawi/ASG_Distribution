"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  const pathname = usePathname()

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

  useEffect(() => {
    if (isSidebar) {
      handleMobileMenu()
    }
  }, [pathname])

  const handleToggle = (key, subMenuKey = "", event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

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

  const linkStyle = {
    textDecoration: "none",
    display: "block",
    padding: "8px 0",
    color: "white",
    transition: "color 0.3s ease",
  }

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    padding: "0 5px",
    color: "#FF6600",
    fontWeight: "bold",
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
                <Link href="/" style={linkStyle} className="mobile-menu-link">
                  Home
                </Link>
              </li>
              <li className="dropdown" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link href="/Main_Vendors" style={{ ...linkStyle, flex: 1 }} className="mobile-menu-link">
                    Partners
                  </Link>
                  <button onClick={(e) => handleToggle("partners", "", e)} style={buttonStyle}>
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
                    <Link href="/partners/dahua" style={linkStyle} className="mobile-menu-link">
                      Dahua Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/ruijiereyee" style={linkStyle} className="mobile-menu-link">
                      Ruijie | Reyee
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/aruba" style={linkStyle} className="mobile-menu-link">
                      Aruba
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/itc" style={linkStyle} className="mobile-menu-link">
                      ITC
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/imou" style={linkStyle} className="mobile-menu-link">
                      Imou
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/kstar" style={linkStyle} className="mobile-menu-link">
                      Kstar
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/unitech" style={linkStyle} className="mobile-menu-link">
                      Unitech
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/centurion" style={linkStyle} className="mobile-menu-link">
                      Centurion
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/faac" style={linkStyle} className="mobile-menu-link">
                      FAAC Technologies
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners/magnetic" style={linkStyle} className="mobile-menu-link">
                      Magnetic
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown" style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link href="/services" style={{ ...linkStyle, flex: 1 }} className="mobile-menu-link">
                    Solutions
                  </Link>
                  <button onClick={(e) => handleToggle("solutions", "", e)} style={buttonStyle}>
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
                    <Link href="/services-details?tab=1" style={linkStyle} className="mobile-menu-link">
                      Security System
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=2" style={linkStyle} className="mobile-menu-link">
                      Networking
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=3" style={linkStyle} className="mobile-menu-link">
                      Physical Security
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=4" style={linkStyle} className="mobile-menu-link">
                      Audio Visual Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=5" style={linkStyle} className="mobile-menu-link">
                      Automations
                    </Link>
                  </li>
                  <li>
                    <Link href="/services-details?tab=6" style={linkStyle} className="mobile-menu-link">
                      Parking Solutions
                    </Link>
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/about" style={linkStyle} className="mobile-menu-link">
                  About
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/contact" style={linkStyle} className="mobile-menu-link">
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/gallery" style={linkStyle} className="mobile-menu-link">
                  Gallery
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog" style={linkStyle} className="mobile-menu-link">
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
              <Link href="/" style={linkStyle} className="mobile-menu-link">
                Home
              </Link>
            </li>
            <li className="dropdown" style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/Main_Vendors" style={{ ...linkStyle, flex: 1 }} className="mobile-menu-link">
                  Partners
                </Link>
                <button onClick={(e) => handleToggle("partners", "", e)} style={buttonStyle}>
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
                  <Link href="/partners/dahua" style={linkStyle} className="mobile-menu-link">
                    Dahua Technology
                  </Link>
                </li>
                <li>
                  <Link href="/partners/ruijiereyee" style={linkStyle} className="mobile-menu-link">
                    Ruijie | Reyee
                  </Link>
                </li>
                <li>
                  <Link href="/partners/aruba" style={linkStyle} className="mobile-menu-link">
                    Aruba
                  </Link>
                </li>
                <li>
                  <Link href="/partners/itc" style={linkStyle} className="mobile-menu-link">
                    ITC
                  </Link>
                </li>
                <li>
                  <Link href="/partners/imou" style={linkStyle} className="mobile-menu-link">
                    Imou
                  </Link>
                </li>
                <li>
                  <Link href="/partners/kstar" style={linkStyle} className="mobile-menu-link">
                    Kstar
                  </Link>
                </li>
                <li>
                  <Link href="/partners/unitech" style={linkStyle} className="mobile-menu-link">
                    Unitech
                  </Link>
                </li>
                <li>
                  <Link href="/partners/centurion" style={linkStyle} className="mobile-menu-link">
                    Centurion
                  </Link>
                </li>
                <li>
                  <Link href="/partners/faac" style={linkStyle} className="mobile-menu-link">
                    FAAC Technologies
                  </Link>
                </li>
                <li>
                  <Link href="/partners/magnetic" style={linkStyle} className="mobile-menu-link">
                    Magnetic
                  </Link>
                </li>
              </ul>
            </li>
            <li className="dropdown" style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/services" style={{ ...linkStyle, flex: 1 }} className="mobile-menu-link">
                  Solutions
                </Link>
                <button onClick={(e) => handleToggle("solutions", "", e)} style={buttonStyle}>
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
                  <Link href="/services-details?tab=1" style={linkStyle} className="mobile-menu-link">
                    Security System
                  </Link>
                </li>
                <li>
                  <Link href="/services-details?tab=2" style={linkStyle} className="mobile-menu-link">
                    Networking
                  </Link>
                </li>
                <li>
                  <Link href="/services-details?tab=3" style={linkStyle} className="mobile-menu-link">
                    Physical Security
                  </Link>
                </li>
                <li>
                  <Link href="/services-details?tab=4" style={linkStyle} className="mobile-menu-link">
                    Audio Visual Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services-details?tab=5" style={linkStyle} className="mobile-menu-link">
                    Automations
                  </Link>
                </li>
                <li>
                  <Link href="/services-details?tab=6" style={linkStyle} className="mobile-menu-link">
                    Parking Solutions
                  </Link>
                </li>
              </ul>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/about" style={linkStyle} className="mobile-menu-link">
                About
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/contact" style={linkStyle} className="mobile-menu-link">
                Contact
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/gallery" style={linkStyle} className="mobile-menu-link">
                Gallery
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/blog" style={linkStyle} className="mobile-menu-link">
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
