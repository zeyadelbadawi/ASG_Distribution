"use client"

import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header3({ scroll, isMobileMenu, handleMobileMenu, bgImage }) {
  console.log("Header Background Image:", bgImage)

  return (
    <>
      <header
        className="main-header-two"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <nav className="main-menu main-menu-two">
          <div className="main-menu-two__wrapper">
            <div className="main-menu-two__wrapper-inner">
              <div className="main-menu-two__left">
                <div className="main-menu-two__logo">
                  <Link href="/">
                    <img src="assets/images/resources/logo-1.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <Menu />
              <div className="main-menu-two__right">
                <div className="main-menu-two__nav-sidebar-icon">
                  <button className="navSidebar-button" onClick={handleMobileMenu}>
                    <span className="icon-dots-menu-one"></span>
                    <span className="icon-dots-menu-two"></span>
                    <span className="icon-dots-menu-three"></span>
                  </button>
                </div>
                <div className="main-menu-two__call">
                  <div className="main-menu-two__call-icon">
                    <span className="icon-call"></span>
                  </div>
                  <div className="main-menu-two__call-content">
                    <p className="main-menu-two__call-sub-title">Need help?</p>
                    <h5 className="main-menu-two__call-number">
                      <Link href="tel:010 50638800">010 50638800</Link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu handleMobileMenu={handleMobileMenu} />

      <div className={`stricky-header stricked-menu main-menu main-menu-three ${scroll ? "stricky-fixed" : ""}`}>
        <div className="sticky-header__content">
          <nav className="main-menu main-menu-two">
            <div className="main-menu-two__wrapper">
              <div className="main-menu-two__wrapper-inner">
                <div className="main-menu-two__left">
                  <div className="main-menu-two__logo">
                    <Link href="/">
                      <img src="assets/images/resources/logo-1.png" alt="Logo" />
                    </Link>
                  </div>
                </div>
                <Menu />
                <div className="main-menu-two__right">
                  <div className="main-menu-two__nav-sidebar-icon">
                    <button className="navSidebar-button" onClick={handleMobileMenu}>
                      <span className="icon-dots-menu-one"></span>
                      <span className="icon-dots-menu-two"></span>
                      <span className="icon-dots-menu-three"></span>
                    </button>
                  </div>
                  <div className="main-menu-two__call">
                    <div className="main-menu-two__call-icon">
                      <span className="icon-call"></span>
                    </div>
                    <div className="main-menu-two__call-content">
                      <p className="main-menu-two__call-sub-title">Need help?</p>
                      <h5 className="main-menu-two__call-number">
                        <Link href="tel:010 50638800">010 50638800</Link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
