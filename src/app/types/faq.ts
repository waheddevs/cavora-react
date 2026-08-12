export type FaqSectionKey = "OVERVIEW" | "PAYMENTS" | "SAFETY"

export interface FaqItem {
  id: string
  question: string
  answer: string
  position: number
}

/* The API returns FAQs already grouped and ordered by section, so the page
   renders whatever sections come back rather than assuming a fixed set. */
export interface FaqSection {
  section: FaqSectionKey
  title: string
  items: FaqItem[]
}
