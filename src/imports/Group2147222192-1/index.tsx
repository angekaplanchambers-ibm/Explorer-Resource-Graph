import svgPaths from "./svg-7akse2tt8w";

function BoldText() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-[58.039px]" data-name="Bold Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[normal] left-0 not-italic text-[14px] text-white top-0 tracking-[0.14px] whitespace-nowrap">Meridian</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[47px] items-center pl-[8px] pr-[23px] relative shrink-0" data-name="Container">
      <div aria-hidden className="absolute border-[#393939] border-r border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#f4f4f4] text-[14px] tracking-[0.14px] whitespace-nowrap">{`IBM `}</p>
      <BoldText />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[763px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] h-[32px] leading-[32px] not-italic relative shrink-0 text-[#eceef2] text-[20px] w-[606px]">Sessions</p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
      <Container />
      <Frame18 />
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#d6aee0] content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[8000px] shrink-0 size-[40px]" data-name="Avatar">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#282828] text-[14px] text-center w-full">JM</p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex h-[100px] items-center justify-between left-0 overflow-clip p-[20px] top-0 w-[1440px]" data-name="Navigation">
      <Frame60 />
      <Avatar />
    </div>
  );
}

function Frame19() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start justify-center not-italic relative shrink-0 w-[606px]">
      <p className="font-['IBM_Plex_Sans:Light',sans-serif] leading-[32px] relative shrink-0 text-[#161616] text-[20px] w-[606px]">LPAR Profile Configuration · New plan build</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#777] text-[16px] w-[606px]">The next-activation profile with approved processor, memory, and IPL values, then verified readback without disrupting the running production LPAR.</p>
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#defbe6] content-stretch flex h-[24px] items-center justify-end px-[8px] py-[6px] relative rounded-[6px] shrink-0" data-name="Tag">
      <div aria-hidden className="absolute border border-[rgba(25,64,0,0.05)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#161616] text-[12px] text-center tracking-[-0.12px] whitespace-nowrap">Completed Apr 30, 2026 · 2:14 PM</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex h-[138px] items-center justify-between left-0 px-[45px] py-[12px] right-0 top-0">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Frame19 />
      <Tag />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[16px] relative shrink-0 text-[12px] tracking-[0.24px] w-full whitespace-nowrap">
      <p className="relative shrink-0 text-[rgba(37,37,37,0.6)]">Queried 1 datasource</p>
      <p className="relative shrink-0 text-[#252525]">View Thinking</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start left-[8px] not-italic top-[70px] w-[520px]">
      <Frame5 />
      <p className="leading-[normal] relative shrink-0 text-[#252525] text-[16px] w-full">{`I can help with that. Select the workflow you want to run: `}</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[8px] top-[70px]">
      <Frame3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 text-[12px] tracking-[0.24px] w-full whitespace-nowrap">
      <p className="leading-[16px] relative shrink-0 text-[rgba(37,37,37,0.6)]">Workflow selected: LPAR profile configuration</p>
      <p className="leading-[0] relative shrink-0 text-[#252525]">
        <span className="leading-[16px]">{`Confirmed April 30, 2026 `}</span>
        <span className="leading-[16px]">{`· `}</span>
        <span className="leading-[16px]">2:14PM</span>
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] gap-[8px] items-start left-[8px] not-italic top-[369px] w-[520px]">
      <Frame6 />
      <p className="leading-[normal] relative shrink-0 text-[#252525] text-[16px] w-full">{`I can help with that. Which LPAR do you want to target? `}</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[8px] top-[369px]">
      <Frame4 />
    </div>
  );
}

function HStack() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="hStack">
      <div className="relative rounded-[56px] shrink-0 size-[20px]" data-name="Radio">
        <div aria-hidden className="absolute bg-[#0043ce] inset-0 pointer-events-none rounded-[56px]" />
        <div className="absolute left-[2px] size-[16px] top-[2px]" data-name="Check">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector" />
          </svg>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <g filter="url(#filter0_ii_65_1570)" id="Ellipse 22322">
              <circle cx="4" cy="4" fill="var(--fill-0, white)" r="4" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9" id="filter0_ii_65_1570" width="8" x="0" y="-0.5">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="-0.5" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend in2="shape" mode="normal" result="effect1_innerShadow_65_1570" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.5" />
                <feGaussianBlur stdDeviation="0.25" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
                <feBlend in2="effect1_innerShadow_65_1570" mode="normal" result="effect2_innerShadow_65_1570" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.5px_0.5px_0px_rgba(255,255,255,0.2),inset_0px_-0.5px_1px_0px_rgba(0,0,0,0.5)]" />
      </div>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#252525] text-[16px] w-[606px]">LPAR profile configuraiton</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#252525] text-[17px] w-[520px]">Edit processor, memory, and IPL settings for an existing LPAR.</p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="bg-[#edf2fc] content-stretch flex flex-col h-[24px] items-center justify-center px-[8px] relative rounded-[6px] shrink-0" data-name="Tag">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-center tracking-[-0.12px] whitespace-nowrap">Configuration</p>
      </div>
      <div className="bg-[#edf2fc] content-stretch flex flex-col h-[24px] items-center justify-center px-[8px] relative rounded-[6px] shrink-0" data-name="Tag">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0043ce] text-[12px] text-center tracking-[-0.12px] whitespace-nowrap">Mutating</p>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame58 />
    </div>
  );
}

