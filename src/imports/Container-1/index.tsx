import svgPaths from "./svg-xsg92cg9th";

function Icon() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 10 10" width="10">
        <g id="Icon">
          <path d={svgPaths.p36defe80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d="M5 7.91667H8.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#0043ce] content-stretch flex items-center justify-center relative rounded-[11px] shrink-0 size-[22px]" data-name="Container">
      <Icon />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex items-start pt-[2px] relative shrink-0" data-name="Container:margin">
      <Container2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[21.45px] not-italic relative shrink-0 text-[#c6c6c6] text-[13px] whitespace-nowrap">{`Three RDS instances at ~$943.5/mo each are the primary driver — that's $2,830/mo before storage. Three changes can bring the total under the $588 guardrail.`}</p>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#da1e28] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[11px] whitespace-nowrap">module.rds.aws_db_instance.main[0,3,4]</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container7 />
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#da1e28] text-[11px] text-right whitespace-nowrap">$943.5/mo × 3 = $2,830/mo</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="border-[#393939] border-b border-solid content-stretch flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Text1 />
    </div>
  );
}

function Container10() {
  return <div className="bg-[#d97706] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[11px] whitespace-nowrap">gp2_description storage component</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container10 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#d97706] text-[11px] text-right whitespace-nowrap">+$12.51 · gp2 volume type</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#262626] border-[#393939] border-b border-solid content-stretch flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Text3 />
    </div>
  );
}

function Container13() {
  return <div className="bg-[#da1e28] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[11px] whitespace-nowrap">Guardrail limit</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container13 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Medium',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#da1e28] text-[11px] text-right whitespace-nowrap">$588 · currently exceeded by ~$2,255</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Text5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="border border-[#393939] border-solid content-stretch flex flex-col h-[101.5px] items-start overflow-clip relative rounded-[10px] shrink-0 w-[718.125px]" data-name="Container">
      <Container5 />
      <Container8 />
      <Container11 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[10px] relative shrink-0" data-name="Container:margin">
      <Container4 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1436.25_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph />
      <ContainerMargin1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container3 />
    </div>
  );
}

function Container14() {
  return <div className="h-0 relative shrink-0 w-full" data-name="Container" />;
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start px-[16px] py-[12px] relative size-full" data-name="Container">
      <Container1 />
      <Container14 />
    </div>
  );
}