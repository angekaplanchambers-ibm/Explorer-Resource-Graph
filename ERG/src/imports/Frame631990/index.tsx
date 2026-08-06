import svgPaths from "./svg-nwftx8fw3o";

function LeadingIcon() {
  return (
    <div className="relative shrink-0" data-name="Leading Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="relative shrink-0 size-[12px]" data-name="Leading Icon">
          <div className="absolute inset-[18.75%_12.5%_21.88%_12.5%]" data-name="Path">
            <svg className="absolute block inset-0 size-full" fill="none" height="7.125" preserveAspectRatio="none" viewBox="0 0 9 7.125" width="9">
              <path d={svgPaths.p9dcf380} fill="#3B3D45" id="Path" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="bg-[#dedfe3] content-stretch flex gap-[6px] items-center justify-center px-[13px] py-[7px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0" data-name="Contents">
      <div aria-hidden className="absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-bl-[5px] rounded-tl-[5px]" />
      <LeadingIcon />
      <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] text-center whitespace-nowrap">Table</p>
    </div>
  );
}

function LeadingIcon1() {
  return (
    <div className="relative shrink-0" data-name="Leading Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="relative shrink-0 size-[12px]" data-name="Leading Icon">
          <div className="absolute inset-[3.12%_0_3.13%_0]" data-name="Path">
            <svg className="absolute block inset-0 size-full" fill="none" height="11.25" preserveAspectRatio="none" viewBox="0 0 12 11.25" width="12">
              <path d={svgPaths.p3c455100} fill="#3B3D45" id="Path" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="bg-[#fafafa] content-stretch drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] flex gap-[6px] items-center justify-center px-[13px] py-[7px] relative rounded-br-[5px] rounded-tr-[5px] shrink-0" data-name="Contents">
      <div aria-hidden className="absolute border border-[rgba(59,61,69,0.4)] border-solid inset-0 pointer-events-none rounded-br-[5px] rounded-tr-[5px]" />
      <LeadingIcon1 />
      <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#3b3d45] text-[13px] text-center whitespace-nowrap">Graph</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center relative size-full">
      <div className="mr-[-1px] relative shrink-0" data-name="SegmentedButton">
        <div className="content-stretch flex items-start relative size-full">
          <div className="relative rounded-bl-[5px] rounded-tl-[5px] shrink-0" data-name="🔷 Button">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center relative size-full">
                <Contents />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0" data-name="SegmentedButton">
        <div className="content-stretch flex items-start relative size-full">
          <div className="relative rounded-br-[5px] rounded-tr-[5px] shrink-0" data-name="🔷 Button">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center relative size-full">
                <Contents1 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}