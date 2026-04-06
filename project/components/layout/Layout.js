'use client';
import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import DataBg from "../elements/DataBg";
import Breadcrumb from "./Breadcrumb";
import SearchPopup from "./SearchPopup";
import Sidebar from "./Sidebar";
import Footer1 from "./footer/Footer1";
import Footer2 from "./footer/Footer2";
import Header1 from "./header/Header1";
import Header2 from "./header/Header2";
import Header3 from "./header/Header3";

export default function Layout({
    headerStyle,
    footerStyle,
    breadcrumbTitle,
    breadcrumbBg, // Background image for Breadcrumb
    children,
    wrapperCls,
}) {
    const [scroll, setScroll] = useState(0);

    // Mobile Menu
    const [isMobileMenu, setMobileMenu] = useState(false);
    const handleMobileMenu = () => {
        setMobileMenu(!isMobileMenu);
        if (!isMobileMenu) {
            document.body.classList.add("mobile-menu-visible");
        } else {
            document.body.classList.remove("mobile-menu-visible");
        }
    };

    // Popup
    const [isPopup, setPopup] = useState(false);
    const handlePopup = () => setPopup(!isPopup);

    // Sidebar
    const [isSidebar, setSidebar] = useState(false);
    const handleSidebar = () => setSidebar(!isSidebar);

    useEffect(() => {
        const WOW = require("wowjs");
        window.wow = new WOW.WOW({
            live: false,
        });
        window.wow.init();

        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
    }, []);

    return (
        <>
            <DataBg />
            <div className={`page-wrapper ${wrapperCls || ""}`} id="top">
                {/* Header */}
                {headerStyle === 1 && (
                    <Header1
                        scroll={scroll}
                        isMobileMenu={isMobileMenu}
                        handleMobileMenu={handleMobileMenu}
                        handlePopup={handlePopup}
                        isSidebar={isSidebar}
                        handleSidebar={handleSidebar}
                    />
                )}
                {headerStyle === 2 && (
                    <Header2
                        scroll={scroll}
                        isMobileMenu={isMobileMenu}
                        handleMobileMenu={handleMobileMenu}
                        handlePopup={handlePopup}
                        isSidebar={isSidebar}
                        handleSidebar={handleSidebar}
                    />
                )}
                {headerStyle === 3 && (
                    <Header3
                        scroll={scroll}
                        isMobileMenu={isMobileMenu}
                        handleMobileMenu={handleMobileMenu}
                    />
                )}

                {/* Breadcrumb */}
                {breadcrumbTitle && (
                    <Breadcrumb
                        breadcrumbTitle={breadcrumbTitle}
                        bgImage={breadcrumbBg} // Pass the background image to Breadcrumb
                    />
                )}

                {/* Main Content */}
                {children}

                {/* Footer */}
                {!footerStyle && <Footer1 />}
                {footerStyle === 1 && <Footer1 />}
                {footerStyle === 2 && <Footer2 />}
            </div>

            {/* Back to Top */}
            <BackToTop scroll={scroll} />
        </>
    );
}
