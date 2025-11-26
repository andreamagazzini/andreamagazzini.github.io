import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify-icon/react'
import profileData from '../../data/profile.json'

export const Languages = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { languages } = profileData

  const getProficiencyColor = (level: number) => {
    if (level >= 5) return 'bg-green-500'
    if (level >= 4) return 'bg-blue-500'
    if (level >= 3) return 'bg-yellow-500'
    if (level >= 2) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <section ref={ref} className="py-20 px-5 lg:px-20 xl:px-52 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Languages
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Communication skills across cultures and borders
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:translate" width={24} className="text-primary-600 dark:text-primary-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {language.name}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {language.proficiency}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${(language.level / 5) * 100}%` } : { width: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className={`h-2.5 rounded-full ${getProficiencyColor(language.level)}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
