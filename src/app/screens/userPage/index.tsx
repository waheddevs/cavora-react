import { Box } from "@mui/material"
import { useState } from "react"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded"
import Sidebar from "./Sidebar"
import type { UserTab } from "./Sidebar"
import Settings from "./Settings"
import MyBookings from "./MyBookings"
import Wishlist from "./Wishlist"
import Support from "./Support"
import "css/user.css"

const tabs: { key: UserTab; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <AccountCircleRoundedIcon /> },
  { key: "bookings", label: "My Bookings", icon: <LuggageRoundedIcon /> },
  { key: "wishlist", label: "Wishlist", icon: <FavoriteRoundedIcon /> },
  { key: "support", label: "Support", icon: <SupportAgentRoundedIcon /> },
]

export default function UserPage() {
  const [active, setActive] = useState<UserTab>("profile")

  return (
    <Box className="user-page">
      <Box className="user-container">
        <Box className="user-shell">
          <Box className="user-shell-banner" />

          <Box className="user-shell-body">
            <Sidebar active={active} onChange={setActive} tabs={tabs} />

            <Box className="user-content">
              {active === "profile" && <Settings />}
              {active === "bookings" && <MyBookings />}
              {active === "wishlist" && <Wishlist />}
              {active === "support" && <Support />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
