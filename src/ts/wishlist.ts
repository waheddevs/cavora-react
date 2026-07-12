/* Wishlist store — localStorage backed, no backend.
   Holds saved tour ids; OrderBar writes, the user page reads. */

import { useEffect, useState } from "react"
import type { Tour } from "app/libs/types"
import { getTourById } from "ts/TourSingle"

const KEY = "cavora_wishlist"
/* Pre-saved tours so the demo wishlist isn't empty on first visit */
const SEED = [14, 15, 25, 18]

export const WISHLIST_EVENT = "wishlist-change"

function read(): number[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === null) {
      localStorage.setItem(KEY, JSON.stringify(SEED))
      return [...SEED]
    }
    return JSON.parse(raw) as number[]
  } catch {
    return []
  }
}

function write(ids: number[]) {
  localStorage.setItem(KEY, JSON.stringify(ids))
  window.dispatchEvent(new Event(WISHLIST_EVENT))
}

export function getWishlistIds(): number[] {
  return read()
}

export function getWishlistTours(): Tour[] {
  return read()
    .map((id) => getTourById(id))
    .filter((t): t is Tour => Boolean(t))
}

export function isWishlisted(id: number): boolean {
  return read().includes(id)
}

/* Add if absent / remove if present. Returns the new saved state. */
export function toggleWishlist(id: number): boolean {
  const ids = read()
  const exists = ids.includes(id)
  write(exists ? ids.filter((x) => x !== id) : [...ids, id])
  return !exists
}

export function removeFromWishlist(id: number) {
  write(read().filter((x) => x !== id))
}

/* Reactive hook — re-renders on any wishlist change (this tab or another) */
export function useWishlistTours(): Tour[] {
  const [items, setItems] = useState<Tour[]>(getWishlistTours)
  useEffect(() => {
    const sync = () => setItems(getWishlistTours())
    window.addEventListener(WISHLIST_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])
  return items
}
