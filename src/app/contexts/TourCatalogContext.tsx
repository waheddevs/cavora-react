import { ReactNode, createContext } from "react"
import { useTourCatalogState } from "app/hooks/TourHooks/useTourCatalogState"

export type TourCatalogContextValue = ReturnType<typeof useTourCatalogState>

export const TourCatalogContext = createContext<TourCatalogContextValue | null>(
  null,
)

export function TourCatalogProvider({ children }: { children: ReactNode }) {
  const catalog = useTourCatalogState()

  return (
    <TourCatalogContext.Provider value={catalog}>
      {children}
    </TourCatalogContext.Provider>
  )
}
