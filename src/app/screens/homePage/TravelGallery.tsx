import { CSSProperties, MouseEvent } from "react"
import { Box, Container, Dialog, IconButton, Typography } from "@mui/material"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import { useHomeContent } from "app/hooks/HomeHooks/useHomeContent"
import { useTravelGallery } from "app/hooks/HomeHooks/useTravelGallery"
import GoldButton from "app/components/ui/GoldButton"

export default function TravelGallery() {
  /* HOOKS */
  const { gallery: images } = useHomeContent()
  const {
    activeImage,
    activeIndex,
    closeImage,
    exploreTour,
    galleryRef,
    handleTileKeyDown,
    handleTouchEnd,
    handleTouchStart,
    isVisible,
    openImage,
    showNext,
    showPrevious,
  } = useTravelGallery(images)

  /* HANDLERS */
  const handleExploreTour = (
    event: MouseEvent<HTMLButtonElement>,
    tourId: number,
  ) => {
    event.stopPropagation()
    exploreTour(tourId)
  }

  return (
    <section className="travel-gallery" ref={galleryRef}>
      <Container maxWidth={false} className="gallery-container">
        <Box className="gallery-head">
          <Typography className="section-tagline">Moments</Typography>
          <Typography className="section-title">Travel Gallery</Typography>
          <Typography className="gallery-subtitle">
            A glimpse of the unforgettable experiences waiting for you.
          </Typography>
        </Box>

        <Box className={`gallery-grid${isVisible ? " is-visible" : ""}`}>
          {images.map((item, index) => (
            <Box
              className={`gallery-item${item.tall ? " tall" : ""}`}
              key={item.imageUrl}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.title}`}
              onClick={() => openImage(index)}
              onKeyDown={event => handleTileKeyDown(event, index)}
              style={{ "--gallery-delay": `${index * 90}ms` } as CSSProperties}
            >
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="gallery-img"
              />
              <Box className="gallery-overlay">
                <span className="gallery-category">{item.category}</span>
                <Box className="gallery-caption">
                  <Typography className="gallery-item-title">
                    {item.title}
                  </Typography>
                  <span className="gallery-location">
                    <LocationOnRoundedIcon />
                    {item.location}
                  </span>
                </Box>
                <button
                  type="button"
                  className="gallery-explore"
                  onClick={event => handleExploreTour(event, item.tourId)}
                >
                  Explore Tour
                  <ArrowForwardRoundedIcon />
                </button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      <Dialog
        open={activeImage !== null}
        onClose={closeImage}
        maxWidth="lg"
        fullWidth
        className="gallery-lightbox"
        aria-labelledby="gallery-lightbox-title"
      >
        {activeImage && (
          <Box
            className="gallery-lightbox-shell"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <IconButton
              className="gallery-lightbox-close"
              onClick={closeImage}
              aria-label="Close gallery"
            >
              <CloseRoundedIcon />
            </IconButton>

            <button
              type="button"
              className="gallery-lightbox-nav previous"
              onClick={showPrevious}
              aria-label="Previous image"
            >
              <ChevronLeftRoundedIcon />
            </button>
            <button
              type="button"
              className="gallery-lightbox-nav next"
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRightRoundedIcon />
            </button>

            <img
              src={activeImage.imageUrl}
              alt={activeImage.altText}
              className="gallery-lightbox-image"
              draggable={false}
            />

            <Box className="gallery-lightbox-details">
              <Box>
                <span className="gallery-lightbox-category">
                  {activeImage.category}
                </span>
                <Typography
                  id="gallery-lightbox-title"
                  className="gallery-lightbox-title"
                >
                  {activeImage.title}
                </Typography>
                <span className="gallery-lightbox-location">
                  <LocationOnRoundedIcon />
                  {activeImage.location}
                </span>
              </Box>
              <GoldButton
                className="gallery-lightbox-explore"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => exploreTour(activeImage.tourId)}
              >
                Explore Tour
              </GoldButton>
            </Box>

            <Box className="gallery-lightbox-dots" aria-label="Gallery slides">
              {images.map((item, index) => (
                <button
                  type="button"
                  key={item.imageUrl}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => openImage(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </Box>
          </Box>
        )}
      </Dialog>
    </section>
  )
}
