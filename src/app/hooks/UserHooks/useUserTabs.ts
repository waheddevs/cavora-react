import { useState } from "react"
import { useLocation } from "react-router-dom"
import { UserTab } from "app/types/user"

export function useUserTabs() {
  const location = useLocation()
  const initialTab =
    (location.state as { tab?: UserTab } | null)?.tab ?? "profile"
  const [activeTab, setActiveTab] = useState<UserTab>(initialTab)

  return { activeTab, setActiveTab }
}
