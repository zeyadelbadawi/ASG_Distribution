"use client"
import { useState } from "react"
import Layout from "@/components/layout/Layout"
import Breadcrumb from "@/components/layout/Breadcrumb"

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      const response = await fetch("/api/submit-to-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "quote",
        }),
      })

      if (response.ok) {
        setStatus({ type: "success", message: "Your message has been sent. We'll be in touch shortly." })
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        setStatus({ type: "error", message: errorData.error || "Failed to send message." })
      }
    } catch (error) {
      setStatus({ type: "error", message: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout headerStyle={3}>
      <Breadcrumb breadcrumbTitle="Company Profile" />

      {/* Hero Section with Glassmorphism */}
      <section className="relative overflow-hidden bg-black py-20 lg:py-32 section-dark">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <span className="mb-4 inline-block rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-orange-500 uppercase">
              Exclusive Insights
            </span>
            <h1 className="mb-8 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
              Elevating Brands Through <span className="text-orange-500 italic">Innovation</span>
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Discover the story behind our journey, our values, and the vision that drives us to deliver excellence in
              every partnership we build.
            </p>
          </div>

          {/* Premium Presentation Container */}
          <div className="presentation-container relative mx-auto mt-12 max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-white/20 shadow-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-inner">
              <iframe
                loading="lazy"
                className="absolute inset-0 h-full w-full border-none"
                src="https://www.canva.com/design/DAGQP8PiMmI/KMBNORba1XK6GMFVE-nA7A/view?embed"
                allowFullScreen
              ></iframe>
            </div>
            {/* Floating Accent Elements */}
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Contact Section with Sophisticated Form */}
      <section className="bg-zinc-950 py-24 section-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
            {/* Left Column: Info */}
            <div className="max-w-xl lg:w-1/2">
              <h2 className="mb-6 text-3xl font-bold text-white lg:text-5xl leading-tight">
                Ready to take the <br /> <span className="text-orange-500">next step?</span>
              </h2>
              <p className="mb-10 text-lg text-zinc-400">
                Our team is ready to discuss how our solutions can be tailored to your specific needs. Reach out today
                and let's start a conversation.
              </p>

              <div className="grid gap-8">
                <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email Us</h3>
                    <p className="text-zinc-400">contact@asgdistry.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Visit Office</h3>
                    <p className="text-zinc-400">123 Business Plaza, Cairo, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-1/2 max-w-xl">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="custom-input w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="custom-input w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        placeholder="Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="custom-input w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        placeholder="+20 123 456 789"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="custom-input w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="custom-input w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-zinc-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-orange-600 p-4 text-lg font-bold text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70 shadow-lg shadow-orange-900/20"
                  >
                    <span className="relative z-10">{isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}</span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>

                  {status && (
                    <div
                      className={`animate-in fade-in slide-in-from-top-4 duration-500 rounded-xl border p-4 text-center text-sm font-medium ${
                        status.type === "success"
                          ? "border-green-500/20 bg-green-500/10 text-green-400"
                          : "border-red-500/20 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {status.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .section-dark {
          color-scheme: dark;
        }
        .presentation-container {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .custom-input {
          backdrop-filter: blur(8px);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeInDown 0.5s ease forwards;
        }
      `}</style>
    </Layout>
  )
}
