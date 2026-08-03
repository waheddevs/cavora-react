import { Box } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { currentUser } from "ts/User"

export default function Settings() {
  /* HOOKS */
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    phone: currentUser.phone,
    location: currentUser.location,
  })

  /* HANDLER */
  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    /* Static — no backend yet. */
    console.log("Profile updated", form)
  }

  const handleLogout = () => {
    /* Static — no backend yet. */
    navigate("/login")
  }

  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">Account Settings</h2>
      <p className="user-panel-subtitle">Update your personal information.</p>

      <Box
        component="form"
        className="settings-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Box className="settings-row">
          <Box className="form-field">
            <label htmlFor="set-firstName">First Name</label>
            <input
              id="set-firstName"
              value={form.firstName}
              onChange={handleChange("firstName")}
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-lastName">Last Name</label>
            <input
              id="set-lastName"
              value={form.lastName}
              onChange={handleChange("lastName")}
            />
          </Box>
        </Box>

        <Box className="settings-row">
          <Box className="form-field">
            <label htmlFor="set-email">Email</label>
            <input
              id="set-email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-username">Username</label>
            <input
              id="set-username"
              value={form.username}
              onChange={handleChange("username")}
            />
          </Box>
        </Box>

        <Box className="settings-row">
          <Box className="form-field">
            <label htmlFor="set-phone">Phone</label>
            <input
              id="set-phone"
              value={form.phone}
              onChange={handleChange("phone")}
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-location">Location</label>
            <input
              id="set-location"
              value={form.location}
              onChange={handleChange("location")}
            />
          </Box>
        </Box>

        <button type="submit" className="settings-submit">
          Save Changes
        </button>
      </Box>

      <Box className="settings-divider" />

      <Box className="settings-danger-zone">
        <Box>
          <h3 className="settings-danger-title">Log Out</h3>
          <p className="settings-danger-subtitle">
            Sign out of your Cavora account on this device.
          </p>
        </Box>
        <button type="button" className="danger-button" onClick={handleLogout}>
          <LogoutRoundedIcon />
          Log Out
        </button>
      </Box>
    </Box>
  )
}
