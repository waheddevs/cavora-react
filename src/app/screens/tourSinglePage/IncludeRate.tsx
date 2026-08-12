import { Box } from "@mui/material"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import CountUp from "../../components/CountUp"
import { useInViewOnce } from "app/hooks/CommonHooks/useInViewOnce"
import { useTourDetails } from "app/hooks/TourSingleHooks/useTourDetails"

export default function IncludeRate() {
  const { tour } = useTourDetails()
  const { hasEntered: run, targetRef: reviewsRef } =
    useInViewOnce<HTMLDivElement>(0.4)
  if (!tour) return null

  return (
    <>
      <Box className="ts-card">
        <h3 className="ts-heading">What's Included</h3>
        <Box className="ts-include-grid">
          <ul className="ts-include">
            {tour.included.map(item => (
              <li key={item}>
                <CheckCircleRoundedIcon className="inc" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="ts-include">
            {tour.notIncluded.map(item => (
              <li key={item}>
                <CancelRoundedIcon className="exc" />
                {item}
              </li>
            ))}
          </ul>
        </Box>
      </Box>

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

          {/* A per-star breakdown used to be drawn here from a fixed
              [78, 15, 4, 2, 1], shown identically for every tour whatever its
              rating. Reviews carry no star value in the schema, so there is
              nothing real to plot; the average and review count above are the
              only figures the API can back. */}
        </Box>
      </Box>
    </>
  )
}
