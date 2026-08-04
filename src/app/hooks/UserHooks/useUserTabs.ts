import { useState } from "react"
import { useLocation } from "react-router-dom"

export type UserTab = "profile" | "bookings" | "wishlist" | "support"

export function useUserTabs() {
  const location = useLocation()
  const initialTab =
    (location.state as { tab?: UserTab } | null)?.tab ?? "profile"
  const [activeTab, setActiveTab] = useState<UserTab>(initialTab)

  return { activeTab, setActiveTab }
}
