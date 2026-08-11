import { Box, Container, Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"
import { useHomeContent } from "app/hooks/HomeHooks/useHomeContent"
import TourViewCount from "app/components/ui/TourViewCount"

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

export default function PopularTours() {
  /* HOOKS */
  const { openTour } = useTourNavigation()
  const { popularTours: tours, isLoading, isError } = useHomeContent()

  /* HANDLERS */
  const handleOpenTour = (tourId: number) => openTour(tourId)

  return (
    <section className="popular-tours">
      <Container maxWidth={false} className="popular-container">
        <Box className="popular-head">
          <Typography className="section-tagline">Top Picks</Typography>
          <Typography className="section-title">Popular Tours</Typography>
          <Typography className="popular-subtitle">
            Hand-picked experiences loved by thousands of travellers worldwide.
          </Typography>
        </Box>

        <Box className="popular-grid">
          {isLoading && <p>Loading popular tours...</p>}
          {isError && (
            <p>
              Our most-loved escapes are briefly out exploring. They will return
              shortly.
            </p>
          )}
          {tours.map(tour => (
            <Box
              className="popular-card"
              key={tour.id}
              onClick={() => handleOpenTour(tour.id)}
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
                    <span className="rating-value">
                      ({tour.rating.toFixed(1)})
                    </span>
                    <TourViewCount count={tour.viewCount} />
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
