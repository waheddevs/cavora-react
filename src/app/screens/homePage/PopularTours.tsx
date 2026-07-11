import { Box, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import { tours as allTours } from "ts/TourSingle"
import { popularTourIds } from "ts/Home"
import type { Tour } from "app/libs/types"

/* 3 popular picks — real tours looked up by id (Paris, Fuji, Zermatt) */
const tours = popularTourIds
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

export default function PopularTours() {
  const navigate = useNavigate()

  return (
    <section className="popular-tours">
      <Container maxWidth={false} className="popular-container">
        {/* Section header */}
        <Box className="popular-head">
          <Typography className="section-tagline">Top Picks</Typography>
          <Typography className="section-title">Popular Tours</Typography>
          <Typography className="popular-subtitle">
            Hand-picked experiences loved by thousands of travellers worldwide.
          </Typography>
        </Box>

        {/* Horizontal tour cards */}
        <Box className="popular-grid">
          {tours.map((tour) => (
            <Box
              className="popular-card"
              key={tour.id}
              onClick={() => navigate(`/tour-single?id=${tour.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Box className="popular-media">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="popular-img"
                />
              </Box>

              <Box className="popular-body">
                <Box className="popular-meta">
                  <span className="meta-item">
                    <LocationOnRoundedIcon className="meta-icon" />
                    {tour.location}
                  </span>
                  <span className="meta-item">
                    <AccessTimeRoundedIcon className="meta-icon" />
                    {tour.days}
                  </span>
                </Box>

                <Typography className="popular-card-title">
                  {tour.title}
                </Typography>

                <Box className="popular-foot">
                  <Box className="popular-rating">
                    {renderStars(tour.rating)}
                    <span className="rating-value">({tour.rating.toFixed(1)})</span>
                  </Box>
                  <Box className="popular-price">
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
