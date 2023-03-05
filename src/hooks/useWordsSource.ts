import { api } from "@/utils/api";
import {
  useCallback, useMemo,
  useReducer
} from "react";
import { type WordsState, type WordAction, wordActionTypes, type GuessState } from "../domain/words";


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

  const hasNextWord = useMemo(() => {
    return wordsState.currentWordIndex !== words.length - 1;
  }, [wordsState.currentWordIndex, words]);

  const onNextWord = useCallback(() => {
    if (hasNextWord) {
      dispatch({ type: wordActionTypes.nextWordIdx });
    }
    dispatch({ type: wordActionTypes.setUserInputValue, payload: "" });
  }, [hasNextWord]);

  const setWordGuessState = useCallback(
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

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== " " && wordsState.guessState === "natural") {
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
      wordsState.guessState,
    ]
  );

  return {
    words,
    currentWordData,
    hasNextWord,
    onNextWord,
    onInputChange,
    setUserInputValue,
    setWordGuessState,
    wordsState,
  };
};
