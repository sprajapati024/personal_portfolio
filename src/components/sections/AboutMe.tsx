import React from 'react'

interface AboutMeProps {
  name: string
  bio: string
}

export const AboutMe: React.FC<AboutMeProps> = ({ name, bio }) => {
  return (
    <div className="w-80 max-w-full">
      <div className="border-2 border-win95-darkgray bg-white p-3 mb-2">
        <h2 className="text-win95-lg font-bold mb-2">{name}</h2>
        <p className="text-win95-sm whitespace-pre-wrap">{bio}</p>
      </div>
      <button className="w-full bg-win95-gray border-2 border-win95-white shadow-raised px-4 py-1 text-win95-sm hover:bg-[#d4d4d4] active:shadow-pressed">
        OK
      </button>
    </div>
  )
}
