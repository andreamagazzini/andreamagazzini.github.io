import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Icon } from '@iconify-icon/react'
import { ICard } from "../Card"
import { Modal } from '../Modal/Modal'

interface ITimeline {
  title?: string,
  points: ICard[]
  showDetails?: boolean
  icon?: string
}

export const Timeline = ({ title, points, showDetails = false, icon }: ITimeline) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [selectedPoint, setSelectedPoint] = useState<ICard | null>(null)

  return (
    <div className="flex flex-col" ref={ref}>
      <motion.h2 
        className="text-4xl lg:text-5xl mb-12 text-center font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <ol className="relative border-l-2 border-gray-300 dark:border-gray-700">                  
        {points.map((point, index) => (
          <motion.li 
            key={index}
            className={`mb-10 ml-6 ${showDetails ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => showDetails && setSelectedPoint(point)}
          >            
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-accent-500 rounded-full ring-4 ring-white dark:ring-gray-900">
              {icon ? (
                <Icon icon={icon} width={14} height={14} className="text-white" />
              ) : (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </span>
            <time className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {point.when}
            </time>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {point.title}
            </h3>
            {point.company && (
              <h4 className="flex items-center mb-1 text-base font-medium text-gray-600 dark:text-gray-400">
                {point.company}
              </h4>
            )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-500">
              {point.where}  
            </p>
            {showDetails && point.description && (
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {point.description}
              </p>
            )}
            {showDetails && (
              <div className="mt-2 flex items-center text-primary-600 dark:text-primary-400 text-xs font-semibold">
                <span>View Details</span>
                <Icon icon="mdi:arrow-right" width={14} className="ml-1" />
              </div>
            )}
          </motion.li>
        ))}
      </ol>

      {showDetails && selectedPoint && (
        <Modal
          isOpen={!!selectedPoint}
          onClose={() => setSelectedPoint(null)}
          title={`${selectedPoint.title}${selectedPoint.company ? ` at ${selectedPoint.company}` : ''}`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {selectedPoint.where && (
                <span className="flex items-center gap-1">
                  <Icon icon="mdi:map-marker" width={16} />
                  {selectedPoint.where}
                </span>
              )}
              {selectedPoint.when && (
                <span className="flex items-center gap-1">
                  <Icon icon="mdi:calendar" width={16} />
                  {selectedPoint.when}
                </span>
              )}
            </div>

            {selectedPoint.description && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-700 dark:text-gray-300">{selectedPoint.description}</p>
              </div>
            )}

            {selectedPoint.achievements && selectedPoint.achievements.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {selectedPoint.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <Icon icon="mdi:check-circle" width={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedPoint.technologies && Array.isArray(selectedPoint.technologies) && selectedPoint.technologies.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPoint.technologies.map((tech: string) => (
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

            {selectedPoint.link && (
              <a
                href={selectedPoint.link}
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
      )}
    </div> 
  )
} 
