import React, { useContext, type ReactNode } from "react";
import { ChallengeContext } from "./ChallengeContext";
import { Button } from "../ui/button";

export default function Explain({children}: {children: ReactNode}) {
  const challengeContext = useContext(ChallengeContext);
  if (!challengeContext) {
    throw new Error("Explain must be used within a Challenge");
  }
  const { showExplanation, setShowExplanation } = challengeContext;

  return (
    <div className="explanation">
      {showExplanation && <div>{children}</div>}
      <Button onClick={() => setShowExplanation(!showExplanation)}>
        {showExplanation ? "Hide Explanation" : "Show Explanation"}
      </Button>
    </div>
  );
};

