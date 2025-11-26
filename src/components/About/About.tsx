import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profileData from '../../data/profile.json';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { about } = profileData;

  return (
    <motion.div 
      ref={ref}
      className="mt-12 lg:mt-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="inline-block mb-8 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white border-b-4 border-accent-500 pb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: 0.2 }}
      >
        {about.title}
      </motion.h2>
      <div className="space-y-6">
        {about.paragraphs.map((p: string, index: number) => (
          <motion.p
            key={index}
            className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
