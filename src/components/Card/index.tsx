import ScrollAnimation from "react-animate-on-scroll"
import { Icon } from '@iconify-icon/react';
import { toTitle } from "../../utils";

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
    when: string,
    icon: string,
    company?: string,
    link?: string,
    description?: string,
    skills?: ISkills
}

export const Card = ({ title, where, when, icon, company, description, skills }: ICard) => {
    const SkillsList = 
    <div className="flex space-x-4">
        {
            skills?.icons?.map((skill) => (
                <Icon width={40} height={40} icon={skill?.icon} title={skill?.name} className="flex items-center" />
            ))
        }
    </div>
    
    
    return (
        <ScrollAnimation
            animateIn="fadeIn"
        >
            <div className="h-full bg-white flex flex-col justify-between text-black p-10 rounded-lg space-y-20">
                <div className="flex flex-col space-y-10">
                    <div className="flex items-center justify-between">
                        {
                            [<Icon icon={icon}/>, company]
                        }
                    </div>
                    <div className="text-4xl font-bold">
                        {title}
                    </div>
                    <div>
                        {description || where}
                    </div>
                    <div className="flex flex-col space-y-4">
                        {
                           skills && Object.entries(skills).map(([key, value]) => key !== "icons" && (
                                <div>
                                <div className="font-bold">
                                    { toTitle(key) }
                                    </div>
                                    <div>
                                        { value }
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {
                        [when, SkillsList].map((el) => el)
                    }
                </div>
            </div>
        </ScrollAnimation>
    )
}
