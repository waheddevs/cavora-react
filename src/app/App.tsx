import { ThemeProvider } from "@mui/material"
import { Route, Routes, useLocation } from "react-router-dom"
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
import AboutNavbar from "./components/headers/AboutNavbar"
import BlogDetailsNavbar from "./components/headers/BlogDetailsNavbar"
import BlogNavbar from "./components/headers/BlogNavbar"
import ContactNavbar from "./components/headers/ContactNavbar"
import FaqNavbar from "./components/headers/FaqNavbar"
import TourNavbar from "./components/headers/TourNavbar"
import TourSingleNavbar from "./components/headers/TourSingleNavbar"
import UserNavbar from "./components/headers/UserNavbar"
import HomeNavbar from "./components/headers/HomeNavber"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"
/* CSS */
import "../css/app.css"
import "../css/navbar.css"
import "../css/footer.css"

function App() {
  const location = useLocation()
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <div className="app-layout">
        {location.pathname === "/about" ? (
          <AboutNavbar />
        ) : location.pathname === "/blog-details" ? (
          <BlogDetailsNavbar />
        ) : location.pathname === "/blog" ? (
          <BlogNavbar />
        ) : location.pathname === "/contact" ? (
          <ContactNavbar />
        ) : location.pathname === "/faq" ? (
          <FaqNavbar />
        ) : location.pathname === "/tour" ? (
          <TourNavbar />
        ) : location.pathname === "/tour-single" ? (
          <TourSingleNavbar />
        ) : location.pathname === "/user" ? (
          <UserNavbar />
        ) : location.pathname === "/" ? (
          <HomeNavbar />
        ) : (
          <HomeNavbar />
        )}

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
      </div>
    </ThemeProvider>
  )
}

export default App
