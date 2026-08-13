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

  // Counts arrive five stars first and always add up to the review count above.
  const ratedReviews = tour.ratingBreakdown.reduce((sum, count) => sum + count, 0)

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

          {ratedReviews > 0 ? (
            <Box className="ts-review-bars">
              {tour.ratingBreakdown.map((count, index) => {
                const percentage = Math.round((count / ratedReviews) * 100)
                return (
                  <Box className="ts-review-bar" key={5 - index}>
                    <span className="ts-bar-label">{5 - index} star</span>
                    <Box className="ts-bar-track">
                      <Box
                        className="ts-bar-fill"
                        style={{
                          width: run ? `${percentage}%` : "0%",
                          transitionDelay: `${index * 0.12}s`,
                        }}
                      />
                    </Box>
                    <span className="ts-bar-pct">
                      <CountUp end={percentage} run={run} />%
                    </span>
                  </Box>
                )
              })}
            </Box>
          ) : (
            <p className="ts-review-empty">
              No ratings yet. Be the first traveler to review this tour.
            </p>
          )}
        </Box>
      </Box>
    </>
  )
}
