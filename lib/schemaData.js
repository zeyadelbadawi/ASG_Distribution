export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ASG Distribution",
  url: "https://asgdistribution.com",
  logo: "https://asgdistribution.com/assets/images/resources/logo.png",
  description:
    "ASG Distribution delivers top-tier integrated security systems featuring high-quality, competitive pricing, and the industry's longest warranty period.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Dr Mohamed Awad Street From Makram Abied",
    addressLocality: "Cairo",
    postalCode: "11511",
    addressCountry: "EG",
  },
  telephone: "+2010506388 00",
  email: "info@asgdistribution.com",
  sameAs: [
    "https://www.facebook.com/ASGDistribution",
    "https://www.linkedin.com/company/asg-distribution",
  ],
  knowsAbout: [
    "Security Systems",
    "CCTV Surveillance",
    "Access Control",
    "Home Automation",
    "Parking Management",
    "Networking Solutions",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Arab Security Group",
    url: "https://arab-security.com",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.8,
    ratingCount: 247,
  },
}

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ASG Distribution",
  image: "https://asgdistribution.com/assets/images/resources/logo.png",
  description: "Security Systems and Home Automation Solutions Provider",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Dr Mohamed Awad Street From Makram Abied",
    addressLocality: "Cairo",
    postalCode: "11511",
    addressCountry: "EG",
  },
  telephone: "+2010506388 00",
  email: "info@asgdistribution.com",
  url: "https://asgdistribution.com",
  priceRange: "$$",
  areaServed: "EG",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
}
