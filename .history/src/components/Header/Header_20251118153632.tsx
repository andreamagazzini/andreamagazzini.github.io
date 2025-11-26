import { HashLink } from 'react-router-hash-link'
import { Icon } from "@iconify-icon/react"
import { motion } from 'framer-motion'
import logo from "../../assets/logo.svg";
import { Popover } from '../Popover/Popover'
import { useTheme } from '../../hooks/useTheme'
import { ResumeGenerator } from '../ResumeGenerator/ResumeGenerator'
import profileData from '../../data/profile.json'

export const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { personal } = profileData

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between p-5 lg:py-6 lg:px-40 fixed top-0 left-0 w-screen bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm"
    >
          <HashLink smooth to="#home" className="hover:opacity-80 transition-opacity">
            <img 
              className="h-8 lg:h-10" 
              src={logo} 
              alt="Andrea Magazzini logo"
            />
          </HashLink>

      <nav className="flex items-center gap-4 lg:gap-6">
        <Popover body={personal.email}>
          <Icon 
            icon="ic:round-email" 
            width={24} 
            height={24}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
          />
        </Popover>
        <Popover body={personal.phone}>
          <Icon 
            icon="ic:round-phone" 
            width={24} 
            height={24}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
          />
        </Popover>
        <a
          href={personal.social.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn Profile"
          className="text-gray-700 dark:text-gray-300 hover:text-accent-500 transition-colors"
        >
          <Icon icon="logos:linkedin-icon" width={24} height={24} />
        </a>
        <a
          href={personal.social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Icon icon="logos:github-icon" width={24} height={24} />
        </a>
        <a
          href={personal.social.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
          className="text-gray-700 dark:text-gray-300 hover:text-accent-400 transition-colors"
        >
          <Icon icon="logos:telegram" width={24} height={24} />
        </a>
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon 
            icon={theme === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'} 
            width={24} 
            height={24}
            className="text-gray-700 dark:text-gray-300"
          />
        </button>
        <ResumeGenerator />
      </nav>
    </motion.header>
  )
}
