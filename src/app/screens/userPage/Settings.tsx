import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { currentUser } from "ts/User"

export default function Settings() {
  const [form, setForm] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    phone: currentUser.phone,
    location: currentUser.location,
  })

  const handleChange = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    /* Static — no backend yet. */
    console.log("Profile updated", form)
  }

  return (
    <Box className="user-panel">
      <Typography className="user-panel-title">Account Settings</Typography>
      <Typography className="user-panel-subtitle">
        Update your personal information.
      </Typography>

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
    </Box>
  )
}
