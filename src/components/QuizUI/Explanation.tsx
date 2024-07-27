import type { ReactNode } from "react";

export default function Explanation({ children }: { children: ReactNode }) {
  return <div className="explanation">{children}</div>;
}
