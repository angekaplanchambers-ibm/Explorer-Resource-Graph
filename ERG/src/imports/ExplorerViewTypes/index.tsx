import svgPaths from "./svg-0utao4uo0y";

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
type UtilityNavProps = {
  className?: string;
  hasHelp?: boolean;
  hasSearch?: boolean;
  hasUserSettings?: boolean;
};

function UtilityNav({ className, hasHelp = true, hasSearch = true, hasUserSettings = true }: UtilityNavProps) {
  return (
    <div className={className || "relative"} data-name=".UtilityNav">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end relative size-full">
          {hasSearch && (
            <div className="relative shrink-0" data-name="◇ Search Button">
              <div className="content-stretch flex items-start relative size-full">
                <div className="bg-[#0c0c0e] relative rounded-[5px] shrink-0" data-name="◇ Button">
                  <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center relative size-full">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {hasHelp && (
            <div className="relative shrink-0" data-name=".Dropdown">
              <div className="content-stretch flex flex-col items-start relative size-full">
                <div className="relative shrink-0" data-name=".ToggleIcon">
                  <div className="content-stretch flex flex-col items-start relative size-full">
                    <div className="relative rounded-[5px] shrink-0" data-name="Dropdown::ToggleIcon">
                      <div className="flex flex-col items-center justify-center size-full">
                        <div className="content-stretch flex flex-col items-center justify-center relative size-full">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {hasUserSettings && (
            <div className="relative shrink-0" data-name="◇ User Dropdown">
              <div className="content-stretch flex flex-col items-start relative size-full">
                <div className="relative shrink-0" data-name="ToggleIcon">
                  <div className="content-stretch flex flex-col items-start relative size-full">
                    <div className="relative rounded-[5px] shrink-0" data-name="◇ ToggleIcon">
                      <div className="flex flex-col items-center justify-center size-full">
                        <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                          <div className="bg-[#0c0c0e] content-stretch flex gap-[4px] items-center justify-center p-[2px] relative rounded-[5px] shrink-0" data-name="Contents">
                            <div aria-hidden className="absolute border border-[#656a76] border-solid inset-0 pointer-events-none rounded-[5px]" />
                            <div className="bg-[#ff7557] relative rounded-[3px] shrink-0 size-[32px]" data-name="🔷 Avatar">
                              <p className="[word-break:break-word] absolute font-['SF_UI_Text:400',sans-serif] leading-[24px] not-italic right-[16px] text-[16px] text-center text-white top-[4px] translate-x-1/2 whitespace-nowrap">AB</p>
                            </div>
                            <div className="relative shrink-0 size-[16px]" data-name="Chevron">
                              <div className="absolute inset-[31.25%_18.75%]" data-name="Path">
                                <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
                                  <path clipRule="evenodd" d={svgPaths.pb2d1f00} fill="white" fillRule="evenodd" id="Path" />
                                </svg>
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
          )}
        </div>
      </div>
    </div>
  );
}

function LeadingIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Leading Icon">
      <div className="absolute left-0 size-[16px] top-0" data-name="Icon">
        <div className="absolute inset-[0_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 14 16" width="14">
            <g id="Path">
              <path d={svgPaths.p10aa2980} fill="white" />
              <path d={svgPaths.p384ea000} fill="white" />
              <path d={svgPaths.p1e9e6440} fill="white" />
              <path clipRule="evenodd" d={svgPaths.p1fbd3700} fill="white" fillRule="evenodd" />
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
      <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">ILM_Demo_Space</p>
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

function AppHeader() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="App Header">
      <div className="bg-[#0c0c0e] min-w-[768px] relative shrink-0 w-[1400px]" data-name="AppHeader">
        <div aria-hidden className="absolute border-[#656a76] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex items-center justify-between min-w-[inherit] px-[16px] py-[12px] relative size-full">
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
            <UtilityNav className="relative shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[4px] py-[6px] relative shrink-0" data-name="Contents">
      <div className="relative shrink-0 size-[12px]" data-name="leading-icon">
        <div className="absolute inset-[6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="10.5" preserveAspectRatio="none" viewBox="0 0 10.5 10.5" width="10.5">
            <g id="Path">
              <path clipRule="evenodd" d={svgPaths.pf1b2700} fill="#656A76" fillRule="evenodd" />
              <path d={svgPaths.p3fc91e00} fill="#656A76" />
              <path d={svgPaths.p7d7f2f0} fill="#656A76" />
              <path d={svgPaths.p11956f80} fill="#656A76" />
              <path d={svgPaths.p9d39d00} fill="#656A76" />
              <path d={svgPaths.p31e36a00} fill="#656A76" />
              <path d={svgPaths.p32172100} fill="#656A76" />
              <path d={svgPaths.p37198f80} fill="#656A76" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#656a76] text-[13px] whitespace-nowrap">ILM_Demo_Space</p>
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[4px] py-[6px] relative shrink-0" data-name="Contents">
      <p className="[word-break:break-word] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] relative shrink-0 text-[#656a76] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Explorer
      </p>
    </div>
  );
}