function Tile() {
  return (
    <div className="absolute bg-white left-[8px] rounded-[12px] top-[139px] w-[672px]" data-name="Tile">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <HStack />
        <Frame2 />
        <Frame59 />
      </div>
      <div aria-hidden className="absolute border border-[#dbdbdc] border-solid inset-[-1px] pointer-events-none rounded-[13px] shadow-[0px_1px_4px_0px_rgba(74,87,120,0.03),0px_4px_12px_0px_rgba(74,87,120,0.09)]" />
    </div>
  );
}

function HStack1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="hStack">
      <div className="relative rounded-[56px] shrink-0 size-[20px]" data-name="Radio">
        <div aria-hidden className="absolute bg-[#0043ce] inset-0 pointer-events-none rounded-[56px]" />
        <div className="absolute left-[2px] size-[16px] top-[2px]" data-name="Check">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector" />
          </svg>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <g filter="url(#filter0_ii_65_1570)" id="Ellipse 22322">
              <circle cx="4" cy="4" fill="var(--fill-0, white)" r="4" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="9" id="filter0_ii_65_1570" width="8" x="0" y="-0.5">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="-0.5" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend in2="shape" mode="normal" result="effect1_innerShadow_65_1570" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="0.5" />
                <feGaussianBlur stdDeviation="0.25" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
                <feBlend in2="effect1_innerShadow_65_1570" mode="normal" result="effect2_innerShadow_65_1570" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.5px_0.5px_0px_rgba(255,255,255,0.2),inset_0px_-0.5px_1px_0px_rgba(0,0,0,0.5)]" />
      </div>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#252525] text-[16px] w-[606px]">VA40G00</p>
    </div>
  );
}

function CheckboxColumn() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[69px]" data-name="Checkbox Column">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#252525] text-[14px] whitespace-nowrap">CPC</p>
    </div>
  );
}

function ChangeSummaryColumn() {
  return (
    <div className="h-[20px] relative shrink-0 w-[103px]" data-name="Change Summary Column">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] left-[0.33px] not-italic text-[#161616] text-[14px] top-0 w-[141px]">Status</p>
    </div>
  );
}

function DeploymentUrlColumn() {
  return (
    <div className="h-[20px] relative shrink-0 w-[108px]" data-name="Deployment URL Column">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] left-[-0.2px] not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Environment</p>
    </div>
  );
}

function ChangeDateColumn() {
  return (
    <div className="h-[20px] relative shrink-0 w-[109px]" data-name="Change Date Column">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] left-[-0.2px] not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Mode</p>
    </div>
  );
}

function UpdatedByColumn() {
  return (
    <div className="h-[20px] relative shrink-0 w-[110px]" data-name="Updated By Column">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] left-[0.4px] not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Profile</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="opacity-0 relative shrink-0 size-[20px]">
      <div className="-translate-y-1/2 absolute overflow-clip right-0 size-[16px] top-1/2" data-name="Chevron--right">
        <div className="absolute inset-[18.75%_31.25%_18.75%_33.13%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.7 10">
            <path d={svgPaths.p1f22e100} fill="var(--fill-0, #252525)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative" data-name="checkbox">
      <CheckboxColumn />
      <ChangeSummaryColumn />
      <DeploymentUrlColumn />
      <ChangeDateColumn />
      <UpdatedByColumn />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] w-[78px]">Memory</p>
      <Frame1 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative" data-name="Table Row">
      <Checkbox />
    </div>
  );
}

function TableRow() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Table Row">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <TableRow1 />
        </div>
      </div>
      <div aria-hidden className="absolute border-[#e4e1db] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function CheckboxColumn1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[62px]" data-name="Checkbox Column">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#252525] text-[14px] w-[96px]">v7</p>
    </div>
  );
}

function ChangeSummaryColumn1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100px]" data-name="Change Summary Column">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] absolute decoration-dotted decoration-from-font font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#161616] text-[14px] top-0 underline whitespace-nowrap">Operating</p>
    </div>
  );
}

function DeploymentUrlColumn1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102px]" data-name="Deployment URL Column">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Regular',sans-serif] h-[20px] leading-[20px] left-[-0.67px] not-italic overflow-hidden text-[#161616] text-[14px] text-ellipsis top-0 w-[142px] whitespace-nowrap">Production</p>
    </div>
  );
}

