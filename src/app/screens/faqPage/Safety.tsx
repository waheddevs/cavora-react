import { useState } from "react"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import { safetyFaqs as items } from "../../../js/Faq"

export default function Safety() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="faq-section">
      <h2 className="faq-section-title">Safety and Security</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <div className={`faq-item${open === i ? " open" : ""}`} key={item.q}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <ExpandMoreRoundedIcon className="faq-chevron" />
            </button>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
