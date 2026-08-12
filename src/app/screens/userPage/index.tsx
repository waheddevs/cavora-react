import { Box, CircularProgress } from "@mui/material"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded"
import Sidebar from "./Sidebar"
import { useUserTabs } from "app/hooks/UserHooks/useUserTabs"
import { UserTab } from "app/types/user"
import Settings from "./Settings"
import MyBookings from "./MyBookings"
import Wishlist from "./Wishlist"
import Support from "./Support"
import "css/user.css"
import { Navigate } from "react-router-dom"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

const tabs: { key: UserTab; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Settings", icon: <SettingsRoundedIcon /> },
  { key: "bookings", label: "My Bookings", icon: <LuggageRoundedIcon /> },
  { key: "wishlist", label: "Wishlist", icon: <FavoriteRoundedIcon /> },
  { key: "support", label: "Support", icon: <SupportAgentRoundedIcon /> },
]

export default function UserPage() {
  const { isAuthenticated, isAuthLoading } = useAuth()
  const { activeTab, setActiveTab } = useUserTabs()

  if (isAuthLoading) {
    return (
      <Box className="user-page">
        <Box className="user-page-loading" role="status">
          <CircularProgress
            size={40}
            thickness={4.2}
            sx={{ color: "var(--gold)" }}
          />
          <span>Loading account...</span>
        </Box>
      </Box>
    )
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />

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