function TitleMain() {
  return (
    <div className="content-stretch flex gap-[16px] items-center py-px relative shrink-0" data-name="Title Main">
      <div className="[word-break:break-word] flex flex-col font-['SF_UI_Display:700',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0c0c0e] text-[30px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[38px]">Explorer</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Content">
      <TitleMain />
      <p className="[word-break:break-word] font-['SF_UI_Text:400',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-[min-content]">Explore your data to analyze your Organization’s Terraform usage.</p>
    </div>
  );
}

function InnerContents1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[16px] items-center pr-[8px] relative shrink-0" data-name="Inner Contents">
      <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">New query</p>
    </div>
  );
}

function IconWrapper1() {
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

function Contents3() {
  return (
    <div className="bg-[#1060ff] drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative rounded-[5px] shrink-0 w-full" data-name="Contents">
      <div aria-hidden className="absolute border border-[#0c56e9] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[10px] py-[10px] relative size-full">
          <InnerContents1 />
          <IconWrapper1 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-w-px relative" data-name="Main">
      <Content />
      <div className="relative shrink-0" data-name="🔷 Actions">
        <div className="content-stretch flex items-start relative size-full">
          <div className="drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative rounded-[5px] shrink-0" data-name="◇ Action-01">
            <div className="flex flex-col items-center justify-center size-full">
              <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                <Contents3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Body">
      <Main />
    </div>
  );
}

function Contents4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center py-[2px] relative shrink-0" data-name="Contents">
      <p className="[word-break:break-word] font-['SF_UI_Text:500',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1060ff] text-[14px] text-center whitespace-nowrap">Types</p>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[3px] pt-[6px] px-[12px] relative shrink-0" data-name="Tab">
      <Contents4 />
    </div>
  );
}

function Contents5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center py-[2px] relative shrink-0" data-name="Contents">
      <p className="[word-break:break-word] font-['SF_UI_Text:500',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] text-center whitespace-nowrap">Use cases</p>
    </div>
  );
}

