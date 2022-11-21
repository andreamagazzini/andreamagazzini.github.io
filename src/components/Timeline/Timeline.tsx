import ScrollAnimation from "react-animate-on-scroll"
import { ICard } from "../Card"

interface ITimeline {
  title?: string,
  points: ICard[]
}

export const Timeline = ({ title, points }: ITimeline) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-6xl mb-20 text-center">{title}</h2>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
    {
      points.map((point) => (
        <ScrollAnimation animateIn="fadeInDown">
          <li className="mb-10 ml-6">            
        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <div className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        </span>
        <time className="block mb-2 leading-none text-gray-400 dark:text-gray-500">
          {point.when}
          </time>
        <h3 className="flex items-center mb-1 font-semibold text-gray-900 dark:text-white">
          {point.title}
        </h3>
        {
          point.company && (
            <h4 className="flex items-center mb-1 font-semibold text-gray-600 dark:text-white">
              {point.company}
            </h4>
          )
        }
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          {point.where}  
        </p>
    </li>
        </ScrollAnimation>
      ))
    }
</ol>
    </div> 
  )
} 
