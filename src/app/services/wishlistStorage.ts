const KEY = "cavora_wishlist"
const SEED = [14, 15, 25, 18]

function parseIds(value: string | null): number[] {
  if (!value) return []

  try {
    const ids = JSON.parse(value)
    if (!Array.isArray(ids)) return []

    return [...new Set(ids.filter(Number.isInteger))]
  } catch {
    return []
  }
}

export function loadWishlistIds(): number[] {
  try {
    const storedIds = localStorage.getItem(KEY)
    if (storedIds) return parseIds(storedIds)

    localStorage.setItem(KEY, JSON.stringify(SEED))
    return [...SEED]
  } catch {
    return [...SEED]
  }
}

export function saveWishlistIds(ids: number[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    return
  }
}

export function subscribeToWishlistStorage(
  synchronize: (ids: number[]) => void,
) {
  if (typeof window === "undefined") return () => undefined

  const handleStorage = (event: StorageEvent) => {
    if (event.key === KEY) synchronize(parseIds(event.newValue))
  }

  window.addEventListener("storage", handleStorage)
  return () => window.removeEventListener("storage", handleStorage)
}
