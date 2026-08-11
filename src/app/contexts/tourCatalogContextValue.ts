import { createContext } from "react"
import { useTourCatalogState } from "app/hooks/TourHooks/useTourCatalogState"

export type TourCatalogContextValue = ReturnType<typeof useTourCatalogState>

export const TourCatalogContext =
  createContext<TourCatalogContextValue | null>(null)
