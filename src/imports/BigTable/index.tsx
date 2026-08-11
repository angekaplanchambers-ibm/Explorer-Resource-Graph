import svgPaths from "./svg-3gdz4yrhgq";
type SortButtonProps = {
  className?: string;
  sortDirection?: "indeterminate";
  state?: "default" | "hover" | "active";
};

function SortButton({ className, sortDirection = "indeterminate", state = "default" }: SortButtonProps) {
  const isHoverOrActive = ["hover", "active"].includes(state);
  return (
    <div className={className || `relative rounded-[3px] size-[24px] ${state === "active" ? "bg-[#dedfe3]" : state === "hover" ? "bg-white cursor-pointer drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)]" : ""}`}>
      <div aria-hidden={isHoverOrActive ? true : undefined} className={isHoverOrActive ? "absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-[3px]" : "flex flex-row items-center justify-center size-full"}>
        {state === "default" && (
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Sort">
              <div className="absolute inset-[0_7.81%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 13.5 16" width="13.5">
                  <g id="Path">
                    <path d={svgPaths.p30fef300} fill="#656A76" />
                    <path d={svgPaths.p27f1de00} fill="#656A76" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      {isHoverOrActive && (
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Sort">
              <div className="absolute inset-[0_7.81%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 13.5 16" width="13.5">
                  <g id="Path">
                    <path d={svgPaths.p30fef300} fill="#3B3D45" />
                    <path d={svgPaths.p27f1de00} fill="#3B3D45" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
type CheckboxBaseProps = {
  className?: string;
  isChecked?: "false";
  isDisabled?: "false";
  isIndeterminate?: "false";
  state?: "default";
};

function CheckboxBase({ className, isChecked = "false", isDisabled = "false", isIndeterminate = "false", state = "default" }: CheckboxBaseProps) {
  return (
    <div className={className || "overflow-clip pointer-events-none relative rounded-[3px] size-[16px]"}>
      <div aria-hidden className="absolute bg-white inset-0 rounded-[3px]" />
      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_2px_1px_rgba(101,106,118,0.1)]" />
      <div aria-hidden className="absolute border border-[#8c909c] border-solid inset-0 rounded-[3px]" />
    </div>
  );
}
type TableCellSelectionProps = {
  className?: string;
  density?: "medium";
  isStriped?: "false";
  rowPlacement?: "default";
};

function TableCellSelection({ className, density = "medium", isStriped = "false", rowPlacement = "default" }: TableCellSelectionProps) {
  return (
    <div className={className || "bg-white relative"}>
      <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start px-[16px] py-[12px] relative size-full">
        <div className="relative self-stretch shrink-0" data-name="Checkbox">
          <div className="content-stretch flex items-start py-[4px] relative size-full">
            <CheckboxBase className="pointer-events-none relative rounded-[3px] shrink-0 size-[16px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
type AdvancedTableCellSelectionProps = {
  className?: string;
  isFocused?: boolean;
  isStriped?: "false";
};

function AdvancedTableCellSelection({ className, isFocused = false, isStriped = "false" }: AdvancedTableCellSelectionProps) {
  return (
    <div className={className || "relative"}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">
          <TableCellSelection className="bg-white relative shrink-0" />
          {isFocused && (
            <>
              <div className="absolute inset-0 rounded-[6px]" data-name="Focus Ring Internal">
                <div aria-hidden className="absolute border border-[#0c56e9] border-solid inset-0 pointer-events-none rounded-[6px]" />
              </div>
              <div className="absolute inset-0 rounded-[6px]" data-name="Focus Ring External">
                <div aria-hidden className="absolute border-3 border-[#5990ff] border-solid inset-[-3px] pointer-events-none rounded-[9px]" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="h-full relative shrink-0" data-name="Main">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
          <CheckboxBase className="pointer-events-none relative rounded-[3px] shrink-0 size-[16px]" />
        </div>
      </div>
    </div>
  );
}

function Selection() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[48px]" data-name="selection">
      <div className="shrink-0 sticky top-0 z-[21]" data-name="AdvancedTable::Header::Selection">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="bg-[#f1f2f3] h-[48px] relative rounded-tl-[6px] shrink-0" data-name="Selection Header">
              <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none rounded-tl-[6px]" />
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center py-[6px] relative size-full">
                  <Main />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[20]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[19]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[18]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[17]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[16]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[15]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[14]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[13]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[12]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[11]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[10]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[9]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[8]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[7]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[6]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[5]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[4]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[3]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[2]" />
      <AdvancedTableCellSelection className="relative shrink-0 w-full z-[1]" />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Name
      </p>
    </div>
  );
}

function Main1() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">workspace-PE</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">ce-pojzu-dape</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">tehmi-wudvakhe-ve</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">awudulnak-jebtafcel-ruadeim</p>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">example-workspace-01</p>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">empe-zewik-gazofe</p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">indow-suuhi-co</p>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">kitobi-okaopuaja-civna</p>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">cos-rekcepfih-dedwez</p>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">pe-fo-oj</p>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">ti-gecruw-bob</p>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">besakve-mezlevwa-aw</p>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">no-jitwat-awsulnu</p>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">sefnut-suju-vakunaj</p>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">oveso-sagcein-renjuli</p>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">usitod-ve-citibmam</p>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">ko-dozuba-gukum</p>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">fo-liszod-wokiso</p>
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">taju-ewefir-novawnej</p>
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">fu-ip-ta</p>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text19 />
    </div>
  );
}

function Column() {
  return (
    <div className="h-full relative shrink-0 w-[237px]" data-name="column-1">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[6px] relative size-full">
              <Main1 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content1 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content2 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content3 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content4 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content5 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content6 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content7 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content8 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content9 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content10 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content11 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content12 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content13 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content14 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content15 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content16 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content17 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content18 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
          <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
              <Content19 />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-r-3 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Project name
      </p>
    </div>
  );
}

function Main2() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label1 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">do uk guzvas</p>
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">ga vujlis de</p>
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">jize perori gu</p>
      </div>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">jokbopu vipsu umbi</p>
      </div>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">avjusfoj lihijor kailoluh</p>
      </div>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">su ja keosus</p>
      </div>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">kic nuva wif</p>
      </div>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">tamigeki iwe isnetpi</p>
      </div>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">jigemtu kutnim pohwi</p>
      </div>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">wirbidjic ow akasa</p>
      </div>
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">acamo almov ke</p>
      </div>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">do ukate galtem</p>
      </div>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">tipa ubidu oh</p>
      </div>
    </div>
  );
}

function Content32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text32 />
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">wumenho ful decre</p>
      </div>
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">sesac duheceul ufeesafem</p>
      </div>
    </div>
  );
}

function Content34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text34 />
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">la ha kadosso</p>
      </div>
    </div>
  );
}