function Contents6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center py-[2px] relative shrink-0" data-name="Contents">
      <p className="[word-break:break-word] font-['SF_UI_Text:500',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] text-center whitespace-nowrap">Saved views</p>
      <div className="bg-[#dedfe3] relative rounded-[10px] shrink-0" data-name="◇ Count">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[8px] py-[2px] relative size-full">
            <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] whitespace-nowrap">10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tabs">
      <div className="relative shrink-0" data-name="🔷 Tab 01">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center relative size-full">
            <Tab />
            <div className="bg-[#1060ff] h-[3px] relative rounded-[3px] shrink-0 w-full" data-name="Border Bottom" />
          </div>
        </div>
      </div>
      <div className="relative shrink-0" data-name="🔷 Tab 03">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[6px] relative size-full">
            <Contents5 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0" data-name="🔷 Tab 02">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[6px] relative size-full">
            <Contents6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs1() {
  return (
    <div className="content-stretch flex flex-col h-[35px] items-start max-h-[35px] relative shrink-0 w-full" data-name="Tabs">
      <div aria-hidden className="absolute border-[rgba(101,106,118,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <Tabs2 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Tabs">
      <Tabs1 />
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden className="absolute border-0 border-[rgba(101,106,118,0.2)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pt-[32px] px-[32px] relative size-full">
        <div className="relative shrink-0 w-full" data-name="PageHeader">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
            <div className="relative shrink-0" data-name="🔷 Breadcrumb">
              <div className="flex flex-row items-center size-full">
                <div className="content-center flex flex-wrap gap-[4px] items-center relative size-full">
                  <div className="relative shrink-0" data-name="◇ Breadcrumb-Item-01">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex gap-[4px] items-center relative size-full">
                        <Contents1 />
                        <p className="[word-break:break-word] font-['SF_UI_Text:500',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#c2c5cb] text-[13px] whitespace-nowrap">/</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0" data-name="◇ Breadcrumb-Item-09">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex gap-[4px] items-center relative size-full">
                        <Contents2 />
                        <p className="[word-break:break-word] font-['SF_UI_Text:500',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#c2c5cb] text-[13px] whitespace-nowrap">/</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0" data-name="◇ Breadcrumb-Current">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[6px] items-center px-[4px] py-[6px] relative size-full">
                        <p className="[word-break:break-word] font-['SF_UI_Text:medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0c0c0e] text-[13px] whitespace-nowrap">Types</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Body />
          </div>
        </div>
        <Tabs />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="layout">
            <div className="absolute inset-[8.33%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                <path clipRule="evenodd" d={svgPaths.p3db32200} fill="#0C0C0E" fillRule="evenodd" id="Path" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Workspaces</p>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="bg-[#fafafa] relative self-stretch shrink-0" data-name="Arrow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
            <div className="absolute inset-[15.63%_12.5%_17.71%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 18 16" width="18">
                <path d={svgPaths.p168f9a00} fill="#1060FF" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white content-stretch flex items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(101,106,118,0.2)] shrink-0 w-full" data-name="Card">
      <Content1 />
      <Arrow />
    </div>
  );
}

function Content2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="shield">
            <div className="absolute inset-[4.73%_12.5%_5.17%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="21.6243" preserveAspectRatio="none" viewBox="0 0 18 21.6243" width="18">
                <path d={svgPaths.p312c4f00} fill="#0C0C0E" id="Path" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Policy sets</p>
        </div>
      </div>
    </div>
  );
}

function Arrow1() {
  return (
    <div className="bg-[#fafafa] h-full relative shrink-0" data-name="Arrow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
            <div className="absolute inset-[15.63%_12.5%_17.71%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 18 16" width="18">
                <path d={svgPaths.p168f9a00} fill="#1060FF" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white content-stretch flex h-[72px] items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(101,106,118,0.2)] shrink-0 w-full" data-name="Card">
      <Content2 />
      <Arrow1 />
    </div>
  );
}

function Cards() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Cards">
      <Card />
      <Card1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="module">
            <div className="absolute inset-[8.2%_12.5%_4.03%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="21.0646" preserveAspectRatio="none" viewBox="0 0 18 21.0646" width="18">
                <g id="Path">
                  <path clipRule="evenodd" d={svgPaths.p2a510e80} fill="#0C0C0E" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p2d828b00} fill="#0C0C0E" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Modules</p>
        </div>
      </div>
    </div>
  );
}

function Arrow2() {
  return (
    <div className="bg-[#fafafa] relative self-stretch shrink-0" data-name="Arrow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
            <div className="absolute inset-[15.63%_12.5%_17.71%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 18 16" width="18">
                <path d={svgPaths.p168f9a00} fill="#1060FF" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white content-stretch flex items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(101,106,118,0.2)] shrink-0 w-full" data-name="Card">
      <Content3 />
      <Arrow2 />
    </div>
  );
}

function Content4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="provider">
            <div className="absolute inset-[4.17%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 22 22" width="22">
                <path clipRule="evenodd" d={svgPaths.p1850ad00} fill="#0C0C0E" fillRule="evenodd" id="Path" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Providers</p>
        </div>
      </div>
    </div>
  );
}

function Arrow3() {
  return (
    <div className="bg-[#fafafa] h-full relative shrink-0" data-name="Arrow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
            <div className="absolute inset-[15.63%_12.5%_17.71%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 18 16" width="18">
                <path d={svgPaths.p168f9a00} fill="#1060FF" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white content-stretch flex h-[72px] items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(101,106,118,0.2)] shrink-0 w-full" data-name="Card">
      <Content4 />
      <Arrow3 />
    </div>
  );
}

function Cards1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Cards">
      <Card2 />
      <Card3 />
    </div>
  );
}

