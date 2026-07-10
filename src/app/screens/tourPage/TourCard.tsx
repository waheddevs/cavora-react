import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
    <div className="tour-card">
      <div className="tc-media" onClick={open}>
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
      </div>

      <div className="tc-body">
        <div className="tc-rating">
          {renderStars(tour.rating)}
          <span>
            {tour.rating.toFixed(1)} ({tour.reviews} reviews)
          </span>
        </div>

        <h3 className="tc-title" onClick={open}>
          {tour.title}
        </h3>

        <div className="tc-meta">
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
        </div>

        <div className="tc-foot">
          <div className="tc-price">
            <small>From</small>
            <strong>${tour.price.toLocaleString()}</strong>
            <span>/person</span>
          </div>
          <button type="button" className="tc-btn" onClick={open}>
            View Tour
            <ArrowForwardRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
