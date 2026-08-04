import { Box } from "@mui/material"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import { safetyFaqs as items } from "app/data/faqData"
import { useAccordion } from "app/hooks/CommonHooks/useAccordion"

export default function Safety() {
  const { openIndex, toggleItem } = useAccordion()

  return (
    <section className="faq-section">
      <h2 className="faq-section-title">Safety and Security</h2>
      <Box className="faq-list">
        {items.map((item, i) => (
          <Box
            className={`faq-item${openIndex === i ? " open" : ""}`}
            key={item.q}
          >
            <button
              type="button"
              className="faq-question"
              onClick={() => toggleItem(i)}
            >
              <span>{item.q}</span>
              <ExpandMoreRoundedIcon className="faq-chevron" />
            </button>
            <Box className="faq-answer">
              <p>{item.a}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  )
}