function Content35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">betrodjar gogwopel lonnege</p>
      </div>
    </div>
  );
}

function Content36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text36 />
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">robagbof lim fowog</p>
      </div>
    </div>
  );
}

function Content37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text37 />
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">le juzasri ni</p>
      </div>
    </div>
  );
}

function Content38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text38 />
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">ca reba be</p>
      </div>
    </div>
  );
}

function Content39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text39 />
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[244px]" data-name="column-2">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main2 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content20 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content21 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content22 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content23 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content24 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content25 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content26 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content27 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content28 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content29 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content30 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content31 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content32 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content33 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content34 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content35 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content36 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content37 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content38 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content39 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Resource count
      </p>
    </div>
  );
}

function Main3() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label2 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">12</p>
      </div>
    </div>
  );
}

function Content40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text40 />
    </div>
  );
}

function Text41() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text41 />
    </div>
  );
}

function Text42() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">3</p>
      </div>
    </div>
  );
}

function Content42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text42 />
    </div>
  );
}

function Text43() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">3</p>
      </div>
    </div>
  );
}

function Content43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text43 />
    </div>
  );
}

function Text44() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">12</p>
      </div>
    </div>
  );
}

function Content44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text44 />
    </div>
  );
}

function Text45() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">1</p>
      </div>
    </div>
  );
}

function Content45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text45 />
    </div>
  );
}

function Text46() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text46 />
    </div>
  );
}

function Text47() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text47 />
    </div>
  );
}

function Text48() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text48 />
    </div>
  );
}

function Text49() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">1</p>
      </div>
    </div>
  );
}

function Content49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text49 />
    </div>
  );
}

function Text50() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text50 />
    </div>
  );
}

function Text51() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text51 />
    </div>
  );
}

function Text52() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text52 />
    </div>
  );
}

function Text53() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text53 />
    </div>
  );
}

function Text54() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text54 />
    </div>
  );
}

function Text55() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content55() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text55 />
    </div>
  );
}

function Text56() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text56 />
    </div>
  );
}

function Text57() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text57 />
    </div>
  );
}

function Text58() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">2</p>
      </div>
    </div>
  );
}

function Content58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text58 />
    </div>
  );
}

function Text59() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text59 />
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[233px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main3 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content40 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content41 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content42 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content43 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content44 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content45 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content46 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content47 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content48 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content49 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content50 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content51 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content52 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content53 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content54 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content55 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content56 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content57 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content58 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content59 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Current run ID
      </p>
    </div>
  );
}

function Main4() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label3 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-0Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content60() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text60 />
    </div>
  );
}

function Text61() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-1Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content61() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text61 />
    </div>
  );
}

function Text62() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-2Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text62 />
    </div>
  );
}

function Text63() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-3Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content63() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text63 />
    </div>
  );
}

function Text64() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-4Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text64 />
    </div>
  );
}

function Text65() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-5Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content65() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text65 />
    </div>
  );
}

function Text66() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-6Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text66 />
    </div>
  );
}

function Text67() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-7Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text67 />
    </div>
  );
}

function Text68() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-8Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text68 />
    </div>
  );
}

function Text69() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-9Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content69() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text69 />
    </div>
  );
}

function Text70() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-10Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content70() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text70 />
    </div>
  );
}

function Text71() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-11Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content71() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text71 />
    </div>
  );
}

function Text72() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-12Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content72() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text72 />
    </div>
  );
}

function Text73() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-13Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content73() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text73 />
    </div>
  );
}

function Text74() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-14Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content74() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text74 />
    </div>
  );
}

function Text75() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-15Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content75() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text75 />
    </div>
  );
}

function Text76() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-16Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content76() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text76 />
    </div>
  );
}

function Text77() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-17Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content77() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text77 />
    </div>
  );
}

function Text78() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-18Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content78() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text78 />
    </div>
  );
}

function Text79() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">run-19Yks9WCFeD9xRTWo</p>
      </div>
    </div>
  );
}

function Content79() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text79 />
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[243px]" data-name="column-3">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main4 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content60 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content61 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content62 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content63 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content64 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content65 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content66 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content67 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content68 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content69 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content70 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content71 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content72 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content73 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content74 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content75 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content76 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content77 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content78 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content79 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Run status
      </p>
    </div>
  );
}

function Main5() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label4 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Content80() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content81() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content82() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content83() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=warning">
        <div aria-hidden className="absolute border border-[#bb5a00] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#bb5a00] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              planned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content84() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content85() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content86() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content87() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content88() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=warning">
        <div aria-hidden className="absolute border border-[#bb5a00] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#bb5a00] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              planned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content89() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content90() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content91() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content92() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content93() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=warning">
        <div aria-hidden className="absolute border border-[#bb5a00] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#bb5a00] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              planned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content94() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content95() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content96() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=warning">
        <div aria-hidden className="absolute border border-[#bb5a00] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#bb5a00] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              planned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content97() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=warning">
        <div aria-hidden className="absolute border border-[#bb5a00] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#bb5a00] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              planned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content98() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=critical">
        <div aria-hidden className="absolute border border-[#e52228] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#e52228] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              errored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content99() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative self-stretch" data-name="Content">
      <div className="relative rounded-[5px] shrink-0" data-name="size=medium, type=outlined, color=success">
        <div aria-hidden className="absolute border border-[#008a22] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#008a22] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[154px]" data-name="column-4">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main5 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content80 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content81 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content82 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content83 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content84 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content85 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content86 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content87 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content88 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content89 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content90 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content91 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content92 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content93 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content94 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content95 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content96 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content97 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content98 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content99 />
        </div>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Current run applied
      </p>
    </div>
  );
}

function Main6() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label5 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text80() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:10:14 am</p>
      </div>
    </div>
  );
}

function Content100() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text80 />
    </div>
  );
}

function Text81() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:09:14 am</p>
      </div>
    </div>
  );
}

function Content101() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text81 />
    </div>
  );
}

function Text82() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:08:14 am</p>
      </div>
    </div>
  );
}

function Content102() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text82 />
    </div>
  );
}

function Text83() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:07:14 am</p>
      </div>
    </div>
  );
}

