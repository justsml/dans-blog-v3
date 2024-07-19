import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type MouseEvent,
} from "react";

// Define types for context and component props
interface ChallengeContextProps {
  selectedOption: number | null;
  setSelectedOption: (option: number | null) => void;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
}

interface QuizContextProps {
  answers: { title: string; answer: string; correct: boolean }[];
  setAnswers: React.Dispatch<
    React.SetStateAction<{ title: string; answer: string; correct: boolean }[]>
  >;
  currentChallenge: number;
  setCurrentChallenge: React.Dispatch<React.SetStateAction<number>>;
}

interface ChallengeProps {
  children: ReactNode;
}

interface QuestionProps {
  children: ReactNode;
}

interface OptionsProps {
  children: ReactNode;
}

interface OptionProps {
  children: ReactNode;
  answer?: boolean;
  hint?: string;
  onClick: () => void;
}

interface HintsProps {
  children: ReactNode;
}

interface HintProps {
  children: ReactNode;
}

const ChallengeContext = createContext<ChallengeContextProps | undefined>(
  undefined
);
const QuizContext = createContext<QuizContextProps | undefined>(undefined);


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
const QuizUI: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<
    { title: string; answer: string; correct: boolean }[]
  >([]);
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
        <div className="navigation">
          <button onClick={prevChallenge} disabled={currentChallenge === 0}>
            Previous
          </button>
          <button
            onClick={nextChallenge}
            disabled={currentChallenge === React.Children.count(children) - 1}
          >
            Next
          </button>
        </div>
      </div>
    </QuizContext.Provider>
  );
};

const Challenge: React.FC<ChallengeProps> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  return (
    <ChallengeContext.Provider
      value={{ selectedOption, setSelectedOption, showHint, setShowHint }}
    >
      <div className="challenge">{children}</div>
    </ChallengeContext.Provider>
  );
};

const Question: React.FC<QuestionProps> = ({ children }) => {
  return <div className="question">{children}</div>;
};

const Options: React.FC<OptionsProps> = ({ children }) => {
  const challengeContext = useContext(ChallengeContext);
  const quizContext = useContext(QuizContext);
  if (!challengeContext || !quizContext) {
    throw new Error("Options must be used within a Challenge and QuizContext");
  }
  const { selectedOption, setSelectedOption, showHint } = challengeContext;
  const { answers, setAnswers, currentChallenge } = quizContext;

  const handleOptionClick = ({
    index,
    answer,
    hint,
  }: {
    index: number;
    answer?: boolean;
    hint?: string;
  }) => {
    setSelectedOption(option);
    if (!isAnswer && hint) {
      alert(hint);
    }
    const newAnswers = [...answers];
    newAnswers[currentChallenge] = {
      title: `Q #${currentChallenge + 1}`,
      answer: (children as ReactNode[])[option].toString(),
      correct: !!answer,
    };
    setAnswers(newAnswers);
  };

  return (
    <div className="options">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<OptionProps>(child)) {
          const { answer, hint } = child.props;
          return React.cloneElement(child, {
            onClick: () => handleOptionClick({ answer, hint, index }),
            selected: selectedOption === index,
            showHint,
          });
        }
        return null;
      })}
    </div>
  );
};

const Option: React.FC<
  OptionProps & {
    onClick: (e: MouseEvent) => void;
    selected: boolean;
    showHint: boolean;
  }
> = ({ children, onClick, selected, showHint, hint }) => {
  return (
    <button
      className={`option ${selected ? "selected" : ""}`}
      onClick={onClick}
      title={showHint && hint ? hint : ""}
    >
      {children}
    </button>
  );
};

const Hints: React.FC<HintsProps> = ({ children }) => {
  const challengeContext = useContext(ChallengeContext);
  if (!challengeContext) {
    throw new Error("Hints must be used within a Challenge");
  }
  const { showHint, setShowHint } = challengeContext;

  return (
    <div className="hints">
      {showHint && children}
      <button onClick={() => setShowHint(!showHint)}>
        {showHint ? "Hide Hints" : "Show Hints"}
      </button>
    </div>
  );
};

const Hint: React.FC<HintProps> = ({ children }) => {
  return <div className="hint">{children}</div>;
};

export { Challenge, Question, Options, Option, Hints, Hint, QuizUI };

