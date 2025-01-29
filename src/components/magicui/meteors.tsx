'use client';

import { cn } from "@/lib/utils";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);

  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-800/50 dark:bg-slate-300/50 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[rgba(0,0,0,0.1)] before:to-[rgba(0,0,0,0.4)] dark:before:from-[rgba(255,255,255,0.1)] dark:before:to-[rgba(255,255,255,0.4)]"
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.random() * (10 - 2) + 2 + "s",
          }}
        />
      ))}
    </div>
  );
}; 
