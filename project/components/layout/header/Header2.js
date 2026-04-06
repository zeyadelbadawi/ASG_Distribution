"use client"

import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu2"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu, handleSidebar }) {
  return (
    <>
      <header className="main-header-two">
        <nav className="main-menu main-menu-two">
          <div className="main-menu-two__wrapper">
            <div className="main-menu-two__wrapper-inner">
              <div className="main-menu-two__left">
                <div className="main-menu-two__logo">
                  <Link href="/">
                    <img src="assets/images/resources/logo-2.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="main-menu-two__main-menu-box">
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

              <div className="main-menu-two__right">
                <div className="main-menu-two__nav-sidebar-icon">
                  <Link className="navSidebar-button" href="#" onClick={handleSidebar}>
                    <span className="icon-dots-menu-one"></span>
                    <span className="icon-dots-menu-two"></span>
                    <span className="icon-dots-menu-three"></span>
                  </Link>
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

      <div className={`stricky-header stricked-menu main-menu main-menu-two ${scroll ? "stricky-fixed" : ""}`}>
        <div className="sticky-header__content">
          <nav className="main-menu main-menu-two">
            <div className="main-menu-two__wrapper">
              <div className="main-menu-two__wrapper-inner">
                <div className="main-menu-two__left">
                  <div className="main-menu-two__logo">
                    <Link href="/">
                      <img src="assets/images/resources/logo-2.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="main-menu-two__main-menu-box">
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
