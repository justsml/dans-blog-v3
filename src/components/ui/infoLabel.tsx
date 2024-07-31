import type { ReactNode } from "react";
import "./infoLabel.css";

export function InfoLabel({
  // icon,
  text,
  children,
}: {
  children?: ReactNode;
  // icon: ReactNode;
  text: string | [string] | [string, string];
}) {
let line1 = "";
let line2: undefined | string = undefined;

  if (typeof text === "string" || Array.isArray(text)) {
    line1 = typeof text === "string" ? text : text[0];
  }
  if (Array.isArray(text) && text.length > 1) {
    line1 = text[0];
    line2 = text[1];
  }

  return <div className="info-grid">
    <div className="icon">{children}</div>
    <div className="line1">{line1}</div>
    <div className="line2">{line2}</div>
  </div>;
}
