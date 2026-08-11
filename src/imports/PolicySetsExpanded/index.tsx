import svgPaths from "./svg-qkeswhge5a";

function CollapseEdge({ className }: { className?: string }) {
  return (
    <div className={className || "h-[300px] relative w-[25px]"} data-name=".CollapseEdge">
      <div className="content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-0" style={{ containerType: "size" }}>
          <div className="flex-none rotate-90 w-[100cqh]">
            <div className="h-0 relative w-full" data-name="Border">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 300 1" width="300">
                  <line id="Border" stroke="#DEDFE3" x2="300" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-[12px]" data-name="Collapse Button">
          <div className="content-stretch flex items-start relative size-full">
            <div className="h-[44px] relative shrink-0 w-[24px]" data-name="Button Shape">
              <div className="absolute inset-[0_-4.17%]">
                <svg className="block size-full" fill="none" height="44" preserveAspectRatio="none" viewBox="0 0 26 44" width="26">
                  <path d={svgPaths.p160c9500} fill="#FAFAFA" id="Button Shape" stroke="#DEDFE3" />
                </svg>
              </div>
            </div>
            <div className="absolute left-[4px] size-[16px] top-[14px]" data-name="Chevrons Left">
              <div className="absolute bottom-1/4 left-[18.75%] right-[18.75%] top-1/4" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="8.00001" preserveAspectRatio="none" viewBox="0 0 10 8.00001" width="10">
                  <g id="Path">
                    <path d={svgPaths.p215c0000} fill="#3B3D45" />
                    <path d={svgPaths.p3343e780} fill="#3B3D45" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fafafa] h-[44px] left-[-1px] top-[12px] w-px" data-name="Button Edge" />
      </div>
    </div>
  );
}
type AdvancedTableCellSelectionProps = {
  className?: string;
  density?: "medium";
  isFocused?: boolean;
  isStriped?: "false";
  rowPlacement?: "default";
};

function AdvancedTableCellSelection({ className, density = "medium", isFocused = false, isStriped = "false", rowPlacement = "default" }: AdvancedTableCellSelectionProps) {
  return (
    <div className={className || "bg-white relative"}>
      <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start px-[16px] py-[12px] relative size-full">
        <div className="relative self-stretch shrink-0" data-name="Checkbox">
          <div className="content-stretch flex items-start py-[4px] relative size-full">
            <div className="pointer-events-none relative rounded-[3px] shrink-0 size-[16px]" data-name="🔷 Checkbox">
              <div aria-hidden className="absolute bg-white inset-0 rounded-[3px]" />
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_2px_1px_rgba(101,106,118,0.1)]" />
              <div aria-hidden className="absolute border border-[#8c909c] border-solid inset-0 rounded-[3px]" />
            </div>
          </div>
        </div>
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
  );
}
type SortButtonProps = {
  className?: string;
  sortDirection?: "indeterminate";
  state?: "default";
};

