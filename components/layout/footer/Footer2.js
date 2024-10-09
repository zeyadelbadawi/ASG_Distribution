import Link from "next/link"

export default function Footer2() {
    return (
        <>
            

    {/*Site Footer Two Start*/}
    <footer className="site-footer-two">
            <div className="site-footer-two__shape-1 float-bob-x">
                <img src="assets/images/shapes/footer-two-shape-1.png" alt=""/>
            </div>
            <div className="site-footer__top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                            <div className="footer-widget__column footer-widget__about">
                                <div className="footer-widget__logo">
                                    <Link href="/"><img src="assets/images/resources/footer-logo-2.png"
                                            alt=""/></Link>
                                </div>
                                <p className="footer-widget__about-text">A specialized military unit tasked with gathering
                                    information and conducting surveillance</p>
                                <ul className="footer-widget__social-list list-unstyled">
                                    <li>
                                        <Link href="#"><span className="icon-linkin"></span></Link>
                                    </li>
                                    <li>
                                        <Link href="#"><span className="icon-pinterest"></span></Link>
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
                                    <h3 className="footer-widget__title">Services</h3>
                                </div>
                                <ul className="footer-widget__services-list list-unstyled">
                                    <li>
                                        <Link href="about"><span className="icon-angle-left"></span>Ui Design</Link>
                                    </li>
                                    <li>
                                        <Link href="about"><span className="icon-angle-left"></span>Ux Design</Link>
                                    </li>
                                    <li>
                                        <Link href="about"><span className="icon-angle-left"></span>Digital Marketing</Link>
                                    </li>
                                    <li>
                                        <Link href="about"><span className="icon-angle-left"></span>Video Editing</Link>
                                    </li>
                                    <li>
                                        <Link href="about"><span className="icon-angle-left"></span>Pc Repairs</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="footer-widget__column footer-widget__news">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Recent News</h3>
                                </div>
                                <ul className="footer-widget__news-list list-unstyled">
                                    <li>
                                        <div className="footer-widget__news-img">
                                            <img src="assets/images/news/footer-widget-two-news-img-1.jpg" alt=""/>
                                            <Link href="#"><span className="fab fa-instagram"></span></Link>
                                        </div>
                                        <div className="footer-widget__news-content">
                                            <h3 className="footer-widget__news-title"><Link href="blog-details">A
                                                    comprehensive<br/> security solution</Link></h3>
                                            <p className="footer-widget__news-date"><span className="icon-calender"></span>17
                                                oct 23</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="footer-widget__news-img">
                                            <img src="assets/images/news/footer-widget-two-news-img-2.jpg" alt=""/>
                                            <Link href="#"><span className="fab fa-instagram"></span></Link>
                                        </div>
                                        <div className="footer-widget__news-content">
                                            <h3 className="footer-widget__news-title"><Link href="blog-details">Top-notch
                                                    security<br/> system</Link></h3>
                                            <p className="footer-widget__news-date"><span className="icon-calender"></span>17
                                                oct 23</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                            <div className="footer-widget__column footer-widget__newsletter">
                                <div className="footer-widget__title-box">
                                    <h3 className="footer-widget__title">Get Free Estimate</h3>
                                </div>
                                <p className="footer-widget__newsletter-text">Lorem Ipsum is simply is dumiomy is<br/> text
                                    Lorem
                                    Ipsum </p>
                                <form className="footer-widget__newsletter-form">
                                    <div className="footer-widget__newsletter-input-box">
                                        <input type="email" placeholder="Your email..." name="email"/>
                                        <button type="submit" className="footer-widget__newsletter-btn"><i
                                                className="icon-paper-plan"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="site-footer__bottom-inner">
                        <p className="site-footer__bottom-text">© Starplate 2024 | All Rights Reserved</p>
                        <ul className="list-unstyled site-footer__bottom-menu">
                            <li><Link href="about">Trams & Condition</Link></li>
                            <li><Link href="about">Privacy Policy</Link></li>
                            <li><Link href="contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        {/*Site Footer Two End*/}

        </>
    )
}
