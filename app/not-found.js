import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Error404() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="404 Error">
            
                {/* Error Page Start */}
                <section className="error-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="error-page__inner">
                                    <div className="error-page__title-box">
                                        <h2 className="error-page__title">404</h2>
                                    </div>
                                    <h3 className="error-page__tagline">Sorry we can't find that page!</h3>
                                    <p className="error-page__text">The page you are looking for was never existed.</p>
                                    <form className="error-page__form">
                                        <div className="error-page__form-input">
                                            <input type="search" placeholder="Search here" />
                                            <button type="submit"><i className="icon-search"></i></button>
                                        </div>
                                    </form>
                                    <Link href="/" className="thm-btn error-page__btn">Back to home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Error Page End */}

                <section className="cta-one">
                    <div className="container">
                        <div className="cta-one__inner">
                            <div className="cta-one__bg"  style={{ backgroundImage: 'url(assets/images/backgrounds/cta-one-bg.jpg)' }} >
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6"></div>
                                <div className="col-xl-6 col-lg-6">
                                    <div className="cta-one__right">
                                        <h3 className="cta-one__title">Get Free Estimate</h3>
                                        <p className="cta-one__text">Lorem Ipsum is simply is dumiomy is text Lorem Ipsum </p>
                                        <form className="cta-one__form mc-form" data-url="MC_FORM_URL">
                                            <div className="cta-one__form-input-box">
                                                <input type="email" placeholder="Your email..." name="email" />
                                                <button type="submit" className="cta-one__btn thm-btn">Message</button>
                                            </div>
                                        </form>
                                        <div className="mc-form__response"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>

        </>
    )
}