function UpdatedByColumn1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[107px]" data-name="Updated By Column">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] left-[0.4px] not-italic text-[#161616] text-[14px] top-0 whitespace-nowrap">Default</p>
    </div>
  );
}

function StateAfterChangeColumn() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[118px]" data-name="State after change Column">
      <div className="bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col h-[24px] items-center justify-center px-[8px] relative rounded-[6px] shrink-0" data-name="Tag">
        <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(37,37,37,0.6)] text-center tracking-[-0.12px] whitespace-nowrap">32GB</p>
      </div>
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="checkbox">
      <CheckboxColumn1 />
      <ChangeSummaryColumn1 />
      <DeploymentUrlColumn1 />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] w-[102px]">Shared</p>
      <UpdatedByColumn1 />
      <StateAfterChangeColumn />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative" data-name="Table Row">
      <Checkbox1 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="bg-[#edf2fc] h-[48px] relative rounded-[6px] shrink-0 w-full" data-name="Table Row">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative size-full">
          <TableRow3 />
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[648px]">
      <TableRow />
      <TableRow2 />
    </div>
  );
}

function Tile1() {
  return (
    <div className="absolute bg-white left-[4px] rounded-[12px] top-[429px] w-[672px]" data-name="Tile">
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <HStack1 />
        <Frame61 />
      </div>
      <div aria-hidden className="absolute border border-[#dbdbdc] border-solid inset-[-1px] pointer-events-none rounded-[13px] shadow-[0px_1px_4px_0px_rgba(74,87,120,0.03),0px_4px_12px_0px_rgba(74,87,120,0.09)]" />
    </div>
  );
}

function Thread() {
  return (
    <div className="absolute h-[803px] left-[50px] top-[41px] w-[680px]" data-name="Thread">
      <Group1 />
      <Group2 />
      <Tile />
      <Tile1 />
    </div>
  );
}

function UserInputChat() {
  return (
    <div className="absolute bg-[#f1f3f7] content-stretch flex items-center justify-center left-[484px] max-w-[320px] px-[16px] py-[8px] rounded-[12px] top-[41px] w-[246px]" data-name="user_input_chat">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#282828] text-[14px]">Hey, I need to edit an LPAR profile</p>
    </div>
  );
}

function UserInputChat1() {
  return (
    <div className="absolute bg-[#f1f3f7] content-stretch flex items-center justify-center left-[535px] max-w-[320px] px-[16px] py-[8px] rounded-[12px] top-[349px] w-[195px]" data-name="user_input_chat">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#282828] text-[14px]">LPAR profile configuration</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#252525] text-[14px] whitespace-nowrap">Ask permissions</p>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="Icon">
        <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
              <path d={svgPaths.p32d32200} fill="var(--fill-0, #252525)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-[#f1f3f7] content-stretch flex h-[32px] items-center px-[10px] relative rounded-[8000px] shrink-0">
      <Frame34 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <Frame35 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#252525] text-[14px] whitespace-nowrap">Claud-opus-4.9</p>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="Icon">
        <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
              <path d={svgPaths.p32d32200} fill="var(--fill-0, #252525)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#f1f3f7] content-stretch flex h-[32px] items-center px-[10px] relative rounded-[8000px] shrink-0">
      <Frame37 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <Frame36 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#252525] text-[14px] whitespace-nowrap">Medium</p>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="Icon">
        <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.7">
              <path d={svgPaths.p32d32200} fill="var(--fill-0, #252525)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[#f1f3f7] content-stretch flex h-[32px] items-center px-[10px] relative rounded-[8000px] shrink-0">
      <Frame39 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <Frame38 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center left-[325px] top-[782px]">
      <Frame50 />
      <Frame51 />
      <Frame52 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#131318] content-stretch flex items-center opacity-20 p-[8px] relative rounded-[8000px] shrink-0">
      <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Arrow--up">
        <div className="absolute inset-[12.5%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p229a2d31} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="Icon">
        <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
              <g id="Vector">
                <path d={svgPaths.p21417800} fill="#252525" fillOpacity="0.6" />
                <path d={svgPaths.p2a3480} fill="#252525" fillOpacity="0.6" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <Frame8 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute left-[50px] max-w-[680px] rounded-[8000px] top-[702px] w-[680px]" data-name="Input">
      <div className="content-stretch flex gap-[12px] items-center max-w-[inherit] overflow-clip pl-[20px] pr-[16px] py-[16px] relative rounded-[inherit] size-full">
        <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="Icon">
          <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[15.63%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                <path d={svgPaths.p3f51b740} fill="var(--fill-0, #252525)" fillOpacity="0.6" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[16px] text-[rgba(37,37,37,0.35)]">Describe your LinuxONE goal</p>
        <Frame40 />
        <div className="absolute h-[28px] left-[41px] top-[18px] w-[13px]" data-name="Blinking Cursor1">
          <div className="absolute bg-[#0043ce] h-[18px] left-[6px] top-[5px] w-px" data-name="Cursor" />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d0d1] border-solid inset-0 pointer-events-none rounded-[8000px]" />
    </div>
  );
}