function SortButton({ className, sortDirection = "indeterminate", state = "default" }: SortButtonProps) {
  return (
    <div className={className || "relative rounded-[3px] size-[24px]"}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">
          <div className="relative shrink-0 size-[16px]" data-name="Sort">
            <div className="absolute inset-[0_7.83%_0_7.81%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 13.4977 16" width="13.4977">
                <path d={svgPaths.p3621d400} fill="#656A76" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type ExpandCollapseAllButtonProps = {
  className?: string;
  state?: "default";
  status?: "expand";
};

function ExpandCollapseAllButton({ className, state = "default", status = "expand" }: ExpandCollapseAllButtonProps) {
  return (
    <div className={className || "relative rounded-[3px] size-[24px]"}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">
          <div className="relative shrink-0 size-[16px]" data-name="Expand">
            <div className="absolute inset-[6.25%_7.02%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 13.753 14" width="13.753">
                <g id="Path">
                  <path d={svgPaths.p1d202800} fill="#656A76" />
                  <path d={svgPaths.p141f4100} fill="#656A76" />
                  <path d={svgPaths.p2d546f00} fill="#656A76" />
                  <path d={svgPaths.p3f636800} fill="#656A76" />
                  <path d={svgPaths.p2bbbb100} fill="#656A76" />
                  <path d={svgPaths.p1770c280} fill="#656A76" />
                  <path d={svgPaths.p3407a770} fill="#656A76" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
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
type CopySnippetProps = {
  className?: string;
  color?: "secondary";
  isFullWidth?: "false";
  state?: "default";
  status?: "idle";
  text?: string;
};

function CopySnippet({ className, color = "secondary", isFullWidth = "false", state = "default", status = "idle", text = "https://hashicorp.com" }: CopySnippetProps) {
  return (
    <div className={className || "relative rounded-[5px]"}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] isolate items-center px-[4px] py-[6px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Menlo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap z-[2]">
            <p className="leading-[16px]">{text}</p>
          </div>
          <div className="relative shrink-0 size-[16px] z-[1]" data-name="Copy Icon">
            <div className="absolute inset-[0_0_0_6.25%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 15 16" width="15">
                <g id="Path">
                  <path clipRule="evenodd" d={svgPaths.p1cb815f0} fill="#1060FF" fillRule="evenodd" />
                  <path d={svgPaths.p34558c00} fill="#1060FF" />
                  <path d={svgPaths.p28e65000} fill="#1060FF" />
                  <path d={svgPaths.pc8cbb80} fill="#1060FF" />
                  <path d={svgPaths.p3d9cead0} fill="#1060FF" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type TagProps = {
  className?: string;
  contentState?: "default";
  dismissState?: "n/a";
  isDismissible?: "false";
  isLink?: "false";
  linkColor?: "n/a";
  text?: string;
};

function Tag({ className, contentState = "default", dismissState = "n/a", isDismissible = "false", isLink = "false", linkColor = "n/a", text = "Tag" }: TagProps) {
  return (
    <div className={className || "bg-white h-[24px] max-h-[24px] max-w-[166px] relative rounded-[20px]"}>
      <div aria-hidden className="absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex items-start max-h-[inherit] max-w-[inherit] pb-[5px] pt-[3px] px-[10px] relative size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] min-w-px not-italic overflow-hidden relative text-[#3b3d45] text-[13px] text-ellipsis whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}

function LeadingIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Leading Icon">
      <div className="absolute left-0 size-[16px] top-0" data-name="Icon">
        <div className="absolute inset-[6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="14.0001" preserveAspectRatio="none" viewBox="0 0 14.0001 14.0001" width="14.0001">
            <g id="Path">
              <path clipRule="evenodd" d={svgPaths.p2a1b9a00} fill="white" fillRule="evenodd" />
              <path d={svgPaths.p24664bf0} fill="white" />
              <path d={svgPaths.p1c581700} fill="white" />
              <path d={svgPaths.pa2cdf00} fill="white" />
              <path d={svgPaths.p2080fb80} fill="white" />
              <path d={svgPaths.pf5ac400} fill="white" />
              <path d={svgPaths.p1734c680} fill="white" />
              <path d={svgPaths.pdf7b000} fill="white" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function InnerContents() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center pr-[8px] relative shrink-0" data-name="Inner Contents">
      <LeadingIcon />
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ILM_Space
      </p>
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon Wrapper">
      <div className="absolute left-0 size-[16px] top-0" data-name="Chevron">
        <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
            <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="white" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="bg-[#0c0c0e] drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative rounded-[5px] shrink-0 w-full" data-name="Contents">
      <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[10px] py-[10px] relative size-full">
          <InnerContents />
          <IconWrapper />
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="bg-[#0c0c0e] content-stretch drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] flex items-center justify-center p-[10px] relative rounded-[5px] shrink-0" data-name="Contents">
      <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[6.05%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="14.0625" preserveAspectRatio="none" viewBox="0 0 14.0625 14.0625" width="14.0625">
            <path clipRule="evenodd" d={svgPaths.p2af5a200} fill="white" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents2() {
  return (
    <div className="bg-[#0c0c0e] content-stretch flex gap-[4px] items-center justify-center p-[2px] relative rounded-[5px] shrink-0" data-name="Contents">
      <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="relative shrink-0" data-name="🔷 Avatar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Icon">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                <g id="Path">
                  <path clipRule="evenodd" d={svgPaths.p4141800} fill="white" fillRule="evenodd" />
                  <path d={svgPaths.p1f51d800} fill="white" />
                  <path clipRule="evenodd" d={svgPaths.p2de8d200} fill="white" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="Chevron">
        <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
            <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="white" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents3() {
  return (
    <div className="bg-[#0c0c0e] content-stretch flex gap-[4px] items-center justify-center p-[2px] relative rounded-[5px] shrink-0" data-name="Contents">
      <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="bg-[#ff7557] relative rounded-[3px] shrink-0 size-[32px]" data-name="🔷 Avatar">
        <p className="[word-break:break-word] absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[24px] right-[16px] text-[16px] text-center text-white top-[4px] translate-x-1/2 whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          AK
        </p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="Chevron">
        <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
            <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="white" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="h-[60px] relative shrink-0 w-[1400px]" data-name="Header">
      <div className="absolute bg-[#0c0c0e] left-0 top-0 w-[1400px]" data-name="AppHeader">
        <div aria-hidden className="absolute border-[#656a76] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative size-full">
            <div className="relative shrink-0" data-name="🔷 Global Nav">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[12px] items-center relative size-full">
                  <div className="bg-[#0c0c0e] h-[36px] relative rounded-[5px] shrink-0" data-name="◇ Home Link">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center p-[4px] relative size-full">
                        <div className="h-full relative shrink-0 w-[28px]" data-name="◇ Logo">
                          <div className="absolute inset-[2.5%_8.33%]" data-name="Path">
                            <svg className="absolute block inset-0 size-full" fill="none" height="26.6" preserveAspectRatio="none" viewBox="0 0 23.3334 26.6" width="23.3334">
                              <g id="Path">
                                <path d={svgPaths.p1b01a100} fill="white" />
                                <path d={svgPaths.p30a44300} fill="white" />
                                <path d={svgPaths.p31e6e700} fill="white" />
                                <path d={svgPaths.p23377400} fill="white" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0" data-name="◇ Context Switcher">
                    <div className="content-stretch flex flex-col items-start relative size-full">
                      <div className="relative shrink-0" data-name="◇ Toggle Button">
                        <div className="content-stretch flex flex-col items-start relative size-full">
                          <div className="bg-[#0c0c0e] relative rounded-[5px] shrink-0" data-name="◇ Toggle Button">
                            <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
                            <div className="flex flex-col items-center justify-center size-full">
                              <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                                <Contents />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0" data-name="🔷 Utility Nav">
              <div className="flex flex-row items-center justify-end size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-end relative size-full">
                  <div className="relative shrink-0" data-name="◇ Search Button">
                    <div className="content-stretch flex items-start relative size-full">
                      <div className="bg-[#0c0c0e] relative rounded-[5px] shrink-0" data-name="◇ Button">
                        <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center relative size-full">
                            <Contents1 />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0" data-name=".Dropdown">
                    <div className="content-stretch flex flex-col items-start relative size-full">
                      <div className="relative shrink-0" data-name=".ToggleIcon">
                        <div className="content-stretch flex flex-col items-start relative size-full">
                          <div className="relative rounded-[5px] shrink-0" data-name="Dropdown::ToggleIcon">
                            <div className="flex flex-col items-center justify-center size-full">
                              <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                                <Contents2 />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0" data-name="◇ User Dropdown">
                    <div className="content-stretch flex flex-col items-start relative size-full">
                      <div className="relative shrink-0" data-name="ToggleIcon">
                        <div className="content-stretch flex flex-col items-start relative size-full">
                          <div className="relative rounded-[5px] shrink-0" data-name="◇ ToggleIcon">
                            <div className="flex flex-col items-center justify-center size-full">
                              <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                                <Contents3 />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="link">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#656a76] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ILM_Space
      </p>
    </div>
  );
}

function Layout() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="layout">
      <Link1 />
    </div>
  );
}

function Contents4() {
  return (
    <div className="content-stretch flex gap-[6px] h-[28px] items-center relative shrink-0" data-name="contents">
      <Layout />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col h-[28.001px] items-start relative shrink-0" data-name="link">
      <Contents4 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="link">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#656a76] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Explorer
      </p>
    </div>
  );
}

function Layout1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="layout">
      <Link3 />
    </div>
  );
}

function Contents5() {
  return (
    <div className="content-stretch flex gap-[6px] h-[28px] items-center relative shrink-0" data-name="contents">
      <Layout1 />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col h-[28.001px] items-start relative shrink-0" data-name="link">
      <Contents5 />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="link">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#656a76] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Types
      </p>
    </div>
  );
}

function Layout2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="layout">
      <Link5 />
    </div>
  );
}

function Contents6() {
  return (
    <div className="content-stretch flex gap-[6px] h-[28px] items-center relative shrink-0" data-name="contents">
      <Layout2 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col h-[28.001px] items-start relative shrink-0" data-name="link">
      <Contents6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="link">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#0c0c0e] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Policy sets
      </p>
    </div>
  );
}

function Layout3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="layout">
      <Link7 />
    </div>
  );
}

function Contents7() {
  return (
    <div className="content-stretch flex gap-[6px] h-[28px] items-center relative shrink-0" data-name="contents">
      <Layout3 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col h-[28.001px] items-start relative shrink-0" data-name="link">
      <Contents7 />
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Breadcrumb">
      <div className="relative rounded-[5px] shrink-0" data-name="Breadcrumb / _Item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center relative size-full">
            <Link />
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[18px] relative shrink-0 text-[#c2c5cb] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              /
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0" data-name="Breadcrumb / _Item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center relative size-full">
            <Link2 />
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[18px] relative shrink-0 text-[#c2c5cb] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              /
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0" data-name="Breadcrumb / _Item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center relative size-full">
            <Link4 />
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[18px] relative shrink-0 text-[#c2c5cb] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              /
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0" data-name="Breadcrumb / _Current">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center relative size-full">
            <Link6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex h-[28.001px] items-center relative shrink-0 w-full" data-name="Breadcrumbs">
      <Breadcrumb />
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Header">
      <p className="[word-break:break-word] font-['SF_Pro:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#3b3d45] text-[24px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Policy sets
      </p>
      <Tag className="bg-white h-[24px] max-h-[24px] max-w-[166px] relative rounded-[20px] shrink-0" text="BETA" />
    </div>
  );
}

function InnerContents1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center pr-[8px] relative shrink-0" data-name="inner contents">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#3b3d45] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Actions
      </p>
    </div>
  );
}

function Chevron() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron">
      <div className="absolute left-0 size-[16px] top-0" data-name="chevron">
        <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
            <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="#3B3D45" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents8() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="contents">
      <InnerContents1 />
      <Chevron />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Header">
      <Header3 />
      <div className="bg-[#fafafa] drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative rounded-[5px] shrink-0" data-name="ToggleButton">
        <div aria-hidden className="absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center pl-[16px] pr-[10px] py-[10px] relative size-full">
            <Contents8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="label">
      <div className="relative shrink-0 size-[16px]" data-name="shield">
        <div className="absolute inset-[0.55%_6.25%_0.99%_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="15.7529" preserveAspectRatio="none" viewBox="0 0 14 15.7529" width="14">
            <path clipRule="evenodd" d={svgPaths.p1bb70c00} fill="#656A76" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#656a76] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Policy sets
      </p>
    </div>
  );
}

function CopyId() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="copy-id">
      <p className="[word-break:break-word] font-['Menlo:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#656a76] text-[14px] whitespace-nowrap">ID:</p>
      <CopySnippet className="relative rounded-[5px] shrink-0" />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Title">
      <Header2 />
      <div className="relative shrink-0" data-name="_view-metadata">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[39px] items-center relative size-full">
            <Label />
            <CopyId />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadingIcon1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="leading-icon">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[24px]" data-name="leading-icon">
        <div className="absolute inset-[33.33%_20.83%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="8" preserveAspectRatio="none" viewBox="0 0 14 8" width="14">
            <path clipRule="evenodd" d={svgPaths.p352cd500} fill="#3B3D45" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents9() {
  return (
    <div className="content-stretch flex gap-[6px] h-[24px] items-center justify-center relative shrink-0" data-name="contents">
      <LeadingIcon1 />
    </div>
  );
}

function ItemButton() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="itemButton">
      <div className="relative shrink-0" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-[#fafafa] drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative rounded-[5px] shrink-0" data-name="Main Button">
            <div aria-hidden className="absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="flex flex-col items-center justify-center size-full">
              <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                <Contents9 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoFilters() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="no-filters">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656a76] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">No conditions applied</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="info">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <g id="Path">
            <path d={svgPaths.p7bc9080} fill="#656A76" />
            <path d={svgPaths.p15930700} fill="#656A76" />
            <path clipRule="evenodd" d={svgPaths.p2de8d200} fill="#656A76" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ExplorerFilterLabel() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="_explorer-filter-label">
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[24px]">Show conditions</p>
      </div>
      <NoFilters />
    </div>
  );
}