function Content103() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text83 />
    </div>
  );
}

function Text84() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:06:14 am</p>
      </div>
    </div>
  );
}

function Content104() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text84 />
    </div>
  );
}

function Text85() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:05:14 am</p>
      </div>
    </div>
  );
}

function Content105() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text85 />
    </div>
  );
}

function Text86() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:04:14 am</p>
      </div>
    </div>
  );
}

function Content106() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text86 />
    </div>
  );
}

function Text87() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:03:14 am</p>
      </div>
    </div>
  );
}

function Content107() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text87 />
    </div>
  );
}

function Text88() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:02:14 am</p>
      </div>
    </div>
  );
}

function Content108() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text88 />
    </div>
  );
}

function Text89() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:01:14 am</p>
      </div>
    </div>
  );
}

function Content109() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text89 />
    </div>
  );
}

function Text90() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 09:00:14 am</p>
      </div>
    </div>
  );
}

function Content110() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text90 />
    </div>
  );
}

function Text91() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:59:14 am</p>
      </div>
    </div>
  );
}

function Content111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text91 />
    </div>
  );
}

function Text92() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:58:14 am</p>
      </div>
    </div>
  );
}

function Content112() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text92 />
    </div>
  );
}

function Text93() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:57:14 am</p>
      </div>
    </div>
  );
}

function Content113() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text93 />
    </div>
  );
}

function Text94() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:56:14 am</p>
      </div>
    </div>
  );
}

function Content114() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text94 />
    </div>
  );
}

function Text95() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:55:14 am</p>
      </div>
    </div>
  );
}

function Content115() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text95 />
    </div>
  );
}

function Text96() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:54:14 am</p>
      </div>
    </div>
  );
}

function Content116() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text96 />
    </div>
  );
}

function Text97() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:53:14 am</p>
      </div>
    </div>
  );
}

function Content117() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text97 />
    </div>
  );
}

function Text98() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:52:14 am</p>
      </div>
    </div>
  );
}

function Content118() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text98 />
    </div>
  );
}

function Text99() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 06, 2025 08:51:14 am</p>
      </div>
    </div>
  );
}

function Content119() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text99 />
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[224px]" data-name="column-5">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main6 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content100 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content101 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content102 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content103 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content104 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content105 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content106 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content107 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content108 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content109 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content110 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content111 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content112 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content113 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content114 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content115 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content116 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content117 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content118 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content119 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        VCS repo
      </p>
    </div>
  );
}

function Main7() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label6 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text100() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/a))!hzfpKcBl0</p>
      </div>
    </div>
  );
}

function Content120() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text100 />
    </div>
  );
}

function Text101() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/tp7Xe!mDHlI[70ZO1</p>
      </div>
    </div>
  );
}

function Content121() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text101 />
    </div>
  );
}

function Text102() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/sClKKTBbyCIzf@d8NxH2</p>
      </div>
    </div>
  );
}

function Content122() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text102 />
    </div>
  );
}

function Text103() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/y0^(Nm*63</p>
      </div>
    </div>
  );
}

function Content123() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text103 />
    </div>
  );
}

function Text104() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/ljPWe[4</p>
      </div>
    </div>
  );
}

function Content124() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text104 />
    </div>
  );
}

function Text105() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/E*fcS4mn@BoDgZu0O5</p>
      </div>
    </div>
  );
}

function Content125() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text105 />
    </div>
  );
}

function Text106() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">{`example/&j[RmmtjpQX6`}</p>
      </div>
    </div>
  );
}

function Content126() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text106 />
    </div>
  );
}

function Text107() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/(DCFjSEKcBuU44J8AB87</p>
      </div>
    </div>
  );
}

function Content127() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text107 />
    </div>
  );
}

function Text108() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/9YURY8</p>
      </div>
    </div>
  );
}

function Content128() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text108 />
    </div>
  );
}

function Text109() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/fY88NZbc5tNY9</p>
      </div>
    </div>
  );
}

function Content129() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text109 />
    </div>
  );
}

function Text110() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/d2s3B46I10</p>
      </div>
    </div>
  );
}

function Content130() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text110 />
    </div>
  );
}

function Text111() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">{`example/v@C6&hBTou11`}</p>
      </div>
    </div>
  );
}

function Content131() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text111 />
    </div>
  );
}

function Text112() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/@t23^12</p>
      </div>
    </div>
  );
}

function Content132() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text112 />
    </div>
  );
}

function Text113() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/GuZ)F^A13</p>
      </div>
    </div>
  );
}

function Content133() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text113 />
    </div>
  );
}

function Text114() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/JUha^7zr14</p>
      </div>
    </div>
  );
}

function Content134() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text114 />
    </div>
  );
}

function Text115() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/Uy#qNAOJee6Br7wk15</p>
      </div>
    </div>
  );
}

function Content135() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text115 />
    </div>
  );
}

function Text116() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/t*vN3@*BxJnG116</p>
      </div>
    </div>
  );
}

function Content136() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text116 />
    </div>
  );
}

function Text117() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/8G3C81*u*q*O$17</p>
      </div>
    </div>
  );
}

function Content137() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text117 />
    </div>
  );
}

function Text118() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/gt]5*c!N1*N%I!m)18</p>
      </div>
    </div>
  );
}

function Content138() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text118 />
    </div>
  );
}

function Text119() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">example/Ib*TScr19</p>
      </div>
    </div>
  );
}

function Content139() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text119 />
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[359px]" data-name="column-6">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main7 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content120 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content121 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content122 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content123 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content124 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content125 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content126 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content127 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content128 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content129 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content130 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content131 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content132 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content133 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content134 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content135 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content136 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content137 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content138 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content139 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Module count
      </p>
    </div>
  );
}

function Main8() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label7 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text120() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">46</p>
      </div>
    </div>
  );
}

function Content140() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text120 />
    </div>
  );
}

function Text121() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">152</p>
      </div>
    </div>
  );
}

function Content141() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text121 />
    </div>
  );
}

function Text122() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">31</p>
      </div>
    </div>
  );
}

function Content142() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text122 />
    </div>
  );
}

function Text123() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">58</p>
      </div>
    </div>
  );
}

function Content143() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text123 />
    </div>
  );
}

function Text124() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">32</p>
      </div>
    </div>
  );
}

function Content144() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text124 />
    </div>
  );
}

function Text125() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">94</p>
      </div>
    </div>
  );
}

function Content145() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text125 />
    </div>
  );
}

