import { Box } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { Tour } from "app/types/tour"
import { useTourCard } from "app/hooks/TourHooks/useTourCard"
import TourViewCount from "app/components/ui/TourViewCount"

function renderStars(rating: number) {
  const stars = []
  for (let starNumber = 1; starNumber <= 5; starNumber++) {
    if (rating >= starNumber)
      stars.push(<StarRoundedIcon key={starNumber} className="on" />)
    else if (rating >= starNumber - 0.5)
      stars.push(<StarHalfRoundedIcon key={starNumber} className="on" />)
    else stars.push(<StarRoundedIcon key={starNumber} />)
  }
  return stars
}

export default function TourCard({ tour }: { tour: Tour }) {
  /* HOOKS */
  const { saved, handleOpen, handleToggleSaved } = useTourCard(tour.id)

  return (
    <Box
      className="tour-card"
      onClick={handleOpen}
      style={{ cursor: "pointer" }}
    >
      <Box className="tc-media">
        <img src={tour.images[0]} alt={tour.title} loading="lazy" />
        <span className="tc-badge">{tour.type}</span>
        <button
          type="button"
          className={`tc-fav${saved ? " active" : ""}`}
          aria-label="Save to wishlist"
          onClick={handleToggleSaved}
        >
          {saved ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        </button>
      </Box>

      <Box className="tc-body">
        <Box className="tc-rating">
          {renderStars(tour.rating)}
          <span className="tc-review-count">
            {tour.rating.toFixed(1)} ({tour.reviews})
          </span>
          <TourViewCount count={tour.viewCount} />
        </Box>

        <h3 className="tc-title">{tour.title}</h3>

        <Box className="tc-meta">
          <span>
            <LocationOnRoundedIcon />
            {tour.location}
          </span>
          <span>
            <AccessTimeRoundedIcon />
            {tour.days}
          </span>
          <span>
            <GroupsRoundedIcon />
            {tour.group}
          </span>
        </Box>

        <Box className="tc-foot">
          <Box className="tc-price">
            <small>From</small>
            <strong>${tour.price.toLocaleString()}</strong>
            <span>/person</span>
          </Box>
          <button
            type="button"
            className="tc-btn"
            onClick={event => {
              event.stopPropagation()
              handleOpen()
            }}
          >
            View Tour
            <ArrowForwardRoundedIcon />
          </button>
        </Box>
      </Box>
    </Box>
  )
}
