import { useNavigate } from "react-router-dom"
import {
  useAddWishlistTourMutation,
  useGetWishlistQuery,
  useRemoveWishlistTourMutation,
} from "app/api/wishlistApi"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

export function useWishlist() {
  /* ROUTER HOOKS */
  const navigate = useNavigate()

  /* DOMAIN HOOKS */
  const { isAuthenticated } = useAuth()

  /* API HOOKS */
  const wishlistQuery = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  })
  const [addTour, addState] = useAddWishlistTourMutation()
  const [removeTour, removeState] = useRemoveWishlistTourMutation()

  /* DERIVED DATA */
  const wishlist = wishlistQuery.data ?? []
  const tourIds = wishlist.map(tour => tour.id)

  /* HELPERS */
  const isWishlisted = (tourId: number) => tourIds.includes(tourId)

  /* HANDLERS */
  const handleToggleWishlist = (tourId: number) => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    if (isWishlisted(tourId)) void removeTour(tourId)
    else void addTour(tourId)
  }
  const handleRemoveFromWishlist = (tourId: number) => {
    if (isAuthenticated) void removeTour(tourId)
  }
  const handleRetry = () => {
    void wishlistQuery.refetch()
  }

  return {
    wishlist,
    isWishlisted,
    toggleWishlist: handleToggleWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    isLoading: wishlistQuery.isLoading,
    isError: wishlistQuery.isError || addState.isError || removeState.isError,
    handleRetry,
  }
}
