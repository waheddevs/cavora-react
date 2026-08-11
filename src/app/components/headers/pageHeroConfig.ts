import { PageHeroProps } from "app/types/layout"

export const pageHeroes: Record<string, PageHeroProps> = {
  "/about": {
    navbarClass: "about-navbar",
    tagline: "Who We Are",
    title: "About Us",
    crumbs: [{ label: "About Us" }],
  },
  "/blog": {
    navbarClass: "blog-navbar",
    heroClass: "blog-hero",
    tagline: "Travel Stories",
    title: "Blog List",
    crumbs: [{ label: "Blog" }],
  },
  "/blog-details": {
    navbarClass: "blog-navbar",
    heroClass: "blog-hero",
    tagline: "Travel Stories",
    title: "Blog Details",
    crumbs: [{ label: "Blog", to: "/blog" }, { label: "Details" }],
  },
  "/contact": {
    navbarClass: "contact-navbar",
    heroClass: "contact-hero",
    tagline: "Get in Touch",
    title: "Contact us",
    crumbs: [{ label: "Contact us" }],
  },
  "/faq": {
    navbarClass: "faq-navbar",
    heroClass: "faq-hero",
    tagline: "Help Center",
    title: "Frequently Asked Questions",
    crumbs: [{ label: "FAQ" }],
  },
  "/tour": {
    navbarClass: "tour-navbar",
    heroClass: "tour-hero",
    tagline: "Explore The World",
    title: "Listing Tours",
    crumbs: [{ label: "Tour List" }],
  },
}
