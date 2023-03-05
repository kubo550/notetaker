
export type GuessState = "correct" | "incorrect" | "natural";

export enum wordActionTypes {
  nextWordIdx = "nextWordIdx",
  previousWordIdx = "previousWordIdx",
  setUserInputValue = "setUserInputValue",
  setWordGuessState = "setWordGuessState"
}

export type WordAction = NextWordAction |
  PreviousWordAction |
  SetUserInputValueAction |
  SetWordGuessStateAction;
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
