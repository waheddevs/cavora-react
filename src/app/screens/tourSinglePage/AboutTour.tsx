import { Box, Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import TerrainRoundedIcon from "@mui/icons-material/TerrainRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"

export default function AboutTour() {
  const { tour, gallery } = useTourDetails()
  if (!tour) return null

  const { activeImageIndex, setActiveImageIndex } = gallery

  return (
    <Box className="ts-about">
      <Box className="ts-gallery">
        <Box className="ts-gallery-main">
          <img
            src={tour.images[activeImageIndex]}
            alt={tour.title}
            key={activeImageIndex}
          />
          <span className="ts-badge">{tour.type}</span>
        </Box>
        <Box className="ts-thumbs">
          {tour.images.map((img, i) => (
            <button
              type="button"
              key={img}
              className={`ts-thumb${i === activeImageIndex ? " active" : ""}`}
              onClick={() => setActiveImageIndex(i)}
            >
              <img src={img} alt={`${tour.title} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </Box>
      </Box>

      <Box className="ts-meta">
        <span className="ts-meta-item">
          <LocationOnRoundedIcon />
          <span>
            <small>Location</small>
            {tour.location}
          </span>
        </span>
        <span className="ts-meta-item">
          <AccessTimeRoundedIcon />
          <span>
            <small>Duration</small>
            {tour.days}
          </span>
        </span>
        <span className="ts-meta-item">
          <GroupsRoundedIcon />
          <span>
            <small>Group Size</small>
            {tour.group}
          </span>
        </span>
        <span className="ts-meta-item">
          <TerrainRoundedIcon />
          <span>
            <small>Tour Type</small>
            {tour.type}
          </span>
        </span>
      </Box>

      <Box className="ts-card">
        <Typography className="ts-title">
          <span className="ts-title-mark" />
          {tour.title}
        </Typography>
        <Box className="ts-rating-inline">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarRoundedIcon
              key={i}
              className={i < Math.round(tour.rating) ? "on" : ""}
            />
          ))}
          <span>
            {tour.rating.toFixed(1)} ({tour.reviews} reviews)
          </span>
        </Box>
        <h3 className="ts-heading">Overview</h3>
        <p className="ts-text">{tour.overview}</p>
      </Box>

      <Box className="ts-card">
        <h3 className="ts-heading">Tour Highlights</h3>
        <ul className="ts-highlights">
          {tour.highlights.map(highlight => (
            <li key={highlight}>
              <CheckCircleRoundedIcon />
              {highlight}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}
