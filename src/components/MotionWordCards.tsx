import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import type { Word } from "./WordCard";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard } from "./Keyboard";

interface MotionWordCardsProps {
  words: Word[];
}

type GuessState = "correct" | "incorrect" | "natural";

enum wordActionTypes {
  nextWordIdx = "nextWordIdx",
  previousWordIdx = "previousWordIdx",
  setUserInputValue = "setUserInputValue",
  setWordGuessState = "setWordGuessState",
}

type WordAction =
  | NextWordAction
  | PreviousWordAction
  | SetUserInputValueAction
  | SetWordGuessStateAction;

type NextWordAction = {
  type: wordActionTypes.nextWordIdx;
};

type PreviousWordAction = {
  type: wordActionTypes.previousWordIdx;
};

type SetUserInputValueAction = {
  type: wordActionTypes.setUserInputValue;
  payload: string;
};

type SetWordGuessStateAction = {
  type: wordActionTypes.setWordGuessState;
  payload: GuessState;
};

type WordsState = {
  currentWordIndex: number;
  currentUserInputValue: string;
  guessState: GuessState;
};

export const MotionWordCards: React.FC<MotionWordCardsProps> = ({ words }) => {
  const [state, dispatch] = useReducer(
    (state: WordsState, action: WordAction) => {
      switch (action.type) {
        case wordActionTypes.nextWordIdx:
          return {
            ...state,
            currentWordIndex: state.currentWordIndex + 1,
          };
        case wordActionTypes.previousWordIdx:
          return {
            ...state,
            currentWordIndex: state.currentWordIndex - 1,
          };
        case wordActionTypes.setUserInputValue:
          return {
            ...state,
            currentUserInputValue: action.payload,
          };
        case wordActionTypes.setWordGuessState:
          return {
            ...state,
            guessState: action.payload,
          };

        default:
          return state;
      }
    },
    {
      currentWordIndex: 0,
      currentUserInputValue: "",
      guessState: "natural",
    }
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasNextWord = useMemo(() => {
    return state.currentWordIndex !== words.length - 1;
  }, [state.currentWordIndex, words.length]);

  const onNextWord = useCallback(() => {
    if (hasNextWord) {
      dispatch({ type: wordActionTypes.nextWordIdx });
    }
    dispatch({ type: wordActionTypes.setUserInputValue, payload: "" });
  }, [hasNextWord]);

  const setWordGuessState = useCallback(
    (result: GuessState) => {
      const timeoutMs = 300;

      dispatch({ type: wordActionTypes.setWordGuessState, payload: result });

      const timeoutId = setTimeout(() => {
        dispatch({
          type: wordActionTypes.setWordGuessState,
          payload: "natural",
        });
        onNextWord();
      }, timeoutMs);
      return () => clearTimeout(timeoutId);
    },
    [onNextWord]
  );

  // const hasPreviousWord = useMemo(() => {
  //   return state.currentWordIndex !== 0;
  // }, [state.currentWordIndex]);

  // const onPreviousWord = useCallback(() => {
  //   if (hasPreviousWord) {
  //     dispatch({ type: wordActionTypes.previousWordIdx });
  //   }
  // }, [hasPreviousWord]);

  const setUserInputValue = useCallback((value: string) => {
    dispatch({ type: wordActionTypes.setUserInputValue, payload: value });
  }, []);

  const currentWordData = useMemo(() => {
    return words[state.currentWordIndex];
  }, [words, state.currentWordIndex]);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== " " && state.guessState === "natural") {
        setUserInputValue(event.target.value);
      }

      if (event.target.value.length === currentWordData?.meaning.length) {
        if (event.target.value === currentWordData?.meaning) {
          setWordGuessState("correct");
        } else {
          setWordGuessState("incorrect");
        }
      }
    },
    [
      setUserInputValue,
      currentWordData?.meaning,
      setWordGuessState,
      state.guessState,
    ]
  );

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
    return map[state.guessState];
  }, [state.guessState]);

  if (words.length === 0) {
    return <div> Loading... </div>;
  }

  if (!currentWordData) {
    return <div> Try again </div>;
  }

  const inputAnimationVariants = {
    correct: { transition: { duration: 0.29 }, scale: [1.02, 1, 1.02] },
    incorrect: { transition: { duration: 0.29 }, rotate: [0, -2, 0, 2, 0] },
    natural: { rotate: 0, scale: 1 },
  };

  const revealedWord = `${state.currentUserInputValue}${hashWord(
    currentWordData.meaning,
    state.currentUserInputValue.length
  )
    .join("")
    .slice(state.currentUserInputValue.length)}`;

  return (
    <div className="flex w-full flex-col justify-center align-middle">
      <div className="mb-4 flex h-40 w-full justify-center">
        <AnimatePresence>
          {state.guessState === "natural" && (
            <motion.div
              className="card w-96 bg-neutral text-neutral-content shadow-2xl"
              initial={{ x: 300, scale: 0.05 }}
              animate={{ x: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0, duration: 0.29 }}
              exit={{ x: -300, scale: 0.05 }}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{currentWordData.word}</h2>

                <p className="tracking-widest">{revealedWord}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="my-5 flex justify-center">
        <motion.input
          ref={inputRef}
          type="text"
          className={`input-bordered input w-64 border-2 shadow-2xl ${borderClassName}`}
          variants={inputAnimationVariants}
          animate={inputAnimationVariants[state.guessState]}
          value={state.currentUserInputValue}
          onChange={onInputChange}
        />
      </div>

      <Keyboard />
    </div>
  );
};
