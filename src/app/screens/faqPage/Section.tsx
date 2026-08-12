import { Box } from "@mui/material"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import { useAccordion } from "app/hooks/CommonHooks/useAccordion"
import { FaqSection as FaqSectionData } from "app/types/faq"

/* One section, rendered from whatever the API returned. Each section keeps its
   own accordion state, so opening a payment question does not close an
   overview one. */
export default function Section({ section }: { section: FaqSectionData }) {
  const { openIndex, toggleItem } = useAccordion()

  return (
    <section className="faq-section">
      <h2 className="faq-section-title">{section.title}</h2>
      <Box className="faq-list">
        {section.items.map((item, i) => (
          <Box
            className={`faq-item${openIndex === i ? " open" : ""}`}
            key={item.id}
          >
            <button
              type="button"
              className="faq-question"
              onClick={() => toggleItem(i)}
            >
              <span>{item.question}</span>
              <ExpandMoreRoundedIcon className="faq-chevron" />
            </button>
            <Box className="faq-answer">
              <p>{item.answer}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  )
}
