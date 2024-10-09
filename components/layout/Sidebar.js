import Link from "next/link"

export default function Sidebar({ isSidebar, handleSidebar }) {
    return (
        <>

        <div className={`xs-sidebar-group info-group info-sidebar ${isSidebar ? "isActive" : ""}`}>
            <div className="xs-overlay xs-bg-black" onClick={handleSidebar}></div>
            <div className="xs-sidebar-widget">
                <div className="sidebar-widget-container">
                    <div className="widget-heading">
                        <Link href="#" className="close-side-widget" onClick={handleSidebar}>X</Link>
                    </div>
                    <div className="sidebar-textwidget">
                        <div className="sidebar-info-contents">
                            <div className="content-inner">
                                <div className="logo">
                                    <Link href="/"><img src="assets/images/resources/logo-3.png" alt="" /></Link>
                                </div>
                                <div className="content-box">
                                    <h4>About Us</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut
                                        labore et magna aliqua. Ut enim ad minim veniam laboris.</p>
                                </div>
                                <div className="form-inner">
                                    <h4>Get a free quote</h4>
                                    <form className="contact-form-validated">
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Name" required="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Email" required="" />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" placeholder="Message..."></textarea>
                                        </div>
                                        <div className="form-group message-btn">
                                            <button type="submit" className="thm-btn form-inner__btn">Submit Now</button>
                                        </div>
                                    </form>
                                    <div className="result"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </>
    )
}
