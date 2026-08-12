import { useClearWishlistMutation } from "app/api/wishlistApi"
import {
  useAlerts,
  useNotifications,
} from "app/hooks/CommonHooks/useSweetAlert"

export function useClearWishlist() {
  const { confirmWithLoading } = useAlerts()
  const { notifyError } = useNotifications()
  const [clearWishlistRequest, clearState] = useClearWishlistMutation()

  const clearWishlist = async () => {
    let clearSucceeded = true
    const confirmed = await confirmWithLoading({
      title: "Clear your wishlist?",
      message:
        "Every saved tour will be removed. You can save any of them again later.",
      confirmText: "Clear wishlist",
      cancelText: "Keep tours",
      loadingMs: 600,
      onConfirm: async () => {
        try {
          await clearWishlistRequest().unwrap()
        } catch {
          clearSucceeded = false
        }
      },
    })

    if (!confirmed || clearSucceeded) return

    await notifyError({
      title: "Wishlist could not be cleared",
      message: "Your saved tours are unchanged. Please try again in a moment.",
    })
  }

  return {
    clearWishlist,
    isClearing: clearState.isLoading,
  }
}
