import svgPaths from "./svg-9syr8bbgc5";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="Icon">
          <path d="M8.75 10.5L5.25 7L8.75 3.5" id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Button">
      <Icon />
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#8d8d8d] text-[12px] text-center whitespace-nowrap">Back</p>
    </div>
  );
}

function Container() {
  return <div className="bg-[#393939] h-[16px] relative shrink-0 w-px" data-name="Container" />;
}

function Text() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start overflow-clip relative shrink-0 w-[122.203px]" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#8d8d8d] text-[12px] whitespace-nowrap">IBM Cloudability failed</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[rgba(218,30,40,0.13)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#da1e28] text-[11px] whitespace-nowrap">Critical</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[214.813_0_0] gap-[8px] items-center min-w-px relative" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pr-[2px] relative shrink-0 w-[50px]" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#f4f4f4] text-[11px] whitespace-nowrap">Dock side</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_4062_2575)" id="Icon">
          <path d={svgPaths.p2fb33100} id="Vector" stroke="var(--stroke-0, #F4F4F4)" strokeWidth="1.5" />
          <path d={svgPaths.p15948c80} fill="var(--fill-0, #F4F4F4)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_4062_2575">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center p-[3px] relative rounded-[3px] shrink-0" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_4062_2586)" id="Icon">
          <path d={svgPaths.p2fb33100} id="Vector" stroke="var(--stroke-0, #0043CE)" strokeWidth="1.5" />
          <path d={svgPaths.p1c8adf80} fill="var(--fill-0, #0043CE)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_4062_2586">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center p-[3px] relative rounded-[3px] shrink-0" data-name="Button">
      <Icon2 />
    </div>
  );
}

function DockSide() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="DockSide">
      <Text2 />
      <Button1 />
      <Button2 />
    </div>
  );
}

function GuidedSidePanel() {
  return (
    <div className="border-[#393939] border-b border-solid content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative shrink-0 w-full" data-name="GuidedSidePanel">
      <Button />
      <Container />
      <Container1 />
      <DockSide />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] text-center tracking-[0.7px] uppercase whitespace-nowrap">Evidence</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] text-center whitespace-nowrap">· 4 items</p>
    </div>
  );
}

function Container2() {
  return <div className="flex-[260.633_0_0] h-0 min-w-px relative" data-name="Container" />;
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #8D8D8D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[8px] relative shrink-0 w-[419px]" data-name="Button">
      <Text3 />
      <Text4 />
      <Container2 />
      <Icon3 />
    </div>
  );
}

