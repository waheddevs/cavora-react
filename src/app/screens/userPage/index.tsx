import { Box } from "@mui/material"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded"
import Sidebar from "./Sidebar"
import { UserTab, useUserTabs } from "app/hooks/UserHooks/useUserTabs"
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
  const { activeTab, setActiveTab } = useUserTabs()

  return (
    <Box className="user-page">
      <Box className="user-container">
        <Box className="user-shell">
          <Box className="user-shell-banner" />

          <Box className="user-shell-body">
            <Sidebar active={activeTab} onChange={setActiveTab} tabs={tabs} />

            <Box className="user-content">
              {activeTab === "profile" && <Settings />}
              {activeTab === "bookings" && <MyBookings />}
              {activeTab === "wishlist" && <Wishlist />}
              {activeTab === "support" && <Support />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