function Text126() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">117</p>
      </div>
    </div>
  );
}

function Content146() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text126 />
    </div>
  );
}

function Text127() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">114</p>
      </div>
    </div>
  );
}

function Content147() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text127 />
    </div>
  );
}

function Text128() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">106</p>
      </div>
    </div>
  );
}

function Content148() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text128 />
    </div>
  );
}

function Text129() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">124</p>
      </div>
    </div>
  );
}

function Content149() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text129 />
    </div>
  );
}

function Text130() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">70</p>
      </div>
    </div>
  );
}

function Content150() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text130 />
    </div>
  );
}

function Text131() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">106</p>
      </div>
    </div>
  );
}

function Content151() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text131 />
    </div>
  );
}

function Text132() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">14</p>
      </div>
    </div>
  );
}

function Content152() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text132 />
    </div>
  );
}

function Text133() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">5</p>
      </div>
    </div>
  );
}

function Content153() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text133 />
    </div>
  );
}

function Text134() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">119</p>
      </div>
    </div>
  );
}

function Content154() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text134 />
    </div>
  );
}

function Text135() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">99</p>
      </div>
    </div>
  );
}

function Content155() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text135 />
    </div>
  );
}

function Text136() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">139</p>
      </div>
    </div>
  );
}

function Content156() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text136 />
    </div>
  );
}

function Text137() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">107</p>
      </div>
    </div>
  );
}

function Content157() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text137 />
    </div>
  );
}

function Text138() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">80</p>
      </div>
    </div>
  );
}

function Content158() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text138 />
    </div>
  );
}

function Text139() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">158</p>
      </div>
    </div>
  );
}

function Content159() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text139 />
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[159px]" data-name="column-7">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main8 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content140 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content141 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content142 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content143 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content144 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content145 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content146 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content147 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content148 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content149 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content150 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content151 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content152 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content153 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content154 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content155 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content156 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content157 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content158 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content159 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Modules
      </p>
    </div>
  );
}

function Main9() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label8 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text140() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content160() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text140 />
    </div>
  );
}

function Text141() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content161() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text141 />
    </div>
  );
}

function Text142() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content162() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text142 />
    </div>
  );
}

function Text143() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content163() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text143 />
    </div>
  );
}

function Text144() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content164() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text144 />
    </div>
  );
}

function Text145() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content165() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text145 />
    </div>
  );
}

function Text146() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content166() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text146 />
    </div>
  );
}

function Text147() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content167() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text147 />
    </div>
  );
}

function Text148() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content168() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text148 />
    </div>
  );
}

function Text149() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content169() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text149 />
    </div>
  );
}

function Text150() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content170() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text150 />
    </div>
  );
}

function Text151() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content171() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text151 />
    </div>
  );
}

function Text152() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content172() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text152 />
    </div>
  );
}

function Text153() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content173() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text153 />
    </div>
  );
}

function Text154() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content174() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text154 />
    </div>
  );
}

function Text155() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content175() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text155 />
    </div>
  );
}

function Text156() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content176() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text156 />
    </div>
  );
}

function Text157() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content177() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text157 />
    </div>
  );
}

function Text158() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content178() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text158 />
    </div>
  );
}

function Text159() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">wad-bedzeaje-rogmejca</p>
      </div>
    </div>
  );
}

function Content179() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text159 />
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[233px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main9 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content160 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content161 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content162 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content163 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content164 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content165 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content166 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content167 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content168 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content169 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content170 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content171 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content172 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content173 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content174 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content175 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content176 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content177 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content178 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content179 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Provider count
      </p>
    </div>
  );
}

function Main10() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label9 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text160() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">118</p>
      </div>
    </div>
  );
}

function Content180() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text160 />
    </div>
  );
}

function Text161() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">27</p>
      </div>
    </div>
  );
}

function Content181() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text161 />
    </div>
  );
}

function Text162() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">42</p>
      </div>
    </div>
  );
}

function Content182() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text162 />
    </div>
  );
}

function Text163() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">140</p>
      </div>
    </div>
  );
}

function Content183() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text163 />
    </div>
  );
}

function Text164() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">50</p>
      </div>
    </div>
  );
}

function Content184() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text164 />
    </div>
  );
}

function Text165() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">113</p>
      </div>
    </div>
  );
}

function Content185() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text165 />
    </div>
  );
}

function Text166() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">80</p>
      </div>
    </div>
  );
}

function Content186() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text166 />
    </div>
  );
}

function Text167() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">107</p>
      </div>
    </div>
  );
}

function Content187() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text167 />
    </div>
  );
}

function Text168() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">185</p>
      </div>
    </div>
  );
}

function Content188() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text168 />
    </div>
  );
}

function Text169() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">175</p>
      </div>
    </div>
  );
}

function Content189() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text169 />
    </div>
  );
}

function Text170() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">168</p>
      </div>
    </div>
  );
}

function Content190() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text170 />
    </div>
  );
}

function Text171() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">61</p>
      </div>
    </div>
  );
}

function Content191() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text171 />
    </div>
  );
}

function Text172() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">143</p>
      </div>
    </div>
  );
}

function Content192() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text172 />
    </div>
  );
}

function Text173() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">100</p>
      </div>
    </div>
  );
}

function Content193() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text173 />
    </div>
  );
}

function Text174() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">48</p>
      </div>
    </div>
  );
}

function Content194() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text174 />
    </div>
  );
}

function Text175() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">90</p>
      </div>
    </div>
  );
}

function Content195() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text175 />
    </div>
  );
}

function Text176() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">170</p>
      </div>
    </div>
  );
}

function Content196() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text176 />
    </div>
  );
}

function Text177() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">83</p>
      </div>
    </div>
  );
}

function Content197() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text177 />
    </div>
  );
}

function Text178() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">153</p>
      </div>
    </div>
  );
}

function Content198() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text178 />
    </div>
  );
}

function Text179() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[20px] underline">11</p>
      </div>
    </div>
  );
}

function Content199() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text179 />
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[170px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main10 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content180 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content181 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content182 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content183 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content184 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content185 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content186 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content187 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content188 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content189 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content190 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content191 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content192 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content193 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content194 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content195 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content196 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content197 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content198 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content199 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Providers
      </p>
    </div>
  );
}

function Main11() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label10 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text180() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content200() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text180 />
    </div>
  );
}

function Text181() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content201() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text181 />
    </div>
  );
}

function Text182() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content202() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text182 />
    </div>
  );
}

