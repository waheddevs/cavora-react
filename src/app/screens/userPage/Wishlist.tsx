import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import { useWishlistTours, removeFromWishlist } from "ts/wishlist"

export default function Wishlist() {
  /* HOOKS */
  const wishlist = useWishlistTours()

  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">Wishlist</h2>
      <p className="user-panel-subtitle">Tours you've saved for later.</p>

      {wishlist.length === 0 && (
        <Typography className="wishlist-empty">
          No saved tours yet. Browse tours and tap “Add to Wishlist”.
        </Typography>
      )}

      <Box className="wishlist-grid">
        {wishlist.map(tour => (
          <Box className="wishlist-card" key={tour.id}>
            <Box className="wishlist-image">
              <img src={tour.images[0]} alt={tour.title} />
              <button
                className="wishlist-remove"
                aria-label="Remove from wishlist"
                onClick={() => removeFromWishlist(tour.id)}
              >
                <FavoriteRoundedIcon />
              </button>
            </Box>

            <Box className="wishlist-content">
              <Box className="wishlist-rating">
                <StarRoundedIcon />
                {tour.rating}
                <span>({tour.reviews})</span>
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
