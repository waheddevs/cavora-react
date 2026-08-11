import { TourDetailsProvider } from "app/contexts/TourDetailsContext"
import TourSingleNavbar from "app/components/headers/TourSingleNavbar"
import Footer from "app/components/footer"
import TourSinglePage from "."

export default function TourSingleRoute() {
  return (
    <TourDetailsProvider>
      <TourSingleNavbar />
      <TourSinglePage />
      <Footer />
    </TourDetailsProvider>
  )
}
