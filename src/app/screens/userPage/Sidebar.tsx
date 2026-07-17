import { Box } from "@mui/material"
import { currentUser } from "ts/User"

export type UserTab = "profile" | "bookings" | "wishlist" | "support"

interface SidebarTabItem {
  key: UserTab
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  active: UserTab
  onChange: (tab: UserTab) => void
  tabs: SidebarTabItem[]
}

export default function Sidebar({ active, onChange, tabs }: SidebarProps) {
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`

  return (
    <Box className="user-sidebar">
      <Box className="user-sidebar-avatar">
        <img src={currentUser.avatar} alt={fullName} />
      </Box>

      <p className="user-sidebar-handle">@{currentUser.username}</p>
      <h3 className="user-sidebar-name">{fullName}</h3>

      <Box component="nav" className="user-sidebar-nav">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`user-sidebar-link ${active === t.key ? "active" : ""}`}
            onClick={() => onChange(t.key)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </Box>
    </Box>
  )
}
