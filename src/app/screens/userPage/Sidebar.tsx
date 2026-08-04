import { Box } from "@mui/material"
import { UserTab } from "app/hooks/UserHooks/useUserTabs"
import { useAuth } from "app/hooks/AuthHooks/useAuth"

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
  const { user } = useAuth()
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <Box className="user-sidebar">
      <Box className="user-sidebar-avatar">
        <img src={user.avatar} alt={fullName} />
      </Box>

      <p className="user-sidebar-handle">@{user.username}</p>
      <h3 className="user-sidebar-name">{fullName}</h3>

      <Box component="nav" className="user-sidebar-nav">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`user-sidebar-link ${
              active === tab.key ? "active" : ""
            }`}
            onClick={() => onChange(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </Box>
    </Box>
  )
}
