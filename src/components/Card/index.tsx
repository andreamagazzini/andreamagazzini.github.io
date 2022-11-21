import ScrollAnimation from "react-animate-on-scroll"

export interface ICard {
    title: string,
    where: string,
    when: string,
    icon: string,
    company?: string,
    link?: string,
    description?: string,
}

export const Card = ({ title, where, when, icon, company, description }: ICard) => {
    return (
        <ScrollAnimation
            animateIn="fadeIn"
        >
            <div className="h-full bg-white flex flex-col justify-between text-black p-10 rounded-lg space-y-20">
                <div className="flex flex-col space-y-10">
                    <div className="flex items-center justify-between">
                        {
                            [<img className="h-10" src={icon} alt="icon"/>, company].map((el) => el)
                        }
                    </div>
                    <div className="text-4xl font-bold">
                        {title}
                    </div>
                    <div>
                        {description || where}
                    </div>
                </div>
                <div>
                    {
                        [when].map((el) => el)
                    }
                </div>
            </div>
        </ScrollAnimation>
    )
}
