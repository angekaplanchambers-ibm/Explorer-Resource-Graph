import svgPaths from "./svg-2sn4n8iz26";

export default function Badge() {
  return (
    <div className="bg-[#fbd4d4] content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[5px] size-full" data-name="Badge">
      <div className="relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[18.75%_18.76%_18.76%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="9.99855" preserveAspectRatio="none" viewBox="0 0 9.99855 9.99855" width="9.99855">
            <path d={svgPaths.p21c83c0} fill="var(--fill-0, #940004)" id="Path" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#940004] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Failed
      </p>
    </div>
  );
}