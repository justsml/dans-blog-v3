import React, { useState } from "react";
import type { Answer } from "./types";
import { QuizContext } from "./QuizContext";
import { Button } from "../ui/button";

/**
 Usage Example
 ```tsx
 <QuizUI>
  <Challenge>
    <Question>
      What is 2+2?
    </Question>
    <Options>
      <Option hint="You ok?">NaN</Option>
      <Option>3</Option>
      <Option answer={true}>4</Option>
      <Option hint="Too much...">5</Option>
    </Options>
    <Hints>
      <Hint>Think about it</Hint>
      <Hint>It's a number</Hint>
    </Hints>
    <Explanation>
      4 - 2 = 2
    </Explanation>
  </Challenge>
  <Challenge>
    <Question>
      What is the capital of France?
    </Question>
    <Options>
      <Option hint="Not quite">Berlin</Option>
      <Option answer={true}>Paris</Option>
      <Option hint="Try again">Madrid</Option>
      <Option hint="Nope">Rome</Option>
    </Options>
    <Hints>
      <Hint>It's a famous city</Hint>
      <Hint>It's known for the Eiffel Tower</Hint>
    </Hints>
  </Challenge>
</QuizUI>
```
*/
export default function QuizUI({ children }: any) {
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);

  const nextChallenge = () => {
    if (currentChallenge < React.Children.count(children) - 1) {
      setCurrentChallenge(currentChallenge + 1);
    }
  };

  const prevChallenge = () => {
    if (currentChallenge > 0) {
      setCurrentChallenge(currentChallenge - 1);
    }
  };

  return (
    <QuizContext.Provider
      value={{ answers, setAnswers, currentChallenge, setCurrentChallenge }}
    >
      <div className="quiz-ui">
        {React.Children.toArray(children)[currentChallenge]}
      </div>

      <div className="navigation">
        <Button onClick={prevChallenge} disabled={currentChallenge === 0}>
          Previous
        </Button>
        <Button
          onClick={nextChallenge}
          disabled={currentChallenge === React.Children.count(children) - 1}
        >
          Next
        </Button>
      </div>
    </QuizContext.Provider>
  );
};
