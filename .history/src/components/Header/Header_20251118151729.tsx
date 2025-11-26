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
        <div className="relative flex items-center justify-center overflow-visible" style={{ width: '1.5rem', height: '1.5rem' }}>
          {/* Tech decorative elements */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="22" stroke="#23ce6b" strokeWidth="2" fill="none"/>
            {/* Circuit lines */}
            <path d="M8 16 L16 16 M32 16 L40 16" stroke="#23ce6b" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 32 L16 32 M32 32 L40 32" stroke="#23ce6b" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Code brackets */}
            <path d="M12 20 L10 24 L12 28" stroke="#23ce6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M36 20 L38 24 L36 28" stroke="#23ce6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* Tech dots */}
            <circle cx="20" cy="12" r="1.5" fill="#23ce6b"/>
            <circle cx="28" cy="12" r="1.5" fill="#23ce6b"/>
            <circle cx="20" cy="36" r="1.5" fill="#23ce6b"/>
            <circle cx="28" cy="36" r="1.5" fill="#23ce6b"/>
          </svg>
          {/* Logo pillola - centrata sul cerchio */}
          <img 
            className="absolute z-10" 
            src={logo} 
            alt="Andrea Magazzini logo"
            style={{ 
              transform: 'rotate(-30deg) translate(-50%, -50%)',
              transformOrigin: 'center center',
              height: '6rem',
              width: 'auto',
              top: '50%',
              left: '50%'
            }}
          />
        </div>
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
