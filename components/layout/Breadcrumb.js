import Link from "next/link";

export default function Breadcrumb({ breadcrumbTitle, bgImage }) {
    return (
        <>
            {/* Page Header Start */}
            <section
    className="page-header"
    style={{
        backgroundImage: bgImage
            ? `url(${bgImage})`
            : 'url(/assets/images/default-bg.png)', // Fallback background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '400px', // Ensure enough height for the section
    }}
>

                <div className="container">
                    <div className="page-header__inner">
                        <h2>{breadcrumbTitle}</h2>
                        <div className="thm-breadcrumb__inner">
                            <ul className="thm-breadcrumb list-unstyled">
                                <li><Link href="/">Home</Link></li>
                                <li><span className="icon-angle-left"></span></li>
                                <li>{breadcrumbTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* Page Header End */}
        </>
    );
}
