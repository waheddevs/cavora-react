import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { useAppLayout } from "./hooks/CommonHooks/useAppLayout"
import { TourCatalogProvider } from "./contexts/TourCatalogContext"
import { TourDetailsProvider } from "./contexts/TourDetailsContext"
import { CheckoutProvider } from "./contexts/CheckoutContext"
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
import PaymentPage from "./screens/paymentPage"
import PageHero from "./components/headers/PageHero"
import { pageHeroes } from "./components/headers/pageHeroConfig"
import HomeNavbar from "./components/headers/HomeNavbar"
import UserNavbar from "./components/headers/UserNavbar"
import TourSingleNavbar from "./components/headers/TourSingleNavbar"
import Footer from "./components/footer"
import { useScrollToTop } from "./hooks/CommonHooks/useScrollToTop"
import "css/App.css"
import "css/navbar.css"
import "css/footer.css"

function App() {
  useScrollToTop()
  const { pathname, isAuthRoute } = useAppLayout()

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

  const layout = (
    <>
      {!isAuthRoute && renderHeader()}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/payment"
          element={
            <CheckoutProvider>
              <PaymentPage />
            </CheckoutProvider>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route
          path="/tour"
          element={
            <TourCatalogProvider>
              <TourPage />
            </TourCatalogProvider>
          }
        />
        <Route path="/tour-single" element={<TourSinglePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      {!isAuthRoute && <Footer />}
    </>
  )

  return (
    <Box className="app-layout">
      {pathname === "/tour-single" ? (
        <TourDetailsProvider>{layout}</TourDetailsProvider>
      ) : (
        layout
      )}
    </Box>
  )
}

export default App
