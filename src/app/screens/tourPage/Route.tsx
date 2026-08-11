import { TourCatalogProvider } from "app/contexts/TourCatalogContext"
import TourPage from "."

export default function TourCatalogRoute() {
  return (
    <TourCatalogProvider>
      <TourPage />
    </TourCatalogProvider>
  )
}