function Text183() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content203() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text183 />
    </div>
  );
}

function Text184() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content204() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text184 />
    </div>
  );
}

function Text185() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content205() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text185 />
    </div>
  );
}

function Text186() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content206() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text186 />
    </div>
  );
}

function Text187() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content207() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text187 />
    </div>
  );
}

function Text188() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content208() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text188 />
    </div>
  );
}

function Text189() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content209() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text189 />
    </div>
  );
}

function Text190() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content210() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text190 />
    </div>
  );
}

function Text191() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content211() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text191 />
    </div>
  );
}

function Text192() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content212() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text192 />
    </div>
  );
}

function Text193() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content213() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text193 />
    </div>
  );
}

function Text194() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content214() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text194 />
    </div>
  );
}

function Text195() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content215() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text195 />
    </div>
  );
}

function Text196() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content216() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text196 />
    </div>
  );
}

function Text197() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content217() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text197 />
    </div>
  );
}

function Text198() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content218() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text198 />
    </div>
  );
}

function Text199() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">susnup-da-zuw</p>
      </div>
    </div>
  );
}

function Content219() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text199 />
    </div>
  );
}

function Column10() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[168px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main11 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content200 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content201 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content202 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content203 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content204 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content205 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content206 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content207 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content208 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content209 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content210 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content211 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content212 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content213 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content214 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content215 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content216 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content217 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content218 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content219 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Terraform version
      </p>
    </div>
  );
}

function Main12() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label11 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text200() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content220() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text200 />
    </div>
  );
}

function Text201() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content221() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text201 />
    </div>
  );
}

function Text202() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content222() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text202 />
    </div>
  );
}

function Text203() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content223() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text203 />
    </div>
  );
}

function Text204() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content224() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text204 />
    </div>
  );
}

function Text205() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content225() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text205 />
    </div>
  );
}

function Text206() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content226() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text206 />
    </div>
  );
}

function Text207() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content227() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text207 />
    </div>
  );
}

function Text208() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content228() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text208 />
    </div>
  );
}

function Text209() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content229() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text209 />
    </div>
  );
}

function Text210() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content230() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text210 />
    </div>
  );
}

function Text211() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content231() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text211 />
    </div>
  );
}

function Text212() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content232() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text212 />
    </div>
  );
}

function Text213() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content233() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text213 />
    </div>
  );
}

function Text214() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content234() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text214 />
    </div>
  );
}

function Text215() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content235() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text215 />
    </div>
  );
}

function Text216() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content236() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text216 />
    </div>
  );
}

function Text217() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content237() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text217 />
    </div>
  );
}

function Text218() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content238() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text218 />
    </div>
  );
}

function Text219() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">0.14.0</p>
      </div>
    </div>
  );
}

function Content239() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text219 />
    </div>
  );
}

function Column11() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[200px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main12 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content220 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content221 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content222 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content223 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content224 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content225 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content226 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content227 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content228 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content229 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content230 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content231 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content232 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content233 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content234 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content235 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content236 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content237 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content238 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content239 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Drifted
      </p>
    </div>
  );
}

function Main13() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label12 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text220() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content240() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text220 />
    </div>
  );
}

function Text221() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content241() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text221 />
    </div>
  );
}

function Text222() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content242() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text222 />
    </div>
  );
}

function Text223() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content243() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text223 />
    </div>
  );
}

function Text224() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content244() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text224 />
    </div>
  );
}

function Text225() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content245() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text225 />
    </div>
  );
}

function Text226() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content246() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text226 />
    </div>
  );
}

function Text227() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content247() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text227 />
    </div>
  );
}

function Text228() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content248() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text228 />
    </div>
  );
}

function Text229() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content249() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text229 />
    </div>
  );
}

function Text230() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content250() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text230 />
    </div>
  );
}

function Text231() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content251() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text231 />
    </div>
  );
}

function Text232() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content252() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text232 />
    </div>
  );
}

function Text233() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content253() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text233 />
    </div>
  );
}

function Text234() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content254() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text234 />
    </div>
  );
}

function Text235() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content255() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text235 />
    </div>
  );
}

function Text236() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content256() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text236 />
    </div>
  );
}

function Text237() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content257() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text237 />
    </div>
  );
}

function Text238() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content258() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text238 />
    </div>
  );
}

function Text239() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content259() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text239 />
    </div>
  );
}

function Column12() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main13 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content240 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content241 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content242 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content243 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content244 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content245 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content246 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content247 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content248 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content249 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content250 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content251 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content252 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content253 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content254 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content255 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content256 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content257 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content258 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content259 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Health checks succeeded
      </p>
    </div>
  );
}

function Main14() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label13 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text240() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content260() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text240 />
    </div>
  );
}

function Text241() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content261() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text241 />
    </div>
  );
}

function Text242() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content262() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text242 />
    </div>
  );
}

function Text243() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content263() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text243 />
    </div>
  );
}

function Text244() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content264() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text244 />
    </div>
  );
}

function Text245() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content265() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text245 />
    </div>
  );
}

function Text246() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content266() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text246 />
    </div>
  );
}

function Text247() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content267() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text247 />
    </div>
  );
}

function Text248() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content268() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text248 />
    </div>
  );
}

function Text249() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content269() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text249 />
    </div>
  );
}

function Text250() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content270() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text250 />
    </div>
  );
}

function Text251() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content271() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text251 />
    </div>
  );
}

function Text252() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content272() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text252 />
    </div>
  );
}

function Text253() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content273() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text253 />
    </div>
  );
}

function Text254() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content274() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text254 />
    </div>
  );
}

function Text255() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content275() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text255 />
    </div>
  );
}

function Text256() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content276() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text256 />
    </div>
  );
}

function Text257() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content277() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text257 />
    </div>
  );
}

function Text258() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content278() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text258 />
    </div>
  );
}

function Text259() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content279() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text259 />
    </div>
  );
}

function Column13() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main14 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content260 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content261 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content262 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content263 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content264 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content265 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content266 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content267 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content268 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content269 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content270 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content271 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content272 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content273 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content274 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content275 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content276 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content277 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content278 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content279 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label14() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Health checks passed
      </p>
    </div>
  );
}

function Main15() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label14 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text260() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content280() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text260 />
    </div>
  );
}

function Text261() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content281() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text261 />
    </div>
  );
}

function Text262() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content282() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text262 />
    </div>
  );
}

function Text263() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content283() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text263 />
    </div>
  );
}

