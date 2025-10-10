import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        // @ts-ignore
        "--duration": `${duration}s`,
        "--gap": "1rem",
      }}
    >
      <div className="flex shrink-0 [gap:var(--gap)]">
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 [gap:var(--gap)]", {
                "flex-row": !vertical,
                "flex-col": vertical,
              })}
            >
              {children}
            </div>
          ))}
      </div>
      <div 
        className={cn(
          "flex shrink-0 [gap:var(--gap)]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          }
        )}
        aria-hidden="true"
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 [gap:var(--gap)]", {
                "flex-row": !vertical,
                "flex-col": vertical,
              })}
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}