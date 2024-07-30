"use client";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { QuizContext } from "./QuizContext";
import type { Option, OptionSelection } from "./types";
import {
  BoxIcon,
  CheckboxIcon,
  CheckCircledIcon,
  CheckIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";

import "./index.css";
import { CheckedBoxIcon } from "../icons/CheckedBoxIcon";
import Explanation from "./Explanation";
import Hints from "./Hints";
import { RefreshCwIcon } from "lucide-react";

/**
 * Challenge component
 *
 * @param {ReactNode} children - The children of the component
 * @param {string} key - The TITLE of the challenge
 * @param {string} group - The grouping of the challenge
 */
export default function Challenge({
  children,
  title,
  group,
  options,
  description,
  // hints = [],
  explanation,
  question,
}: {
  children: ReactNode[] | ReactNode;
  title: string;
  group?: string;
  options: Option[];
  description: string;
  // hints?: string[];
  explanation?: string;
  question?: string;
}) {
  const { setTotalQuestions, setCorrectAnswers } = useContext(QuizContext);

  const challengeRef = useRef<HTMLDivElement>(null);
  const [challengeClass, setChallengeClass] = useState<string>("untouched");

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<OptionSelection>({
    text: "",
  });
  const [showHintText, setShowHintText] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [explanationText, setExplanationText] = useState<string>(explanation!);

  const updateCounts = () => {
    const questions = document.querySelectorAll("main .challenge");
    const correct = document.querySelectorAll("main .challenge.correct");
    setTotalQuestions(questions?.length);
    setCorrectAnswers(correct?.length);
  };

  const reset = () => {
    setIsCorrect(undefined);
    setSelectedOption({ text: "" });
    setChallengeClass("");
    setShowExplanation(false);
    setShowHintText("");
  };

  const handleAnswer = (option: Option) => {
    setSelectedOption(option);
    if (option.isAnswer) {
      setIsCorrect(true);
      setChallengeClass("correct pulse");
    } else {
      setIsCorrect(false);
      setChallengeClass("incorrect shake");
    }
    setTimeout(updateCounts, 200);
  };

  useEffect(() => {
    if (challengeClass && challengeClass.includes(" ")) {
      const [answer] = challengeClass.split(" ");
      setTimeout(() => {
        setChallengeClass(answer);
      }, 1000);
    }
  }, [challengeClass]);

  useEffect(() => {
    // console.log("challengeRef.current", challengeRef.current);
    // console.log("challengeRef.current", challengeRef.current?.querySelector);
    if (challengeRef.current) {
      const e = challengeRef.current.querySelector(".explanation")?.innerHTML;
      if (e) setExplanationText(e);
      // console.log("explanation", e);
      // hints = challengeRef.current.querySelector(".hints")?.innerHTML;
    }
  }, [explanationText]);

  // hints ||= [];
  explanation ||= "";

  return (
    <div className={"challenge " + challengeClass} ref={challengeRef}>
      <h2 className="title">
        {/* <CheckedBoxIcon className="icon" /> */}
        {isCorrect === undefined && (
          <QuestionMarkCircledIcon className="icon" />
        )}

        {isCorrect && <CheckCircledIcon className="icon" />}
        {isCorrect === false && <CrossCircledIcon className="icon" />}

        {title}
      </h2>
      <div className="question">{question || children}</div>
      <section className="options">
        {options.map((option) => (
          <a
            key={option.text}
            className="option"
            onClick={() => !isCorrect && handleAnswer(option)}
          >
            {isCorrect && option.isAnswer ? (
              <CheckedBoxIcon className="icon" />
            ) : (
              <BoxIcon className="icon" />
            )}
            <label>{option.text}</label>
          </a>
        ))}
      </section>
      <div className="toolbar">
        <button className="btn btn-reset" onClick={() => reset()}>
          <RefreshCwIcon className="icon" />
          <div>Reset</div>
        </button>
        <button
          className="btn btn-hint"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          <QuestionMarkCircledIcon className="icon" />
          <div>{showExplanation ? "Hide" : "Show"} Explanation</div>
        </button>
      </div>
      {explanationText && (
        <div className="explanation">
          {showExplanation && (
            <p dangerouslySetInnerHTML={{ __html: explanationText }}></p>
          )}
        </div>
      )}
    </div>
  );
}
