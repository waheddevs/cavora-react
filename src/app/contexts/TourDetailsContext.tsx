import { ReactNode, createContext } from "react"
import { useTourDetailsState } from "app/hooks/TourSingleHooks/useTourDetailsState"

export type TourDetailsContextValue = ReturnType<typeof useTourDetailsState>

export const TourDetailsContext = createContext<TourDetailsContextValue | null>(
  null,
)

export function TourDetailsProvider({ children }: { children: ReactNode }) {
  const details = useTourDetailsState()

  return (
    <TourDetailsContext.Provider value={details}>
      {children}
    </TourDetailsContext.Provider>
  )
}
