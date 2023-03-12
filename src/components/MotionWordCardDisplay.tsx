import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@/components/Loader";
import { useWordsContext } from "@/context/WordsContext";
import { useMemo } from "react";
import { type WordsState } from "@/domain/words";


function getHashed(wordsState: WordsState, currentWord: string | undefined) {
  return `${wordsState.currentUserInputValue}${hashWord(
    currentWord || "",
    wordsState.currentUserInputValue.length
  )
    .join("")
    .slice(
      wordsState.currentUserInputValue.length
    )}`;
}

export const MotionWordCardDisplay = () => {
  const { wordsState, words, currentWordData } =
    useWordsContext();

  const hashedWord = useMemo(() => {
    return getHashed(wordsState, currentWordData?.meaning);
  }, [wordsState, currentWordData]);

  return (
    <div className="min-h-40 mb-4 flex w-full justify-center">
      <AnimatePresence>
        {wordsState.guessState === "natural" && (
          <motion.div
            className="card h-44 w-96 bg-neutral text-neutral-content shadow-2xl"
            initial={{ x: 300, scale: 0.05 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.29 }}
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
                  >{hashedWord}</motion.p>
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
  );
};

function hashWord(word: string, idx: number) {
  return [...word].map((char, i) => {
    if (i < idx || char === " ") {
      return char;
    }

    return "_";
  });
}