function Content5() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="collections">
            <div className="absolute inset-[8.33%_4.17%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 22 20" width="22">
                <g id="Path">
                  <path d={svgPaths.p14b2b140} fill="#0C0C0E" />
                  <path d={svgPaths.p3685db80} fill="#0C0C0E" />
                  <path clipRule="evenodd" d={svgPaths.p2246ec00} fill="#0C0C0E" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Resources</p>
          <Tag className="bg-white h-[24px] max-h-[24px] max-w-[166px] relative rounded-[20px] shrink-0" text="BETA" />
        </div>
      </div>
    </div>
  );
}

function Arrow4() {
  return (
    <div className="bg-[#fafafa] h-full relative shrink-0" data-name="Arrow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
            <div className="absolute inset-[15.63%_12.5%_17.71%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 18 16" width="18">
                <path d={svgPaths.p168f9a00} fill="#1060FF" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white content-stretch flex h-[72px] items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(101,106,118,0.2)] shrink-0 w-full" data-name="Card">
      <Content5 />
      <Arrow4 />
    </div>
  );
}

function Content6() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="terraform">
            <div className="absolute inset-[2.5%_8.33%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="22.8" preserveAspectRatio="none" viewBox="0 0 20 22.8" width="20">
                <g id="Path">
                  <path d={svgPaths.p3a109f00} fill="#0C0C0E" />
                  <path d={svgPaths.p32df5b80} fill="#0C0C0E" />
                  <path d={svgPaths.p1f7a8380} fill="#0C0C0E" />
                  <path d={svgPaths.p11b23400} fill="#0C0C0E" />
                </g>
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap">Terraform versions</p>
        </div>
      </div>
    </div>
  );
}

function Arrow5() {
  return (
    <div className="bg-[#fafafa] h-full relative shrink-0" data-name="Arrow">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
            <div className="absolute inset-[15.63%_12.5%_17.71%_12.5%]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 18 16" width="18">
                <path d={svgPaths.p168f9a00} fill="#1060FF" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white content-stretch flex h-[72px] items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(101,106,118,0.2)] shrink-0 w-full" data-name="Card">
      <Content6 />
      <Arrow5 />
    </div>
  );
}

function Cards2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Cards">
      <Card4 />
      <Card5 />
    </div>
  );
}

function Types() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Types">
      <div className="relative shrink-0 w-full" data-name="🔷 Group Legend">
        <div className="content-stretch flex flex-col items-start relative size-full">
          <p className="[word-break:break-word] font-['SF_UI_Text:600',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0c0c0e] text-[18px] tracking-[-0.5px] whitespace-nowrap">Types</p>
        </div>
      </div>
      <Cards />
      <Cards1 />
      <Cards2 />
    </div>
  );
}

