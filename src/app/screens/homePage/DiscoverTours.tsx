import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { tours as allTours } from "app/data/tourData"
import { featuredTourIds } from "app/data/homeData"
import { Tour } from "app/types/tour"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"

const tours = featuredTourIds
  .map(id => allTours.find(tour => tour.id === id))
  .filter((tour): tour is Tour => Boolean(tour))

function renderStars(rating: number) {
  const stars = []
  for (let starNumber = 1; starNumber <= 5; starNumber++) {
    if (rating >= starNumber) {
      stars.push(<StarRoundedIcon key={starNumber} className="star" />)
    } else if (rating >= starNumber - 0.5) {
      stars.push(<StarHalfRoundedIcon key={starNumber} className="star" />)
    } else {
      stars.push(<StarRoundedIcon key={starNumber} className="star empty" />)
    }
  }
  return stars
}

export default function DiscoverTours() {
  const { openTour, openTourList } = useTourNavigation()
  const { isWishlisted, toggleWishlist } = useWishlist()

  return (
    <section className="discover-tours">
      <Container maxWidth={false} className="discover-container">
        <Box className="discover-head">
          <Box className="discover-heading">
            <Typography className="section-tagline">What We Offer</Typography>
            <Typography className="section-title">Discover Tours</Typography>
          </Box>
          <GoldButton
            className="view-all-btn"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={openTourList}
          >
            View All Tours
          </GoldButton>
        </Box>

        <Box className="tours-grid">
          {tours.map(tour => (
            <Box
              className="tour-card"
              key={tour.id}
              onClick={() => openTour(tour.id)}
              style={{ cursor: "pointer" }}
            >
              <Box className="tour-media">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="tour-img"
                />
                <span className="tour-badge">{tour.type}</span>
                <button
                  type="button"
                  className={`tour-fav${isWishlisted(tour.id) ? " active" : ""}`}
                  aria-label="Save to wishlist"
                  onClick={event => {
                    event.stopPropagation()
                    toggleWishlist(tour.id)
                  }}
                >
                  {isWishlisted(tour.id) ? (
                    <FavoriteRoundedIcon />
                  ) : (
                    <FavoriteBorderRoundedIcon />
                  )}
                </button>
              </Box>

              <Box className="tour-body">
                <Box className="tour-meta">
                  <span className="meta-item">
                    <LocationOnRoundedIcon className="meta-icon" />
                    {tour.location}
                  </span>
                  <span className="meta-item">
                    <AccessTimeRoundedIcon className="meta-icon" />
                    {tour.days}
                  </span>
                </Box>

                <Typography className="tour-title">{tour.title}</Typography>

                <Box className="tour-foot">
                  <Box className="tour-rating">
                    {renderStars(tour.rating)}
                    <span className="rating-value">
                      ({tour.rating.toFixed(1)})
                    </span>
                  </Box>
                  <Box className="tour-price">
                    <span>From </span>
                    <strong>${tour.price.toLocaleString()}</strong>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  )
}