function ItemToggle() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="_itemToggle">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-[16px] py-[16px] relative size-full">
          <ItemButton />
          <ExplorerFilterLabel />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <ItemToggle />
    </div>
  );
}

function AccordionItem() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="_accordionItem">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] relative size-full">
          <Frame1 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(101,106,118,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_1px_0px_rgba(101,106,118,0.05),0px_2px_2px_0px_rgba(101,106,118,0.05)]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px relative w-full">
      <AccordionItem />
    </div>
  );
}

function ConditionsQueryContainer() {
  return (
    <div className="content-stretch flex flex-col h-[80px] items-start relative shrink-0 w-full" data-name="Conditions/Query Container">
      <Frame />
    </div>
  );
}

function InnerContents2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center pr-[8px] relative shrink-0" data-name="inner contents">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#3b3d45] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        View columns
      </p>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron">
      <div className="absolute left-0 size-[16px] top-0" data-name="chevron">
        <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
            <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="#3B3D45" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents10() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="contents">
      <InnerContents2 />
      <Chevron1 />
    </div>
  );
}

function Filter() {
  return (
    <div className="bg-white content-stretch flex items-center pr-[8px] relative shrink-0" data-name="filter">
      <div className="bg-[#fafafa] drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative rounded-[5px] shrink-0" data-name="ToggleButton">
        <div aria-hidden className="absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center pl-[16px] pr-[10px] py-[10px] relative size-full">
            <Contents10 />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterContainer() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Filter Container">
      <Filter />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <FilterContainer />
    </div>
  );
}

function Header1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden className="absolute border-0 border-[rgba(101,106,118,0.2)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[32px] px-[32px] relative size-full">
        <Breadcrumbs />
        <Title />
        <ConditionsQueryContainer />
        <Actions />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative size-full">
            <CheckboxBase className="pointer-events-none relative rounded-[3px] shrink-0 size-[16px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Name</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label1 />
    </div>
  );
}

function Functions() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Inner() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative" data-name="Inner">
      <Content />
      <Functions />
    </div>
  );
}

function Main1() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <ExpandCollapseAllButton className="relative rounded-[3px] shrink-0 size-[24px]" />
            <Inner />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Policy framework</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label2 />
    </div>
  );
}

function Functions1() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main2() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0" data-name="Main">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative size-full">
            <Content1 />
            <Functions1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Framework version</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label3 />
    </div>
  );
}

function Functions2() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main3() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content2 />
            <Functions2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Source type</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label4 />
    </div>
  );
}

function Functions3() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main4() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content3 />
            <Functions3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Policy count</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label5 />
    </div>
  );
}

function Functions4() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main5() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content4 />
            <Functions4 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Scope</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label6 />
    </div>
  );
}

function Functions5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-[24px]" data-name="Functions">
      <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
    </div>
  );
}

function Main6() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content5 />
            <Functions5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Projects</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label7 />
    </div>
  );
}

function Functions6() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main7() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content6 />
            <Functions6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Workspaces</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label8 />
    </div>
  );
}

function Functions7() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main8() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content7 />
            <Functions7 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Enforcement level</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label9 />
    </div>
  );
}

function Functions8() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main9() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content8 />
            <Functions8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Pass count</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-[38px]" data-name="Content">
      <Label10 />
      <div className="relative rounded-[3px] shrink-0 size-[24px]" data-name="🔷 Tooltip Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Info">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                <path d={svgPaths.p1da70900} fill="#656A76" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Functions9() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main10() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content9 />
            <Functions9 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Fail count</p>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label11 />
      <div className="relative rounded-[3px] shrink-0 size-[24px]" data-name="🔷 Tooltip Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Info">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                <path d={svgPaths.p1da70900} fill="#656A76" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Functions10() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main11() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content10 />
            <Functions10 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Error count</p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label12 />
      <div className="relative rounded-[3px] shrink-0 size-[24px]" data-name="🔷 Tooltip Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Info">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
                <path d={svgPaths.p1da70900} fill="#656A76" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Functions11() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main12() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content11 />
            <Functions11 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Advisory count</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <Label13 />
    </div>
  );
}

function Functions12() {
  return <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 size-[24px]" data-name="Functions" />;
}

function Main13() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content12 />
            <Functions12 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label14() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Last updated</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-[38px]" data-name="Content">
      <Label14 />
    </div>
  );
}

