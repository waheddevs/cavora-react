import { Box, Typography } from "@mui/material"
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import { currentUser, bookings, bookedCountries } from "ts/User"
import { useWishlistTours } from "ts/wishlist"

export default function ProfileCard() {
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`
  const savedCount = useWishlistTours().length

  const stats = [
    { value: bookings.length, label: "Total Trips" },
    { value: savedCount, label: "Saved Tours" },
    { value: bookedCountries, label: "Countries" },
  ]

  return (
    <Box className="profile-card">
      <Box className="profile-banner" />

      <Box className="profile-body">
        <Box className="profile-avatar">
          <img src={currentUser.avatar} alt={fullName} />
        </Box>

        <Box className="profile-info">
          <Typography className="profile-name">{fullName}</Typography>
          <Typography className="profile-email">{currentUser.email}</Typography>

          <Box className="profile-meta">
            <span className="profile-meta-item">
              <LocationOnRoundedIcon />
              {currentUser.location}
            </span>
            <span className="profile-meta-item">
              <CalendarMonthRoundedIcon />
              Member since {currentUser.memberSince}
            </span>
          </Box>
        </Box>

        <Box className="profile-stats">
          {stats.map((s) => (
            <Box className="profile-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
