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
                                                                        <p><Link href="https://www.google.com/maps/dir//in+Front+of+City+Center,+4+Dr.+Mohamed+Awad+St,+from+%D9%85%D9%83%D8%B1%D9%85+%D8%B9%D8%A8%D9%8A%D8%AF%D8%8C+%D9%85%D8%AF%D9%8A%D9%86%D8%A9+%D9%86%D8%B5%D8%B1%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%E2%80%AC%E2%80%AD/@30.0677685,31.4133808,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x14583f92ba92b499:0xe71112fc96b95222!2m2!1d31.3433406!2d30.0677871?entry=ttu&g_ep=EgoyMDI1MDEyMC4wIKXMDSoASAFQAw%3D%3D">4 Dr Mohamed Awad Street in Front of City Center</Link></p>

                                </div>
                            </li>
                        </ul>
                        <div className="main-menu__top-right">
                            <div className="main-menu__social">
                                    <Link href="https://www.facebook.com/asgdisty/"><i className="fab fa-facebook"></i></Link>
                            <Link href="https://www.instagram.com/asg.distribution/"><i className="fab fa-instagram"></i></Link>
                                <Link href="https://www.linkedin.com/company/asg-distribution/"><i className="fab fa-linkedin"></i></Link>
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
