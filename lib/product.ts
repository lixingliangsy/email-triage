export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  "name": "EmailTriage",
  "slug": "email-triage",
  "tagline": "Sort and draft your inbox fast",
  "description": "Paste a batch of emails; get each labeled ACTION / READ / LOW with a ready draft reply for the ones that need action. For busy founders and operators.",
  "toolTitle": "Triage your emails",
  "resultLabel": "Triage result",
  "ctaLabel": "Triage",
  "features": [
    "Auto label",
    "Draft replies",
    "Bulk paste",
    "No inbox access needed"
  ],
  "inputs": [
    {
      "key": "emails",
      "label": "Emails (one per line)",
      "type": "textarea",
      "placeholder": "From boss: can you send the report?\\nFrom newsletter: 50% off everything"
    }
  ],
  "systemPrompt": "You are an email triage assistant. For each pasted email, classify ACTION/READ/LOW and draft a short reply for ACTION items.",
  "pricing": [
    {
      "tier": "Free",
      "price": "$0",
      "desc": "20 emails/month"
    },
    {
      "tier": "Pro",
      "price": "$12/mo",
      "desc": "Unlimited, smart drafts"
    },
    {
      "tier": "Studio",
      "price": "$29/mo",
      "desc": "Rules, follow-ups, API"
    }
  ],
  mock: (inputs: Record<string, string>): string => {
  const emails = inputs['emails'] || 'From boss: can you send the report?\nFrom newsletter: 50% off everything'
  const lines = emails.split('\n').filter(Boolean)
  const triaged = lines.map((l, i) => {
    const cat = /report|meeting|urgent|boss|client|invoice/i.test(l) ? 'ACTION' : /sale|off|newsletter|unsubscribe/i.test(l) ? 'LOW' : 'READ'
    return (i + 1) + '. [' + cat + '] ' + l.slice(0, 60)
  }).join('\n')
  return `EMAIL TRIAGE\n${triaged}

Draft (ACTION): "Got it - sending the report by EOD. Best,"

---
(Mock triage. Add OPENAI_API_KEY for drafted replies per email.)`
  }
}
