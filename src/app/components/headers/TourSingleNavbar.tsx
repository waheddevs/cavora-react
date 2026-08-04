import PageHero from "./PageHero"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"

export default function TourSingleNavbar() {
  const { tour } = useTourDetails()

  return (
    <PageHero
      navbarClass="tour-single-navbar"
      heroClass="tour-single-hero"
      tagline="Adventure Awaits"
      title={tour ? tour.title : "Tour"}
      crumbs={[
        { label: "Tour List", to: "/tour" },
        { label: tour ? tour.title : "Details" },
      ]}
    />
  )
}
