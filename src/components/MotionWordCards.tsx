import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard } from "./Keyboard";
import { useWordsContext } from "@/context/WordsContext";
import { Loader } from "./Loader";


export const MotionWordCards: React.FC = () => {
  const { wordsState, words, currentWordData, onInputChange } =
    useWordsContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const hashWord = (word: string, idx: number) => {
    return [...word].map((char, i) => {
      if (i < idx || char === " ") {
        return char;
      }

      return "_";
    });
  };

  const borderClassName = useMemo(() => {
    const map = {
      correct: "border-green-500",
      incorrect: "border-red-500",
      natural: "border-gray-500",
    };
    return map[wordsState.guessState];
  }, [wordsState.guessState]);


  const inputAnimationVariants = {
    correct: { transition: { duration: 0.29 }, scale: [1.02, 1, 1.02] },
    incorrect: { transition: { duration: 0.29 }, rotate: [0, -2, 0, 2, 0] },
    natural: { rotate: 0, scale: 1 },
  };

  
  return (
    <div className="flex w-full flex-col justify-center align-middle">
      <div className="min-h-40 mb-4 flex w-full justify-center">
        <AnimatePresence>
          {wordsState.guessState === "natural" && (
            <motion.div
              className="card h-44 w-96 bg-neutral text-neutral-content shadow-2xl"
              initial={{ x: 300, scale: 0.05 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              exit={{ x: -300, scale: 0.05 }}
            >
              <div className="card-body items-center">
                {currentWordData?.id ? (
                  <>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="-mt-5"
                    >
                      {wordsState.currentWordIndex + 1} / {words.length}
                    </motion.p>

                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="card-title my-4 text-2xl"
                    >
                      {currentWordData.word}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="tracking-widest drop-shadow-sm"
                    >{`${wordsState.currentUserInputValue}${hashWord(
                      currentWordData.meaning,
                      wordsState.currentUserInputValue.length
                    )
                      .join("")
                      .slice(
                        wordsState.currentUserInputValue.length
                      )}`}</motion.p>
                  </>
                ) : (
                  <>
                    <p className="-mt-5">0 / {words.length}</p>

                    <div className="card-subtitle my-4 text-2xl">
                      <Loader />
                    </div>

                    <p className="tracking-widest drop-shadow-sm">Loading...</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {wordsState.guessState !== "natural" && <div className="h-44"></div>}
      </div>
      <div className="my-5 flex justify-center">
        <motion.input
          ref={inputRef}
          type="text"
          className={`input-bordered input w-64 border-2 shadow-2xl ${borderClassName}`}
          variants={inputAnimationVariants}
          animate={inputAnimationVariants[wordsState.guessState]}
          value={wordsState.currentUserInputValue}
          onChange={onInputChange}
        />
      </div>
      <Keyboard />
      <pre>{JSON.stringify(wordsState.userGuesses, null, 4)}</pre>
    </div>
  );
};