function Functions13() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0" data-name="Functions">
      <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
    </div>
  );
}

function Main14() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content13 />
            <Functions13 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label15() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="Label">
      <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Last executed</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0 w-[38px]" data-name="Content">
      <Label15 />
    </div>
  );
}

function Functions14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0" data-name="Functions">
      <SortButton className="relative rounded-[3px] shrink-0 size-[24px]" />
    </div>
  );
}

function Main15() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="h-full relative shrink-0 w-[200px]" data-name="Main">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[16px] py-[6px] relative size-full">
            <Content14 />
            <Functions14 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[14]" data-name="Table Header">
      <div className="bg-[#f1f2f3] rounded-tl-[6px] shrink-0 sticky top-0" data-name="AdvancedTable::Header::Selection">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none rounded-tl-[6px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center py-[8px] relative size-full">
            <Main />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main1 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main2 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main3 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main4 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main5 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main6 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main7 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main8 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 10">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main9 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main10 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main11 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main12 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main13 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative shrink-0" data-name="🔷 Header Column 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main14 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative rounded-tr-[6px] shrink-0" data-name="🔷 Header Column 17">
        <div aria-hidden className="absolute border border-[rgba(101,106,118,0.2)] border-solid inset-0 pointer-events-none rounded-tr-[6px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center py-[6px] relative size-full">
            <Main15 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">ce-dr-999</p>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Down">
              <div className="absolute inset-[31.26%_18.76%_31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.9989" preserveAspectRatio="none" viewBox="0 0 9.99819 5.9989" width="9.99819">
                  <path d={svgPaths.pc74f780} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">OPA</p>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">OPA 3.0</p>
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Individually Managed</p>
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">28</p>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Project</p>
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">12</p>
      </div>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text7 />
    </div>
  );
}

function LeadingIcon2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">advisory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon2 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">2</p>
      </div>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text13 />
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[13]" data-name="Row 01">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content15 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content16 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content17 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content18 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content19 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content20 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content21 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content22 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content23 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content24 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content25 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content26 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content27 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content28 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content29 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">ce-pojzu-ef</p>
      </div>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Up">
              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.99952" preserveAspectRatio="none" viewBox="0 0 9.99951 5.99952" width="9.99951">
                  <path d={svgPaths.p747a00} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">OPA</p>
      </div>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">OPA 3.0</p>
      </div>
    </div>
  );
}

function Content32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Individually Managed</p>
      </div>
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">18</p>
      </div>
    </div>
  );
}

function Content34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Project</p>
      </div>
    </div>
  );
}

function Content35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">22</p>
      </div>
    </div>
  );
}

function Content37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text21 />
    </div>
  );
}

function LeadingIcon3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">hard-mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon3 />
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text27 />
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[12]" data-name="Row 02">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content30 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content31 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content32 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content33 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content34 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content35 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content36 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content37 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content38 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content39 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content40 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content41 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content42 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content43 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content44 />
        </div>
      </div>
    </div>
  );
}

function Content45() {
  return <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[24px] items-start min-w-px relative" data-name="Content" />;
}

function CheckBox() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[49px]" data-name="check-box">
      <div className="bg-[#fafafa] flex-[1_0_0] min-h-px relative w-full" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content45 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleGroup() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['SF_UI_Text:600',sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[100px]" data-name="Title Group">
      <p className="min-w-full relative shrink-0 w-[min-content]">Policy set:</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">Rule status:</p>
      <p className="relative shrink-0 whitespace-nowrap">Severity:</p>
      <p className="relative shrink-0 whitespace-nowrap">Success Log:</p>
      <p className="relative shrink-0 whitespace-nowrap">Run Source:</p>
    </div>
  );
}

function TextBadgeValue() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Text+Badge Value">
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">OPA Corporate security shield</p>
      <div className="bg-[#cceeda] relative rounded-[5px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <div className="relative shrink-0 size-[12px]" data-name="Icon">
              <div className="absolute inset-[18.75%_6.26%_18.75%_6.25%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="7.49843" preserveAspectRatio="none" viewBox="0 0 10.4984 7.49843" width="10.4984">
                  <path d={svgPaths.p348995f0} fill="#006619" id="Path" />
                </svg>
              </div>
            </div>
            <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#006619] text-[13px] whitespace-nowrap">Passed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Value Group">
      <TextBadgeValue />
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">package terraform.analysis [Compliant]</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Hard mandatory rules evaluated (0 denies)</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">OPA engine found no policy violations. Empty deny array returned.</p>
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] underline w-full">run-u2m9K4dfk</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <TitleGroup />
      <ValueGroup />
    </div>
  );
}

function DescriptionList() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[3383px]" data-name="Description List">
      <ListItem />
    </div>
  );
}

function Nested() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="nested">
      <div aria-hidden className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[45px] py-[8px] relative size-full">
        <DescriptionList />
      </div>
    </div>
  );
}

function Row03Nested() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative shrink-0 w-full z-[11]" data-name="Row 03 NESTED">
      <CheckBox />
      <Nested />
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">greep-ntwo-000</p>
      </div>
    </div>
  );
}

function Content46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Up">
              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.99952" preserveAspectRatio="none" viewBox="0 0 9.99951 5.99952" width="9.99951">
                  <path d={svgPaths.p747a00} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">OPA</p>
      </div>
    </div>
  );
}

function Content47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">OPA 3.0</p>
      </div>
    </div>
  );
}

function Content48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Individually Managed</p>
      </div>
    </div>
  );
}

function Content49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text32 />
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Project</p>
      </div>
    </div>
  );
}

function Content51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text34 />
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">12</p>
      </div>
    </div>
  );
}

function Content53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text35 />
    </div>
  );
}

function LeadingIcon4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">soft-mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon4 />
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">2</p>
      </div>
    </div>
  );
}

function Content55() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text36 />
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[#0f62fe] text-[14px] underline">1</p>
      </div>
    </div>
  );
}

function Content56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text37 />
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text38 />
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text40 />
    </div>
  );
}

function Text41() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content60() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text41 />
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[10]" data-name="Row 04">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content46 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content47 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content48 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content49 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content50 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content51 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content52 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content53 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content54 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content55 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content56 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content57 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content58 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content59 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content60 />
        </div>
      </div>
    </div>
  );
}

function Content61() {
  return <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[24px] items-start min-w-px relative" data-name="Content" />;
}

function CheckBox1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[49px]" data-name="check-box">
      <div className="bg-[#fafafa] flex-[1_0_0] min-h-px relative w-full" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content61 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleGroup1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['SF_UI_Text:600',sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[100px]" data-name="Title Group">
      <p className="min-w-full relative shrink-0 w-[min-content]">Policy set:</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">Rule status:</p>
      <p className="relative shrink-0 whitespace-nowrap">Severity:</p>
      <p className="relative shrink-0 whitespace-nowrap">Failure Log:</p>
      <p className="relative shrink-0 whitespace-nowrap">Run Source:</p>
    </div>
  );
}