function TertiaryBadgeShortcut() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[295px] px-[5px] rounded-[5px] top-[788px]" data-name="tertiary_badge_shortcut">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(37,37,37,0.6)] whitespace-nowrap">@</p>
    </div>
  );
}

function Playground1() {
  return (
    <div className="absolute bottom-[-57px] left-[6px] overflow-clip top-[2px] w-[776px]" data-name="Playground">
      <Thread />
      <UserInputChat />
      <UserInputChat1 />
      <Frame54 />
      <Input />
      <TertiaryBadgeShortcut />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[3px] items-center justify-center px-[5px] relative rounded-[5px] shrink-0">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.04)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#7f7f7f] text-[14px] whitespace-nowrap">⌥</p>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#7f7f7f] text-[14px] whitespace-nowrap">T</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-w-px relative">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Playground</p>
      <Frame23 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-[#282828] content-stretch flex h-[60px] items-start left-[12px] overflow-clip p-[20px] right-[12px] rounded-[16px] top-[24px]">
      <Frame24 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[109px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#282828] text-[16px] whitespace-nowrap">Insights</p>
      <div className="relative shrink-0 size-[6px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" fill="var(--fill-0, #E01E5A)" id="Ellipse 1369" r="3" />
        </svg>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[3px] items-center justify-center px-[5px] relative rounded-[5px] shrink-0">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(37,37,37,0.6)] whitespace-nowrap">⌥</p>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(37,37,37,0.6)] whitespace-nowrap">E</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame41 />
      <Frame26 />
    </div>
  );
}

function Graphic() {
  return (
    <div className="h-[113.9px] relative shrink-0 w-[161.58px]" data-name="Graphic">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 161.58 113.901">
        <g id="Graphic">
          <circle cx="135.581" cy="87.9014" fill="var(--fill-0, #42C066)" id="Circle 11" opacity="0.999137" r="25.999" />
          <circle cx="149.891" cy="49.7075" fill="var(--fill-0, #42C066)" id="Circle 10" opacity="0.54424" r="11.5551" />
          <circle cx="112.75" cy="51.2186" fill="var(--fill-0, #42C066)" id="Circle 09" opacity="0.27186" r="13.3866" />
          <circle cx="95.4206" cy="19.2585" fill="var(--fill-0, #42C066)" id="Circle 08" opacity="0.504104" r="19.2585" />
          <circle cx="131.801" cy="33.8594" fill="var(--fill-0, #42C066)" id="Circle 07" opacity="0.518949" r="6.53517" />
          <circle cx="62.5903" cy="38.5161" fill="var(--fill-0, #42C066)" id="Circle 06" opacity="0.497454" r="11.5551" />
          <circle cx="96.7747" cy="74.9016" fill="var(--fill-0, #42C066)" id="Circle 05" opacity="0.3998" r="7.22195" />
          <circle cx="84.2571" cy="52.6634" fill="var(--fill-0, #42C066)" id="Circle 04" opacity="0.483193" r="7.22195" />
          <circle cx="11.5551" cy="102.344" fill="var(--fill-0, #42C066)" id="Circle 03" opacity="0.621235" r="11.5551" />
          <circle cx="96.2934" cy="102.344" fill="var(--fill-0, #42C066)" id="Circle 02" opacity="0.654953" r="11.5551" />
          <circle cx="55.8487" cy="85.0128" fill="var(--fill-0, #42C066)" id="Circle 01" opacity="0.95987" r="28.8878" />
        </g>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-[#eceef2] content-stretch flex flex-col h-[284px] items-start justify-between left-[12px] overflow-clip p-[20px] right-[12px] rounded-[16px] top-[96px]">
      <Frame25 />
      <Graphic />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[3px] items-center justify-center px-[5px] relative rounded-[5px] shrink-0">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(37,37,37,0.6)] whitespace-nowrap">⌥</p>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(37,37,37,0.6)] whitespace-nowrap">E</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#282828] text-[16px] whitespace-nowrap">Pipeline</p>
      <Frame28 />
    </div>
  );
}

function DocumentCountTickets() {
  return (
    <div className="bg-[#d08902] col-1 h-[15.357px] ml-0 mt-[52.9px] relative row-1 w-[64.075px]" data-name="DocumentCountTickets">
      <div className="flex flex-row items-center size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function DocumentCountTickets1() {
  return (
    <div className="bg-[#002ea2] col-1 h-[17.61px] ml-0 mt-0 relative row-1 w-[88.725px]" data-name="DocumentCountTickets">
      <div className="flex flex-row items-center size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function DocumentCountTickets2() {
  return (
    <div className="bg-[#004110] col-1 h-[18.019px] ml-0 mt-[17.61px] relative row-1 w-[88.725px]" data-name="DocumentCountTickets">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function DocumentCountTickets3() {
  return (
    <div className="bg-[#002ea2] col-1 h-[17.61px] ml-0 mt-[35.63px] relative row-1 w-[64.079px]" data-name="DocumentCountTickets">
      <div className="flex flex-row items-center size-full">
        <div className="relative size-full" />
      </div>
    </div>
  );
}

function Visualisation() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Visualisation">
      <DocumentCountTickets />
      <DocumentCountTickets1 />
      <DocumentCountTickets2 />
      <DocumentCountTickets3 />
    </div>
  );
}

function PipelineIcon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[91px]" data-name="PipelineIcon6">
      <Visualisation />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute bg-[#eceef2] content-stretch flex flex-col h-[284px] items-start justify-between left-[12px] overflow-clip p-[20px] right-[12px] rounded-[16px] top-[392px]">
      <Frame27 />
      <PipelineIcon />
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bottom-[147px] left-[1144px] overflow-clip top-[-58px] w-[256px]">
      <Frame32 />
      <Frame33 />
      <Frame42 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[20px] items-start left-[20px] right-[26px] top-[23px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#282828] text-[16px] whitespace-nowrap">Artifacts</p>
    </div>
  );
}

function Tag1() {
  return (
    <div className="absolute bg-[#defbe6] content-stretch flex h-[24px] items-center justify-end left-[179px] px-[8px] py-[6px] rounded-[6px] top-[19px]" data-name="Tag">
      <div aria-hidden className="absolute border border-[rgba(25,64,0,0.05)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#161616] text-[12px] text-center tracking-[-0.12px] whitespace-nowrap">4 files</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute bg-[#f4f8ff] h-[359px] left-[35px] overflow-clip right-[14px] rounded-[16px] top-[392px]">
      <Frame30 />
      <Tag1 />
    </div>
  );
}

function IconMargin() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0" data-name="Icon margin">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark--outline">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p2e51ba00} fill="#0F62FE" />
              <path d={svgPaths.p15c6c200} fill="#0F62FE" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconLabel() {
  return (
    <div className="relative shrink-0 w-full" data-name="Icon + Label">
      <div className="content-stretch flex gap-[8px] items-start pl-[10px] relative size-full">
        <IconMargin />
        <div className="content-stretch flex flex-col h-[18px] items-start overflow-clip relative shrink-0" data-name="_Progress indicator step label base">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ol className="[word-break:break-word] block font-['IBM_Plex_Sans:Regular',sans-serif] leading-[0] list-decimal not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] whitespace-nowrap" start="14">
            <li className="ms-[21px]">
              <span className="leading-[18px]">Apply</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function OptionalLabel() {
  return (
    <div className="relative shrink-0 w-full" data-name="Optional label">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pl-[34px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#525252] text-[12px] tracking-[0.32px]">Optional label</p>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-start pr-[16px] relative size-full">
        <IconLabel />
        <OptionalLabel />
      </div>
    </div>
  );
}

function MinWidth() {
  return <div className="h-[0.001px] relative shrink-0 w-[128px]" data-name="Min-width" />;
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Content1 />
      <MinWidth />
    </div>
  );
}

function MinHeight() {
  return <div className="h-[58px] relative shrink-0 w-[0.001px]" data-name="Min-height" />;
}

function IconMargin1() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0" data-name="Icon margin">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark--outline">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p2e51ba00} fill="#0F62FE" />
              <path d={svgPaths.p15c6c200} fill="#0F62FE" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconLabel1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Icon + Label">
      <div className="content-stretch flex gap-[8px] items-start pl-[10px] relative size-full">
        <IconMargin1 />
        <div className="content-stretch flex flex-col h-[18px] items-start overflow-clip relative shrink-0" data-name="_Progress indicator step label base">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ol className="[word-break:break-word] block font-['IBM_Plex_Sans:Regular',sans-serif] leading-[0] list-decimal not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] whitespace-nowrap" start="15">
            <li className="ms-[21px]">
              <span className="leading-[18px]">Complete apply</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function OptionalLabel1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Optional label">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pl-[34px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#525252] text-[12px] tracking-[0.32px]">Apply timeline complete</p>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-start pr-[16px] relative size-full">
        <IconLabel1 />
        <OptionalLabel1 />
      </div>
    </div>
  );
}

function MinWidth1() {
  return <div className="h-[0.001px] relative shrink-0 w-[128px]" data-name="Min-width" />;
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Content3 />
      <MinWidth1 />
    </div>
  );
}

function MinHeight1() {
  return <div className="h-[58px] relative shrink-0 w-[0.001px]" data-name="Min-height" />;
}

function IconMargin2() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0" data-name="Icon margin">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark--outline">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p2e51ba00} fill="#0F62FE" />
              <path d={svgPaths.p15c6c200} fill="#0F62FE" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconLabel2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Icon + Label">
      <div className="content-stretch flex gap-[8px] items-start pl-[10px] relative size-full">
        <IconMargin2 />
        <div className="content-stretch flex flex-col h-[18px] items-start overflow-clip relative shrink-0" data-name="_Progress indicator step label base">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ol className="[word-break:break-word] block font-['IBM_Plex_Sans:Regular',sans-serif] leading-[0] list-decimal not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] whitespace-nowrap" start="16">
            <li className="ms-[21px]">
              <span className="leading-[18px]">Verify final profile</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function OptionalLabel2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Optional label">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pl-[34px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#525252] text-[12px] tracking-[0.32px]">Final read-back matched</p>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-start pr-[16px] relative size-full">
        <IconLabel2 />
        <OptionalLabel2 />
      </div>
    </div>
  );
}

