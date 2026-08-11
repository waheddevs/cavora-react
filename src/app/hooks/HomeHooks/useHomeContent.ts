import { useContext } from "react"
import { HomeContentContext } from "app/contexts/homeContentContext"

export function useHomeContent() {
  const homeQuery = useContext(HomeContentContext)

  if (!homeQuery) {
    throw new Error("useHomeContent requires HomeContentProvider")
  }

  return homeQuery
}
