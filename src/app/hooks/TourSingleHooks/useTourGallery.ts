import { useState } from "react"

export function useTourGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return { activeImageIndex, setActiveImageIndex }
}
