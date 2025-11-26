import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Icon } from '@iconify-icon/react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import profileData from '../../data/profile.json'

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      description: string
      categoryKey: string
      averageLevel: number
      name: string
    }
  }>
  onShowMore?: (categoryKey: string) => void
  categoryData?: Array<{
    name: string
    value: number
    categoryKey: string
    description: string
    averageLevel: number
  }>
}

const CustomTooltip = ({ active, payload, onShowMore, categoryData, coordinate }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    // In Recharts, the payload contains the full data object
    const fullPayload = data.payload || (categoryData?.find((item: { name: string; categoryKey: string }) => item.name === data.name)) || {}
    const categoryKey = fullPayload.categoryKey || ''
    // Get category name - prioritize from payload, then from categoryData lookup
    const categoryName = fullPayload.name || data.name || 'Category'
    const levelLabels = ['Novice', 'Advanced Beginner', 'Competent', 'Proficient', 'Expert']
    const levelLabel = levelLabels[Math.round(data.value) - 1] || 'Unknown'
    
    // Determine if we should show tooltip above or below based on y coordinate
    // If coordinate is in lower half of chart, show tooltip above
    const showAbove = coordinate && coordinate.y > 200
    
    return (
      <div 
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs cursor-pointer hover:shadow-2xl transition-shadow"
        style={{
          transform: showAbove ? 'translateY(-100%)' : 'none',
          marginBottom: showAbove ? '8px' : '0',
          marginTop: showAbove ? '0' : '8px'
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (onShowMore && categoryKey) {
            onShowMore(categoryKey)
          }
        }}
      >
        <p className="font-bold text-gray-900 dark:text-white mb-2">{categoryName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Average Level: <span className="font-semibold text-primary-600 dark:text-primary-400">{data.value.toFixed(1)}/5 ({levelLabel})</span>
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{fullPayload.description || ''}</p>
        {onShowMore && (
          <div className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center justify-center gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Click the</span>
            <svg width="24" height="24" viewBox="0 0 24 24" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
            </svg>
            <span>to show more</span>
          </div>
        )}
      </div>
    )
  }
  return null
}

export const TechnicalSkills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { technicalSkills } = profileData
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Calculate average level for each category
  const categoryData = Object.entries(technicalSkills).map(([key, category]) => {
    const averageLevel = category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
    return {
      name: category.category,
      value: averageLevel,
      categoryKey: key,
      description: category.description,
      averageLevel: averageLevel
    }
  })

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCategory])

  const handleShowMore = (categoryKey: string) => {
    setSelectedCategory(categoryKey)
  }

  // Custom dot component that handles clicks
  const CustomDot = (props: any) => {
    const { cx, cy, payload, index, value } = props
    // Try multiple ways to get the categoryKey
    const categoryKey = payload?.categoryKey || 
                       (categoryData[index]?.categoryKey) ||
                       (categoryData.find((item: any) => item.value === value)?.categoryKey)
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#3b82f6"
        stroke="#ffffff"
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          if (categoryKey) {
            handleShowMore(categoryKey)
          }
        }}
        onMouseDown={(e) => {
          // Also handle mousedown as fallback
          e.stopPropagation()
        }}
      />
    )
  }

  const selectedCategoryData = selectedCategory ? technicalSkills[selectedCategory as keyof typeof technicalSkills] : null

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Technical Skills
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Technical expertise across multiple domains
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg"
        >
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={categoryData}>
              <PolarGrid 
                stroke="#d1d5db" 
                strokeWidth={1}
                className="dark:stroke-gray-600"
              />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                className="dark:[&_text]:fill-gray-300"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 5]} 
                tickCount={6}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                className="dark:[&_text]:fill-gray-400"
              />
              <Radar
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.4}
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={(props: any) => {
                  const { cx, cy, payload, index } = props
                  const categoryKey = payload?.categoryKey || (categoryData[index]?.categoryKey)
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={12}
                      fill="#ffffff"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (categoryKey) {
                          handleShowMore(categoryKey)
                        }
                      }}
                    />
                  )
                }}
                name=""
              />
              <Tooltip 
                content={<CustomTooltip onShowMore={handleShowMore} categoryData={categoryData} />}
                cursor={false}
                trigger="hover"
                allowEscapeViewBox={{ x: true, y: true }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Category Details Modal */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCategory(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCategoryData.category}</h2>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <Icon icon="mdi:close" width={24} height={24} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="overflow-y-auto flex-1 p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedCategoryData.description}</p>
                  
                  {/* Radar Chart for Skills */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg mb-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={selectedCategoryData.skills.map(skill => ({
                        name: skill.name,
                        value: skill.level,
                        fullName: skill.name,
                        description: skill.description,
                        level: skill.level
                      }))}>
                        <PolarGrid 
                          stroke="#d1d5db" 
                          strokeWidth={1}
                          className="dark:stroke-gray-600"
                        />
                        <PolarAngleAxis 
                          dataKey="name" 
                          tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                          className="dark:[&_text]:fill-gray-300"
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 5]} 
                          tickCount={6}
                          tick={{ fill: '#9ca3af', fontSize: 10 }}
                          className="dark:[&_text]:fill-gray-400"
                        />
                        <Radar
                          dataKey="value"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.4}
                          strokeWidth={3}
                          dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }}
                          activeDot={{
                            r: 10,
                            stroke: '#3b82f6',
                            strokeWidth: 3,
                            fill: '#ffffff'
                          }}
                          name=""
                        />
                        <Tooltip
                          content={({ active, payload }) => {
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
                          }}
                          cursor={false}
                          trigger="hover"
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Skills List with Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skill Details</h3>
                    {selectedCategoryData.skills.map((skill, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {skill.level.toFixed(1)}/5
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
