import { Box, ThemeProvider } from "@mui/material"
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
import LoginPage from "./screens/loginPage"
import SignupPage from "./screens/signupPage"
/* COMMON */
import PageHero from "./components/headers/PageHero"
import { pageHeroes } from "./components/headers/pageHeroConfig"
import HomeNavbar from "./components/headers/HomeNavbar"
import UserNavbar from "./components/headers/UserNavbar"
import TourSingleNavbar from "./components/headers/TourSingleNavbar"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"
/* CSS */
import "css/App.css"
import "css/navbar.css"
import "css/footer.css"

/* Standalone routes that render without the shared navbar and footer. */
const authRoutes = ["/login", "/signup"]

function App() {
  const { pathname } = useLocation()
  const isAuthRoute = authRoutes.includes(pathname)

  /* Pick the header for the current route */
  const renderHeader = () => {
    switch (pathname) {
      case "/":
        return <HomeNavbar />
      case "/user":
        return <UserNavbar />
      case "/tour-single":
        return <TourSingleNavbar />
      default:
        return pageHeroes[pathname] ? (
          <PageHero {...pageHeroes[pathname]} />
        ) : (
          <HomeNavbar />
        )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Box className="app-layout">
        {!isAuthRoute && renderHeader()}

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
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

        {!isAuthRoute && <Footer />}
      </Box>
    </ThemeProvider>
  )
}

export default App
