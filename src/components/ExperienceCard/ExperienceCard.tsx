import { motion } from 'framer-motion'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import { Modal } from '../Modal/Modal'

interface Experience {
  title: string
  company: string
  location: string
  period: string
  type: string
  description: string
  achievements?: string[]
  technologies?: string[]
  link?: string | null
}

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Full-time': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'Startup': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'Education': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'Teaching': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
    }
    return colors[type] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {experience.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(experience.type)}`}>
                {experience.type}
              </span>
            </div>
            <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-1">
              {experience.company}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Icon icon="mdi:map-marker" width={16} />
                {experience.location}
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="mdi:calendar" width={16} />
                {experience.period}
              </span>
            </div>
          </div>
          {experience.link && (
            <a
              href={experience.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Icon icon="mdi:open-in-new" width={20} className="text-gray-600 dark:text-gray-400" />
            </a>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {experience.description}
        </p>
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {tech}
              </span>
            ))}
            {experience.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                +{experience.technologies.length - 4}
              </span>
            )}
          </div>
        )}
        <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">
          <span>View Details</span>
          <Icon icon="mdi:arrow-right" width={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${experience.title} at ${experience.company}`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:map-marker" width={16} />
              {experience.location}
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:calendar" width={16} />
              {experience.period}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(experience.type)}`}>
              {experience.type}
            </span>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
            <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>
          </div>

          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <Icon icon="mdi:check-circle" width={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.technologies && experience.technologies.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {experience.link && (
            <a
              href={experience.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <span>Visit Company</span>
              <Icon icon="mdi:open-in-new" width={16} />
            </a>
          )}
        </div>
      </Modal>
    </>
  )
}


