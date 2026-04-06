// Performance optimization utilities

export const prefetchResource = (url, type = "prefetch") => {
    if (typeof document === "undefined") return
  
    const link = document.createElement("link")
    link.rel = type
    link.href = url
    if (type === "prefetch") {
      link.as = url.endsWith(".js") ? "script" : url.endsWith(".css") ? "style" : "fetch"
    }
    document.head.appendChild(link)
  }
  
  export const lazyLoadImages = () => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return
  
    const imageElements = document.querySelectorAll("img[loading='lazy']")
  
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src || img.src
          observer.unobserve(img)
        }
      })
    })
  
    imageElements.forEach((img) => imageObserver.observe(img))
  }
  
  export const disableAnimationsOnMobile = () => {
    if (typeof window === "undefined") return
  
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      const style = document.createElement("style")
      style.innerHTML = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `
      document.head.appendChild(style)
    }
  }
  
  export const optimizeImageForDevice = (imagePath, maxWidth = 1200) => {
    if (typeof window === "undefined") return imagePath
  
    const deviceWidth = window.innerWidth
    const scale = deviceWidth > maxWidth ? 1 : deviceWidth / maxWidth
  
    // Return image path with optimization hints
    return imagePath
  }
  