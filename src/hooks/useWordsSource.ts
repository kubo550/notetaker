import { api } from "@/utils/api";
import { useCallback, useMemo, useReducer } from "react";
import {
  type WordsState,
  type WordAction,
  wordActionTypes,
  type GuessState,
  type WordGuess,
} from "../domain/words";

export const useWordsSource = () => {
  const { data: words } = api.word.getAll.useQuery(
    {
      topicId: "clevccaf30000spkoz335aahn",
    },
    {
      refetchOnWindowFocus: false,
      initialData: [],
    }
  );

  const [wordsState, dispatch] = useReducer(
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
        case wordActionTypes.appendWordGuess:
          return {
            ...state,
            userGuesses: [...state.userGuesses, action.payload],
          };
        case wordActionTypes.resetWordGuesses:
          return {
            ...state,
            userGuesses: [],
          };

        default:
          return state;
      }
    },
    {
      currentWordIndex: 0,
      currentUserInputValue: "",
      guessState: "natural",
      userGuesses: [],
    }
  );

  const hasNextWord = useMemo(() => {
    return wordsState.currentWordIndex !== words.length - 1;
  }, [wordsState.currentWordIndex, words]);

  const onNextWord = useCallback(() => {
    if (hasNextWord) {
      dispatch({ type: wordActionTypes.nextWordIdx });
    }
    dispatch({ type: wordActionTypes.setUserInputValue, payload: "" });
  }, [hasNextWord]);

  const tempSetWordGuessState = useCallback(
    (result: GuessState) => {
      const timeoutMs = 305;

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
  const setUserInputValue = useCallback((value: string) => {
    dispatch({ type: wordActionTypes.setUserInputValue, payload: value });
  }, []);

  const currentWordData = useMemo(() => {
    return words[wordsState.currentWordIndex];
  }, [words, wordsState.currentWordIndex]);

  const addUserGuess = useCallback((wordGuess: WordGuess) => {
    dispatch({ type: wordActionTypes.appendWordGuess, payload: wordGuess });
  }, []);

  const resetUserGuesses = useCallback(() => {
    dispatch({ type: wordActionTypes.resetWordGuesses });
  }, []);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!currentWordData?.word) return 
      if (event.target.value !== " " && wordsState.guessState === "natural") {
        setUserInputValue(event.target.value);
      }

      if (event.target.value.length === currentWordData.meaning.length) {
        addUserGuess({
          word: currentWordData?.word,
          meaning: currentWordData?.meaning,
          guess: event.target.value,
        });

        if (event.target.value === currentWordData?.meaning) {
          tempSetWordGuessState("correct");
        } else {
          tempSetWordGuessState("incorrect");
        }
      }
    },
    [
      setUserInputValue,
      currentWordData?.meaning,
      tempSetWordGuessState,
      wordsState.guessState,
      addUserGuess,
      currentWordData?.word,
    ]
  );

  return {
    words,
    currentWordData,
    hasNextWord,
    onNextWord,
    onInputChange,
    setUserInputValue,
    tempSetWordGuessState,
    wordsState,
  };
};
