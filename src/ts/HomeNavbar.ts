import { useEffect, useState } from "react"
import moment from "moment"

/* Weekday headers (Monday-first) for the hero date picker */
export const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

/* Trust badges shown beneath the hero actions.
   "icon" maps to a component in HomeNavbar.tsx. */
export const features = [
  { label: "Verified Guides", icon: "verified" },
  { label: "Secure Booking", icon: "secure" },
  { label: "Curated Tours", icon: "curated" },
  { label: "24/7 Support", icon: "support" },
]

/* Build a 6x7 grid of moment days covering the given month */
export function buildMonthGrid(monthMoment: moment.Moment) {
  const gridStart = monthMoment.clone().startOf("month").startOf("isoWeek")
  const days = []
  for (let i = 0; i < 42; i++) {
    days.push(gridStart.clone().add(i, "days"))
  }
  return days
}

/* Hero slides — image + matching text (from /public/img/slide-img) */
export const heroSlides = [
  {
    img: "/img/slide-img/slide-1.jpg",
    location: "Zermatt, Switzerland",
    title: "Alpine Heights",
    subtitle:
      "Rise above the clouds and watch the sunset set the snow-capped Swiss peaks aglow.",
  },
  {
    img: "/img/slide-img/slide-2.jpg",
    location: "Krabi, Thailand",
    title: "Tropical Escape",
    subtitle:
      "Unwind beside turquoise pools framed by jungle cliffs and swaying palm trees.",
  },
  {
    img: "/img/slide-img/slide-3.jpg",
    location: "Paris, France",
    title: "Parisian Charm",
    subtitle:
      "Drift along the Seine and fall for the timeless elegance of the Eiffel Tower.",
  },
  {
    img: "/img/slide-img/slide-4.jpg",
    location: "Bali, Indonesia",
    title: "Island Dreams",
    subtitle:
      "Immerse yourself in lush rice terraces, ancient temples, and vibrant Balinese culture.",
  },
  {
    img: "/img/slide-img/slide-5.jpg",
    location: "Utah, USA",
    title: "Desert Trails",
    subtitle:
      "Hit the open road and chase adventure through canyons of red desert rock.",
  },
]

/* Auto-advancing slideshow for the hero background. */
export function useHeroSlider(intervalMs = 5000) {
  /* HOOKS */
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs])

  return { activeSlide, setActiveSlide }
}

/* True once the page is scrolled past `threshold` px.
   Drives the scroll-aware navbar (transparent → solid). */
export function useScrolled(threshold = 40) {
  /* HOOKS */
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return scrolled
}
