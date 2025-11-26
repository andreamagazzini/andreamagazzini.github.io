import { Icon } from '@iconify-icon/react';
import { motion } from 'framer-motion';
import { toTitle } from "../../utils";
import profileData from '../../data/profile.json';

export interface IIcon {
    icon: string,
    name: string,
}
export interface ISkills {
    framework?: string,
    methodology?: string,
    icons?: IIcon[],
}
export interface ICard {
    title?: string,
    where?: string,
    when?: string,
    period?: string,
    icon?: string,
    company?: string,
    link?: string,
    description?: string,
    skills?: ISkills,
    technologies?: any,
    skillIcons?: string[],
    achievements?: string[]
}

export const Card = ({ title, where, when, period, icon, company, description, skills, technologies, skillIcons }: ICard) => {
    const { skills: allSkills } = profileData;
    const displayPeriod = period || when;
    
    const SkillsList = skillIcons && skillIcons.length > 0 ? (
        <div className="flex flex-wrap gap-3">
            {skillIcons.map((skillKey, index) => {
                const skill = allSkills[skillKey as keyof typeof allSkills];
                if (!skill) return null;
                return (
                    <Icon 
                        key={index}
                        width={32} 
                        height={32} 
                        icon={skill.icon} 
                        title={skill.name}
                        className="hover:scale-110 transition-transform"
                    />
                );
            })}
        </div>
    ) : skills?.icons ? (
        <div className="flex flex-wrap gap-3">
            {skills.icons.map((skill, index) => (
                <Icon 
                    key={index}
                    width={32} 
                    height={32} 
                    icon={skill.icon} 
                    title={skill.name}
                    className="hover:scale-110 transition-transform"
                />
            ))}
        </div>
    ) : null;
    
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="h-full bg-white dark:bg-gray-800 flex flex-col justify-between text-gray-900 dark:text-gray-100 p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
        >
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    {icon && (
                        <Icon 
                            icon={icon} 
                            width={32} 
                            height={32}
                            className="text-primary-500 dark:text-primary-400"
                        />
                    )}
                    {company && (
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {company}
                        </span>
                    )}
                </div>
                {title && (
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {description}
                    </p>
                )}
                {where && !description && (
                    <p className="text-base text-gray-700 dark:text-gray-300">
                        {where}
                    </p>
                )}
                {technologies && (
                    <div className="flex flex-col space-y-3 pt-2">
                        {Object.entries(technologies).map(([key, value]) => (
                            <div key={key} className="border-l-2 border-accent-400 pl-3">
                                <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                                    {toTitle(key)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {value as string}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {skills && !technologies && (
                    <div className="flex flex-col space-y-3 pt-2">
                        {Object.entries(skills).map(([key, value]) => key !== "icons" && (
                            <div key={key} className="border-l-2 border-accent-400 pl-3">
                                <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                                    {toTitle(key)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {value as string}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                {displayPeriod && (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {displayPeriod}
                    </span>
                )}
                {SkillsList}
            </div>
        </motion.div>
    )
}
