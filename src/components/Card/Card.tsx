import ScrollAnimation from "react-animate-on-scroll"

interface ICard {
    top: React.ReactNode[],
    header: React.ReactNode,
    body: React.ReactNode,
    bottom: React.ReactNode[]
}

const Card = ({ top, header, body, bottom }: ICard) => {
    return (
        <ScrollAnimation
            animateIn="fadeIn"
        >
            <div className="h-full bg-white flex flex-col justify-between text-black p-10 rounded-lg space-y-20">
                <div className="flex flex-col space-y-10">
                    <div className="flex items-center justify-between">
                        {
                            top.map((el) => el)
                        }
                    </div>
                    <div className="text-4xl font-bold">
                        {header}
                    </div>
                    <div>
                        {body}
                    </div>
                </div>
                <div>
                    {
                        bottom.map((el) => el)
                    }
                </div>
            </div>
        </ScrollAnimation>
    )
}

export default Card;