import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle, bgImage, hideHomeBreadcrumb }) {
  return (
    <>
      {/* Page Header Start */}
      <section
        className="page-header"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "url(/assets/images/default-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111827",
          aspectRatio: "clamp(1, 1374 / 326, 4)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "20px 0",
          minHeight: "clamp(300px, 40vh, 400px)",
        }}
      >
        <div
          className="page-header__overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        ></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="page-header__inner">
            <h2
              style={{
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {breadcrumbTitle}
            </h2>
            {!hideHomeBreadcrumb && (
              <div className="thm-breadcrumb__inner">
                <ul className="thm-breadcrumb list-unstyled">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <span className="icon-angle-left"></span>
                  </li>
                  <li>{breadcrumbTitle}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Page Header End */}
    </>
  )
}