function TextBadgeValue1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Text+Badge Value">
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">OPA Corporate security shield</p>
      <div className="bg-[#fbeabf] relative rounded-[5px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <div className="relative shrink-0 size-[12px]" data-name="Icon">
              <div className="absolute inset-[6.25%_0]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="10.5" preserveAspectRatio="none" viewBox="0 0 12 10.5" width="12">
                  <path d={svgPaths.p1a5c29f0} fill="#803D00" id="Path" />
                </svg>
              </div>
            </div>
            <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#803d00] text-[13px] whitespace-nowrap">1 Policy failed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueGroup1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Value Group">
      <TextBadgeValue1 />
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">rule: deny[msg] → tags_missing [Non-compliant]</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Soft Mandatory (Exception override permitted)</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">[REGO_FAIL] Missing mandatory tags: ‘Environment’ and ‘Owner’.</p>
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] underline w-full">run-65sdf654r45</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <TitleGroup1 />
      <ValueGroup1 />
    </div>
  );
}

function DescriptionList1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[3383px]" data-name="Description List">
      <ListItem1 />
    </div>
  );
}

function Nested1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="nested">
      <div aria-hidden className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[45px] py-[8px] relative size-full">
        <DescriptionList1 />
      </div>
    </div>
  );
}

function Row04Nested() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative shrink-0 w-full z-[9]" data-name="Row 04 NESTED">
      <CheckBox1 />
      <Nested1 />
    </div>
  );
}

function Text42() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">shn-foundry</p>
      </div>
    </div>
  );
}

function Content62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Up">
              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.99952" preserveAspectRatio="none" viewBox="0 0 9.99951 5.99952" width="9.99951">
                  <path d={svgPaths.p747a00} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text42 />
    </div>
  );
}

function Text43() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">tf-policy</p>
      </div>
    </div>
  );
}

function Content63() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text43 />
    </div>
  );
}

function Text44() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">tf-policy 1.0</p>
      </div>
    </div>
  );
}

function Content64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text44 />
    </div>
  );
}

function Text45() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">VCS</p>
      </div>
    </div>
  );
}

function Content65() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text45 />
    </div>
  );
}

function Text46() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text46 />
    </div>
  );
}

function Text47() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Workspace</p>
      </div>
    </div>
  );
}

function Content67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text47 />
    </div>
  );
}

function Text48() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text48 />
    </div>
  );
}

function Text49() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">2</p>
      </div>
    </div>
  );
}

function Content69() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text49 />
    </div>
  );
}

function LeadingIcon5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">hard-mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content70() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon5 />
    </div>
  );
}

function Text50() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content71() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text50 />
    </div>
  );
}

function Text51() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[0px] whitespace-nowrap">
        <p className="font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px]">0</p>
      </div>
    </div>
  );
}

function Content72() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text51 />
    </div>
  );
}

function Text52() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content73() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text52 />
    </div>
  );
}

function Text53() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content74() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text53 />
    </div>
  );
}

function Text54() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content75() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text54 />
    </div>
  );
}

function Text55() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content76() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text55 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[8]" data-name="Row 5">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content62 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content63 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content64 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content65 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content66 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content67 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content68 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content69 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content70 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content71 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content72 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content73 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content74 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content75 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content76 />
        </div>
      </div>
    </div>
  );
}

function Content77() {
  return <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[24px] items-start min-w-px relative" data-name="Content" />;
}

function CheckBox2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[49px]" data-name="check-box">
      <div className="bg-[#fafafa] flex-[1_0_0] min-h-px relative w-full" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content77 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleGroup2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['SF_UI_Text:600',sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[100px]" data-name="Title Group">
      <p className="min-w-full relative shrink-0 w-[min-content]">Policy set:</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">Rule status:</p>
      <p className="relative shrink-0 whitespace-nowrap">Severity:</p>
      <p className="relative shrink-0 whitespace-nowrap">Success Log:</p>
      <p className="relative shrink-0 whitespace-nowrap">Run Source:</p>
    </div>
  );
}

function TextBadgeValue2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Text+Badge Value">
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">tfPolicy Networking Baseline</p>
      <div className="bg-[#cceeda] relative rounded-[5px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <div className="relative shrink-0 size-[12px]" data-name="Icon">
              <div className="absolute inset-[18.75%_6.26%_18.75%_6.25%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="7.49843" preserveAspectRatio="none" viewBox="0 0 10.4984 7.49843" width="10.4984">
                  <path d={svgPaths.p348995f0} fill="#006619" id="Path" />
                </svg>
              </div>
            </div>
            <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#006619] text-[13px] whitespace-nowrap">Passed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueGroup2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Value Group">
      <TextBadgeValue2 />
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">8/8 tfpolicy assertions verified [Compliant]</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Hard Mandatory rules evaluated (0 failures)</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">All target attributes successfully satisfied HCL assert conditions.</p>
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] underline w-full">run-9uflskdfkldfjkn</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <TitleGroup2 />
      <ValueGroup2 />
    </div>
  );
}

function DescriptionList2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[3383px]" data-name="Description List">
      <ListItem2 />
    </div>
  );
}

function Nested2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="nested">
      <div aria-hidden className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[45px] py-[8px] relative size-full">
        <DescriptionList2 />
      </div>
    </div>
  );
}

function Row05Nested() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative shrink-0 w-full z-[7]" data-name="Row 05 NESTED">
      <CheckBox2 />
      <Nested2 />
    </div>
  );
}

function Text56() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">shn-ry-559</p>
      </div>
    </div>
  );
}

function Content78() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Up">
              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.99952" preserveAspectRatio="none" viewBox="0 0 9.99951 5.99952" width="9.99951">
                  <path d={svgPaths.p747a00} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text56 />
    </div>
  );
}

function Text57() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">tf-policy</p>
      </div>
    </div>
  );
}

function Content79() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text57 />
    </div>
  );
}

function Text58() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">tf-policy 1.0</p>
      </div>
    </div>
  );
}

function Content80() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text58 />
    </div>
  );
}

function Text59() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">VCS</p>
      </div>
    </div>
  );
}

function Content81() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text59 />
    </div>
  );
}

function Text60() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content82() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text60 />
    </div>
  );
}

function Text61() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Workspace</p>
      </div>
    </div>
  );
}

function Content83() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text61 />
    </div>
  );
}

function Text62() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content84() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text62 />
    </div>
  );
}

function Text63() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">2</p>
      </div>
    </div>
  );
}

function Content85() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text63 />
    </div>
  );
}

function LeadingIcon6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">soft-mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content86() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon6 />
    </div>
  );
}

function Text64() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content87() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text64 />
    </div>
  );
}

function Text65() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[#0f62fe] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content88() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text65 />
    </div>
  );
}

function Text66() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content89() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text66 />
    </div>
  );
}

function Text67() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content90() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text67 />
    </div>
  );
}

function Text68() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content91() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text68 />
    </div>
  );
}

function Text69() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content92() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text69 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[6]" data-name="Row 6">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content78 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content79 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content80 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content81 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content82 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content83 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content84 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content85 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content86 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content87 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content88 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content89 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content90 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content91 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content92 />
        </div>
      </div>
    </div>
  );
}

function Content93() {
  return <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[24px] items-start min-w-px relative" data-name="Content" />;
}

