import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify-icon/react'
import profileData from '../../data/profile.json'

export const Hero = () => {
  const { personal, about, languages } = profileData
  const [imageError, setImageError] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  // Get first paragraph for preview
  const aboutPreview = about.paragraphs.slice(0, 1)

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (showAboutModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAboutModal])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Generate initials for placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <motion.div 
        id="home"
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side: Avatar + Soft Skills */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            {!imageError ? (
              <motion.img 
                className="w-1/3 h-auto rounded-2xl shadow-2xl object-contain mx-auto" 
                src={personal.profileImage || "/avatar.png"} 
                alt={`${personal.name} profile picture`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onError={() => setImageError(true)}
              />
            ) : (
              <motion.div
                className="w-1/3 aspect-square rounded-2xl shadow-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-4xl lg:text-5xl font-bold mx-auto"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getInitials(personal.name)}
              </motion.div>
            )}

            {/* Languages - Compact with Bar Chart */}
            <motion.div
              variants={itemVariants}
              className="w-full"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl shadow-lg">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Languages
                </h3>
                <div className="space-y-3">
                  {languages.map((language, index) => {
                    const getProficiencyColor = (level: number) => {
                      if (level >= 5) return 'bg-green-500'
                      if (level >= 4) return 'bg-blue-500'
                      if (level >= 3) return 'bg-yellow-500'
                      if (level >= 2) return 'bg-orange-500'
                      return 'bg-red-500'
                    }
                    const getFlagIcon = (languageName: string) => {
                      const flags: { [key: string]: string } = {
                        'Italian': 'twemoji:flag-italy',
                        'English': 'twemoji:flag-united-kingdom',
                        'Spanish': 'twemoji:flag-spain',
                        'French': 'twemoji:flag-france',
                        'Portuguese': 'twemoji:flag-portugal',
                        'German': 'twemoji:flag-germany'
                      }
                      return flags[languageName] || 'mdi:translate'
                    }
                    return (
                      <div key={language.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            <Icon icon={getFlagIcon(language.name)} width={16} className="flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {language.name}
                            </span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400 text-xs">
                            {language.proficiency}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(language.level / 5) * 100}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                            className={`h-2 rounded-full ${getProficiencyColor(language.level)}`}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side: Name, Role, About Preview */}
        <div className="flex-1 min-w-0">
          <motion.p 
            className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 mb-2"
            variants={itemVariants}
          >
            Hello there, I'm
          </motion.p>
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent leading-normal pb-2"
            variants={itemVariants}
          >
            {personal.name}
          </motion.h1>
          <motion.h3 
            className="text-xl lg:text-2xl text-primary-500 dark:text-primary-400 font-semibold mb-4"
            variants={itemVariants}
          >
            {personal.title}
          </motion.h3>

          {/* Location and details */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6"
            variants={itemVariants}
          >
            {personal.status && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:airplane" width={18} />
                {personal.status}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Icon icon="mdi:map-marker" width={18} />
              {personal.location}
            </span>
            {personal.nationality && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:flag" width={18} />
                {personal.nationality} (Genoa)
              </span>
            )}
          </motion.div>

          {/* About Preview */}
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <div className="space-y-4">
              {aboutPreview.map((p: string, index: number) => (
                <p
                  key={index}
                  className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
            <button
              onClick={() => setShowAboutModal(true)}
              className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors group"
            >
              <span>Read more about me</span>
              <Icon 
                icon="mdi:arrow-right" 
                width={20} 
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* About Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAboutModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{about.title}</h2>
                  <button
                    onClick={() => setShowAboutModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <Icon icon="mdi:close" width={24} height={24} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-6">
                    {about.paragraphs.map((p: string, index: number) => (
                      <p
                        key={index}
                        className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
