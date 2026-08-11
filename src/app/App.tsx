import { Suspense, lazy } from "react"
import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { useAppLayout } from "./hooks/CommonHooks/useAppLayout"
import { pageHeroes } from "./components/headers/pageHeroConfig"
import { useScrollToTop } from "./hooks/CommonHooks/useScrollToTop"
import "css/App.css"
import "css/navbar.css"
import "css/footer.css"

const AboutPage = lazy(() => import("./screens/aboutPage"))
const BlogDetailsPage = lazy(() => import("./screens/blogDetailsPage"))
const BlogPage = lazy(() => import("./screens/blogPage"))
const ContactPage = lazy(() => import("./screens/contactPage"))
const FaqPage = lazy(() => import("./screens/faqPage"))
const TourCatalogRoute = lazy(() => import("./screens/tourPage/Route"))
const TourSingleRoute = lazy(() => import("./screens/tourSinglePage/Route"))
const UserPage = lazy(() => import("./screens/userPage"))
const HomeRoute = lazy(() => import("./screens/homePage/Route"))
const LoginPage = lazy(() => import("./screens/loginPage"))
const SignupPage = lazy(() => import("./screens/signupPage"))
const ForgotPasswordPage = lazy(() => import("./screens/forgotPasswordPage"))
const ResetPasswordPage = lazy(() => import("./screens/resetPasswordPage"))
const VerifyEmailPage = lazy(() => import("./screens/verifyEmailPage"))
const PaymentRoute = lazy(() => import("./screens/paymentPage/Route"))
const PageHero = lazy(() => import("./components/headers/PageHero"))
const HomeNavbar = lazy(() => import("./components/headers/HomeNavbar"))
const UserNavbar = lazy(() => import("./components/headers/UserNavbar"))
const Footer = lazy(() => import("./components/footer"))

function RouteFallback() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      Loading…
    </div>
  )
}

function App() {
  useScrollToTop()
  const { pathname, isAuthRoute } = useAppLayout()
  const ownsFullLayout = pathname === "/" || pathname === "/tour-single"

  const renderHeader = () => {
    if (pathname === "/user") return <UserNavbar />
    return pageHeroes[pathname] ? (
      <PageHero {...pageHeroes[pathname]} />
    ) : (
      <HomeNavbar />
    )
  }

  return (
    <Box className="app-layout">
      <Suspense fallback={<RouteFallback />}>
        {!isAuthRoute && !ownsFullLayout && renderHeader()}

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/payment" element={<PaymentRoute />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog-details" element={<BlogDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/tour" element={<TourCatalogRoute />} />
          <Route path="/tour-single" element={<TourSingleRoute />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/" element={<HomeRoute />} />
        </Routes>

        {!isAuthRoute && !ownsFullLayout && <Footer />}
      </Suspense>
    </Box>
  )
}

export default App
