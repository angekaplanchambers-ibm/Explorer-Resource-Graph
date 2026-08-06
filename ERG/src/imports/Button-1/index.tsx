import svgPaths from "./svg-dtvecas36t";

function Icon() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-[1]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Side-panel--close--filled">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 14 12" width="14">
            <path d={svgPaths.p1017fd00} fill="var(--fill-0, #161616)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-center p-[8px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

export default function Button() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Button">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[32px]" data-name="Button">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <ButtonContent />
      </div>
    </div>
  );
}