function TypesUseCases() {
  return (
    <div className="relative shrink-0 w-full" data-name="Types / Use Cases">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start justify-center px-[32px] py-[16px] relative size-full">
          <Types />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[280px] top-0 w-[1120px]" data-name="Main Content">
      <Header />
      <TypesUseCases />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[0_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 14 16" width="14">
            <g id="Path">
              <path d={svgPaths.p10aa2980} fill="#0C0C0E" />
              <path d={svgPaths.p384ea000} fill="#0C0C0E" />
              <path d={svgPaths.p1e9e6440} fill="#0C0C0E" />
              <path clipRule="evenodd" d={svgPaths.p1fbd3700} fill="#0C0C0E" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Projects</p>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[6.25%_0]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 16 14" width="16">
            <path clipRule="evenodd" d={svgPaths.p39eb3e00} fill="#0C0C0E" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Workspaces</p>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[0_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 14 16" width="14">
            <path clipRule="evenodd" d={svgPaths.p379ab480} fill="#0C0C0E" fillRule="evenodd" id="Path" />
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Registry</p>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="size=16">
        <div className="absolute inset-[12.5%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 10 12" width="10">
            <g id="Path">
              <path d={svgPaths.pe036000} fill="#0C0C0E" />
              <path d={svgPaths.p1ab64500} fill="#0C0C0E" />
              <path d={svgPaths.p39d9ecc0} fill="#0C0C0E" />
            </g>
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Usage</p>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="size=16">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <g id="Path">
            <path clipRule="evenodd" d={svgPaths.p3210ff00} fill="#0C0C0E" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3f940d80} fill="#0C0C0E" fillRule="evenodd" />
          </g>
        </svg>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Settings</p>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="🔷 Section 01">
      <div className="relative shrink-0 w-[247px]" data-name="🔷 List Title">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[8px] py-[9px] relative size-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['SF_Pro:Medium',sans-serif] font-[510] leading-[20px] min-w-px relative text-[#0c0c0e] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Manage
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 06">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content7 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 01">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content8 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 02">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content9 />
            <div className="relative shrink-0 size-[16px]" data-name="Sub Items Icon">
              <div className="absolute inset-[18.75%_31.25%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 6 10" width="6">
                  <path clipRule="evenodd" d={svgPaths.p26404300} fill="#0C0C0E" fillRule="evenodd" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 04">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content10 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 05">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content11 />
            <div className="relative shrink-0 size-[16px]" data-name="Sub Items Icon">
              <div className="absolute inset-[18.75%_31.25%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 6 10" width="6">
                  <path clipRule="evenodd" d={svgPaths.p26404300} fill="#0C0C0E" fillRule="evenodd" id="Path" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content12() {
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
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#1060ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Explorer</p>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <div className="relative shrink-0 size-[16px]" data-name="◇ Icon">
        <div className="absolute inset-[3.75%_6.25%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="14.8" preserveAspectRatio="none" viewBox="0 0 14 14.8" width="14">
            <g id="Path">
              <path d={svgPaths.pe95cc00} fill="#0C0C0E" />
              <path d={svgPaths.p165ebd00} fill="#0C0C0E" />
              <path d={svgPaths.p1d0f8380} fill="#0C0C0E" />
            </g>
          </svg>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#0c0c0e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">HashiCorp Cloud Platform</p>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="🔷 Body">
      <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16px] px-[16px] relative size-full">
        <Section />
        <div className="relative shrink-0 w-full" data-name="🔷 Section 02">
          <div className="content-stretch flex flex-col gap-[2px] items-start relative size-full">
            <div className="relative shrink-0 w-[247px]" data-name="🔷 List Title">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center px-[8px] py-[9px] relative size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[18px] min-w-px relative text-[#656a76] text-[13px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                    Visibility
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#f1f2f3] relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 01">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                  <Content12 />
                  <div className="absolute bg-[#1060ff] h-[36px] left-[-16px] rounded-br-[2px] rounded-tr-[2px] top-0 w-[4px]" data-name="Active Indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="🔷 Section 03">
          <div className="content-stretch flex flex-col gap-[2px] items-start relative size-full">
            <div className="relative shrink-0 w-[247px]" data-name="🔷 List Title">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center px-[8px] py-[9px] relative size-full">
                  <p className="[word-break:break-word] flex-[1_0_0] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[18px] min-w-px relative text-[#656a76] text-[13px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                    Cloud Platform
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name=".ListItem">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
                  <Content13 />
                  <div className="relative shrink-0 size-[16px]" data-name="Icon External Link">
                    <div className="absolute inset-[0_6.25%_12.5%_6.25%]" data-name="Path">
                      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
                        <g id="Path">
                          <path d={svgPaths.p27248680} fill="#0C0C0E" />
                          <path d={svgPaths.p2d294380} fill="#0C0C0E" />
                        </g>
                      </svg>
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

function AppSideNav() {
  return (
    <div className="bg-[#fafafa] content-stretch flex h-full items-start justify-end relative shrink-0 w-[280px]" data-name="AppSideNav">
      <Body1 />
      <CollapseEdge className="h-full relative shrink-0 w-0" />
    </div>
  );
}

function NavTfcSideNav() {
  return (
    <div className="absolute content-stretch flex h-[1187px] items-start left-0 top-[0.5px]" data-name="Nav/TFC SideNav">
      <AppSideNav />
    </div>
  );
}

function BodyContent() {
  return (
    <div className="h-[1187px] relative shrink-0 w-[1400px]" data-name="Body Content">
      <MainContent />
      <NavTfcSideNav />
    </div>
  );
}

export default function ExplorerViewTypes() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] flex flex-col items-start relative rounded-[20px] size-full" data-name="Explorer View - Types">
      <div aria-hidden className="absolute border border-[rgba(101,106,118,0.2)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <AppHeader />
      <BodyContent />
    </div>
  );
}