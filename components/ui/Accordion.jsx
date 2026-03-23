import { useState } from 'react'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="text-base font-bold text-heading pr-4">
              {item.question}
            </span>
            <span className="text-muted flex-shrink-0 text-xl leading-none">
              {openIndex === index ? '\u2212' : '+'}
            </span>
          </button>
          {openIndex === index && (
            <p className="text-base text-primary leading-relaxed pb-5">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
