import React from "react";

export default function DotBackgroundGraph() {
  const rows = 150;
  const cols = 150;
  
  return (
    <div className="bg-[#fafafa] flex flex-col gap-[16px] items-start relative min-w-[2000px] w-full min-h-full overflow-hidden" data-name="dotBackgroundGraph">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="dotRow">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="relative shrink-0 size-[2px]">
              <svg className="absolute block inset-0 size-full" fill="none" height="2" preserveAspectRatio="none" viewBox="0 0 2 2" width="2">
                <circle cx="1" cy="1" fill="#DEDFE3" r="1" />
              </svg>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
