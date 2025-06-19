'use client';
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
                <div className="mobile-nav__overlay custom-nav-overlay" onClick={handleMobileMenu}></div>
                <div className="mobile-nav__content custom-nav-content">
                    <span className="mobile-nav__close custom-nav-close" onClick={handleMobileMenu}>
                        <i className="fa fa-times"></i>
                    </span>

                    <div className="logo-box" style={{ marginBottom: '20px' }}>
                        <Link href="/" aria-label="logo image">
                            <img src="assets/images/resources/footer-logo-1.png" width="150" alt="Company Logo" />
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mobile-nav__search modern-nav-search" style={{ marginBottom: '20px' }}>
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
                    <div className="custom-company-details" style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
                        Company Information
                    </div>

                    {/* Divider line */}
                    <hr className="custom-divider" />

                    <div className="custom-contact-info" style={{ marginBottom: '20px' }}>
                        <p className="custom-contact-item">
                            <i className="fa fa-map-marker-alt"></i> 
                            4 Dr Mohamed Awad Street, <br />
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
    );
};
export default MobileMenu;