function GuidedSidePanel1() {
  return (
    <div className="border-[#393939] border-b border-solid content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="GuidedSidePanel">
      <Button3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[9px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="9" preserveAspectRatio="none" viewBox="0 0 9 9" width="9">
        <g id="Icon">
          <path d={svgPaths.p2b4b6d80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M4.5 7.125H7.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#0043ce] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[20px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex items-start pt-[2px] relative shrink-0" data-name="Container:margin">
      <Container4 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[19.8px] not-italic relative shrink-0 text-[#c6c6c6] text-[12px] w-[363px]">{`Three RDS instances at ~$943.5/mo each are the primary driver — that's $2,830/mo before storage. Three changes can bring the total under the $588 guardrail.`}</p>
    </div>
  );
}

function Container9() {
  return <div className="bg-[#da1e28] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] whitespace-nowrap">module.rds.aws_db_instance.main[0,3,4]</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Container9 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#da1e28] text-[10px] text-right whitespace-nowrap">$943.5/mo × 3 = $2,830/mo</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="border-[#393939] border-b border-solid content-stretch flex items-center justify-between px-[9px] py-[5px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Text6 />
    </div>
  );
}

function Container12() {
  return <div className="bg-[#d97706] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] whitespace-nowrap">gp2_description storage component</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Container12 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#d97706] text-[10px] text-right whitespace-nowrap">+$12.51 · gp2 volume type</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#262626] border-[#393939] border-b border-solid content-stretch flex items-center justify-between px-[9px] py-[5px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Text8 />
    </div>
  );
}

function Container15() {
  return <div className="bg-[#da1e28] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] whitespace-nowrap">Guardrail limit</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Container15 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#da1e28] text-[10px] text-right whitespace-nowrap">$588 · currently exceeded by ~$2,255</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-center justify-between px-[9px] py-[5px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Text10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="border border-[#393939] border-solid content-stretch flex flex-col h-[79px] items-start overflow-clip relative rounded-[5px] shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container10 />
      <Container13 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[363_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph />
      <ContainerMargin1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container5 />
    </div>
  );
}

function Container16() {
  return <div className="h-0 relative shrink-0 w-full" data-name="Container" />;
}

function GuidedSidePanel2() {
  return (
    <div className="content-stretch flex flex-[909_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip px-[14px] py-[12px] relative w-full" data-name="GuidedSidePanel">
      <Container3 />
      <Container16 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[9px] tracking-[0.63px] uppercase whitespace-nowrap">What would you like to do?</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#c6c6c6] text-[11px] whitespace-nowrap">Why are there 3 separate instances?</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[354px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] whitespace-nowrap">Consolidate to Multi-AZ or Aurora — biggest saving</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-[354_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[11px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="11" preserveAspectRatio="none" viewBox="0 0 11 11" width="11">
        <g id="Icon">
          <path d="M2.29167 5.5H8.70833" id="Vector" stroke="var(--stroke-0, #0043CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.916667" />
          <path d={svgPaths.p3ed2e300} id="Vector_2" stroke="var(--stroke-0, #0043CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.916667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#262626] border border-[#393939] border-solid content-stretch flex gap-[8px] items-center px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-[395px]" data-name="Button">
      <Container18 />
      <Icon5 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#c6c6c6] text-[11px] whitespace-nowrap">What instance class is this?</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[354px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] whitespace-nowrap">Right-size to a smaller class</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-[354_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[11px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="11" preserveAspectRatio="none" viewBox="0 0 11 11" width="11">
        <g id="Icon">
          <path d="M2.29167 5.5H8.70833" id="Vector" stroke="var(--stroke-0, #0043CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.916667" />
          <path d={svgPaths.p3ed2e300} id="Vector_2" stroke="var(--stroke-0, #0043CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.916667" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#262626] border border-[#393939] border-solid content-stretch flex gap-[8px] items-center px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-[395px]" data-name="Button">
      <Container19 />
      <Icon6 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#c6c6c6] text-[11px] whitespace-nowrap">{`What's the quickest low-risk change?`}</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[354px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8d8d8d] text-[10px] whitespace-nowrap">gp2 → gp3 storage, zero downtime</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-[354_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[11px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="11" preserveAspectRatio="none" viewBox="0 0 11 11" width="11">
        <g id="Icon">
          <path d="M2.29167 5.5H8.70833" id="Vector" stroke="var(--stroke-0, #0043CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.916667" />
          <path d={svgPaths.p3ed2e300} id="Vector_2" stroke="var(--stroke-0, #0043CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.916667" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#262626] border border-[#393939] border-solid content-stretch flex gap-[8px] items-center px-[10px] py-[8px] relative rounded-[6px] shrink-0 w-[395px]" data-name="Button">
      <Container20 />
      <Icon7 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#262626] border border-[#393939] border-solid content-stretch flex flex-col h-[34px] items-start justify-center overflow-clip px-[10px] py-[7px] relative rounded-[6px] shrink-0 w-[395px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(198,198,198,0.5)] w-full">Or type a response…</p>
    </div>
  );
}

function GuidedSidePanel3() {
  return (
    <div className="bg-[#111] border-[#393939] border-solid border-t content-stretch flex flex-col gap-[8px] items-start px-[12px] py-[10px] relative shrink-0 w-full" data-name="GuidedSidePanel">
      <Paragraph1 />
      <Container17 />
      <TextInput />
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#131313] border-[#393939] border-l border-solid content-stretch flex flex-col items-start relative size-full" data-name="App">
      <GuidedSidePanel />
      <GuidedSidePanel1 />
      <GuidedSidePanel2 />
      <GuidedSidePanel3 />
    </div>
  );
}