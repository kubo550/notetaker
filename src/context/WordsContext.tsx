import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useWordsSource } from "../hooks/useWordsSource";

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
