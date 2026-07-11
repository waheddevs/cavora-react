import { Box } from "@mui/material"
import GetInTouch from "./GetInTouch"
import Form from "./Form"
import "css/contact.css"

export default function ContactPage() {
  return (
    <Box className="contact-page">
      <GetInTouch />
      <Form />
    </Box>
  )
}
