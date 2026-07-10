import { useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { getRelatedTours } from "../../../js/TourSingle"
import type { Tour } from "./types"

export default function RelatedTours({ currentId }: { currentId: number }) {
  const navigate = useNavigate()
  const related = getRelatedTours(currentId, 3) as Tour[]

  return (
    <section className="ts-related">
      <div className="ts-related-head">
        <Typography className="ts-related-tagline">You Might Also Like</Typography>
        <Typography className="ts-related-title">Related Tours</Typography>
      </div>

      <div className="ts-related-grid">
        {related.map((tour) => (
          <div
            className="ts-related-card"
            key={tour.id}
            onClick={() => navigate(`/tour-single?id=${tour.id}`)}
          >
            <div className="ts-related-media">
              <img src={tour.images[0]} alt={tour.title} />
              <span className="ts-badge">{tour.type}</span>
            </div>
            <div className="ts-related-body">
              <div className="ts-related-meta">
                <span>
                  <LocationOnRoundedIcon />
                  {tour.location}
                </span>
                <span>
                  <AccessTimeRoundedIcon />
                  {tour.days}
                </span>
              </div>
              <Typography className="ts-related-name">{tour.title}</Typography>
              <div className="ts-related-foot">
                <span className="ts-related-rating">
                  <StarRoundedIcon />
                  {tour.rating.toFixed(1)}
                </span>
                <span className="ts-related-price">
                  <small>From</small> ${tour.price.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                className="ts-related-btn"
                onClick={() => navigate(`/tour-single?id=${tour.id}`)}
              >
                View Now
                <ArrowForwardRoundedIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
