import { useEffect, useState } from "react";

export type Word = {
  id: string;
  word: string;
  meaning: string;
  completed: boolean;
};

interface WordCardListProps {
  words: Word[];
}

export const WordCardList: React.FC<WordCardListProps> = ({ words }) => {
  return (
    <div className="carousel rounded-box w-96">
      {words.map((word, idx) => {
        return <WordCard key={word.id} idx={idx} words={words} />;
      })}
    </div>
  );
};

interface WordCardProps {
  idx: number;
  words: Word[];
}

export const WordCard: React.FC<WordCardProps> = ({ idx, words }) => {
  const [currentValue, setCurrentValue] = useState("");

useEffect(() => {
  const listener = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("enter");
    }
  }

  document.addEventListener("keydown", listener)

  return () => {
    document.removeEventListener("keydown", listener)
  }

}, [])

  const isFirst = idx === 0;
  const isLast = idx === words.length - 1;

  const hashedMeaning = [...(words[idx]?.meaning || "")]
    .map((letter) => (letter === " " ? " " : "_"))
    .join("");

  return (
    <div
      key={words[idx]?.id}
      id={`slide${idx}`}
      className="carousel-item card mx-1 w-96 bg-neutral text-neutral-content"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title">{words[idx]?.word ?? "coś spierdoliłeś"}</h2>


        <p className="tracking-widest"> {hashedMeaning}</p>
      </div>

      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between ">
        {isFirst ? (
          <div className=""></div>
        ) : (
          <a href={`#slide${idx - 1}`} className="btn-circle btn">
            ❮
          </a>
        )}

        {!isLast && (
          <a href={`#slide${idx + 1}`} className="btn-circle btn">
            ❯
          </a>
        )}
      </div>
    </div>
  );
};
