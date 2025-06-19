import Link from "next/link"
// import { useRouter } from "next/router"

export default function Menu() {
    // const router = useRouter()


    return (
        <>

            {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}


            <ul className="main-menu__list">
                <li>
                    <Link href="/">Home </Link>
                </li>
                <li className="dropdown">
                    <Link href="/Main_Vendors">Partners</Link>
                    <ul>
                        <li><Link href="/partners/dahua">Dahua Technology</Link></li>
                        <li><Link href="/partners/ruijiereyee">Ruijie | Reyee</Link></li>
                        <li><Link href="/partners/aruba">Aruba</Link></li>
                        <li><Link href="/partners/itc">ITC</Link></li>
                        <li><Link href="/partners/imou">Imou</Link></li>
                        <li><Link href="/partners/kstar">Kstar</Link></li>
                        <li><Link href="/partners/unitech">Unitech</Link></li>
                        <li><Link href="/partners/centurion">Centurion</Link></li>
                        <li><Link href="/partners/faac">FAAC Technologies</Link></li>
                        <li><Link href="/partners/magnetic">Magnetic</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="/services">Solutions</Link>
                    <ul>
                        <li className="dropdown">
                            <Link href="/services-details?tab=1">Security System</Link>
                        </li>
                        <li className="dropdown">
                            <Link href="/services-details?tab=2">Networking</Link>
                        </li>
                        <li className="dropdown">
                            <Link href="/services-details?tab=3">Physical Security</Link>
                        </li>
                        <li className="dropdown">
                            <Link href="/services-details?tab=4">Audio Visual Solutions</Link>
                        </li>
                        <li className="dropdown">
                            <Link href="/services-details?tab=5">Automations</Link>
                        </li>
                        <li className="dropdown">
                            <Link href="/services-details?tab=6">Parking Solutions</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
<li>
                    <Link href="/gallery">Gallery</Link>
                </li>
                <li>
                    <Link href="/blog">Blog</Link>

                </li>



            </ul>
        </>
    )
}