function CheckBox3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[49px]" data-name="check-box">
      <div className="bg-[#fafafa] flex-[1_0_0] min-h-px relative w-full" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content93 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleGroup3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['SF_UI_Text:600',sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[100px]" data-name="Title Group">
      <p className="min-w-full relative shrink-0 w-[min-content]">Policy set:</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">Rule status:</p>
      <p className="relative shrink-0 whitespace-nowrap">Severity:</p>
      <p className="relative shrink-0 whitespace-nowrap">Failure Log:</p>
      <p className="relative shrink-0 whitespace-nowrap">Run Source:</p>
    </div>
  );
}

function TextBadgeValue3() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Text+Badge Value">
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">tfPolicy Networking Baseline</p>
      <div className="bg-[#fbeabf] relative rounded-[5px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <div className="relative shrink-0 size-[12px]" data-name="Icon">
              <div className="absolute inset-[6.25%_0]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="10.5" preserveAspectRatio="none" viewBox="0 0 12 10.5" width="12">
                  <path d={svgPaths.p1a5c29f0} fill="#803D00" id="Path" />
                </svg>
              </div>
            </div>
            <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#803d00] text-[13px] whitespace-nowrap">3 Policies failed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueGroup3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Value Group">
      <TextBadgeValue3 />
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">assert: restrict_ingress_anywhere [Non-compliant]</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Soft Mandatory (Requires team lead exception).</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">[HCL_ASSERT] Security group sg-945u4 cannot allow 0.0.0.0/0 on port 22.</p>
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] underline w-full">run-u2m9K498ds</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <TitleGroup3 />
      <ValueGroup3 />
    </div>
  );
}

function DescriptionList3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[3383px]" data-name="Description List">
      <ListItem3 />
    </div>
  );
}

function Nested3() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="nested">
      <div aria-hidden className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[45px] py-[8px] relative size-full">
        <DescriptionList3 />
      </div>
    </div>
  );
}

function Row06Nested() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative shrink-0 w-full z-[5]" data-name="Row 06 NESTED">
      <CheckBox3 />
      <Nested3 />
    </div>
  );
}

function Text70() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">sent-jh-983</p>
      </div>
    </div>
  );
}

function Content94() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Up">
              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.99952" preserveAspectRatio="none" viewBox="0 0 9.99951 5.99952" width="9.99951">
                  <path d={svgPaths.p747a00} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text70 />
    </div>
  );
}

function Text71() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Sentinel</p>
      </div>
    </div>
  );
}

function Content95() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text71 />
    </div>
  );
}

function Text72() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Sentinel 2.0</p>
      </div>
    </div>
  );
}

function Content96() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text72 />
    </div>
  );
}

function Text73() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Global</p>
      </div>
    </div>
  );
}

function Content97() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text73 />
    </div>
  );
}

function Text74() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content98() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text74 />
    </div>
  );
}

function Text75() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Workspace</p>
      </div>
    </div>
  );
}

function Content99() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text75 />
    </div>
  );
}

function Text76() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content100() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text76 />
    </div>
  );
}

function Text77() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">2</p>
      </div>
    </div>
  );
}

function Content101() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text77 />
    </div>
  );
}

function LeadingIcon7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">hard-mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content102() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon7 />
    </div>
  );
}

function Text78() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content103() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text78 />
    </div>
  );
}

function Text79() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[0px] whitespace-nowrap">
        <p className="font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px]">0</p>
      </div>
    </div>
  );
}

function Content104() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text79 />
    </div>
  );
}

function Text80() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content105() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text80 />
    </div>
  );
}

function Text81() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content106() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text81 />
    </div>
  );
}

function Text82() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content107() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text82 />
    </div>
  );
}

function Text83() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content108() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text83 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[4]" data-name="Row 7">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content94 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content95 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content96 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content97 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content98 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content99 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content100 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content101 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content102 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content103 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content104 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content105 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content106 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content107 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content108 />
        </div>
      </div>
    </div>
  );
}

function Content109() {
  return <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[24px] items-start min-w-px relative" data-name="Content" />;
}

function CheckBox4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[49px]" data-name="check-box">
      <div className="bg-[#fafafa] flex-[1_0_0] min-h-px relative w-full" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content109 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleGroup4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['SF_UI_Text:600',sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[100px]" data-name="Title Group">
      <p className="min-w-full relative shrink-0 w-[min-content]">Policy set:</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">Rule status:</p>
      <p className="relative shrink-0 whitespace-nowrap">Severity:</p>
      <p className="relative shrink-0 whitespace-nowrap">Success Log:</p>
      <p className="relative shrink-0 whitespace-nowrap">Run Source:</p>
    </div>
  );
}

function TextBadgeValue4() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Text+Badge Value">
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Sentinel Cost Optimization</p>
      <div className="bg-[#cceeda] relative rounded-[5px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <div className="relative shrink-0 size-[12px]" data-name="Icon">
              <div className="absolute inset-[18.75%_6.26%_18.75%_6.25%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="7.49843" preserveAspectRatio="none" viewBox="0 0 10.4984 7.49843" width="10.4984">
                  <path d={svgPaths.p348995f0} fill="#006619" id="Path" />
                </svg>
              </div>
            </div>
            <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#006619] text-[13px] whitespace-nowrap">Passed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueGroup4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Value Group">
      <TextBadgeValue4 />
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">{`main = rule { check_cost } [Compliant]`}</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Advisory rules evaluated (0 alerts triggered)</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Sentinel trace evaluation completed: main condition returned TRUE.</p>
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] underline w-full">run-u2mdjfjdsfidsfnjkB</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <TitleGroup4 />
      <ValueGroup4 />
    </div>
  );
}

function DescriptionList4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[3383px]" data-name="Description List">
      <ListItem4 />
    </div>
  );
}

function Nested4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="nested">
      <div aria-hidden className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[45px] py-[8px] relative size-full">
        <DescriptionList4 />
      </div>
    </div>
  );
}

function Row07Nested() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative shrink-0 w-full z-[3]" data-name="Row 07 NESTED">
      <CheckBox4 />
      <Nested4 />
    </div>
  );
}

function Text84() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">sefjn-ngi-256</p>
      </div>
    </div>
  );
}

function Content110() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <div className="relative rounded-[5px] shrink-0 size-[24px]" data-name="🔷 AccordionButton">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="Chevron Up">
              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="5.99952" preserveAspectRatio="none" viewBox="0 0 9.99951 5.99952" width="9.99951">
                  <path d={svgPaths.p747a00} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text84 />
    </div>
  );
}

function Text85() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Sentinel</p>
      </div>
    </div>
  );
}

function Content111() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text85 />
    </div>
  );
}

function Text86() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Sentinel 2.0</p>
      </div>
    </div>
  );
}

function Content112() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text86 />
    </div>
  );
}

function Text87() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Global</p>
      </div>
    </div>
  );
}

function Content113() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text87 />
    </div>
  );
}

function Text88() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content114() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text88 />
    </div>
  );
}

function Text89() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Workspace</p>
      </div>
    </div>
  );
}

function Content115() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text89 />
    </div>
  );
}

function Text90() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">Lorem ipsum</p>
      </div>
    </div>
  );
}

function Content116() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text90 />
    </div>
  );
}

function Text91() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f62fe] text-[0px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[14px] underline">2</p>
      </div>
    </div>
  );
}

