import { useState } from "react"

export interface AccordionState {
  openIndex: number | null
  toggleItem: (index: number) => void
}

export function useAccordion(
  initialOpenIndex: number | null = null,
): AccordionState {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex)

  const toggleItem = (index: number) => {
    setOpenIndex(currentIndex => (currentIndex === index ? null : index))
  }

  return { openIndex, toggleItem }
}
