import { api } from "@/utils/api";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { type GuessState, type WordAction, wordActionTypes, type WordGuess, type WordsState } from "@/domain/words";

export const useWordsSource = () => {
  const { data: words } = api.word.getAll.useQuery(
    {
      topicId: "clevccaf30000spkoz335aahn"
    },
    {
      refetchOnWindowFocus: false,
      initialData: []
    }
  );

  const [wordsState, dispatch] = useReducer(
    (state: WordsState, action: WordAction) => {
      switch (action.type) {
        case wordActionTypes.nextWordIdx:
          return {
            ...state,
            currentWordIndex: state.currentWordIndex + 1
          };
        case wordActionTypes.previousWordIdx:
          return {
            ...state,
            currentWordIndex: state.currentWordIndex - 1
          };
        case wordActionTypes.setUserInputValue:
          return {
            ...state,
            currentUserInputValue: action.payload
          };
        case wordActionTypes.setWordGuessState:
          return {
            ...state,
            guessState: action.payload
          };
        case wordActionTypes.appendWordGuess:
          return {
            ...state,
            userGuesses: [...state.userGuesses, action.payload]
          };
        case wordActionTypes.resetWordGuesses:
          return {
            ...state,
            userGuesses: []
          };

        default:
          return state;
      }
    },
    {
      currentWordIndex: 0,
      currentUserInputValue: "",
      guessState: "natural",
      userGuesses: []
    }
  );


  const timeStore = useRef({
    time: 0
  });

  const wordsPerMinute = useMemo(() => {
    const wps = (wordsState.userGuesses.length / timeStore.current.time) * 60;
    if (isNaN(wps)) {
      return 0;
    }
    return wps;
  }, [wordsState.userGuesses.length]);


  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getTime = useCallback(() => {
    return timeStore.current.time;
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      timeStore.current.time += 0.01;
    }, 10);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);


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
          payload: "natural"
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


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onHint = (event: KeyboardEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.key !== "Shift") {
      return;
    }

    const currentGuessValue = wordsState.currentUserInputValue;
    const currentWordMeaning = currentWordData?.meaning;
    const currentGuessValueLength = currentGuessValue.length;
    const nextChar = currentWordMeaning?.[currentGuessValueLength] || "";

    setUserInputValue(currentGuessValue + nextChar);
    checkIfGuessIsComplete(currentGuessValue + nextChar);
  };

  const checkIfGuessIsComplete = useCallback((guessText: string) => {
    if (guessText.length === currentWordData?.meaning?.length) {
      addUserGuess({
        word: currentWordData?.word || "",
        meaning: currentWordData?.meaning || "",
        guess: guessText,
        time: getTime()
      });

      if (guessText === currentWordData?.meaning) {
        tempSetWordGuessState("correct");
      } else {
        tempSetWordGuessState("incorrect");
      }
    }
  }, [currentWordData?.meaning, currentWordData?.word, addUserGuess, getTime, tempSetWordGuessState]);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {

      if (!currentWordData?.word) return;
      if (event.target.value !== " " && wordsState.guessState === "natural") {
        setUserInputValue(event.target.value);
      }
      checkIfGuessIsComplete(event.target.value);
    },
    [currentWordData?.word, wordsState.guessState, checkIfGuessIsComplete, setUserInputValue]
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
    getTime,
    wps: wordsPerMinute,
    onHint
  };
};