function Text264() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content284() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text264 />
    </div>
  );
}

function Text265() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content285() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text265 />
    </div>
  );
}

function Text266() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content286() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text266 />
    </div>
  );
}

function Text267() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content287() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text267 />
    </div>
  );
}

function Text268() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content288() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text268 />
    </div>
  );
}

function Text269() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content289() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text269 />
    </div>
  );
}

function Text270() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content290() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text270 />
    </div>
  );
}

function Text271() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content291() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text271 />
    </div>
  );
}

function Text272() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content292() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text272 />
    </div>
  );
}

function Text273() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content293() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text273 />
    </div>
  );
}

function Text274() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content294() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text274 />
    </div>
  );
}

function Text275() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content295() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text275 />
    </div>
  );
}

function Text276() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content296() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text276 />
    </div>
  );
}

function Text277() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content297() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text277 />
    </div>
  );
}

function Text278() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content298() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text278 />
    </div>
  );
}

function Text279() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content299() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text279 />
    </div>
  );
}

function Column14() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main15 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content280 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content281 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content282 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content283 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content284 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content285 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content286 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content287 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content288 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content289 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content290 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content291 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content292 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content293 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content294 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content295 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content296 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content297 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content298 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content299 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label15() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Health checks failed
      </p>
    </div>
  );
}

function Main16() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label15 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text280() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content300() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text280 />
    </div>
  );
}

function Text281() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content301() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text281 />
    </div>
  );
}

function Text282() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content302() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text282 />
    </div>
  );
}

function Text283() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content303() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text283 />
    </div>
  );
}

function Text284() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content304() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text284 />
    </div>
  );
}

function Text285() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content305() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text285 />
    </div>
  );
}

function Text286() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content306() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text286 />
    </div>
  );
}

function Text287() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content307() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text287 />
    </div>
  );
}

function Text288() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content308() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text288 />
    </div>
  );
}

function Text289() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content309() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text289 />
    </div>
  );
}

function Text290() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content310() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text290 />
    </div>
  );
}

function Text291() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content311() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text291 />
    </div>
  );
}

function Text292() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content312() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text292 />
    </div>
  );
}

function Text293() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content313() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text293 />
    </div>
  );
}

function Text294() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content314() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text294 />
    </div>
  );
}

function Text295() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content315() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text295 />
    </div>
  );
}

function Text296() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content316() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text296 />
    </div>
  );
}

function Text297() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content317() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text297 />
    </div>
  );
}

function Text298() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content318() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text298 />
    </div>
  );
}

function Text299() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content319() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text299 />
    </div>
  );
}

function Column15() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main16 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content300 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content301 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content302 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content303 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content304 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content305 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content306 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content307 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content308 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content309 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content310 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content311 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content312 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content313 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content314 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content315 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content316 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content317 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content318 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content319 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label16() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Health checks errored
      </p>
    </div>
  );
}

function Main17() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label16 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text300() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content320() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text300 />
    </div>
  );
}

function Text301() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content321() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text301 />
    </div>
  );
}

function Text302() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content322() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text302 />
    </div>
  );
}

function Text303() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content323() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text303 />
    </div>
  );
}

function Text304() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content324() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text304 />
    </div>
  );
}

function Text305() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content325() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text305 />
    </div>
  );
}

function Text306() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content326() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text306 />
    </div>
  );
}

function Text307() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content327() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text307 />
    </div>
  );
}

function Text308() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content328() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text308 />
    </div>
  );
}

function Text309() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content329() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text309 />
    </div>
  );
}

function Text310() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content330() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text310 />
    </div>
  );
}

function Text311() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content331() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text311 />
    </div>
  );
}

function Text312() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content332() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text312 />
    </div>
  );
}

function Text313() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content333() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text313 />
    </div>
  );
}

function Text314() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content334() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text314 />
    </div>
  );
}

function Text315() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content335() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text315 />
    </div>
  );
}

function Text316() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content336() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text316 />
    </div>
  );
}

function Text317() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content337() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text317 />
    </div>
  );
}

function Text318() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content338() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text318 />
    </div>
  );
}

function Text319() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content339() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text319 />
    </div>
  );
}

function Column16() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main17 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content320 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content321 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content322 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content323 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content324 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content325 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content326 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content327 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content328 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content329 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content330 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content331 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content332 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content333 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content334 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content335 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content336 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content337 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content338 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content339 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label17() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Resources drifted
      </p>
    </div>
  );
}

function Main18() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label17 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text320() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content340() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text320 />
    </div>
  );
}

function Text321() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content341() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text321 />
    </div>
  );
}

function Text322() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content342() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text322 />
    </div>
  );
}

function Text323() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content343() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text323 />
    </div>
  );
}

function Text324() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content344() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text324 />
    </div>
  );
}

function Text325() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content345() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text325 />
    </div>
  );
}

function Text326() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content346() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text326 />
    </div>
  );
}

function Text327() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content347() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text327 />
    </div>
  );
}

function Text328() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content348() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text328 />
    </div>
  );
}

function Text329() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content349() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text329 />
    </div>
  );
}

function Text330() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content350() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text330 />
    </div>
  );
}

function Text331() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content351() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text331 />
    </div>
  );
}

function Text332() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content352() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text332 />
    </div>
  );
}

function Text333() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content353() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text333 />
    </div>
  );
}

function Text334() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content354() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text334 />
    </div>
  );
}

function Text335() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content355() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text335 />
    </div>
  );
}

function Text336() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content356() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text336 />
    </div>
  );
}

function Text337() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content357() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text337 />
    </div>
  );
}

function Text338() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content358() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text338 />
    </div>
  );
}

function Text339() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content359() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text339 />
    </div>
  );
}

function Column17() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main18 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content340 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content341 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content342 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content343 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content344 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content345 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content346 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content347 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content348 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content349 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content350 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content351 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content352 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content353 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content354 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content355 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content356 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content357 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content358 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content359 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label18() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Resourced undrifted
      </p>
    </div>
  );
}

function Main19() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label18 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text340() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content360() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text340 />
    </div>
  );
}

function Text341() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content361() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text341 />
    </div>
  );
}

function Text342() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content362() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text342 />
    </div>
  );
}

function Text343() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content363() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text343 />
    </div>
  );
}

function Text344() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content364() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text344 />
    </div>
  );
}

function Text345() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content365() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text345 />
    </div>
  );
}

function Text346() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content366() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text346 />
    </div>
  );
}

