import { useMemo } from "react"
import { getTourById } from "app/data/tourData"
import { Tour } from "app/types/tour"
import { useAppDispatch } from "app/hooks/CommonHooks/useAppDispatch"
import { useAppSelector } from "app/hooks/CommonHooks/useAppSelector"
import { removeWishlistItem, toggleWishlistItem } from "app/store/wishlistSlice"

export function useWishlist() {
  const dispatch = useAppDispatch()
  const tourIds = useAppSelector(state => state.wishlist.tourIds)
  const wishlist = useMemo(
    () =>
      tourIds.map(getTourById).filter((tour): tour is Tour => Boolean(tour)),
    [tourIds],
  )

  const isWishlisted = (tourId: number) => tourIds.includes(tourId)
  const toggleWishlist = (tourId: number) =>
    dispatch(toggleWishlistItem(tourId))
  const removeFromWishlist = (tourId: number) =>
    dispatch(removeWishlistItem(tourId))

  return {
    wishlist,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
  }
}
