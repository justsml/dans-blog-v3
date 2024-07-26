import { useState, type ReactNode } from "react";
import { ChallengeContext } from "./ChallengeContext";
import type { OptionSelection } from "./types";

/**
 * Challenge component
 * 
 * @param {ReactNode} children - The children of the component
 * @param {string} key - The TITLE of the challenge
 * @param {string} group - The grouping of the challenge
 */
export default function Challenge({ children, key, group }: { children: ReactNode, key: string, group?: string }) {
  const [selectedOption, setSelectedOption] = useState<OptionSelection | null>(
    null
  );
  const [showHintText, setShowHintText] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  return (
    <ChallengeContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        showHintText,
        setShowHintText,
        showExplanation,
        setShowExplanation,
      }}
    >
      <h2>{key}</h2>
      <div className="challenge">{children}</div>
    </ChallengeContext.Provider>
  );
};