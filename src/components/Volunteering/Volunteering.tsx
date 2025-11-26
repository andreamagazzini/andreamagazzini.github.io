import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify-icon/react'
import profileData from '../../data/profile.json'

export const Volunteering = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { volunteering } = profileData

  return (
    <section ref={ref} className="py-20 px-5 lg:px-20 xl:px-52 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Volunteering
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Contributing to communities and making a positive impact beyond technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {volunteering.map((volunteer, index) => (
            <motion.div
              key={`${volunteer.organization}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {volunteer.title}
                </h3>
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  {volunteer.organization}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {volunteer.period}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {volunteer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
