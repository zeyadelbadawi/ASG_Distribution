"use client"

import { useEffect, useState } from "react"

export function useDeviceOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState("4g")

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024)
      setIsTouchDevice(() => {
        return (
          typeof window !== "undefined" &&
          (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || "ontouchstart" in window)
        )
      })
    }

    const checkConnection = () => {
      if ("connection" in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
        if (connection) {
          const effectiveType = connection.effectiveType || "4g"
          setConnectionSpeed(effectiveType)
        }
      }
    }

    checkDevice()
    checkConnection()

    window.addEventListener("resize", checkDevice)

    if ("connection" in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        connection.addEventListener("change", checkConnection)
      }
    }

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  return { isMobile, isTablet, isTouchDevice, connectionSpeed }
}
