import { ReactNode } from "react"
import { useTourCatalogState } from "app/hooks/TourHooks/useTourCatalogState"
import { TourCatalogContext } from "./tourCatalogContextValue"

export function TourCatalogProvider({ children }: { children: ReactNode }) {
  const catalog = useTourCatalogState()

  return (
    <TourCatalogContext.Provider value={catalog}>
      {children}
    </TourCatalogContext.Provider>
  )
}
