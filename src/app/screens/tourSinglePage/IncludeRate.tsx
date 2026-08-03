import { useEffect, useRef, useState } from "react"
import { Box } from "@mui/material"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import CountUp from "../../components/CountUp"
import { ratingDistribution as distribution } from "ts/TourSingle"
import type { Tour } from "app/libs/types"

export default function IncludeRate({ tour }: { tour: Tour }) {
  /* HOOKS */
  const [run, setRun] = useState(false)
  const reviewsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = reviewsRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* What's included */}
      <Box className="ts-card">
        <h3 className="ts-heading">What's Included</h3>
        <Box className="ts-include-grid">
          <ul className="ts-include">
            {tour.included.map((item) => (
              <li key={item}>
                <CheckCircleRoundedIcon className="inc" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="ts-include">
            {tour.notIncluded.map((item) => (
              <li key={item}>
                <CancelRoundedIcon className="exc" />
                {item}
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      {/* Guest reviews */}
      <Box className="ts-card">
        <h3 className="ts-heading">Guest Reviews</h3>
        <Box className="ts-reviews" ref={reviewsRef}>
          <Box className="ts-review-score">
            <strong>{tour.rating.toFixed(1)}</strong>
            <Box className="ts-review-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarRoundedIcon
                  key={i}
                  className={i < Math.round(tour.rating) ? "on" : ""}
                />
              ))}
            </Box>
            <span>
              Based on <CountUp end={tour.reviews} run={run} /> reviews
            </span>
          </Box>

          <Box className="ts-review-bars">
            {distribution.map((pct, i) => (
              <Box className="ts-review-bar" key={i}>
                <span className="ts-bar-label">{5 - i} star</span>
                <Box className="ts-bar-track">
                  <Box
                    className="ts-bar-fill"
                    style={{
                      width: run ? `${pct}%` : "0%",
                      transitionDelay: `${i * 0.12}s`,
                    }}
                  />
                </Box>
                <span className="ts-bar-pct">
                  <CountUp end={pct} run={run} />%
                </span>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}
