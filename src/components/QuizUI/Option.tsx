import { Button } from "../ui/button";
import type { OptionProps } from "./types";

export default function Option({ children, onClick, selected, showHintText, hint }: OptionProps & {
  selected: boolean;
  showHintText: boolean;
}) {
  return (
    <Button
      className={`option ${selected ? "selected" : ""}`}
      onClick={onClick}
      title={showHintText && hint ? hint : ""}
    >
      {children}
    </Button>
  );
};
