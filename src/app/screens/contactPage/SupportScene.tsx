import { Box } from "@mui/material"
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded"
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded"
import CallRoundedIcon from "@mui/icons-material/CallRounded"
import MailRoundedIcon from "@mui/icons-material/MailRounded"

export default function SupportScene() {
  return (
    <Box className="support-scene">
      <span className="ring ring-1" />
      <span className="ring ring-2" />
      <span className="ring ring-3" />

      <span className="orbit" />

      <Box className="agent">
        <HeadsetMicRoundedIcon />
        <span className="agent-status" />
      </Box>

      <span className="bubble bubble-1">
        <ChatBubbleRoundedIcon />
      </span>
      <span className="bubble bubble-2">
        <CallRoundedIcon />
      </span>
      <span className="bubble bubble-3">
        <MailRoundedIcon />
      </span>
    </Box>
  )
}
