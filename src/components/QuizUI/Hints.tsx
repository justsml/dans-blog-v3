import { useContext, type ReactNode } from "react";
import { ChallengeContext } from "./ChallengeContext";

export default function Hints({ children }: { children: ReactNode[] }) {
  const challengeContext = useContext(ChallengeContext);
  if (!challengeContext) {
    throw new Error("Hints must be used within a Challenge");
  }
  const { showHintText } = challengeContext;

  return (
    <div className="hints">{showHintText ? showHintText : children.length}</div>
  );
};

