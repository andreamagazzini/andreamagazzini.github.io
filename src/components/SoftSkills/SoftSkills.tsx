import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import profileData from '../../data/profile.json'

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      description: string
      level: number
      fullName?: string
    }
  }>
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    const skillName = data.payload?.fullName || data.name || 'Skill'
    const levelLabels = ['Novice', 'Advanced Beginner', 'Competent', 'Proficient', 'Expert']
    const levelLabel = levelLabels[Math.round(data.value) - 1] || 'Unknown'
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs">
        <p className="font-bold text-gray-900 dark:text-white mb-2">{skillName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Level: <span className="font-semibold text-primary-600 dark:text-primary-400">{data.value.toFixed(1)}/5 ({levelLabel})</span>
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{data.payload?.description || ''}</p>
      </div>
    )
  }
  return null
}

export const SoftSkills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { softSkills } = profileData

  // Skills are already on 1-5 scale, no normalization needed
  const chartData = softSkills.map((skill) => ({
    name: skill.name,
    value: skill.level,
    fullName: skill.name,
    description: skill.description,
    level: skill.level
  }))

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Soft Skills
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Core competencies that drive professional success
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg"
        >
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid 
                stroke="#d1d5db" 
                strokeWidth={1}
                className="dark:stroke-gray-600"
              />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                className="dark:[&_text]:fill-gray-300"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[3, 5]} 
                tickCount={5}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                className="dark:[&_text]:fill-gray-400"
              />
              <Radar
                dataKey="value"
                stroke="#23ce6b"
                fill="#23ce6b"
                fillOpacity={0.4}
                strokeWidth={3}
                dot={{ r: 6, fill: '#23ce6b', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ 
                  r: 10, 
                  stroke: '#23ce6b', 
                  strokeWidth: 3,
                  fill: '#ffffff'
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={false}
                trigger="hover"
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  )
}
