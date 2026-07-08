import { Box, Container, Typography } from "@mui/material"

interface GalleryImage {
  img: string
  alt: string
  tall?: boolean
}

const images: GalleryImage[] = [
  { img: "/img/home-page-img/hero.jpg", alt: "Snowy peaks above the clouds", tall: true },
  { img: "/img/home-page-img/gallery-1.jpg", alt: "Aerial view of Rome" },
  { img: "/img/home-page-img/gallery-2.jpg", alt: "Taj Mahal through an archway" },
  { img: "/img/home-page-img/tour-safari.jpg", alt: "Wooden boat on an alpine lake" },
  { img: "/img/home-page-img/tour-santorini.jpg", alt: "Pyramids of Giza" },
]

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
