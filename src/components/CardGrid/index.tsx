import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, ICard } from "../Card";

interface ICardGrid {
  title: string,
  cards: ICard[]
}

export const CardGrid = ({ title, cards }: ICardGrid) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref}>
      <motion.h2 
        className="text-4xl lg:text-5xl mb-16 text-center font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
