import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import bookingReducer from "./bookingSlice"
import wishlistReducer, { synchronizeWishlist } from "./wishlistSlice"
import {
  saveWishlistIds,
  subscribeToWishlistStorage,
} from "app/services/wishlistStorage"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    wishlist: wishlistReducer,
  },
})

let persistedWishlistIds = store.getState().wishlist.tourIds

store.subscribe(() => {
  const wishlistIds = store.getState().wishlist.tourIds
  if (wishlistIds === persistedWishlistIds) return

  persistedWishlistIds = wishlistIds
  saveWishlistIds(wishlistIds)
})

subscribeToWishlistStorage(ids => {
  persistedWishlistIds = ids
  store.dispatch(synchronizeWishlist(ids))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
