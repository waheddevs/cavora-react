import { useEffect, useState } from "react"

export function useTourGallery(tourId?: number) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [tourId])

  return { activeImageIndex, setActiveImageIndex }
}
