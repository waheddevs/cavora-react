import { Box, Container, Typography } from "@mui/material"
import GoldButton from "../../components/ui/GoldButton"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

interface Tour {
  img: string
  badge: string | null
  location: string
  days: string
  title: string
  rating: number
  price: string
}

const tours: Tour[] = [
  {
    img: "/img/home-page-img/tour-bali.jpg",
    badge: "Featured",
    location: "Bali, Indonesia",
    days: "7 Days",
    title: "Bali Paradise Escape",
    rating: 4.5,
    price: "899",
  },
  {
    img: "/img/home-page-img/tour-rome.jpg",
    badge: "Popular",
    location: "Rome, Italy",
    days: "5 Days",
    title: "Roman Holiday Classic",
    rating: 4.0,
    price: "749",
  },
  {
    img: "/img/home-page-img/tour-tokyo.jpg",
    badge: "New",
    location: "Tokyo, Japan",
    days: "10 Days",
    title: "Japan Cherry Blossom",
    rating: 5.0,
    price: "1,299",
  },
  {
    img: "/img/home-page-img/tour-santorini.jpg",
    badge: null,
    location: "Santorini, Greece",
    days: "6 Days",
    title: "Greek Island Hopping",
    rating: 4.7,
    price: "999",
  },
]

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
          >
            View All Tours
          </GoldButton>
        </Box>

        {/* Tour cards */}
        <Box className="tours-grid">
          {tours.map((tour) => (
            <Box className="tour-card" key={tour.title}>
              <Box className="tour-media">
                <img src={tour.img} alt={tour.title} className="tour-img" />
                {tour.badge && (
                  <span className={`tour-badge ${tour.badge.toLowerCase()}`}>
                    {tour.badge}
                  </span>
                )}
                <button type="button" className="tour-fav" aria-label="Save to wishlist">
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
                    <span className="rating-value">({tour.rating.toFixed(1)})</span>
                  </Box>
                  <Box className="tour-price">
                    <span>From </span>
                    <strong>${tour.price}</strong>
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