function MinWidth2() {
  return <div className="h-[0.001px] relative shrink-0 w-[128px]" data-name="Min-width" />;
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Content5 />
      <MinWidth2 />
    </div>
  );
}

function MinHeight2() {
  return <div className="h-[58px] relative shrink-0 w-[0.001px]" data-name="Min-height" />;
}

function IconMargin3() {
  return (
    <div className="content-stretch flex items-start py-px relative shrink-0" data-name="Icon margin">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark--outline">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p2e51ba00} fill="#0F62FE" />
              <path d={svgPaths.p15c6c200} fill="#0F62FE" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconLabel3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Icon + Label">
      <div className="content-stretch flex gap-[8px] items-start pl-[10px] relative size-full">
        <IconMargin3 />
        <div className="content-stretch flex flex-col h-[18px] items-start overflow-clip relative shrink-0" data-name="_Progress indicator step label base">
          <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
          <ol className="[word-break:break-word] block font-['IBM_Plex_Sans:Regular',sans-serif] leading-[0] list-decimal not-italic relative shrink-0 text-[#161616] text-[14px] tracking-[0.16px] whitespace-nowrap" start="17">
            <li className="ms-[21px]">
              <span className="leading-[18px]">Close out session</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function OptionalLabel3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Optional label">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pl-[34px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#525252] text-[12px] tracking-[0.32px]">Final packet ready</p>
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-start pr-[16px] relative size-full">
        <IconLabel3 />
        <OptionalLabel3 />
      </div>
    </div>
  );
}

