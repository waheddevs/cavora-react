import { ReactNode, useMemo } from "react"
import { useGetHomeQuery } from "app/api/homeApi"
import { HomeContentContext } from "./homeContentContext"
import { heroSlides } from "app/data/homeData"

export default function HomeContentProvider({
  children,
}: {
  children: ReactNode
}) {
  const homeQuery = useGetHomeQuery()
  const home = homeQuery.data
  const value = useMemo(
    () => ({
      home,
      slides: home?.slides?.length ? home.slides : heroSlides,
      featuredTours: home?.featuredTours ?? [],
      popularTours: home?.popularTours ?? [],
      spotlight: home?.spotlight,
      gallery: home?.gallery ?? [],
      isLoading: homeQuery.isLoading,
      isError: homeQuery.isError,
    }),
    [home, homeQuery.isError, homeQuery.isLoading],
  )

  return (
    <HomeContentContext.Provider value={value}>
      {children}
    </HomeContentContext.Provider>
  )
}
