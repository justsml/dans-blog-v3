import { createContext } from "react";
import type { Answer } from "./types";

interface QuizContextProps {
  answers: Array<Answer>;
  setAnswers: React.Dispatch<React.SetStateAction<Array<Answer>>>;
  currentChallenge: number;
  setCurrentChallenge: React.Dispatch<React.SetStateAction<number>>;
}

export const QuizContext = createContext<QuizContextProps>({
  answers: [],
  setAnswers: () => {},
  currentChallenge: 0,
  setCurrentChallenge: () => {},
});