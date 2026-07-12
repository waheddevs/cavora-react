import { Box } from "@mui/material"
import { useState } from "react"
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import ProfileCard from "./ProfileCard"
import MyBookings from "./MyBookings"
import Wishlist from "./Wishlist"
import Settings from "./Settings"
import "css/user.css"

type Tab = "bookings" | "wishlist" | "settings"

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "bookings", label: "My Bookings", icon: <LuggageRoundedIcon /> },
  { key: "wishlist", label: "Wishlist", icon: <FavoriteRoundedIcon /> },
  { key: "settings", label: "Settings", icon: <SettingsRoundedIcon /> },
]

export default function UserPage() {
  const [active, setActive] = useState<Tab>("bookings")

  return (
    <Box className="user-page">
      <Box className="user-container">
        <ProfileCard />

        <Box className="user-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`user-tab ${active === t.key ? "active" : ""}`}
              onClick={() => setActive(t.key)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </Box>

        {active === "bookings" && <MyBookings />}
        {active === "wishlist" && <Wishlist />}
        {active === "settings" && <Settings />}
      </Box>
    </Box>
  )
}
