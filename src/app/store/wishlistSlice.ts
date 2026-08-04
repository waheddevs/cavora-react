import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { loadWishlistIds } from "app/services/wishlistStorage"

export interface WishlistState {
  tourIds: number[]
}

const initialState: WishlistState = {
  tourIds: loadWishlistIds(),
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem(state, action: PayloadAction<number>) {
      const tourId = action.payload
      state.tourIds = state.tourIds.includes(tourId)
        ? state.tourIds.filter(id => id !== tourId)
        : [...state.tourIds, tourId]
    },
    removeWishlistItem(state, action: PayloadAction<number>) {
      state.tourIds = state.tourIds.filter(id => id !== action.payload)
    },
    synchronizeWishlist(state, action: PayloadAction<number[]>) {
      state.tourIds = action.payload
    },
  },
})

export const { toggleWishlistItem, removeWishlistItem, synchronizeWishlist } =
  wishlistSlice.actions
export default wishlistSlice.reducer
