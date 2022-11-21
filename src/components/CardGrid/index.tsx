import { Card, ICard } from "../Card";

interface ICardGrid {
  title: string,
  cards: ICard[]
}

export const CardGrid = ({ title, cards }: ICardGrid) => {
  return (
    <div>
      <h2 className="text-6xl mb-20 text-center">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden p-4 gap-8">
        {cards.map((card) => (
          <Card 
            {...card}
          />
        ))}
      </div>
    </div>
  );
}
