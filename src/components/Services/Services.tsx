import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify-icon/react'
import profileData from '../../data/profile.json'

export const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { services, hrMessage } = profileData

  return (
    <section ref={ref} className="py-20 px-5 lg:px-20 xl:px-52 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-700 dark:to-accent-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          Services & Collaboration
        </h2>
        <p className="text-center text-white/90 mb-12 max-w-2xl mx-auto">
          Let's build something amazing together
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="mb-4">
                <Icon icon={service.icon} width={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-white/90 mb-4">{service.description}</p>
              {service.link && (
                <a
                  href={service.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-primary-200 transition-colors font-semibold"
                >
                  <span>Learn More</span>
                  <Icon icon="mdi:arrow-right" width={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* HR Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <Icon icon="mdi:lightbulb-on" width={32} className="text-yellow-300 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3">What Should an HR Remember?</h3>
              <p className="text-lg leading-relaxed text-white/95 italic">
                "{hrMessage}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <a
            href={profileData.personal.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Icon icon="logos:linkedin-icon" width={20} />
            <span>Connect on LinkedIn</span>
          </a>
          <a
            href={profileData.personal.oneHourVibe}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
          >
            <Icon icon="mdi:rocket-launch" width={20} />
            <span>One Hour Vibe Coding</span>
          </a>
          <a
            href={profileData.personal.social.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
          >
            <Icon icon="logos:github-icon" width={20} />
            <span>View GitHub</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}


