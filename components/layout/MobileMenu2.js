'use client'
import Link from "next/link";
import { useState } from "react";

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
        subMenuKey: "",
    });

    const handleToggle = (key, subMenuKey = "") => {
        if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
            setIsActive({
                status: false,
                key: "",
                subMenuKey: "",
            });
        } else {
            setIsActive({
                status: true,
                key,
                subMenuKey,
            });
        }
    };
    return (
        <>
            <div className="mobile-nav__wrapper">
                <div className="mobile-nav__overlay mobile-nav__toggler" onClick={handleMobileMenu} ></div>
                <div className="mobile-nav__content">
                    <span className="mobile-nav__close mobile-nav__toggler" onClick={handleMobileMenu} ><i className="fa fa-times"></i></span>

                    <div className="logo-box">
                        <Link href="/" aria-label="logo image"><img src="assets/images/resources/logo-3.png" width="150" alt="" /></Link>
                    </div>

                    <div className="mobile-nav__container">
                        <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                            <ul className="main-menu__list">
                                <li className={isActive.key == 1 ? "dropdown current" : "dropdown"}><Link href="/">Home</Link>
                                </li>

                                <li className={isActive.key == 2 ? "dropdown current" : "dropdown"}><Link href="Main_Vendors">Partners</Link>
                                    <ul style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                                        <li>   <Link href="/partners/dahua">Dahua</Link></li>
                                        <li>  <Link href="/partners/ruijiereyee">Centurion</Link></li>
                                        <li> <Link href="/partners/imou">Imou</Link></li>
                                        <li>  <Link href="/partners/kstar">Kstar</Link></li>
                                        <li>   <Link href="/partners/unitech">Ruijiel Reyee</Link></li>
                                        <li>   <Link href="/partners/centurion">Unitech</Link></li>
                                        <li>   <Link href="/partners/faac">FAAC</Link></li>
                                        <li>   <Link href="/partners/magnetic">Magnetic</Link></li>

                                    </ul>
                                    <div className={isActive.key == 2 ? "dropdown-btn open" : "dropdown-btn"} onClick={() => handleToggle(2)}><span className="fa fa-angle-right" /></div>
                                </li>


                                <li className={isActive.key == 3 ? "dropdown current" : "dropdown"}><Link href="services">Solutions</Link>
                                    <ul style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>
                                        <li>   <Link href="/services-details?tab=1">Surveillance System</Link></li>
                                        <li>  <Link href="/services-details?tab=2">Networking</Link></li>
                                        <li> <Link href="/services-details?tab=3">Access Control</Link></li>
                                        <li>  <Link href="/services-details?tab=4">Audio Visual Solutions</Link></li>
                                        <li>   <Link href="/services-details?tab=5">Automations</Link></li>
                                        <li>   <Link href="/services-details?tab=6">Parking Solutions</Link></li>
                                    </ul>
                                    <div className={isActive.key == 3 ? "dropdown-btn open" : "dropdown-btn"} onClick={() => handleToggle(3)}><span className="fa fa-angle-right" /></div>
                                </li>

                                <li><Link href="/about/">About</Link></li>

                                <li><Link href="/contact">Contact</Link></li>

                                <li className={isActive.key == 4 ? "dropdown current" : "dropdown"}><Link href="gallery">Gallery</Link>
                                </li>

                                <li className={isActive.key == 5 ? "dropdown current" : "dropdown"}><Link href="blog">Blog</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ul className="mobile-nav__contact list-unstyled">
                        <li>
                            <i className="fa fa-envelope"></i>
                            <Link href="mailto:info@asgdistribution.com">info@asgdistribution.com</Link>
                        </li>
                        <li>
                            <i className="fa fa-phone-alt"></i>
                            <Link href="tel:010 50638800">
                                010 50638800</Link>
                        </li>
                    </ul>
                    <div className="mobile-nav__top">
                        <div className="mobile-nav__social">
                            <Link href="#" className="fab fa-twitter"></Link>
                            <Link href="#" className="fab fa-facebook-square"></Link>
                            <Link href="#" className="fab fa-youtube"></Link>
                            <Link href="#" className="fab fa-instagram"></Link>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
export default MobileMenu;
