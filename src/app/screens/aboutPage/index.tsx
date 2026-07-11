import { Box } from "@mui/material"
import OurStory from "./OurStory"
import Statistics from "./Statistics"
import Advantages from "./Advantages"
import Reviews from "./Reviews"
import Steps from "./Steps"
import Team from "./Team"
import JoinUs from "./JoinUs"
import "css/about.css"

export default function AboutPage() {
  return (
    <Box className="about-page">
      <OurStory />
      <Statistics />
      <Advantages />
      <Reviews />
      <Steps />
      <Team />
      <JoinUs />
    </Box>
  )
}
