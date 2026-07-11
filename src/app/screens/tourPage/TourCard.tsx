import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import type { Tour } from "../tourSinglePage/types"

function renderStars(rating: number) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<StarRoundedIcon key={i} className="on" />)
    else if (rating >= i - 0.5)
      stars.push(<StarHalfRoundedIcon key={i} className="on" />)
    else stars.push(<StarRoundedIcon key={i} />)
  }
  return stars
}

export default function TourCard({ tour }: { tour: Tour }) {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const open = () => navigate(`/tour-single?id=${tour.id}`)

  return (
    <Box className="tour-card" onClick={open} style={{ cursor: "pointer" }}>
      <Box className="tc-media">
        <img src={tour.images[0]} alt={tour.title} />
        <span className="tc-badge">{tour.type}</span>
        <button
          type="button"
          className={`tc-fav${saved ? " active" : ""}`}
          aria-label="Save to wishlist"
          onClick={(e) => {
            e.stopPropagation()
            setSaved((s) => !s)
          }}
        >
          {saved ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        </button>
      </Box>

      <Box className="tc-body">
        <Box className="tc-rating">
          {renderStars(tour.rating)}
          <span>
            {tour.rating.toFixed(1)} ({tour.reviews} reviews)
          </span>
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
          <button type="button" className="tc-btn" onClick={open}>
            View Tour
            <ArrowForwardRoundedIcon />
          </button>
        </Box>
      </Box>
    </Box>
  )
}
