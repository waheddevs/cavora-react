import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import { useWishlist } from "app/hooks/CommonHooks/useWishlist"
import { useTourNavigation } from "app/hooks/CommonHooks/useTourNavigation"
import TourViewCount from "app/components/ui/TourViewCount"
import { MouseEvent } from "react"

export default function Wishlist() {
  /* HOOKS */
  const { wishlist, removeFromWishlist, isLoading, isError } = useWishlist()
  const { openTour } = useTourNavigation()

  /* HANDLERS */
  const handleRemove = (
    event: MouseEvent<HTMLButtonElement>,
    tourId: number,
  ) => {
    event.stopPropagation()
    removeFromWishlist(tourId)
  }

  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">Wishlist</h2>
      <p className="user-panel-subtitle">Tours you've saved for later.</p>

      {isLoading && <Typography>Loading wishlist...</Typography>}
      {isError && (
        <Typography>
          Your saved adventures are temporarily off the map. Please check back
          shortly.
        </Typography>
      )}
      {!isLoading && !isError && wishlist.length === 0 && (
        <Typography className="wishlist-empty">
          No saved tours yet. Browse tours and tap “Add to Wishlist”.
        </Typography>
      )}

      <Box className="wishlist-grid">
        {wishlist.map(tour => (
          <Box
            className="wishlist-card"
            key={tour.id}
            onClick={() => openTour(tour.id)}
          >
            <Box className="wishlist-image">
              <img src={tour.images[0]} alt={tour.title} loading="lazy" />
              <button
                className="wishlist-remove"
                aria-label="Remove from wishlist"
                onClick={event => handleRemove(event, tour.id)}
              >
                <FavoriteRoundedIcon />
              </button>
            </Box>

            <Box className="wishlist-content">
              <Box className="wishlist-rating">
                <StarRoundedIcon />
                {tour.rating}
                <span className="wishlist-reviews">({tour.reviews})</span>
                <TourViewCount count={tour.viewCount} />
              </Box>
              <Typography className="wishlist-title">{tour.title}</Typography>
              <Typography className="wishlist-location">
                <LocationOnRoundedIcon />
                {tour.location}
              </Typography>

              <Box className="wishlist-footer">
                <span className="wishlist-price">
                  ${tour.price}
                  <small>/ person</small>
                </span>
                <NavLink
                  to={`/tour-single?id=${tour.id}`}
                  className="wishlist-link"
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    openTour(tour.id)
                  }}
                >
                  View
                </NavLink>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