function MinWidth3() {
  return <div className="h-[0.001px] relative shrink-0 w-[128px]" data-name="Min-width" />;
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Content7 />
      <MinWidth3 />
    </div>
  );
}

function MinHeight3() {
  return <div className="h-[58px] relative shrink-0 w-[0.001px]" data-name="Min-height" />;
}

function ProgressIndicator() {
  return (
    <div className="absolute h-[174px] left-[10px] top-[-9px] w-[219px]" data-name="Progress indicator">
      <div className="absolute content-stretch flex h-[58px] items-start left-[12px] right-[12px] top-0" data-name="_Progress indicator item">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div aria-hidden className="absolute border-[#0f62fe] border-l-2 border-solid inset-0 pointer-events-none" />
        <Content />
        <MinHeight />
      </div>
      <div className="absolute content-stretch flex h-[58px] items-start left-[12px] right-[12px] top-[58px]" data-name="_Progress indicator item">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div aria-hidden className="absolute border-[#0f62fe] border-l-2 border-solid inset-0 pointer-events-none" />
        <Content2 />
        <MinHeight1 />
      </div>
      <div className="absolute content-stretch flex h-[58px] items-start left-[12px] right-[12px] top-[116px]" data-name="_Progress indicator item">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div aria-hidden className="absolute border-[#0f62fe] border-l-2 border-solid inset-0 pointer-events-none" />
        <Content4 />
        <MinHeight2 />
      </div>
      <div className="absolute content-stretch flex h-[58px] items-start left-[12px] right-[12px] top-[174px]" data-name="_Progress indicator item">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0)] inset-0 mix-blend-multiply pointer-events-none" />
        <div aria-hidden className="absolute border-[#0f62fe] border-l-2 border-solid inset-0 pointer-events-none" />
        <Content6 />
        <MinHeight3 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[208px] left-[0.38px] overflow-clip right-[0.38px] top-[59.38px]" data-name="Container">
      <ProgressIndicator />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[20.625px] left-[24px] top-[19.38px] w-[68.848px]" data-name="Heading 3">
      <p className="[word-break:break-word] absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[normal] left-[-0.34px] not-italic text-[#111827] text-[16px] top-0 tracking-[-0.32px] whitespace-nowrap">Workflow</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute border-[#e5e7eb] border-b-[0.625px] border-solid drop-shadow-[0px_1px_2px_rgba(74,87,120,0.03),0px_4px_6px_rgba(74,87,120,0.09)] h-[59.25px] left-0 overflow-clip right-0 top-0" data-name="Container">
      <Heading />
      <div className="absolute bg-[rgba(255,255,255,0)] left-[199.38px] overflow-clip rounded-[2px] size-[24px] top-[16.38px]" data-name="Chevron--down">
        <div className="absolute inset-[33.13%_18.75%_31.25%_18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 8.55">
            <path d={svgPaths.p34844b80} fill="var(--fill-0, #161616)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChatTaskStepper() {
  return (
    <div className="absolute bg-[#f4f8ff] border-[#e5e7eb] border-[0.625px] border-solid h-[286px] left-[34px] overflow-clip right-[15px] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04),0px_4px_12px_0px_rgba(16,24,40,0.02)] top-[89px]" data-name="chat_task_stepper">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#f7faff] gap-x-[20px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] h-[58px] left-[45px] p-[10px] rounded-[6px] top-[457px] w-[220px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] justify-self-start leading-[18px] not-italic relative self-stretch shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-[152px]">Target and guardrails</p>
      <div className="relative rounded-[6px] self-stretch shrink-0 w-[21px]" data-name="button / 04 ghost / small / 03 icon / 01 enabled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Icon">
          <div className="absolute inset-[15.63%_3.13%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9996 11">
              <g id="Vector">
                <path d={svgPaths.p22f74d00} fill="#161616" />
                <path d={svgPaths.p1c972000} fill="#161616" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] justify-self-stretch leading-[0] not-italic relative self-stretch shrink-0 text-[#525252] text-[12px] tracking-[0.32px]">
        <span className="leading-[16px]">Size</span>
        <span className="leading-[16px]">{` ·`}</span>
        <span className="leading-[16px]">{` 25 MB`}</span>
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute gap-x-[20px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] h-[58px] left-[45px] p-[10px] rounded-[6px] top-[527px] w-[220px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] justify-self-start leading-[18px] not-italic relative self-stretch shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-[152px]">Proposed state</p>
      <div className="relative rounded-[6px] self-stretch shrink-0 w-[21px]" data-name="button / 04 ghost / small / 03 icon / 01 enabled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Icon">
          <div className="absolute inset-[15.63%_3.13%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9996 11">
              <g id="Vector">
                <path d={svgPaths.p22f74d00} fill="#161616" />
                <path d={svgPaths.p1c972000} fill="#161616" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] justify-self-stretch leading-[0] not-italic relative self-stretch shrink-0 text-[#525252] text-[12px] tracking-[0.32px]">
        <span className="leading-[16px]">Size</span>
        <span className="leading-[16px]">{` ·`}</span>
        <span className="leading-[16px]">{` 25 MB`}</span>
      </p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute gap-x-[20px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] h-[58px] left-[45px] p-[10px] rounded-[6px] top-[597px] w-[220px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] justify-self-start leading-[18px] not-italic relative self-stretch shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-[167px]">Twin profile preparation</p>
      <div className="relative rounded-[6px] self-stretch shrink-0 w-[21px]" data-name="button / 04 ghost / small / 03 icon / 01 enabled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Icon">
          <div className="absolute inset-[15.63%_3.13%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9996 11">
              <g id="Vector">
                <path d={svgPaths.p22f74d00} fill="#161616" />
                <path d={svgPaths.p1c972000} fill="#161616" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] justify-self-stretch leading-[0] not-italic relative self-stretch shrink-0 text-[#525252] text-[12px] tracking-[0.32px]">
        <span className="leading-[16px]">Size</span>
        <span className="leading-[16px]">{` ·`}</span>
        <span className="leading-[16px]">{` 25 MB`}</span>
      </p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="absolute gap-x-[20px] gap-y-[4px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] h-[58px] left-[45px] p-[10px] rounded-[6px] top-[667px] w-[220px]">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] justify-self-start leading-[18px] not-italic relative self-stretch shrink-0 text-[#161616] text-[14px] tracking-[0.16px] w-[152px]">Twin comparison</p>
      <div className="relative rounded-[6px] self-stretch shrink-0 w-[21px]" data-name="button / 04 ghost / small / 03 icon / 01 enabled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Icon">
          <div className="absolute inset-[15.63%_3.13%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9996 11">
              <g id="Vector">
                <path d={svgPaths.p22f74d00} fill="#161616" />
                <path d={svgPaths.p1c972000} fill="#161616" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] justify-self-stretch leading-[0] not-italic relative self-stretch shrink-0 text-[#525252] text-[12px] tracking-[0.32px]">
        <span className="leading-[16px]">Size</span>
        <span className="leading-[16px]">{` ·`}</span>
        <span className="leading-[16px]">{` 25 MB`}</span>
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute h-[904px] left-[770px] overflow-clip top-[-58px] w-[289px]">
      <Frame43 />
      <ChatTaskStepper />
      <Frame />
      <Frame44 />
      <Frame45 />
      <Frame46 />
    </div>
  );
}

