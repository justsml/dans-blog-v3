import type { QuestionProps } from "./types";

export default function Question({ children }: QuestionProps) {
  return <div className="question">{children}</div>;
}
