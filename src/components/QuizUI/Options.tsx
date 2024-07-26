import React, { useContext, type ReactNode } from "react";
import { ChallengeContext } from "./ChallengeContext";
import { QuizContext } from "./QuizContext";
import type { OptionProps } from "./types";
import { Button } from "../ui/button";
import classNames from "classnames";


export default function Options({ children }: { children: ReactNode[] }) {
  
  const challengeContext = useContext(ChallengeContext);
  const quizContext = useContext(QuizContext);
  if (!challengeContext || !quizContext) {
    throw new Error("Options must be used within a Challenge and QuizContext");
  }
  const { selectedOption, setSelectedOption, showHintText } = challengeContext;
  const { answers, setAnswers, currentChallenge } = quizContext;

  const handleOptionClick = (
    option: number,
    isAnswer?: boolean,
    hint?: string
  ) => {
    setSelectedOption(option);
    if (!isAnswer && hint) {
      alert(hint);
    }
    const newAnswers = [...answers];
    newAnswers[currentChallenge] = {
      option,
      correct: !!isAnswer,
    };
    setAnswers(newAnswers);
  };

  return (
    <div className="options">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<OptionProps>(child)) {
          const { answer, hint } = child.props;
          return (
            <Button
              onClick={() => handleOptionClick(index, answer, hint)}
              className={classNames("option", {
                selected: selectedOption === index,
              })}
            >
              {children}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};
