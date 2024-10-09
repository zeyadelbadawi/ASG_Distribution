
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Member Details">
        {/*Start Team Details*/}
        <section className="team-details">
            <div className="container">
                <div className="team-details__top">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="team-details__top-left">
                                <div className="team-details__top-img">
                                    <img src="assets/images/team/team-details-img1.jpg" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="team-details__top-right">
                                <div className="team-details__top-content">
                                    <p className="team-details__top-title">web developer & designer</p>
                                    <h3 className="team-details__top-name">Jessica Brown</h3>
                                    <div className="team-details__social">
                                        <Link href="#"><i className="fab fa-twitter"></i></Link>
                                        <Link href="#"><i className="fab fa-facebook"></i></Link>
                                        <Link href="#"><i className="fab fa-pinterest-p"></i></Link>
                                        <Link href="#"><i className="fab fa-instagram"></i></Link>
                                    </div>
                                    <p className="team-details__top-text-1">I help my clients stand out and they <br/> help
                                        me grow.</p>
                                    <p className="team-details__top-text-2">Lorem ipsum dolor sit amet, con adipiscing elit
                                        tiam convallis elit id impedie. Quisq commodo simply free ornare tortor.
                                        Excepteur sint occaecat sunt in culpa qui officia deserunt mollit.</p>
                                    <p className="team-details__top-text-3">If you are going to use a passage of Lorem
                                        Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                                        middle of text.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="team-details__certificate">
                    <div className="team-details__certificate-title text-center">
                        <h2>I’m professional and certified web developer & designer</h2>
                    </div>

                    <ul className="team-details__certificate-list list-unstyled">
                        {/*Start Team Details Certificate Single */}
                        <li className="team-details__certificate-single">
                            <div className="team-details__certificate-single-img">
                                <img src="assets/images/team/team-details__certificate-img1.jpg" alt="" />
                            </div>
                        </li>
                        {/*End Team Details Certificate Single*/}

                        {/*Start Team Details Certificate Single */}
                        <li className="team-details__certificate-single">
                            <div className="team-details__certificate-single-img">
                                <img src="assets/images/team/team-details__certificate-img2.jpg" alt="" />
                            </div>
                        </li>
                        {/*End Team Details Certificate Single*/}

                        {/*Start Team Details Certificate Single */}
                        <li className="team-details__certificate-single">
                            <div className="team-details__certificate-single-img">
                                <img src="assets/images/team/team-details__certificate-img3.jpg" alt="" />
                            </div>
                        </li>
                        {/*End Team Details Certificate Single*/}

                        {/*Start Team Details Certificate Single */}
                        <li className="team-details__certificate-single">
                            <div className="team-details__certificate-single-img">
                                <img src="assets/images/team/team-details__certificate-img4.jpg" alt="" />
                            </div>
                        </li>
                        {/*End Team Details Certificate Single*/}
                    </ul>
                </div>
            </div>
        </section>
        {/*End Team Details */}


        {/*Start Team Details Bottom */}
        <section className="team-details-bottom">
            <div className="container">
                <div className="row">
                    {/*Start Team Details Bottom Left*/}
                    <div className="col-xl-7 col-lg-6">
                        <div className="team-details-bottom__left">
                            <div className="section-title text-left">
                                <span className="section-title__tagline">read about me</span>
                                <h2 className="section-title__title">I make the quality design <br/> & develop websites
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/*End Team Details Bottom Left*/}

                    {/*Start Team Details Bottom Right*/}
                    <div className="col-xl-5 col-lg-6">
                        <div className="team-details-bottom__right">
                            <div className="team-details-bottom__progress">
                                <div className="team-details-bottom__progress-single">
                                    <h4 className="team-details-bottom__progress-title">Cyber Fighter</h4>
                                    <div className="bar">
                                        <div className="bar-inner count-bar" data-percent="80%" style={{ width: '80%' }}>
                                            <div className="count-text">80%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="team-details-bottom__progress-single">
                                    <h4 className="team-details-bottom__progress-title">Online Secure</h4>
                                    <div className="bar">
                                        <div className="bar-inner count-bar" data-percent="68%" style={{ width: '68%' }}>
                                            <div className="count-text">68%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="team-details-bottom__progress-single">
                                    <h4 className="team-details-bottom__progress-title">Safe Enviro</h4>
                                    <div className="bar">
                                        <div className="bar-inner count-bar" data-percent="58%" style={{ width: '58%' }}>
                                            <div className="count-text">58%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Team Details Bottom Right*/}
                </div>
            </div>
        </section>
        {/*End Team Details Bottom */}

        {/*CTA One Start */}
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
                                        <input type="email" placeholder="Your email..." name="email"/>
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
        {/*CTA One End */}
        

            </Layout>
        </>
    )
}