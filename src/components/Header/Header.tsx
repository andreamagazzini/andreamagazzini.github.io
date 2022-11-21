import { BrowserRouter as Router } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import linkedinIcon from '../../assets/linkedin.png'
import githubIcon from '../../assets/github-icon.svg'
import telegram from '../../assets/telegram.png'
import logo from "../../assets/logo.svg";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg"
import { Popover } from '../Popover/Popover'

const CurriculumUrl = 'https://drive.google.com/file/d/1ApQZKbaIV0C5dkV4kVHi35_NXmpE2Rcz/view?usp=sharing'

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 lg:py-8 lg:px-40 fixed top-0 left-0 w-screen bg-white/75 z-50">
      <Router>
        <HashLink smooth to="#home">
          <img className="h-8 lg:h-16" src={logo} alt="logo" />
        </HashLink>

        <nav className="flex items-center gap-8">
          <Popover
            body={"andreamaga4@gmail.com"}
          >
            <img className="text-5xl w-12 fill-white" src={emailIcon} alt="Email" />
          </Popover>
          <Popover
            body={"+41763721444"}
          >
            <img className=" text-5xl w-12 fill-white" src={phoneIcon} alt="Phone" />
          </Popover>
          <a
            href="https://www.linkedin.com/in/andreamagazzini/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="text-5xl w-12" src={linkedinIcon} alt="Linkedin" />
          </a>

          <a
            href="https://github.com/andreamagazzini"
            target="_blank"
            rel="noreferrer"
          >
            <img className="text-5xl w-12" src={githubIcon} alt="GitHub" />
          </a>

          <a
            href="https://t.me/andreamagazzini"
            target="_blank"
            rel="noreferrer"
          >
            <img className="text-5xl w-12" src={telegram} alt="Telegram" />
          </a>

          <a href={CurriculumUrl} target="_blank" download className="p-5 bg-green-500 rounded-lg text-white">
            CV
          </a>
        </nav>
      </Router>
    </div>
  )
}
