import "react-modal-video/css/modal-video.css"
import "/public/assets/css/lockdown.css"
import "/public/assets/css/lockdown-responsive.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "./responsive-menu.css"
import { nunito, montserratAlternates } from "@/lib/font"
import dynamic from "next/dynamic"

const DataBg = dynamic(() => import("@/components/elements/DataBg"), {
  ssr: false,
  loading: () => null,
})

export const metadata = {
  title: "ASG Distribution",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${montserratAlternates.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  )
}
