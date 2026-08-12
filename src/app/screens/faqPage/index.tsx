import { Box, Container } from "@mui/material"
import Section from "./Section"
import { useGetFaqsQuery } from "app/api/faqApi"
import "css/faq.css"

export default function FaqPage() {
  /* Sections come from the admin help centre; the API only returns the ones
     that actually have published questions, so nothing is hard-coded here. */
  const { data: sections = [], isLoading, isError } = useGetFaqsQuery()

  return (
    <Box className="faq-page">
      <Container maxWidth={false} className="faq-container">
        {isLoading && <p className="faq-status">Loading questions...</p>}
        {isError && (
          <p className="faq-status">
            Our help centre is briefly unavailable. Please try again shortly.
          </p>
        )}
        {!isLoading && !isError && sections.length === 0 && (
          <p className="faq-status">
            There are no published questions yet. Check back soon.
          </p>
        )}
        {sections.map(section => (
          <Section key={section.section} section={section} />
        ))}
      </Container>
    </Box>
  )
}
