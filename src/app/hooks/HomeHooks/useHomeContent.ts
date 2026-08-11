import { useGetHomeQuery } from "app/api/homeApi"

export function useHomeContent() {
  /* API HOOKS */
  const homeQuery = useGetHomeQuery()

  /* DERIVED DATA */
  const home = homeQuery.data

  return {
    home,
    slides: home?.slides ?? [],
    featuredTours: home?.featuredTours ?? [],
    popularTours: home?.popularTours ?? [],
    spotlight: home?.spotlight,
    gallery: home?.gallery ?? [],
    isLoading: homeQuery.isLoading,
    isError: homeQuery.isError,
  }
}
