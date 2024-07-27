import { type ReactNode } from "react";

export default function Hints({ children }: { children: ReactNode[] }) {
  return (
    <div className="hints">{children}</div>
  );
};

