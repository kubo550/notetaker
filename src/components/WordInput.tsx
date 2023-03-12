import { motion } from "framer-motion";
import { useWordsContext } from "@/context/WordsContext";
import { useEffect, useMemo, useRef } from "react";

export const WordInput = () => {
  const { wordsState, onInputChange } =
    useWordsContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const borderClassName = useMemo(() => {
    const map = {
      correct: "border-green-500",
      incorrect: "border-red-500",
      natural: "border-gray-500"
    };
    return map[wordsState.guessState];
  }, [wordsState.guessState]);

  const inputAnimationVariants = {
    correct: { transition: { duration: 0.29 }, scale: [1.02, 1, 1.02] },
    incorrect: { transition: { duration: 0.29 }, rotate: [0, -2, 0, 2, 0] },
    natural: { rotate: 0, scale: 1 }
  };


  return (
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
    </div>)
    ;
};