import { Box, Container } from "@mui/material"
import Overview from "./Overview"
import Payment from "./Payment"
import Safety from "./Safety"
import "css/faq.css"

export default function FaqPage() {
  return (
    <Box className="faq-page">
      <Container maxWidth={false} className="faq-container">
        <Overview />
        <Payment />
        <Safety />
      </Container>
    </Box>
  )
}