function Content117() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text91 />
    </div>
  );
}

function LeadingIcon8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading Icon">
      <div className="bg-[#dedfe3] relative rounded-[5px] shrink-0" data-name="Icon">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">hard-mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content118() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <LeadingIcon8 />
    </div>
  );
}

function Text92() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content119() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text92 />
    </div>
  );
}

function Text93() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[0px] whitespace-nowrap">
        <p className="[text-underline-position:from-font] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] text-[#0f62fe] text-[14px] underline">3</p>
      </div>
    </div>
  );
}

function Content120() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text93 />
    </div>
  );
}

function Text94() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content121() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text94 />
    </div>
  );
}

function Text95() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">0</p>
      </div>
    </div>
  );
}

function Content122() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text95 />
    </div>
  );
}

function Text96() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content123() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text96 />
    </div>
  );
}

function Text97() {
  return (
    <div className="content-stretch flex items-start py-[2px] relative shrink-0" data-name="Text">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Text:400',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3b3d45] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mar 6, 2026</p>
      </div>
    </div>
  );
}

function Content124() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Content">
      <Text97 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 z-[2]" data-name="Row 8">
      <AdvancedTableCellSelection className="bg-white relative shrink-0" />
      <div className="bg-white relative shrink-0 w-[201px]" data-name="🔷 Cell 01">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-r border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content110 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[184px]" data-name="🔷 Cell 02">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content111 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 03">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content112 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 04">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content113 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 05">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content114 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 7">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content115 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 8">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content116 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content117 />
        </div>
      </div>
      <div className="bg-white h-[48px] relative shrink-0 w-[200px]" data-name="AdvancedTable::Cell::Base">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content118 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 11">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content119 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 12">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content120 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 14">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content121 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 15">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content122 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[200px]" data-name="🔷 Cell 16">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content123 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[199px]" data-name="🔷 Cell 17">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-r border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[16px] items-start px-[16px] py-[12px] relative size-full">
          <Content124 />
        </div>
      </div>
    </div>
  );
}

function Content125() {
  return <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[24px] items-start min-w-px relative" data-name="Content" />;
}

function CheckBox5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[49px]" data-name="check-box">
      <div className="bg-[#fafafa] flex-[1_0_0] min-h-px relative w-full" data-name="🔷 Cell 9">
        <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative size-full">
            <Content125 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleGroup5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['SF_UI_Text:600',sans-serif] gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[100px]" data-name="Title Group">
      <p className="min-w-full relative shrink-0 w-[min-content]">Policy set:</p>
      <p className="min-w-full relative shrink-0 w-[min-content]">Rule status:</p>
      <p className="relative shrink-0 whitespace-nowrap">Severity:</p>
      <p className="relative shrink-0 whitespace-nowrap">Failure Log:</p>
      <p className="relative shrink-0 whitespace-nowrap">Run Source:</p>
    </div>
  );
}

function TextBadgeValue5() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Text+Badge Value">
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Sentinel Cost Optimization</p>
      <div className="bg-[#fbeabf] relative rounded-[5px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative size-full">
            <div className="relative shrink-0 size-[12px]" data-name="Icon">
              <div className="absolute inset-[6.25%_0]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="10.5" preserveAspectRatio="none" viewBox="0 0 12 10.5" width="12">
                  <path d={svgPaths.p1a5c29f0} fill="#803D00" id="Path" />
                </svg>
              </div>
            </div>
            <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#803d00] text-[13px] whitespace-nowrap">3 Policies failed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueGroup5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Value Group">
      <TextBadgeValue5 />
      <p className="[word-break:break-word] font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">rule: limit-proposed-monthly-cost [Non-compliant]</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">Hard Mandatory (Deployment permanently blocked)</p>
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] w-full">[SENTINEL_TRACER] Cost delta +$1,500.00 violates rules threshold ($500.00).</p>
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-dotted decoration-from-font font-['SF_UI_Text:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0f62fe] text-[14px] underline w-full">run-senfojfd689795416</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <TitleGroup5 />
      <ValueGroup5 />
    </div>
  );
}

function DescriptionList5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[3383px]" data-name="Description List">
      <ListItem5 />
    </div>
  );
}

function Nested5() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="nested">
      <div aria-hidden className="absolute border-[#e0e0e0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[45px] py-[8px] relative size-full">
        <DescriptionList5 />
      </div>
    </div>
  );
}

function Row08Nested() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-start relative shrink-0 w-full z-[1]" data-name="Row 08 NESTED">
      <CheckBox5 />
      <Nested5 />
    </div>
  );
}

function TemplateAdvancedTableDoubleNested() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative rounded-[6px] shrink-0" data-name="[Template] Advanced Table Double Nested">
      <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[6px]" />
      <TableHeader />
      <Row4 />
      <Row5 />
      <Row03Nested />
      <Row6 />
      <Row04Nested />
      <Row />
      <Row05Nested />
      <Row1 />
      <Row06Nested />
      <Row2 />
      <Row07Nested />
      <Row3 />
      <Row08Nested />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-3px_0px_4px_0px_rgba(0,0,0,0.18)]" />
    </div>
  );
}

function ExplorerTable() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] top-0" data-name="explorer table">
      <TemplateAdvancedTableDoubleNested />
      <div className="flex h-[15px] items-center justify-center relative shrink-0 w-full" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw]">
          <div className="h-full relative rounded-tl-[5px] w-[15px]" data-name="scroll">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-tl-[5px]" />
            <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-l border-solid border-t inset-0 pointer-events-none rounded-tl-[5px]" />
            <div className="flex flex-row justify-center size-full">
              <div className="content-stretch flex items-start justify-center pb-px pt-[4px] px-[2px] relative size-full">
                <div className="bg-[#c2c5cb] h-[50px] relative rounded-[100px] shrink-0 w-[7px]" data-name="scroll" />
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_rgba(101,106,118,0.3),inset_0px_1px_2px_0px_rgba(101,106,118,0.1),inset_-3px_0px_4px_0px_rgba(0,0,0,0.18)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col h-[1191px] items-end pl-[32px] relative shrink-0 w-[1088px]" data-name="Table">
      <ExplorerTable />
    </div>
  );
}

function TotalItems() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="total items">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        of
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        12
      </p>
    </div>
  );
}

function IconWrapper1() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0" data-name="icon wrapper">
      <div className="relative shrink-0 size-[16px]" data-name="leading-icon">
        <div className="absolute inset-[18.75%_31.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 6 10" width="6">
            <path clipRule="evenodd" d={svgPaths.p1881e500} fill="#8C909C" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[6px] py-[3px] relative shrink-0" data-name="contents">
      <IconWrapper1 />
    </div>
  );
}

function Contents12() {
  return (
    <div className="content-stretch flex flex-col items-start px-[6px] py-[3px] relative shrink-0" data-name="contents">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[18px] relative shrink-0 text-[#1060ff] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        1
      </p>
    </div>
  );
}

function Pages() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="pages">
      <div className="relative rounded-[5px] shrink-0" data-name="_NavNumber">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
            <Contents12 />
            <div className="absolute bg-[#1060ff] bottom-0 h-[2px] left-[6px] right-[6px] rounded-[2px]" data-name="indicator" />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper2() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0" data-name="icon wrapper">
      <div className="relative shrink-0 size-[16px]" data-name="leading-icon">
        <div className="absolute inset-[18.75%_31.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 6 10" width="6">
            <path clipRule="evenodd" d={svgPaths.p26404300} fill="#3B3D45" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents13() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[6px] py-[3px] relative shrink-0" data-name="contents">
      <IconWrapper2 />
    </div>
  );
}

