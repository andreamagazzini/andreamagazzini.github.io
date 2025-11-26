import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify-icon/react'
import profileData from '../../data/profile.json'

export const Passions = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { passions } = profileData

  const passionEntries = Object.values(passions)

  return (
    <section ref={ref} className="py-20 px-5 lg:px-20 xl:px-52 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Passions & Motivation
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          What drives me beyond code
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passionEntries.map((passion, index) => (
            <motion.div
              key={passion.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-primary-200 dark:border-primary-800"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-primary-600 rounded-full">
                  <Icon icon={passion.icon} width={40} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {passion.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {passion.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}


