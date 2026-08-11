import PersonRoundedIcon from "@mui/icons-material/PersonRounded"

interface UserAvatarProps {
  src: string
  name: string
  className?: string
}

export default function UserAvatar({ src, name, className }: UserAvatarProps) {
  if (!src) {
    return (
      <span
        className={`user-avatar-fallback${className ? ` ${className}` : ""}`}
        role="img"
        aria-label={name}
      >
        <PersonRoundedIcon />
      </span>
    )
  }

  return <img className={className} src={src} alt={name} />
}
