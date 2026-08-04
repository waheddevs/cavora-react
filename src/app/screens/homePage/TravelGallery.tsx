import { Box, Container, Typography } from "@mui/material"
import { galleryImages as images } from "app/data/homeData"

export default function TravelGallery() {
  return (
    <section className="travel-gallery">
      <Container maxWidth={false} className="gallery-container">
        <Box className="gallery-head">
          <Typography className="section-tagline">Moments</Typography>
          <Typography className="section-title">Travel Gallery</Typography>
          <Typography className="gallery-subtitle">
            A glimpse of the unforgettable experiences waiting for you.
          </Typography>
        </Box>

        <Box className="gallery-grid">
          {images.map(item => (
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
