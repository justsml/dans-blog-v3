import type { ReactNode } from "react";

export default function Hint({children}: {children: ReactNode}) {
  return <div className="hint">{children}</div>;
}
