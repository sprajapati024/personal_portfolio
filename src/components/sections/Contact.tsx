import React from 'react'

export interface ContactInfo {
  email: string
  github?: string
  linkedin?: string
}

interface ContactProps {
  contact: ContactInfo
}

export const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <div className="w-80 max-w-full">
      <div className="border-2 border-win95-darkgray bg-white p-3 mb-2">
        <div className="mb-2">
          <label className="text-win95-sm font-bold block mb-1">Email:</label>
          <div className="border-2 border-win95-darkgray bg-white px-2 py-1">
            <a href={`mailto:${contact.email}`} className="text-win95-sm text-win95-navy underline">
              {contact.email}
            </a>
          </div>
        </div>

        {contact.github && (
          <div className="mb-2">
            <label className="text-win95-sm font-bold block mb-1">GitHub:</label>
            <div className="border-2 border-win95-darkgray bg-white px-2 py-1">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-win95-sm text-win95-navy underline"
              >
                {contact.github}
              </a>
            </div>
          </div>
        )}

        {contact.linkedin && (
          <div className="mb-2">
            <label className="text-win95-sm font-bold block mb-1">LinkedIn:</label>
            <div className="border-2 border-win95-darkgray bg-white px-2 py-1">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-win95-sm text-win95-navy underline"
              >
                {contact.linkedin}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-win95-gray border-2 border-win95-white shadow-raised px-4 py-1 text-win95-sm hover:bg-[#d4d4d4] active:shadow-pressed">
          Send Message
        </button>
        <button className="flex-1 bg-win95-gray border-2 border-win95-white shadow-raised px-4 py-1 text-win95-sm hover:bg-[#d4d4d4] active:shadow-pressed">
          Close
        </button>
      </div>
    </div>
  )
}
