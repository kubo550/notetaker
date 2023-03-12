
export type GuessState = "correct" | "incorrect" | "natural";

export type WordGuess = {
  word: string;
  meaning: string;
  guess: string;
  time: number;
};


export enum wordActionTypes {
  nextWordIdx = "nextWordIdx",
  previousWordIdx = "previousWordIdx",
  setUserInputValue = "setUserInputValue",
  setWordGuessState = "setWordGuessState",
  appendWordGuess = "appendWordGuess",
  resetWordGuesses = "resetWordGuesses",
}

export type WordAction = NextWordAction |
  PreviousWordAction |
  SetUserInputValueAction |
  SetWordGuessStateAction |
  AppendWordGuessAction |
  ResetWordGuessesAction;

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
type AppendWordGuessAction = {
  type: wordActionTypes.appendWordGuess;
  payload: WordGuess;
};
type ResetWordGuessesAction = {
  type: wordActionTypes.resetWordGuesses;
};


export type WordsState = {
  currentWordIndex: number;
  currentUserInputValue: string;
  guessState: GuessState;
  userGuesses: WordGuess[];
};
