import React from 'react'

export interface Project {
  title: string
  description: string
  tech: string[]
}

interface ProjectsProps {
  projects: Project[]
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="w-96 max-w-full">
      <div className="border-2 border-win95-darkgray bg-white p-2 mb-2 max-h-64 overflow-y-auto">
        {projects.map((project, index) => (
          <div key={index} className="mb-3 pb-3 border-b border-win95-gray last:border-b-0">
            <h3 className="text-win95-sm font-bold mb-1">{project.title}</h3>
            <p className="text-win95-xs mb-1">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-win95-gray border border-win95-darkgray px-1 text-win95-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-win95-gray border-2 border-win95-white shadow-raised px-4 py-1 text-win95-sm hover:bg-[#d4d4d4] active:shadow-pressed">
          View All
        </button>
        <button className="flex-1 bg-win95-gray border-2 border-win95-white shadow-raised px-4 py-1 text-win95-sm hover:bg-[#d4d4d4] active:shadow-pressed">
          Close
        </button>
      </div>
    </div>
  )
}
