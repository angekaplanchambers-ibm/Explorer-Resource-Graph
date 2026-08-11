function Container3() {
  return <div className="bg-[#da1e28] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[11px] whitespace-nowrap">module.rds.aws_db_instance.main[0,3,4]</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container3 />
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

function Container1() {
  return (
    <div className="border-[#393939] border-b border-solid content-stretch flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Text1 />
    </div>
  );
}

function Container6() {
  return <div className="bg-[#d97706] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[11px] whitespace-nowrap">gp2_description storage component</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container6 />
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

function Container4() {
  return (
    <div className="bg-[#262626] border-[#393939] border-b border-solid content-stretch flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Text3 />
    </div>
  );
}

function Container9() {
  return <div className="bg-[#da1e28] relative rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#8d8d8d] text-[11px] whitespace-nowrap">Guardrail limit</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container9 />
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

function Container7() {
  return (
    <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Text5 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="border border-[#393939] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[10px] size-full" data-name="Container">
      <Container1 />
      <Container4 />
      <Container7 />
    </div>
  );
}