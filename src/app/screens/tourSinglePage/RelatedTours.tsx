import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import { getRelatedTours } from "ts/TourSingle"
import type { Tour } from "app/libs/types"

export default function RelatedTours({ currentId }: { currentId: number }) {
  const navigate = useNavigate()
  const related = getRelatedTours(currentId, 3) as Tour[]

  return (
    <section className="ts-related">
      <Box className="ts-related-head">
        <Typography className="ts-related-tagline">
          You Might Also Like
        </Typography>
        <Typography className="ts-related-title">Related Tours</Typography>
      </Box>

      <Box className="ts-related-grid">
        {related.map((tour) => (
          <Box
            className="ts-related-card"
            key={tour.id}
            onClick={() => navigate(`/tour-single?id=${tour.id}`)}
          >
            <Box className="ts-related-media">
              <img src={tour.images[0]} alt={tour.title} />
              <span className="ts-badge">{tour.type}</span>
            </Box>
            <Box className="ts-related-body">
              <Box className="ts-related-meta">
                <span>
                  <LocationOnRoundedIcon />
                  {tour.location}
                </span>
                <span>
                  <AccessTimeRoundedIcon />
                  {tour.days}
                </span>
              </Box>
              <Typography className="ts-related-name">{tour.title}</Typography>
              <Box className="ts-related-foot">
                <span className="ts-related-rating">
                  <StarRoundedIcon />
                  {tour.rating.toFixed(1)}
                </span>
                <span className="ts-related-price">
                  <small>From</small> ${tour.price.toLocaleString()}
                </span>
              </Box>
              <button
                type="button"
                className="ts-related-btn"
                onClick={() => navigate(`/tour-single?id=${tour.id}`)}
              >
                View Now
                <ArrowForwardRoundedIcon />
              </button>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  )
}
