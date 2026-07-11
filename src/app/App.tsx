import { Box, ThemeProvider } from "@mui/material"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom"
import theme from "./MaterialTheme"
/* SCREENS */
import AboutPage from "./screens/aboutPage"
import BlogDetailsPage from "./screens/blogDetailsPage"
import BlogPage from "./screens/blogPage"
import ContactPage from "./screens/contactPage"
import FaqPage from "./screens/faqPage"
import TourPage from "./screens/tourPage"
import TourSinglePage from "./screens/tourSinglePage"
import UserPage from "./screens/userPage"
import HomePage from "./screens/homePage"
/* COMMON */
import PageHero from "./components/headers/PageHero"
import type { PageHeroProps } from "./components/headers/PageHero"
import HomeNavbar from "./components/headers/HomeNavbar"
import UserNavbar from "./components/headers/UserNavbar"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"
import { getTourById } from "js/TourSingle"
/* CSS */
import "css/app.css"
import "css/navbar.css"
import "css/footer.css"

/* Static page-hero config per route.
   Dynamic routes (tour-single) are handled in renderHeader below. */
const pageHeroes: Record<string, PageHeroProps> = {
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

function App() {
  const { pathname } = useLocation()
  const [params] = useSearchParams()

  /* Pick the correct header for the current route */
  const renderHeader = () => {
    if (pathname === "/") return <HomeNavbar />
    if (pathname === "/user") return <UserNavbar />

    // Tour single — hero title comes from the selected tour
    if (pathname === "/tour-single") {
      const tour = getTourById(params.get("id") ?? 1)
      return (
        <PageHero
          navbarClass="tour-single-navbar"
          heroClass="tour-single-hero"
          tagline="Adventure Awaits"
          title={tour ? tour.title : "Tour"}
          crumbs={[
            { label: "Tour List", to: "/tour" },
            { label: tour ? tour.title : "Details" },
          ]}
        />
      )
    }

    const config = pageHeroes[pathname]
    return config ? <PageHero {...config} /> : <HomeNavbar />
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Box className="app-layout">
        {renderHeader()}

        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog-details" element={<BlogDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/tour-single" element={<TourSinglePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>

        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
