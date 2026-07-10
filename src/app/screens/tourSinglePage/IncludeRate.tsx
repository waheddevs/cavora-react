import { useEffect, useRef, useState } from "react"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import CountUp from "../../components/CountUp"
import type { Tour } from "./types"

/* Plausible star distribution (5★ → 1★) for the review bars */
const distribution = [78, 15, 4, 2, 1]

export default function IncludeRate({ tour }: { tour: Tour }) {
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
      <div className="ts-card">
        <h3 className="ts-heading">What's Included</h3>
        <div className="ts-include-grid">
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
        </div>
      </div>

      {/* Guest reviews */}
      <div className="ts-card">
        <h3 className="ts-heading">Guest Reviews</h3>
        <div className="ts-reviews" ref={reviewsRef}>
          <div className="ts-review-score">
            <strong>{tour.rating.toFixed(1)}</strong>
            <div className="ts-review-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarRoundedIcon
                  key={i} 
                  className={i < Math.round(tour.rating) ? "on" : ""}
                />
              ))}
            </div>
            <span>
              Based on <CountUp end={tour.reviews} run={run} /> reviews
            </span>
          </div>

          <div className="ts-review-bars">
            {distribution.map((pct, i) => (
              <div className="ts-review-bar" key={i}>
                <span className="ts-bar-label">{5 - i} star</span>
                <div className="ts-bar-track">
                  <div
                    className="ts-bar-fill"
                    style={{
                      width: run ? `${pct}%` : "0%",
                      transitionDelay: `${i * 0.12}s`,
                    }}
                  />
                </div>
                <span className="ts-bar-pct">
                  <CountUp end={pct} run={run} />%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
