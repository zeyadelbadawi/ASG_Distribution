'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Layout from "@/components/layout/Layout"
import Storage from "@/components/sections/home1/Storage"

import {
  Zap,
  Lock,
  BarChart3,
  Users,
  Smartphone,
  Globe,
  Clock,
  Cpu,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Instagram,
} from 'lucide-react'


export default function SkidataPage() {
  const [visibleSections, setVisibleSections] = useState({})
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const sectionRefs = useRef({})
  const testimonialsRef = useRef(null)
  useEffect(() => {
    const slider = testimonialsRef.current
    if (!slider) return
  
    let isDown = false
    let startX
    let scrollLeft
  
    const startDragging = (e) => {
      isDown = true
      slider.classList.add('dragging')
      startX = e.pageX || e.touches[0].pageX
      scrollLeft = slider.scrollLeft
    }
  
    const stopDragging = () => {
      isDown = false
      slider.classList.remove('dragging')
    }
  
    const move = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX || e.touches[0].pageX
      const walk = (x - startX) * 1.2
      slider.scrollLeft = scrollLeft - walk
    }
  
    slider.addEventListener('mousedown', startDragging)
    slider.addEventListener('mouseleave', stopDragging)
    slider.addEventListener('mouseup', stopDragging)
    slider.addEventListener('mousemove', move)
  
    slider.addEventListener('touchstart', startDragging)
    slider.addEventListener('touchend', stopDragging)
    slider.addEventListener('touchmove', move)
  
    return () => {
      slider.removeEventListener('mousedown', startDragging)
      slider.removeEventListener('mouseleave', stopDragging)
      slider.removeEventListener('mouseup', stopDragging)
      slider.removeEventListener('mousemove', move)
  
      slider.removeEventListener('touchstart', startDragging)
      slider.removeEventListener('touchend', stopDragging)
      slider.removeEventListener('touchmove', move)
    }
  }, [])
  
  // Critical CSS to prevent FOUC
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      body { background: #ffffff; }
    `
    document.head.insertBefore(style, document.head.firstChild)
  }, [])
  
  // Testimonials carousel
  const testimonials = [
    {
      quote: "SKIDATA's parking solution has revolutionized how we manage our facilities. The efficiency gains are remarkable.",
      author: "Ahmed Mohamed",
      role: "Facility Manager, Cairo Business Complex"
    },
    {
      quote: "The integration was seamless and the support team was exceptional. We've seen significant revenue improvement.",
      author: "Fatima Al-Mansouri",
      role: "Operations Director, Dubai Mall Parking"
    },
    {
      quote: "Best investment for our parking operations. The system is reliable, scalable, and user-friendly.",
      author: "Hassan Al-Zaidi",
      role: "IT Manager, Riyadh Development Authority"
    },
    {
      quote: "Arab Security Group delivered exceptional service and quality when implementing the commercial parking solution from SKIDATA at Capital Walk in the New Administration Capital. Their professional team executed the project seamlessly and efficiently, providing us with a comprehensive solution that perfectly met our needs. We commend their dedication and hard work in delivering results that exceeded our expectations. It was a pleasure working with Arab Security Group, and we look forward to collaborating with them again in the future.",
      author: "The New Administration Capital",
      //role: "IT Manager, Riyadh Development Authority"
    }
  ]
  
  // Carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // IntersectionObserver for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.15 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Scroll listener for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Video autoplay management
  useEffect(() => {
    const videoElements = document.querySelectorAll('.section-video video')
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => {})
          } else {
            entry.target.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    videoElements.forEach((video) => videoObserver.observe(video))
    return () => videoObserver.disconnect()
  }, [])

  return (
    <>
    <Layout
    headerStyle={3}
    footerStyle={1}
  >
    <div className="skidata-container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #fafafa;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .skidata-container {
          width: 100%;
          overflow-x: hidden;
        }

        /* ===== HERO SECTION ===== */
        .section-hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  background: black;
}

        .section-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(13, 31, 86, 0.75) 0%, rgba(13, 31, 86, 0.65) 40%, rgba(255, 110, 18, 0.7) 100%);
          z-index: 1;
        }



        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          padding: 2rem;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-tagline {
          font-size: clamp(0.875rem, 2vw, 1.125rem);
          color: #ff6e12;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          animation: fadeInUp 1s ease-out 0.1s both;
          font-weight: 700;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: #ffffff;
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .hero-description {
          font-size: clamp(0.95rem, 1.8vw, 1.125rem);
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin: 0 auto;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        /* ===== INTRO SECTION ===== */
        .section-intro {
          padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
          background: #ffffff;
          border-top: 1px solid rgba(15, 46, 92, 0.1);
        }

        .intro-header {
          max-width: 1200px;
          margin: 0 auto clamp(2rem, 5vw, 4rem);
        }

        .intro-letter-spaced {
          font-size: clamp(0.75rem, 1.5vw, 0.95rem);
          color: #ff6e12;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 1.5rem;
          animation: letterFadeIn 1.2s ease-out;
          opacity: ${visibleSections['intro'] ? 1 : 0};
          transition: opacity 0.6s ease-out;
        }

        @keyframes letterFadeIn {
          from {
            opacity: 0;
            letter-spacing: 0.2em;
          }
          to {
            opacity: 1;
            letter-spacing: 0.4em;
          }
        }

        .intro-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: #0f2e5c;
          margin-bottom: 1.5rem;
          font-weight: 800;
          line-height: 1.2;
          opacity: ${visibleSections['intro'] ? 1 : 0};
          transform: ${visibleSections['intro'] ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.8s ease-out 0.1s;
        }

        .intro-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #1ec8c8;
          margin-bottom: 2rem;
          opacity: ${visibleSections['intro'] ? 1 : 0};
          transform: ${visibleSections['intro'] ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.8s ease-out 0.2s;
        }

        .intro-paragraph {
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: #555;
          line-height: 1.8;
          max-width: 900px;
          opacity: ${visibleSections['intro'] ? 1 : 0};
          transform: ${visibleSections['intro'] ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.8s ease-out 0.3s;
        }

        /* ===== EXPERIENCE SECTION ===== */
        .section-experience {
          padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
          background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
        }

        .experience-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-heading {
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 800;
          color: #0f2e5c;
          margin-bottom: 0.5rem;
        }

        .section-subheading {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #ff6e12;
          margin-bottom: 2.5rem;
          font-weight: 600;
        }

        .experience-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: start;
        }

        @media (max-width: 768px) {
          .experience-content {
            grid-template-columns: 1fr;
          }
        }

        .experience-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          order: -1;
        }

        .experience-image {
          width: 100%;
          height: auto;
          max-width: 500px;
          object-fit: contain;
          filter: drop-shadow(0 10px 30px rgba(13, 31, 86, 0.15));
          animation: slideInLeft 0.8s ease-out;
        }

        @media (max-width: 768px) {
          .experience-image-wrapper {
            order: 0;
            margin-bottom: 2rem;
          }
        }

        .experience-list {
          list-style: none;
        }

        .experience-item {
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
          padding-left: 2.5rem;
          position: relative;
          opacity: ${visibleSections['experience'] ? 1 : 0};
          transform: ${visibleSections['experience'] ? 'translateX(0)' : 'translateX(-20px)'};
          transition: all 0.6s ease-out;
        }

        .experience-item::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 0;
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #ff6e12 0%, #ff8c3a 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .experience-item:nth-child(1) { transition-delay: 0s; }
        .experience-item:nth-child(2) { transition-delay: 0.1s; }
        .experience-item:nth-child(3) { transition-delay: 0.2s; }
        .experience-item:nth-child(4) { transition-delay: 0.3s; }
        .experience-item:nth-child(5) { transition-delay: 0.4s; }

        .experience-item strong {
          display: block;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: #0f2e5c;
          margin-bottom: 0.5rem;
        }

        .experience-item span {
          font-size: clamp(0.9rem, 1.6vw, 1rem);
          color: #666;
          line-height: 1.6;
        }

        /* ===== FORM ===== */
        .contact-form {
          background: white;
          padding: clamp(2rem, 4vw, 3rem);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(15, 46, 92, 0.08);
          opacity: ${visibleSections['experience'] ? 1 : 0};
          transform: ${visibleSections['experience'] ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease-out 0.2s;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #0f2e5c;
          font-size: clamp(0.9rem, 1.6vw, 1rem);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: clamp(0.75rem, 2vw, 1rem);
          border: 2px solid #e0e7ff;
          border-radius: 8px;
          font-size: clamp(0.95rem, 1.8vw, 1rem);
          font-family: inherit;
          transition: all 0.3s ease;
          background: #f9fafc;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3a86ff;
          background: white;
          box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-submit {
          background: linear-gradient(135deg, #ff6e12 0%, #ff8c3a 100%);
          color: white;
          padding: clamp(0.875rem, 2vw, 1.125rem) clamp(1.5rem, 4vw, 2.5rem);
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(255, 110, 18, 0.3);
        }

        /* ===== SOLUTIONS SECTION ===== */
        .section-solutions {
          padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
          background: #ffffff;
        }

        .solutions-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(1.5rem, 3vw, 2.5rem);
          margin-top: 3rem;
        }

        .solution-card {
          background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
          padding: clamp(1.75rem, 4vw, 2.5rem);
          border-radius: 12px;
          border: 1px solid rgba(58, 134, 255, 0.1);
          transition: all 0.4s ease;
          opacity: ${visibleSections['solutions'] ? 1 : 0};
          transform: ${visibleSections['solutions'] ? 'translateY(0)' : 'translateY(30px)'};
        }

        .solution-card:nth-child(1) { transition-delay: 0s; }
        .solution-card:nth-child(2) { transition-delay: 0.1s; }
        .solution-card:nth-child(3) { transition-delay: 0.2s; }
        .solution-card:nth-child(4) { transition-delay: 0.3s; }
        .solution-card:nth-child(5) { transition-delay: 0.4s; }
        .solution-card:nth-child(6) { transition-delay: 0.5s; }
        .solution-card:nth-child(7) { transition-delay: 0.6s; }
        .solution-card:nth-child(8) { transition-delay: 0.7s; }

        .solution-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(255, 110, 18, 0.15);
          border-color: #ff6e12;
        }

        .solution-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff6e12 0%, #ff8c3a 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .solution-title {
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 700;
          color: #0f2e5c;
          margin-bottom: 0.75rem;
        }

        .solution-text {
          font-size: clamp(0.9rem, 1.6vw, 1rem);
          color: #666;
          line-height: 1.6;
        }

        /* ===== VIDEO SECTION ===== */
       
.section-video {
  position: relative;
  width: 100%;
  padding: 0;
  background: linear-gradient(135deg, #0d1f56 0%, #1a3a5c 100%);
}

        .video-wrapper {
          width: 100%;
          border-radius: 0;
          overflow: hidden;
          box-shadow: none;
          opacity: 1;
          transform: scale(1);
          transition: all 0.8s ease-out;
          aspect-ratio: 16 / 9;
        }

.video-wrapper video {
  width: 100%;
  height: auto;
  display: block;
  background: #000;
}

        /* ===== CANVA SECTION ===== */
        .section-canva {
          padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
          background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
        }

        .canva-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .canva-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(15, 46, 92, 0.08);
          opacity: ${visibleSections['canva'] ? 1 : 0};
          transform: ${visibleSections['canva'] ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease-out;
        }

        .canva-embed {
          margin-top: 2rem;
        }

        /* ===== TESTIMONIALS SECTION ===== */
        .section-testimonials {
          padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
          background: white;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
        }

.testimonials-carousel {
  overflow-x: auto;
  cursor: grab;
    scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  padding-bottom: 1rem;
  scroll-behavior: smooth;
}

.testimonials-carousel.dragging {
  cursor: grabbing;
}

.testimonials-carousel::-webkit-scrollbar {
  display: none;
}

        .testimonial-card {
          flex: 0 0 100%;
  max-width: 100%;

          background: white;
          padding: clamp(2.5rem, 5vw, 4rem);
          border-radius: 16px;
          box-shadow: 0 15px 45px rgba(13, 31, 86, 0.12);
          border: 2px solid #ff6e12;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: ${visibleSections['testimonials'] ? 1 : 0};
          transform: ${visibleSections['testimonials'] ? 'translateY(0)' : 'translateY(20px)'};
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
            scroll-snap-align: start;

        }
          .testimonials-track {
  display: flex;
  gap: 2rem;
}

        .testimonial-quote {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #0f2e5c;
          margin-bottom: 2rem;
          font-style: italic;
          line-height: 1.8;
          font-weight: 500;
        }

        .testimonial-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6e12 0%, #ff8c3a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .testimonial-author {
          font-weight: 700;
          color: #0f2e5c;
          font-size: clamp(0.95rem, 1.8vw, 1.05rem);
        }

        .testimonial-role {
          font-size: clamp(0.85rem, 1.5vw, 0.95rem);
          color: #ff6e12;
          font-weight: 600;
        }

        .testimonial-nav {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: center;
          align-items: center;
        }

        .testimonial-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #ff6e12;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .testimonial-dot.active {
          background: #ff6e12;
          transform: scale(1.2);
        }

        .carousel-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #ff6e12;
          background: white;
          color: #ff6e12;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }

        .carousel-button:hover {
          background: #ff6e12;
          color: white;
        }

        /* ===== INSTAGRAM SECTION ===== */
        .section-instagram {
          padding: clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
          background: linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%);
        }

        .instagram-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .instagram-heading {
          text-align: center;
          margin-bottom: 1rem;
        }

        .instagram-subheading {
          text-align: center;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: #666;
          margin-bottom: 3rem;
        }

        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .instagram-item {
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background: #e0e7ff;
          opacity: ${visibleSections['instagram'] ? 1 : 0};
          transform: ${visibleSections['instagram'] ? 'scale(1)' : 'scale(0.9)'};
          transition: all 0.5s ease-out;
        }

        .instagram-item:nth-child(1) { transition-delay: 0s; }
        .instagram-item:nth-child(2) { transition-delay: 0.05s; }
        .instagram-item:nth-child(3) { transition-delay: 0.1s; }
        .instagram-item:nth-child(4) { transition-delay: 0.15s; }
        .instagram-item:nth-child(5) { transition-delay: 0.2s; }
        .instagram-item:nth-child(6) { transition-delay: 0.25s; }

        .instagram-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .instagram-item:hover img {
          transform: scale(1.1);
        }

        .instagram-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 110, 18, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          cursor: pointer;
        }

        .instagram-item:hover .instagram-overlay {
          opacity: 1;
        }

        .instagram-icon {
          font-size: 2rem;
          color: white;
        }
          /* ===== INTRO LAYOUT FIX ===== */
.intro-layout {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.intro-text {
  display: flex;
  flex-direction: column;
}

.intro-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-image img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 12px 30px rgba(13, 31, 86, 0.15));
  border-radius: 8px;
}

/* Mobile */
@media (max-width: 768px) {
  .intro-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .intro-image {
    order: -1; /* image on top on mobile */
  }
}


        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .experience-content {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 1.5rem;
          }

          .section-intro,
          .section-experience,
          .section-solutions,
          .section-canva,
          .section-testimonials,
          .section-instagram {
            padding: 2rem 1rem;
          }

          .section-heading {
            margin-bottom: 1rem;
          }

          .solutions-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .section-heading {
            font-size: 1.5rem;
          }

          .experience-item {
            padding-left: 2rem;
            margin-bottom: 1.5rem;
          }

          .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* SECTION 1: HERO */}
      <section
  className="section-hero section-video"
  ref={(el) => (sectionRefs.current.hero = el)}
  id="hero"
>
  <video
    className="hero-video"
    muted
    loop
    autoPlay
    playsInline
    preload="auto"
  >
    <source src="/assets/images/parking-video.mp4" type="video/mp4" />
  </video>

  <div className="hero-content">
    <div className="hero-tagline">More Professional, More Reliable Solutions</div>
    <h1 className="hero-title">SKIDATA Parking Solutions</h1>
    <h2 className="hero-subtitle">
      Smart, Secure & Future-Ready Parking Systems
    </h2>
    <p className="hero-description">
      SKIDATA delivers world-class smart parking solutions designed to streamline operations,
      enhance user experience, and maximize efficiency.
    </p>
  </div>
</section>

      {/* SECTION 2: INTRO */}
      <section
        className="section-intro"
        ref={(el) => (sectionRefs.current.intro = el)}
        id="intro"
      >
       <div className="intro-layout">
  <div className="intro-text">
    <div className="intro-letter-spaced">S K I D A T A</div>
    <h2 className="intro-title">Car Smart Parking Solutions</h2>
    <h3 className="intro-subtitle">
      Revolutionizing Parking: SKIDATA's Smart Car Parking Solutions in Egypt
    </h3>
    <p className="intro-paragraph">
      As urbanization continues to rise in Egypt, the demand for efficient and intelligent parking solutions has
      never been greater. SKIDATA, a global leader in smart parking technology, provides innovative systems
      designed to streamline parking operations, reduce congestion, and enhance the overall experience for both
      drivers and operators.
    </p>
  </div>

  <div className="intro-image">
    <img
      src="/assets/images/traffic-congestion.png"
      alt="SKIDATA Parking Equipment Solutions"
    />
  </div>
</div>

      </section>

      {/* SECTION 3: EXPERIENCE + FORM */}
      <section
        className="section-experience"
        ref={(el) => (sectionRefs.current.experience = el)}
        id="experience"
      >
        <div className="experience-container">
          <h2 className="section-heading">Our Experience</h2>
          <h3 className="section-subheading">Top 5 Reasons to Choose ASG Distribution</h3>

          <div className="experience-content">

            <div>
              <ul className="experience-list">
                <li className="experience-item">
                  <strong>15+ Years of Excellence</strong>
                  <span>Over 15 years of experience in security and surveillance solutions across the Middle East and Gulf region.</span>
                </li>
                <li className="experience-item">
                  <strong>Diverse Portfolio</strong>
                  <span>A large and diverse portfolio of successful projects in both government and private sectors.</span>
                </li>
                <li className="experience-item">
                  <strong>Ministry of Defense Partner</strong>
                  <span>Official solution provider for the Egyptian Ministry of Defense in road blockers and traffic barrier systems.</span>
                </li>
                <li className="experience-item">
                  <strong>Ministry of Interior Provider</strong>
                  <span>Official provider for the Egyptian Ministry of Interior in safety, surveillance, and ITS.</span>
                </li>
                <li className="experience-item">
                  <strong>Integrated Support</strong>
                  <span>High-quality integrated solutions with competitive pricing, long warranties, and full technical support.</span>
                </li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" placeholder="Your Company" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us about your parking solution needs..." required />
              </div>
              <button type="submit" className="form-submit">
                Request Information
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOLUTIONS */}
      <section
        className="section-solutions"
        ref={(el) => (sectionRefs.current.solutions = el)}
        id="solutions"
      >
        <div className="solutions-container">
          <h2 className="section-heading">ASG Distribution Smart Car Parking Solutions</h2>

          <div className="solutions-grid">
            <div className="solution-card">
              <div className="solution-icon"><Zap size={32} /></div>
              <h3 className="solution-title">Intuitive Design</h3>
              <p className="solution-text">High usability and user-friendly interfaces for seamless parking management.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><BarChart3 size={32} /></div>
              <h3 className="solution-title">Flexible Payment</h3>
              <p className="solution-text">Multiple payment options tailored to modern parking scenarios.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><BarChart3 size={32} /></div>
              <h3 className="solution-title">Revenue Optimization</h3>
              <p className="solution-text">Maximize parking revenue with intelligent pricing algorithms.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><Clock size={32} /></div>
              <h3 className="solution-title">Versatile Ticketing</h3>
              <p className="solution-text">Flexible ticketing systems for all parking scenarios and durations.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><Smartphone size={32} /></div>
              <h3 className="solution-title">Online Reservation</h3>
              <p className="solution-text">Reserve parking slots in advance with real-time availability updates.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><Lock size={32} /></div>
              <h3 className="solution-title">Mobile Payment</h3>
              <p className="solution-text">Contactless payment without requiring dedicated apps.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><Cpu size={32} /></div>
              <h3 className="solution-title">EV Charging</h3>
              <p className="solution-text">Integrated EV charging with combined parking and charging payment.</p>
            </div>
            <div className="solution-card">
              <div className="solution-icon"><Globe size={32} /></div>
              <h3 className="solution-title">Cloud Integration</h3>
              <p className="solution-text">Seamless cloud-based integration for centralized parking management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: VIDEO */}
      <section
        className="section-video"
        ref={(el) => (sectionRefs.current.video = el)}
        id="video"
      >
        <div className="video-wrapper-container">
          <div className="video-wrapper">
            <video
              muted
              loop
              autoPlay
              playsInline
              controlsList="nodownload"
            >
              <source src="/assets/images/parking-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* SECTION 6: CANVA */}
      <section
        className="section-canva"
        ref={(el) => (sectionRefs.current.canva = el)}
        id="canva"
      >
        <div className="canva-container">
          <h2 className="section-heading"style={{ marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Success Cases</h2>
          <p style={{ marginTop: '1.5rem', marginBottom: '1.5rem',color: '#666', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', textAlign: 'center'  }}>
              View our latest parking solutions case studies and successful implementations:
            </p>
          <div className="canva-content">
           
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "0",
                paddingTop: "56.25%",
                paddingBottom: "0",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                marginBottom: "60px",
                overflow: "hidden",
                borderRadius: "16px",
                willChange: "transform",
                background: "#ffffff",
              }}
            >
              <iframe
                loading="lazy"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "0",
                  border: "none",
                  padding: "0",
                  margin: "0",
                }}
                src="https://www.canva.com/design/DAGQP8PiMmI/KMBNORba1XK6GMFVE-nA7A/view?embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section
        className="section-testimonials"
        ref={(el) => (sectionRefs.current.testimonials = el)}
        id="testimonials"
      >
        <div className="testimonials-container">
          <h2 className="section-heading"style={{ textAlign: 'center' }}>Customer Testimonials</h2>
          <h3 className="section-subheading"style={{   textAlign: 'center' }}>What Our Clients Say About SKIDATA Solutions</h3>

          <div
  className="testimonials-carousel"
  ref={testimonialsRef}
>
  <div className="testimonials-track">
    {testimonials.map((item, index) => (
      <div key={index} className="testimonial-card">
        <p className="testimonial-quote">"{item.quote}"</p>

        <div className="testimonial-footer">
          <div className="testimonial-avatar">
            {item.author.charAt(0)}
          </div>
          <div>
            <div className="testimonial-author">{item.author}</div>
            <div className="testimonial-role">{item.role}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </section>
      <Storage />

      {/* SECTION 8: INSTAGRAM FEED */}
      <section
        className="section-instagram"
        ref={(el) => (sectionRefs.current.instagram = el)}
        id="instagram"
      >
        <div className="instagram-container">
          <h2 className="section-heading instagram-heading">Instagram Feed</h2>
          <p className="instagram-subheading">Follow our Instagram account @ArabSecurityDisty</p>

          <div className="instagram-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="instagram-item">
                <img
                  src={`https://picsum.photos/300/300?random=${item}`}
                  alt={`Instagram post ${item}`}
                />
                <div className="instagram-overlay">
                  <div className="instagram-icon"><Instagram size={48} color="white" fill="white" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </Layout>
    </>
  )
  
}
