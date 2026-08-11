import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"

interface TourViewCountProps {
  count: number
}

export default function TourViewCount({ count }: TourViewCountProps) {
  return (
    <span className="tour-view-count" aria-label={`${count} views`}>
      <VisibilityRoundedIcon />
      {count.toLocaleString()}
    </span>
  )
}
