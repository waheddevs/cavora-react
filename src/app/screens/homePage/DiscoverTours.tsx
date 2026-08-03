import { Box, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import GoldButton from "../../components/ui/GoldButton"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { tours as allTours } from "ts/TourSingle"
import { featuredTourIds } from "ts/Home"
import type { Tour } from "app/libs/types"

/* 4 featured tours for the home page (diverse destinations) */
const tours = featuredTourIds
  .map((id) => allTours.find((t) => t.id === id))
  .filter((t): t is Tour => Boolean(t))

function renderStars(rating: number) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<StarRoundedIcon key={i} className="star" />)
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalfRoundedIcon key={i} className="star" />)
    } else {
      stars.push(<StarRoundedIcon key={i} className="star empty" />)
    }
  }
  return stars
}

export default function DiscoverTours() {
  /* HOOKS */
  const navigate = useNavigate()

  return (
    <section className="discover-tours">
      <Container maxWidth={false} className="discover-container">
        {/* Section header */}
        <Box className="discover-head">
          <Box className="discover-heading">
            <Typography className="section-tagline">What We Offer</Typography>
            <Typography className="section-title">Discover Tours</Typography>
          </Box>
          <GoldButton
            className="view-all-btn"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/tour")}
          >
            View All Tours
          </GoldButton>
        </Box>

        {/* Tour cards */}
        <Box className="tours-grid">
          {tours.map((tour) => (
            <Box
              className="tour-card"
              key={tour.id}
              onClick={() => navigate(`/tour-single?id=${tour.id}`)}
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
                  className="tour-fav"
                  aria-label="Save to wishlist"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FavoriteBorderRoundedIcon />
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
