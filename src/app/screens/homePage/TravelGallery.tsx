import { Box, Container, Typography } from "@mui/material"
import { galleryImages as images } from "js/Home"

export default function TravelGallery() {
  return (
    <section className="travel-gallery">
      <Container maxWidth={false} className="gallery-container">
        {/* Section header */}
        <Box className="gallery-head">
          <Typography className="section-tagline">Moments</Typography>
          <Typography className="section-title">Travel Gallery</Typography>
          <Typography className="gallery-subtitle">
            A glimpse of the unforgettable experiences waiting for you.
          </Typography>
        </Box>

        {/* Bento grid */}
        <Box className="gallery-grid">
          {images.map((item) => (
            <Box
              className={`gallery-item${item.tall ? " tall" : ""}`}
              key={item.img}
            >
              <img src={item.img} alt={item.alt} className="gallery-img" />
            </Box>
          ))}
        </Box>
      </Container>
    </section>
  )
}
