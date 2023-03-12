import { useWordsContext } from "@/context/WordsContext";
import levenshtein from "fast-levenshtein";
import { memo } from "react";

const GuessStats_: React.FC = () => {
  const { wordsState } = useWordsContext();

  // todo fix rerenders
  console.log('rerender');


  const guessesWithStats = wordsState.userGuesses?.map((guess, idx, arr) => {
    const levDist = levenshtein.get(guess.guess, guess.word);
    const levDistPercent = (levDist / guess.word.length) * 100;
    const speedPerChar = guess.time / guess.guess.length;
    const totalTime = guess.time - ((arr[idx - 1]?.time) || 0);

    return {
      ...guess,
      levDist,
      levDistPercent,
      speedPerChar,
      totalTime,
    }
  });

  const totalTime = guessesWithStats?.reduce((acc, curr) => {
    return acc + curr.totalTime;
  }, 0);


  const calcCharsPerSecond = () =>  {
    const chars = guessesWithStats.join("").length;
    const seconds = totalTime / 1000;
    return chars / seconds;


  }

  const avgLevDist = guessesWithStats?.reduce((acc, curr) => {
    return acc + curr.levDistPercent;
  }, 0);


  function safeNum(num: number) {
    if (isNaN(num)) {
      return 0;
    }
    return num.toFixed(2)
  }
  return (
    <div>



      <div className="stats bg-base-100 shadow flex mt-10 ">

        <div className="stat">
          <div className="stat-figure invisible md:visible">
          </div>
          <div className="stat-title">Total words</div>
          <div className="stat-value">
            {wordsState.userGuesses.length}
          </div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure invisible md:visible">
          </div>
          <div className="stat-title">Total Time</div>
          <div className="stat-value">{safeNum(totalTime)} s</div>
          <div className="stat-desc">14% more than last month</div>
        </div>


        <div className="stat">
          <div className="stat-figure invisible md:visible">
          </div>
          <div className="stat-title">AVG Speed</div>
          <div className="stat-value">{safeNum(calcCharsPerSecond())}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure invisible md:visible">
          </div>
          <div className="stat-title">
            AVG Levenshtein Distance
          </div>
          <div className="stat-value">
            {safeNum(avgLevDist)}
          </div>
          <div className="stat-desc">14% more than last month</div>
        </div>


      </div>
    </div>
  );
};

export const GuessStats = memo(GuessStats_);