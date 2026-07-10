import { useState } from "react"
import { Box, Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import TerrainRoundedIcon from "@mui/icons-material/TerrainRounded"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import type { Tour } from "./types"

export default function AboutTour({ tour }: { tour: Tour }) {
  const [active, setActive] = useState(0)

  return (
    <div className="ts-about">
      {/* Gallery */}
      <div className="ts-gallery">
        <div className="ts-gallery-main">
          <img src={tour.images[active]} alt={tour.title} key={active} />
          <span className="ts-badge">{tour.type}</span>
        </div>
        <div className="ts-thumbs">
          {tour.images.map((img, i) => (
            <button
              type="button"
              key={img}
              className={`ts-thumb${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
            >
              <img src={img} alt={`${tour.title} ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Meta bar */}
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

      {/* Overview */}
      <div className="ts-card">
        <Typography className="ts-title">
          <span className="ts-title-mark" />
          {tour.title}
        </Typography>
        <div className="ts-rating-inline">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarRoundedIcon
              key={i}
              className={i < Math.round(tour.rating) ? "on" : ""}
            />
          ))}
          <span>
            {tour.rating.toFixed(1)} ({tour.reviews} reviews)
          </span>
        </div>
        <h3 className="ts-heading">Overview</h3>
        <p className="ts-text">{tour.overview}</p>
      </div>

      {/* Highlights */}
      <div className="ts-card">
        <h3 className="ts-heading">Tour Highlights</h3>
        <ul className="ts-highlights">
          {tour.highlights.map((h) => (
            <li key={h}>
              <CheckCircleRoundedIcon />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
