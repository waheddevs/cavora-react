import { useContext } from "react"
import { TourCatalogContext } from "app/contexts/TourCatalogContext"

export function useTourCatalog() {
  const catalog = useContext(TourCatalogContext)

  if (!catalog) {
    throw new Error("useTourCatalog requires TourCatalogProvider")
  }

  return catalog
}
