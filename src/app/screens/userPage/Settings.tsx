import { Box } from "@mui/material"
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import ImageRoundedIcon from "@mui/icons-material/ImageRounded"
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import UserAvatar from "app/components/ui/UserAvatar"
import { useAccountSettings } from "app/hooks/UserHooks/useAccountSettings"

export default function Settings() {
  /* HOOKS */
  const {
    user,
    displayedAvatar,
    form,
    passwordForm,
    handleProfileChange,
    handlePasswordFieldChange,
    handleProfileSubmit,
    handlePasswordSubmit,
    handleAvatarUpload,
    handleAvatarRemove,
    handleLogout,
    profileSaving,
    passwordChanging,
    avatarUploading,
    avatarRemoving,
    logoutPending,
  } = useAccountSettings()

  return (
    <Box className="user-panel">
      <h2 className="user-panel-title">Account Settings</h2>
      <p className="user-panel-subtitle">
        Keep your profile and account security up to date.
      </p>

      <Box className="settings-avatar-card">
        <Box
          component="label"
          className={`settings-avatar-media${
            avatarUploading || avatarRemoving ? " is-disabled" : ""
          }`}
          htmlFor="avatar-upload"
          title="Change profile photo"
        >
          <UserAvatar
            className="settings-avatar-image"
            src={displayedAvatar}
            name={`${user.firstName} ${user.lastName}`}
          />
        </Box>

        <Box className="settings-avatar-content">
          <Box className="settings-avatar-heading">
            <Box>
              <h3 className="settings-section-title">Profile photo</h3>
              <p className="settings-avatar-description">
                Personalize your Cavora travel profile.
              </p>
            </Box>
            <span className="settings-avatar-badge">Profile</span>
          </Box>

          <Box className="settings-avatar-meta">
            <ImageRoundedIcon />
            <span>JPEG · PNG · WebP · AVIF</span>
            <i>Up to 5 MB</i>
          </Box>

          <Box className="settings-avatar-actions">
            <label
              className={`settings-avatar-upload${
                avatarUploading || avatarRemoving ? " is-disabled" : ""
              }`}
              htmlFor="avatar-upload"
            >
              <CameraAltRoundedIcon />
              {avatarUploading ? "Uploading..." : "Upload new photo"}
            </label>
            <input
              id="avatar-upload"
              className="settings-avatar-input"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleAvatarUpload}
              disabled={avatarUploading || avatarRemoving}
            />
            <button
              type="button"
              className="settings-avatar-remove"
              onClick={handleAvatarRemove}
              disabled={avatarUploading || avatarRemoving}
              aria-label="Remove profile photo"
              title="Remove profile photo"
            >
              {avatarRemoving ? (
                <span className="settings-avatar-spinner dark" />
              ) : (
                <DeleteOutlineRoundedIcon />
              )}
            </button>
          </Box>
        </Box>
      </Box>

      <Box className="settings-divider" />

      <h3 className="settings-section-title">Personal information</h3>
      <Box
        component="form"
        className="settings-form"
        onSubmit={handleProfileSubmit}
        noValidate
      >
        <Box className="settings-row">
          <Box className="form-field">
            <label htmlFor="set-firstName">First Name</label>
            <input
              id="set-firstName"
              value={form.firstName}
              onChange={handleProfileChange("firstName")}
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-lastName">Last Name</label>
            <input
              id="set-lastName"
              value={form.lastName}
              onChange={handleProfileChange("lastName")}
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
              onChange={handleProfileChange("email")}
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-username">Username</label>
            <input
              id="set-username"
              value={form.username}
              onChange={handleProfileChange("username")}
            />
          </Box>
        </Box>

        <Box className="settings-row">
          <Box className="form-field">
            <label htmlFor="set-phone">Phone</label>
            <input
              id="set-phone"
              value={form.phone}
              onChange={handleProfileChange("phone")}
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-location">Location</label>
            <input
              id="set-location"
              value={form.location}
              onChange={handleProfileChange("location")}
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

      <h3 className="settings-section-title">Password & security</h3>
      <p className="settings-section-subtitle">
        Changing your password signs out your other active sessions.
      </p>
      <Box
        component="form"
        className="settings-form settings-password-form"
        onSubmit={handlePasswordSubmit}
        noValidate
      >
        <Box className="form-field">
          <label htmlFor="set-current-password">Current password</label>
          <input
            id="set-current-password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordFieldChange("currentPassword")}
            maxLength={128}
            required
          />
        </Box>
        <Box className="settings-row">
          <Box className="form-field">
            <label htmlFor="set-new-password">New password</label>
            <input
              id="set-new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordFieldChange("newPassword")}
              minLength={8}
              maxLength={128}
              required
            />
          </Box>
          <Box className="form-field">
            <label htmlFor="set-confirm-password">Confirm new password</label>
            <input
              id="set-confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordFieldChange("confirmPassword")}
              minLength={8}
              maxLength={128}
              required
            />
          </Box>
        </Box>
        <button
          type="submit"
          className="settings-submit"
          disabled={passwordChanging}
        >
          <LockResetRoundedIcon />
          {passwordChanging ? "Updating..." : "Update Password"}
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