function Main1() {
  return (
    <div className="absolute h-[789px] left-0 right-0 top-[138px]" data-name="Main">
      <Playground1 />
      <Frame22 />
      <Frame29 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white inset-[0_20px_36px_351px] overflow-clip rounded-[8px]">
      <Frame10 />
      <Main1 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="content-stretch flex items-start overflow-clip relative" data-name="Icon">
            <div className="bg-[rgba(255,255,255,0)] overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
                  <path d={svgPaths.p15946500} fill="var(--fill-0, white)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[#2b2c2c] content-stretch flex h-[32px] items-center px-[10px] relative rounded-[8000px] shrink-0">
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <Frame47 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[#202020] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[16px] items-start justify-end p-[12px] relative size-full">
          <Frame49 />
        </div>
      </div>
    </div>
  );
}

function LabelWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Label Wrapper">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['IBM_Plex_Sans:Text',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#7f7f7f] text-[14px] whitespace-nowrap">Search sessions</p>
    </div>
  );
}

function LabelWrapper1() {
  return <div className="content-stretch flex h-[8px] items-center justify-center relative shrink-0 w-[25px]" data-name="Label Wrapper" />;
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <div className="bg-[rgba(236,238,242,0.1)] flex-[1_0_0] h-[40px] min-w-px relative rounded-[12px]" data-name="Input Field">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[12px] relative size-full">
            <LabelWrapper />
            <LabelWrapper1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[16px] relative size-full">
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] min-w-px not-italic relative text-[14px] text-white">LPAR profile configuration</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px relative">
      <div className="bg-[rgba(255,255,255,0)] relative shrink-0 size-[16px]" data-name="Status notification">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 overflow-clip" data-name="Checkmark--filled">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPaths.p361304f0} fill="var(--fill-0, #91FFA3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame13 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Frame53 />
          <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-right text-white w-[66px]">Active</p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] min-w-px not-italic relative text-[14px] text-white">Decision required UX</p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px relative">
      <div className="bg-[rgba(255,255,255,0)] relative shrink-0 size-[16px]" data-name="Status notification">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 overflow-clip" data-name="Checkmark--filled">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPaths.p361304f0} fill="var(--fill-0, #91FFA3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame14 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Frame55 />
          <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] h-[16px] leading-[20px] not-italic relative shrink-0 text-[14px] text-right text-white w-[66px]">2h</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] min-w-px not-italic relative text-[14px] text-white">Migration scoped approval</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[195px]">
      <div className="bg-[rgba(255,255,255,0)] relative shrink-0 size-[16px]" data-name="Status notification">
        <div className="absolute bg-black inset-[18.75%_37.5%]" data-name="Fill" />
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 overflow-clip" data-name="Warning--filled">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPaths.p21ead80} fill="var(--fill-0, #FFB921)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame15 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Frame56 />
          <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-right text-white w-[82px]">14m</p>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
      <p className="[word-break:break-word] flex-[1_0_0] font-['IBM_Plex_Sans:Text',sans-serif] leading-[20px] min-w-px not-italic relative text-[14px] text-white">Bind target CPC / LPAR</p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px relative">
      <div className="bg-[rgba(255,255,255,0)] relative shrink-0 size-[16px]" data-name="Status notification">
        <div className="absolute bg-white bottom-[18.75%] left-1/4 right-1/4 top-[18.75%]" data-name="Fill" />
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 overflow-clip" data-name="Warning--filled">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPaths.p21ead80} fill="var(--fill-0, #DA1E28)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame31 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Frame57 />
          <p className="[word-break:break-word] font-['IBM_Plex_Sans:Light',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-right text-white w-[80px]">14m</p>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Body">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start py-[16px] relative size-full">
          <Frame11 />
          <Frame16 />
          <Frame17 />
          <Frame20 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function SessionHistory() {
  return (
    <div className="absolute content-stretch flex flex-col h-[453px] items-center justify-between left-[13px] rounded-[8px] top-[7px] w-[325px]" data-name="session_history">
      <Frame9 />
      <Body />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute h-[1040px] left-0 overflow-clip right-0 top-[100px]" data-name="Main">
      <Frame7 />
      <SessionHistory />
    </div>
  );
}

function Playground() {
  return (
    <div className="absolute bg-[#131313] h-[1140px] left-0 overflow-clip top-0 w-[1488px]" data-name="Playground">
      <Navigation />
      <Main />
    </div>
  );
}

export default function Group() {
  return (
    <div className="contents relative size-full">
      <Playground />
    </div>
  );
}