import { Box, Container, Typography } from "@mui/material"
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded"
import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded"
import { reviews } from "js/About"

function renderStars(rating: number) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<StarRoundedIcon key={i} className="star" />)
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalfRoundedIcon key={i} className="star" />)
    } else {
      stars.push(<StarRoundedIcon key={i} className="star empty" />)
    }
  }
  return stars
}

export default function Reviews() {
  return (
    <section className="reviews">
      <Container maxWidth={false} className="reviews-container">
        {/* Section header */}
        <Box className="reviews-head">
          <Typography className="section-tagline">Reviews</Typography>
          <Typography className="section-title">What Our Clients Say</Typography>
          <Typography className="reviews-subtitle">
            Real stories from real travellers who have experienced the Cavora
            difference.
          </Typography>
        </Box>

        {/* Review cards */}
        <Box className="reviews-grid">
          {reviews.map((review) => (
            <Box className="review-card" key={review.name}>
              <FormatQuoteRoundedIcon className="review-quote" />
              <Typography className="review-text">{review.text}</Typography>

              <Box className="review-divider" />

              <Box className="review-foot">
                <Box className="review-author">
                  <Box className="author-avatar">
                    <PersonRoundedIcon />
                  </Box>
                  <Box className="author-info">
                    <strong>{review.name}</strong>
                    <span>{review.location}</span>
                  </Box>
                </Box>
                <Box className="review-stars">{renderStars(review.rating)}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  )
}
