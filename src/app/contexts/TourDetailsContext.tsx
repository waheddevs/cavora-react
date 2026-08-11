import { ReactNode } from "react"
import { useTourDetailsState } from "app/hooks/TourSingleHooks/useTourDetailsState"
import { useSearchParams } from "react-router-dom"
import { TourDetailsContext } from "./tourDetailsContextValue"

export function TourDetailsProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams()
  const tourId = searchParams.get("id") ?? "1"

  return (
    <TourDetailsStateProvider key={tourId}>{children}</TourDetailsStateProvider>
  )
}

function TourDetailsStateProvider({ children }: { children: ReactNode }) {
  const details = useTourDetailsState()

  return (
    <TourDetailsContext.Provider value={details}>
      {children}
    </TourDetailsContext.Provider>
  )
}
