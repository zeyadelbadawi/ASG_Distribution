"use client"

import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header3({ scroll, isMobileMenu, handleMobileMenu }) {
  return (
    <>
      <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
        
        <nav className="main-menu">
          <div className="main-menu__wrapper">
            <div className="main-menu__wrapper-inner">
              <div className="main-menu__left">
                <div className="main-menu__logo">
                  <Link href="/">
                    <img src="assets/images/resources/logo-1.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="main-menu__main-menu-box">
                <Link
                  href="#"
                  className="mobile-nav__toggler"
                  onClick={handleMobileMenu}
                  style={{ display: isMobileMenu ? "block" : "none" }}
                >
                  <i className="fa fa-bars"></i>
                </Link>
                <Menu />
              </div>
              <div className="main-menu__right">
                <div className="main-menu__btn-box">
                  <Link href="#product-section" className="main-menu__btn thm-btn">
                    Let's Talk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu handleMobileMenu={handleMobileMenu} />

      <div className={`stricky-header stricked-menu main-menu ${scroll ? "stricky-fixed" : ""}`}>
        <div className="sticky-header__content">
          <nav className="main-menu">
            <div className="main-menu__wrapper">
              <div className="main-menu__wrapper-inner">
                <div className="main-menu__left">
                  <div className="main-menu__logo">
                    <Link href="/">
                      <img src="assets/images/resources/logo-1.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="main-menu__main-menu-box">
                  <Link
                    href="#"
                    className="mobile-nav__toggler"
                    onClick={handleMobileMenu}
                    style={{ display: isMobileMenu ? "block" : "none" }}
                  >
                    <i className="fa fa-bars"></i>
                  </Link>
                  <Menu />
                </div>
                <div className="main-menu__right">
                  <div className="main-menu__btn-box">
                    <Link href="#product-section" className="main-menu__btn thm-btn">
                      Let's Talk
                    </Link>
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
