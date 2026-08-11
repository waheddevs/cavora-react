import HomeContentProvider from "app/contexts/HomeContentProvider"
import HomeNavbar from "app/components/headers/HomeNavbar"
import Footer from "app/components/footer"
import HomePage from "."

export default function HomeRoute() {
  return (
    <HomeContentProvider>
      <HomeNavbar />
      <HomePage />
      <Footer />
    </HomeContentProvider>
  )
}
