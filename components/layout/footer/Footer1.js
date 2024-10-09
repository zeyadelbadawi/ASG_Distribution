import Link from "next/link"

export default function Footer1() {
    return (
        <>
           {/*Site Footer Start*/}
        <footer className="site-footer">
            <div className="site-footer__top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                            <div className="footer-widget__column footer-widget__about">
                                <div className="footer-widget__logo">
                                    <Link href="/"><img src="assets/images/resources/footer-logo-1.png"
                                            alt=""/></Link>
                                </div>
                                <p className="footer-widget__about-text">ASG Distribution is dedicated to helping businesses thrive by providing top-quality products and outstanding service. Partner with us and discover a distribution experience that is unparalleled in reliability, efficiency, and value.</p>
                                <ul className="footer-widget__social-list list-unstyled">
                                    <li>
                                        <Link href="#"><span className="icon-linkin"></span></Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.facebook.com/asgdisty/"><span className="icon-facebook"></span></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><span className="icon-twitter"></span></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><span className="icon-instagram"></span></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="footer-widget__column footer-widget__services">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Solutions</h3>
                                </div>
                                <ul className="footer-widget__services-list list-unstyled">
                                    <li>
                                        <Link href="/services-details?tab=1"><span className="icon-angle-left"></span>Security System</Link>
                                    </li>
                                    <li>
                                        <Link href="/services-details?tab=2"><span className="icon-angle-left"></span>Networking</Link>
                                    </li>
                                    <li>
                                        <Link href="/services-details?tab=3"><span className="icon-angle-left"></span>Physical Security</Link>
                                    </li>
                                    <li>
                                        <Link href="/services-details?tab=5"><span className="icon-angle-left"></span>Automations</Link>
                                    </li>
                                    <li>
                                        <Link href="/services-details?tab=6"><span className="icon-angle-left"></span>Parking Soltions</Link>
                                    </li>



                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="footer-widget__column footer-widget__company">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Company</h3>
                                </div>
                                <ul className="footer-widget__services-list list-unstyled">
                                    <li>
                                        <Link href="about"><span className="icon-angle-left"></span>About</Link>
                                    </li>
                                    <li>
                                        <Link href="contact"><span className="icon-angle-left"></span>Contact</Link>
                                    </li>
                                    <li>
                                        <Link href="gallary"><span className="icon-angle-left"></span>Gallery</Link>
                                    </li>
                                    <li>
                                        <Link href="faq"><span className="icon-angle-left"></span>FAQ</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                            <div className="footer-widget__column footer-widget__news">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Recent News</h3>
                                </div>
                                <ul className="footer-widget__news-list list-unstyled">
                                    <li>
                                        <div className="footer-widget__news-img">
                                            <img src="assets/images/news/footer-widget-news-img-1.jpg" alt=""/>
                                            <Link href="#"><span className="fab fa-instagram"></span></Link>
                                        </div>
                                        <div className="footer-widget__news-content">
                                            <h3 className="footer-widget__news-title"><Link href="blog-details">A
                                                    comprehensive security solution</Link></h3>
                                            <p className="footer-widget__news-date"><span className="icon-calender"></span>17
                                                oct 23</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="footer-widget__news-img">
                                            <img src="assets/images/news/footer-widget-news-img-2.jpg" alt=""/>
                                            <Link href="#"><span className="fab fa-instagram"></span></Link>
                                        </div>
                                        <div className="footer-widget__news-content">
                                            <h3 className="footer-widget__news-title"><Link href="blog-details">Top-notch
                                                    security system</Link></h3>
                                            <p className="footer-widget__news-date"><span className="icon-calender"></span>17
                                                oct 23</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="site-footer__bottom-inner">
                        <p className="site-footer__bottom-text">© ASG Distribution 2024 | All Rights Reserved</p>
                        <ul className="list-unstyled site-footer__bottom-menu">
                            <li><Link href="about">Trams & Condition</Link></li>
                            <li><Link href="about">Privacy Policy</Link></li>
                            <li><Link href="contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        {/*Site Footer End*/}

        </>
    )
}
