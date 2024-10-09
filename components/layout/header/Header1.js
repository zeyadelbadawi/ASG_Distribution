import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
                <div className="main-menu__top">
                    <div className="main-menu__top-inner">
                        <ul className="list-unstyled main-menu__contact-list">
                            <li>
                                <div className="icon">
                                    <i className="icon-call"></i>
                                </div>
                                <div className="text">
                                    <p><Link href="tel:+2010 50638800">010 50638800</Link></p>
                                </div>
                            </li>
                            <li>
                                <div className="icon">
                                    <i className="icon-email"></i>
                                </div>
                                <div className="text">
                                    <p><Link href="mailto:info@asgdistribution.com">info@asgdistribution.com</Link></p>
                                </div>
                            </li>
                            <li>
                                <div className="icon">
                                    <i className="icon-pin"></i>
                                </div>
                                <div className="text">
                                    <p>4 Dr Mohamed Awad Street in Front of City Center</p>
                                </div>
                            </li>
                        </ul>
                        <div className="main-menu__top-right">
                            <div className="main-menu__social">
                                <Link href="#"><i className="fab fa-twitter"></i></Link>
                                <Link href="https://www.facebook.com/asgdisty/"><i className="fab fa-facebook"></i></Link>
                                <Link href="#"><i className="fab fa-youtube"></i></Link>
                                <Link href="#"><i className="fab fa-instagram"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="main-menu">
                    <div className="main-menu__wrapper">
                        <div className="main-menu__wrapper-inner">
                            <div className="main-menu__left">
                                <div className="main-menu__logo">
                                    <Link href="/"><img src="assets/images/resources/logo-1.png" alt=""/></Link>
                                </div>
                            </div>
                            <div className="main-menu__main-menu-box">
                                {/* Restoring the mobile nav icon to the three dashes */}
                                <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}>
                                    <i className="fa fa-bars"></i>
                                </Link>
                                <Menu />
                            </div>
                            <div className="main-menu__right">
                                <div className="main-menu__btn-box">
                                <Link href="#product-section" className="main-menu__btn thm-btn">Let's Talk</Link>
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
                                        <Link href="/"><img src="assets/images/resources/logo-1.png" alt=""/></Link>
                                    </div>
                                </div>
                                <div className="main-menu__main-menu-box">
                                    {/* Restoring the mobile nav icon to the three dashes */}
                                    <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}>
                                        <i className="fa fa-bars"></i>
                                    </Link>
                                    <Menu />
                                </div>
                                <div className="main-menu__right">
                                    <div className="main-menu__btn-box">
                                    <Link href="#product-section" className="main-menu__btn thm-btn">Let's Talk</Link>
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
