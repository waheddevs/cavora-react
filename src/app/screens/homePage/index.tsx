import DiscoverTours from "./DiscoverTours"
import Explore from "./Explore"
import PopularTours from "./PopularTours"
import TravelGallery from "./TravelGallery"
import Subscribe from "./Subscribe"
import "../../../css/home.css"

export default function HomePage() {
  return (
    <div className="home-page">
      <DiscoverTours />
      <Explore />
      <PopularTours />
      <TravelGallery />
      <Subscribe />
    </div>
  )
}
