import svgPaths from "./svg-f6xsuk16xy";

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

function Content() {
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

function Content1() {
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

function Content2() {
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

function Content3() {
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

function Content4() {
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
            <p className="[word-break:break-word] flex-[1_0_0] font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[18px] min-w-px relative text-[#656a76] text-[13px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Manage
            </p>
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 06">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 01">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content1 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 02">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content2 />
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
            <Content3 />
          </div>
        </div>
      </div>
      <div className="relative rounded-[5px] shrink-0 w-[247px]" data-name="🔷 List Item 05">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
            <Content4 />
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

function Content5() {
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

function Content6() {
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

function Body() {
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
                  <Content5 />
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
                  <Content6 />
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
      <Body />
      <CollapseEdge className="h-full relative shrink-0 w-0" />
    </div>
  );
}

export default function NavTfcSideNav() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Nav/TFC SideNav">
      <AppSideNav />
    </div>
  );
}