function Text347() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content367() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text347 />
    </div>
  );
}

function Text348() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content368() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text348 />
    </div>
  );
}

function Text349() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content369() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text349 />
    </div>
  );
}

function Text350() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content370() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text350 />
    </div>
  );
}

function Text351() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content371() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text351 />
    </div>
  );
}

function Text352() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content372() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text352 />
    </div>
  );
}

function Text353() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content373() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text353 />
    </div>
  );
}

function Text354() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content374() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text354 />
    </div>
  );
}

function Text355() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content375() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text355 />
    </div>
  );
}

function Text356() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content376() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text356 />
    </div>
  );
}

function Text357() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content377() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text357 />
    </div>
  );
}

function Text358() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content378() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text358 />
    </div>
  );
}

function Text359() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content379() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text359 />
    </div>
  );
}

function Column18() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main19 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content360 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content361 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content362 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content363 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content364 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content365 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content366 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content367 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content368 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content369 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content370 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content371 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content372 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content373 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content374 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content375 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content376 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content377 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content378 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content379 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label19() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        State Terraform version
      </p>
    </div>
  );
}

function Main20() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label19 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text360() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content380() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text360 />
    </div>
  );
}

function Text361() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content381() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text361 />
    </div>
  );
}

function Text362() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content382() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text362 />
    </div>
  );
}

function Text363() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content383() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text363 />
    </div>
  );
}

function Text364() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content384() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text364 />
    </div>
  );
}

function Text365() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content385() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text365 />
    </div>
  );
}

function Text366() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content386() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text366 />
    </div>
  );
}

function Text367() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content387() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text367 />
    </div>
  );
}

function Text368() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content388() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text368 />
    </div>
  );
}

function Text369() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content389() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text369 />
    </div>
  );
}

function Text370() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content390() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text370 />
    </div>
  );
}

function Text371() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content391() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text371 />
    </div>
  );
}

function Text372() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content392() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text372 />
    </div>
  );
}

function Text373() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content393() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text373 />
    </div>
  );
}

function Text374() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content394() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text374 />
    </div>
  );
}

function Text375() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content395() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text375 />
    </div>
  );
}

function Text376() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content396() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text376 />
    </div>
  );
}

function Text377() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content397() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text377 />
    </div>
  );
}

function Text378() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content398() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text378 />
    </div>
  );
}

function Text379() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content399() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text379 />
    </div>
  );
}

function Column19() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main20 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content380 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content381 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content382 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content383 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content384 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content385 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content386 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content387 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content388 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content389 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content390 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content391 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content392 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content393 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content394 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content395 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content396 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content397 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content398 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content399 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label20() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Current RUM count
      </p>
    </div>
  );
}

function Main21() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label20 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text380() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content400() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text380 />
    </div>
  );
}

function Text381() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content401() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text381 />
    </div>
  );
}

function Text382() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content402() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text382 />
    </div>
  );
}

function Text383() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content403() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text383 />
    </div>
  );
}

function Text384() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content404() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text384 />
    </div>
  );
}

function Text385() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content405() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text385 />
    </div>
  );
}

function Text386() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content406() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text386 />
    </div>
  );
}

function Text387() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content407() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text387 />
    </div>
  );
}

function Text388() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content408() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text388 />
    </div>
  );
}

function Text389() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content409() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text389 />
    </div>
  );
}

function Text390() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content410() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text390 />
    </div>
  );
}

function Text391() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content411() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text391 />
    </div>
  );
}

function Text392() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content412() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text392 />
    </div>
  );
}

function Text393() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content413() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text393 />
    </div>
  );
}

function Text394() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content414() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text394 />
    </div>
  );
}

function Text395() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content415() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text395 />
    </div>
  );
}

function Text396() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content416() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text396 />
    </div>
  );
}

function Text397() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content417() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text397 />
    </div>
  );
}

function Text398() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content418() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text398 />
    </div>
  );
}

function Text399() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content419() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text399 />
    </div>
  );
}

function Column20() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main21 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content400 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content401 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content402 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content403 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content404 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content405 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content406 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content407 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content408 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content409 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content410 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content411 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content412 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content413 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content414 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content415 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content416 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content417 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content418 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content419 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label21() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Tags
      </p>
    </div>
  );
}

function Main22() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label21 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text400() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content420() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text400 />
    </div>
  );
}

function Text401() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content421() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text401 />
    </div>
  );
}

function Text402() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content422() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text402 />
    </div>
  );
}

function Text403() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content423() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text403 />
    </div>
  );
}

function Text404() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content424() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text404 />
    </div>
  );
}

function Text405() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content425() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text405 />
    </div>
  );
}

function Text406() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content426() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text406 />
    </div>
  );
}

function Text407() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content427() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text407 />
    </div>
  );
}

function Text408() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content428() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text408 />
    </div>
  );
}

function Text409() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content429() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text409 />
    </div>
  );
}

function Text410() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content430() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text410 />
    </div>
  );
}

function Text411() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content431() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text411 />
    </div>
  );
}

function Text412() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content432() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text412 />
    </div>
  );
}

function Text413() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content433() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text413 />
    </div>
  );
}

function Text414() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content434() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text414 />
    </div>
  );
}

function Text415() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content435() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text415 />
    </div>
  );
}

function Text416() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content436() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text416 />
    </div>
  );
}

function Text417() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content437() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text417 />
    </div>
  );
}

function Text418() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content438() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text418 />
    </div>
  );
}

function Text419() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">-</p>
      </div>
    </div>
  );
}

function Content439() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text419 />
    </div>
  );
}

function Column21() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[237px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main22 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content420 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content421 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content422 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content423 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content424 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content425 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content426 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content427 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content428 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content429 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content430 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content431 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content432 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content433 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content434 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content435 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content436 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content437 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content438 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content439 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label22() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Created
      </p>
    </div>
  );
}

function Main23() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label22 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text420() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 5 2025</p>
      </div>
    </div>
  );
}

function Content440() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text420 />
    </div>
  );
}

function Text421() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 5 2025</p>
      </div>
    </div>
  );
}

function Content441() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text421 />
    </div>
  );
}

function Text422() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 4 2025</p>
      </div>
    </div>
  );
}

function Content442() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text422 />
    </div>
  );
}

function Text423() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 3 2025</p>
      </div>
    </div>
  );
}

function Content443() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text423 />
    </div>
  );
}

function Text424() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 2 2025</p>
      </div>
    </div>
  );
}

