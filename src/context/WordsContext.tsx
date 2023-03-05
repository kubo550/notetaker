import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useWordsSource } from "../hooks/useWordsSource";

export type GuessState = "correct" | "incorrect" | "natural";

export enum wordActionTypes {
  nextWordIdx = "nextWordIdx",
  previousWordIdx = "previousWordIdx",
  setUserInputValue = "setUserInputValue",
  setWordGuessState = "setWordGuessState",
}

export type WordAction =
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

export type WordsState = {
  currentWordIndex: number;
  currentUserInputValue: string;
  guessState: GuessState;
};

const WordsContext = createContext<ReturnType<typeof useWordsSource>>(
  {} as unknown as ReturnType<typeof useWordsSource>
);

export const useWordsContext = () => useContext(WordsContext);

export const WordsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WordsContext.Provider value={useWordsSource()}>
      {children}
    </WordsContext.Provider>
  );
};
