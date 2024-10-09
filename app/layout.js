import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/lockdown.css"
import "/public/assets/css/lockdown-responsive.css"
import 'swiper/css'
// import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import {nunito, montserratAlternates} from '@/lib/font'
export const metadata = {
    title: 'ASG Distribution',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${nunito.variable} ${montserratAlternates.variable}`}>
            <body>{children}</body>
        </html>
    )
}
