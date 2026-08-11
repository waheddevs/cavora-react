import { Box } from "@mui/material"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { useAccountSettings } from "app/hooks/UserHooks/useAccountSettings"

export default function Settings() {
  const {
    form,
    handleChange,
    handleSubmit,
    handleLogout,
    profileSaving,
    logoutPending,
  } = useAccountSettings()

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

        <button
          type="submit"
          className="settings-submit"
          disabled={profileSaving}
        >
          {profileSaving ? "Saving..." : "Save Changes"}
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
        <button
          type="button"
          className="danger-button"
          onClick={handleLogout}
          disabled={logoutPending}
        >
          <LogoutRoundedIcon />
          {logoutPending ? "Logging out..." : "Log Out"}
        </button>
      </Box>
    </Box>
  )
}
