import { useSearchParams } from "react-router-dom"
import PageHero from "./PageHero"
import { getTourById } from "ts/TourSingle"

/* Tour single header — the only dynamic page-hero.
   Its title/breadcrumb come from the tour selected via ?id= */
export default function TourSingleNavbar() {
  /* HOOKS */
  const [params] = useSearchParams()
  const tour = getTourById(params.get("id") ?? 1)

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