function Content444() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text424 />
    </div>
  );
}

function Text425() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 1 2025</p>
      </div>
    </div>
  );
}

function Content445() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text425 />
    </div>
  );
}

function Text426() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 28 2025</p>
      </div>
    </div>
  );
}

function Content446() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text426 />
    </div>
  );
}

function Text427() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 27 2025</p>
      </div>
    </div>
  );
}

function Content447() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text427 />
    </div>
  );
}

function Text428() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 26 2025</p>
      </div>
    </div>
  );
}

function Content448() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text428 />
    </div>
  );
}

function Text429() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 25 2025</p>
      </div>
    </div>
  );
}

function Content449() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text429 />
    </div>
  );
}

function Text430() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 24 2025</p>
      </div>
    </div>
  );
}

function Content450() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text430 />
    </div>
  );
}

function Text431() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 23 2025</p>
      </div>
    </div>
  );
}

function Content451() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text431 />
    </div>
  );
}

function Text432() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 22 2025</p>
      </div>
    </div>
  );
}

function Content452() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text432 />
    </div>
  );
}

function Text433() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 21 2025</p>
      </div>
    </div>
  );
}

function Content453() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text433 />
    </div>
  );
}

function Text434() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 20 2025</p>
      </div>
    </div>
  );
}

function Content454() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text434 />
    </div>
  );
}

function Text435() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 19 2025</p>
      </div>
    </div>
  );
}

function Content455() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text435 />
    </div>
  );
}

function Text436() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 18 2025</p>
      </div>
    </div>
  );
}

function Content456() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text436 />
    </div>
  );
}

function Text437() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 17 2025</p>
      </div>
    </div>
  );
}

function Content457() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text437 />
    </div>
  );
}

function Text438() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 16 2025</p>
      </div>
    </div>
  );
}

function Content458() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text438 />
    </div>
  );
}

function Text439() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 15 2025</p>
      </div>
    </div>
  );
}

function Content459() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text439 />
    </div>
  );
}

function Column22() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[163px]" data-name="column-08">
      <div className="bg-[#f1f2f3] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main23 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content440 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content441 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content442 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content443 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content444 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content445 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content446 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content447 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content448 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content449 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content450 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content451 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content452 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content453 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content454 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content455 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content456 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content457 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content458 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content459 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label23() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[20px] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Updated
      </p>
    </div>
  );
}

function Main24() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Label23 />
            <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text440() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 6 2025</p>
      </div>
    </div>
  );
}

function Content460() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text440 />
    </div>
  );
}

function Text441() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 5 2025</p>
      </div>
    </div>
  );
}

function Content461() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text441 />
    </div>
  );
}

function Text442() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 4 2025</p>
      </div>
    </div>
  );
}

function Content462() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text442 />
    </div>
  );
}

function Text443() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 3 2025</p>
      </div>
    </div>
  );
}

function Content463() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text443 />
    </div>
  );
}

function Text444() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 2 2025</p>
      </div>
    </div>
  );
}

function Content464() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text444 />
    </div>
  );
}

function Text445() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Mar 1 2025</p>
      </div>
    </div>
  );
}

function Content465() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text445 />
    </div>
  );
}

function Text446() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 28 2025</p>
      </div>
    </div>
  );
}

function Content466() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text446 />
    </div>
  );
}

function Text447() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 27 2025</p>
      </div>
    </div>
  );
}

function Content467() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text447 />
    </div>
  );
}

function Text448() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 26 2025</p>
      </div>
    </div>
  );
}

function Content468() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text448 />
    </div>
  );
}

function Text449() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 25 2025</p>
      </div>
    </div>
  );
}

function Content469() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text449 />
    </div>
  );
}

function Text450() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 24 2025</p>
      </div>
    </div>
  );
}

function Content470() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text450 />
    </div>
  );
}

function Text451() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 23 2025</p>
      </div>
    </div>
  );
}

function Content471() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text451 />
    </div>
  );
}

function Text452() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 22 2025</p>
      </div>
    </div>
  );
}

function Content472() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text452 />
    </div>
  );
}

function Text453() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 21 2025</p>
      </div>
    </div>
  );
}

function Content473() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text453 />
    </div>
  );
}

function Text454() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 20 2025</p>
      </div>
    </div>
  );
}

function Content474() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text454 />
    </div>
  );
}

function Text455() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 19 2025</p>
      </div>
    </div>
  );
}

function Content475() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text455 />
    </div>
  );
}

function Text456() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 18 2025</p>
      </div>
    </div>
  );
}

function Content476() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text456 />
    </div>
  );
}

function Text457() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 17 2025</p>
      </div>
    </div>
  );
}

function Content477() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text457 />
    </div>
  );
}

function Text458() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 16 2025</p>
      </div>
    </div>
  );
}

function Content478() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text458 />
    </div>
  );
}

function Text459() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Feb 15 2025</p>
      </div>
    </div>
  );
}

function Content479() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text459 />
    </div>
  );
}

function Column23() {
  return (
    <div className="content-stretch flex flex-col h-full isolate items-start overflow-clip relative shrink-0 w-[200px]" data-name="column-08">
      <div className="bg-[#f1f2f3] rounded-tr-[6px] shrink-0 sticky top-0 w-full z-[21]" data-name="AdvancedTable::HeaderColumn::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b-3 border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tr-[6px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main24 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[20]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content460 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[19]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content461 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[18]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content462 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[17]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content463 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[16]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content464 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[15]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content465 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[14]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content466 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[13]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content467 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[12]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content468 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[11]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content469 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[10]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content470 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[9]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content471 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[8]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content472 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[7]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content473 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[6]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content474 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[5]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content475 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[4]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content476 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[3]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content477 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[2]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content478 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full z-[1]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content479 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Columns() {
  return (
    <div className="content-stretch flex h-[624px] items-center overflow-clip relative shrink-0 w-[2656px]" data-name="columns">
      <Selection />
      <Column />
      <Column1 />
      <Column8 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
      <Column6 />
      <Column7 />
      <Column9 />
      <Column10 />
      <Column11 />
      <Column12 />
      <Column13 />
      <Column14 />
      <Column15 />
      <Column16 />
      <Column17 />
      <Column18 />
      <Column19 />
      <Column20 />
      <Column21 />
      <Column22 />
      <Column23 />
    </div>
  );
}

export default function BigTable() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="big-table">
      <Columns />
    </div>
  );
}