function TrailingIcon() {
  return (
    <div className="-translate-y-1/2 absolute bg-white h-[16px] right-px top-1/2 w-[23px]" data-name="trailing icon">
      <div className="-translate-y-1/2 absolute left-0 size-[16px] top-1/2" data-name="trailing icon">
        <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 8.00001 12" width="8.00001">
            <g id="Path">
              <path d={svgPaths.p200d5a00} fill="#656A76" />
              <path d={svgPaths.p26d26280} fill="#656A76" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contents14() {
  return (
    <div className="bg-white h-[28px] relative rounded-[5px] shrink-0 w-full" data-name="contents">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <p className="[word-break:break-word] font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#0c0c0e] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            12
          </p>
          <TrailingIcon />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#8c909c] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_1px_1px_0px_rgba(101,106,118,0.05),0px_2px_2px_0px_rgba(101,106,118,0.05)]" />
    </div>
  );
}

function Base() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-[50px]" data-name="Base">
      <Contents14 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pagination">
      <div className="content-stretch flex flex-col items-start px-[40px] py-[16px] relative size-full">
        <div className="relative shrink-0 w-full" data-name="Pagination">
          <div className="flex flex-row justify-center size-full">
            <div className="content-stretch flex gap-[226px] items-start justify-center relative size-full">
              <div className="absolute left-0 top-[11px]" data-name="_PaginationInfo">
                <div className="[word-break:break-word] content-stretch flex font-['SF_Pro:Medium',sans-serif] font-[510] gap-[4px] items-start leading-[14px] relative size-full text-[#3b3d45] text-[13px] text-center whitespace-nowrap">
                  <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
                    1-12
                  </p>
                  <TotalItems />
                </div>
              </div>
              <div className="relative shrink-0" data-name="_PaginationNav">
                <div className="content-stretch flex items-start relative size-full">
                  <div className="relative rounded-[5px] shrink-0" data-name="_NavArrow/Previous">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[6px] relative size-full">
                        <Contents11 />
                      </div>
                    </div>
                  </div>
                  <Pages />
                  <div className="relative rounded-[5px] shrink-0" data-name="_NavArrow/Next">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[6px] relative size-full">
                        <Contents13 />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-[4px]" data-name="_SizeSelector">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center relative size-full">
                    <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[18px] relative shrink-0 text-[#3b3d45] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      Items per page
                    </p>
                    <Base />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1579px] items-start left-[280px] top-0 w-[1120px]" data-name="Main Content">
      <Header1 />
      <Table />
      <Pagination />
    </div>
  );
}

function Content126() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[18.75%_31.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 6 10" width="6">
            <path clipRule="evenodd" d={svgPaths.p1881e500} fill="#0C0C0E" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Explorer</p>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="🔷 Section 01">
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 01">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content126 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Content127() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
            <path clipRule="evenodd" d={svgPaths.p2cb44f80} fill="#161616" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Workspaces</p>
      </div>
    </div>
  );
}

function Content128() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[0.55%_6.25%_1%_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="15.7528" preserveAspectRatio="none" viewBox="0 0 14 15.7528" width="14">
            <path d={svgPaths.p11047500} fill="#1060FF" id="Path" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Policy sets</p>
      </div>
    </div>
  );
}

function Content129() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[0.49%_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="15.8421" preserveAspectRatio="none" viewBox="0 0 14 15.8421" width="14">
            <g id="Path">
              <path clipRule="evenodd" d={svgPaths.pde26b00} fill="#0C0C0E" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p9ebb780} fill="#0C0C0E" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Modules</p>
      </div>
    </div>
  );
}

function Content130() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <path clipRule="evenodd" d={svgPaths.p2e722780} fill="#0C0C0E" fillRule="evenodd" id="Path" />
        </svg>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Providers</p>
      </div>
    </div>
  );
}

function Content131() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[6.25%_0]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 16 14" width="16">
            <g id="Path">
              <path d={svgPaths.pe712870} fill="#0C0C0E" />
              <path d={svgPaths.p3c487b02} fill="#0C0C0E" />
              <path clipRule="evenodd" d={svgPaths.p2aa64580} fill="#0C0C0E" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Resources</p>
      </div>
    </div>
  );
}

function Content132() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[0_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 14 16" width="14">
            <g id="Path">
              <path d={svgPaths.p3d990f40} fill="#0C0C0E" />
              <path d={svgPaths.p7e6e000} fill="#0C0C0E" />
              <path d={svgPaths.p24a11800} fill="#0C0C0E" />
              <path d={svgPaths.p9584200} fill="#0C0C0E" />
            </g>
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Terraform versions</p>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="🔷 Section 02">
      <div className="relative shrink-0 w-[247px]" data-name="🔷 List Title">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[8px] py-[9px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[18px] min-w-px relative text-[#656a76] text-[13px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Types
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 01">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content127 />
          </div>
        </div>
      </div>
      <div className="bg-[#f1f2f3] relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 05">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content128 />
            <div className="absolute bg-[#1060ff] h-[36px] left-[-16px] rounded-br-[2px] rounded-tr-[2px] top-0 w-[4px]" data-name="Active Indicator" />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 02">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content129 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 03">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content130 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 04">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content131 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 06">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content132 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Content133() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <g id="Path">
            <path clipRule="evenodd" d={svgPaths.p241fc00} fill="#1060FF" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2ae5672} fill="#1060FF" fillRule="evenodd" />
          </g>
        </svg>
      </div>
      <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] min-w-px relative text-[#0c0c0e] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Saved views</p>
      </div>
      <div className="relative rounded-[10px] shrink-0" data-name="◇ Badge Count">
        <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="🔷 Body">
      <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[16px] relative size-full">
        <Section />
        <Section1 />
        <div className="relative shrink-0 w-full" data-name="🔷 Section 3">
          <div className="content-stretch flex flex-col gap-[2px] items-start relative size-full">
            <div className="relative shrink-0 w-[247px]" data-name="🔷 List Title">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center px-[8px] py-[9px] relative size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[18px] min-w-px relative text-[#656a76] text-[13px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                    Custom Queries
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 01">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                  <Content133 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppSideNav() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[1579px] items-start justify-end left-0 top-0 w-[280px]" data-name="AppSideNav">
      <Body1 />
      <CollapseEdge className="h-full relative shrink-0 w-0" />
    </div>
  );
}

function Body() {
  return (
    <div className="h-[1579px] relative shrink-0 w-full" data-name="Body">
      <MainContent />
      <AppSideNav />
    </div>
  );
}

export default function PolicySetsExpanded() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] flex flex-col items-start relative rounded-[20px] size-full" data-name="Policy Sets Expanded">
      <div aria-hidden className="absolute border border-[rgba(101,106,118,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Header />
      <Body />
    </div>
  );
}