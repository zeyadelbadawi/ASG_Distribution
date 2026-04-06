import { Nunito, Montserrat } from 'next/font/google'

export const montserratAlternates = Montserrat({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: "--lockdown-font-two",
    display: 'swap',
})
export const nunito = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--lockdown-font",
    display: 'swap',
})
