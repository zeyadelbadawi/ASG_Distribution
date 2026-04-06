import "react-modal-video/css/modal-video.css"
import "/public/assets/css/lockdown.css"
import "/public/assets/css/lockdown-responsive.css"
import "swiper/css"
// import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "./responsive-menu.css"
import { nunito, montserratAlternates } from "@/lib/font"
import dynamic from "next/dynamic"
import { organizationSchema } from "@/lib/schemaData"
import StructuredData from "@/components/StructuredData"

const DataBg = dynamic(() => import("@/components/elements/DataBg"), {
  ssr: false,
  loading: () => null,
})

export const metadata = {
  title: "ASG Distribution - Security Systems & Home Automation",
  description:
    "ASG Distribution delivers top-tier integrated security systems featuring high-quality, competitive pricing, and the industry's longest warranty period. CCTV, access control, and automation solutions.",
  keywords:
    "security systems, CCTV, access control, home automation, parking solutions, networking, video surveillance, integrated security",
  authors: [{ name: "ASG Distribution" }],
  creator: "ASG Distribution",
  publisher: "ASG Distribution",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${montserratAlternates.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="/public/assets/css/lockdown.css" />
        <link rel="preload" as="style" href="/public/assets/css/lockdown-responsive.css" />
        <StructuredData data={organizationSchema} />
      </head>
      <body>{children}</body>
    </html>
  )
}
