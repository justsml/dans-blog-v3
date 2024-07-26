import { createContext } from "react";
import type { OptionSelection } from "./types";

interface ChallengeContextProps {
  selectedOption: OptionSelection | null;
  setSelectedOption: (option: OptionSelection | null) => void;
  showHintText: string;
  setShowHintText: (show: string) => void;
  showExplanation: boolean;
  setShowExplanation: (show: boolean) => void;
}

export const ChallengeContext = createContext<ChallengeContextProps>(
  {
    selectedOption: null,
    setSelectedOption: () => {},
    showHintText: "",
    setShowHintText: () => {},
    showExplanation: false,
    setShowExplanation: () => {},
  }
);

