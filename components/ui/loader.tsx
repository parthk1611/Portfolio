import { cn } from "@/lib/utils";

const LETTERS = ["L", "O", "A", "D", "I", "N", "G"];

const Cube = ({ letter }: { letter: string }) => (
  <div className="cube">
    <div className="face face-front">{letter}</div>
    <div className="face face-back"></div>
    <div className="face face-right"></div>
    <div className="face face-left"></div>
    <div className="face face-top"></div>
    <div className="face face-bottom"></div>
  </div>
);

export const Loader = ({ className }: { className?: string }) => (
  <div className={cn("wrapper-grid", className)}>
    {LETTERS.map((l) => (
      <Cube key={l + Math.random()} letter={l} />
    ))}
  </div>
);

export default Loader;
