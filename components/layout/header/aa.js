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
            <div className="mobile-nav__wrapper1">
                <div className="mobile-nav__overlay1 mobile-nav__toggler1" onClick={handleMobileMenu}></div>
                <div className="mobile-nav__content1">
                    <span className="mobile-nav__close1 mobile-nav__toggler1" onClick={handleMobileMenu}><i className="fa fa-times"></i></span>

                    <div className="logo-box1" style={{ marginBottom: '20px' }}>
                        <Link href="/" aria-label="logo image"><img src="assets/images/resources/footer-logo-1.png" width="150" alt="" /></Link>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h1>company</h1>
                    </div>

                    {/* Add Search Bar Here */}
                    <div className="mobile-nav__search1" style={{ marginBottom: '20px' }}>
                        <form action="#">
                            <input type="text" placeholder="Search here..." style={{ padding: '10px', width: '80%' }} />
                            <button type="submit" style={{ padding: '10px' }}>
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>

                    {/* Add Company Details Text Here */}
                    <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
                        Company Details
                    </div>

                    {/* Horizontal line */}
                    <hr style={{ border: '1px solid #ccc', marginBottom: '20px' }} />

                    {/* Contact Information */}
                    <ul className="mobile-nav__contact1 list-unstyled1" style={{ marginBottom: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            <i className="fa fa-map"></i>
                            <Link href="">4 Dr Mohamed Awad Street</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <i className="fa fa-envelope"></i>
                            <Link href="mailto:needhelp@lockdown.com">needhelp@lockdown.com</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <i className="fa fa-phone-alt"></i>
                            <Link href="tel:666-888-0000">666 888 0000</Link>
                        </li>
                    </ul>

                    {/* Another Horizontal line */}
                    <hr style={{ border: '1px solid #ccc', marginBottom: '20px' }} />

                    <div className="mobile-nav__top1">
                        <div className="mobile-nav__social1" style={{ marginBottom: '20px' }}>
                            <Link href="#" className="fab fa-twitter"></Link>
                            <Link href="#" className="fab fa-facebook-square"></Link>
                            <Link href="#" className="fab fa-pinterest-p"></Link>
                            <Link href="#" className="fab fa-instagram"></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MobileMenu;
