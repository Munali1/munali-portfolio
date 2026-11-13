import IsometricBlock from "@/components/IsometricBlock";

export type ProjectVisual = "civic" | "payroll" | "commerce";

const visuals: Record<
  ProjectVisual,
  { title: string; description: string; flow: string[] }
> = {
  civic: {
    title: "A gateway to public services",
    description:
      "An isometric public-services building, with an access gateway and a connected citizen record",
    flow: ["Citizen", "Secure access", "Public services"],
  },
  payroll: {
    title: "From a schedule to a payslip",
    description:
      "A cutaway of a scheduled payroll workflow, connecting a calendar, an approval checkpoint, and a payslip",
    flow: ["Schedule", "Approvals", "Reporting"],
  },
  commerce: {
    title: "The journey of an order",
    description:
      "A cutaway of a commerce workflow, with a product parcel, a payment card, and an order receipt",
    flow: ["Browse", "Cart", "Order"],
  },
};

function CivicDrawing() {
  return (
    <>
      <IsometricBlock
        x={300}
        y={176}
        width={200}
        depth={180}
        height={20}
        className="iso-platform"
      />
      <IsometricBlock x={300} y={188} width={168} depth={152} height={12} />
      <IsometricBlock x={300} y={176} width={156} depth={140} height={12} />
      <path
        d="M172 240L236 272L272 254M416 280L460 258V196"
        className="model-active-route"
      />
      {/* Columns hold an open civic portico above the access route. */}
      {[0, 1, 2, 3].map((index) => (
        <g key={index}>
          <path
            d={`M${176 + index * 36} ${174 + index * 18}v76l12 6v-76Z`}
            className="model-column-front"
          />
          <path
            d={`M${188 + index * 36} ${180 + index * 18}l10-5v76l-10 5Z`}
            className="model-column-side"
          />
        </g>
      ))}
      <path d="M320 238L444 176V252L320 314Z" className="model-building-side" />
      <path
        d="M348 238L368 228V266L348 276ZM392 216L412 206V244L392 254Z"
        className="model-building-windows"
      />
      <IsometricBlock
        x={300}
        y={88}
        width={160}
        depth={140}
        height={18}
        className="iso-accent"
      />
      <path d="M182 146L300 76L438 146L320 210Z" className="model-civic-roof" />
      <path
        d="M234 148L300 110L372 146L306 184Z"
        className="model-roof-inset"
      />
      <path
        d="M290 142L300 136L312 142M290 150L302 156L314 150"
        className="model-code"
      />
      <g transform="translate(76 152)">
        <path
          d="M0 72V0L44 22V94L32 88V30L12 20V78Z"
          className="model-arch-front"
        />
        <path d="M44 22L54 17V89L44 94Z" className="model-arch-side" />
        <circle cx="22" cy="49" r="5" className="model-accent-fill" />
      </g>
      <path d="M108 230L148 250L182 233" className="model-active-route" />
      <g transform="matrix(1 -0.5 0 1 450 178)">
        <rect
          x="5"
          y="-5"
          width="76"
          height="104"
          rx="4"
          className="model-window-back"
        />
        <rect width="76" height="104" rx="4" className="model-window" />
        <circle cx="24" cy="28" r="9" className="model-record-avatar" />
        <path d="M12 50Q24 38 36 50M14 68H62M14 80H50" className="model-ink" />
      </g>
    </>
  );
}

function PayrollDrawing() {
  return (
    <>
      <IsometricBlock
        x={300}
        y={180}
        width={216}
        depth={192}
        height={20}
        className="iso-platform"
      />
      <path
        d="M168 230L256 274L324 240L428 292L478 267"
        className="model-route-background"
      />
      <IsometricBlock x={184} y={196} width={84} depth={64} height={12} />
      <g transform="matrix(1 0.5 0 1 116 68)">
        <rect
          x="6"
          y="-6"
          width="132"
          height="136"
          rx="4"
          className="model-window-back"
        />
        <rect width="132" height="136" rx="4" className="model-window" />
        <path d="M0 32H132M28 -8V12M104 -8V12" className="model-ink" />
        {[0, 1, 2, 3].map((column) =>
          [0, 1, 2].map((row) => (
            <rect
              key={`${column}-${row}`}
              x={18 + column * 28}
              y={48 + row * 28}
              width="12"
              height="12"
              rx="2"
              className={
                column === 2 && row === 1
                  ? "model-accent-fill"
                  : "model-calendar-day"
              }
            />
          )),
        )}
      </g>
      <IsometricBlock
        x={320}
        y={166}
        width={88}
        depth={88}
        height={48}
        className="iso-accent"
      >
        <path
          d="M284 209L308 221L350 200"
          className="model-code model-approval-check"
        />
        <path
          d="M254 239L286 255M254 249L274 259"
          className="model-code model-api-slots"
        />
      </IsometricBlock>
      <path
        d="M208 242L244 260L270 247M364 254L410 277L454 255"
        className="model-active-route"
      />
      <g transform="matrix(1 -0.5 0 1 428 158)">
        <path
          d="M6 -6H94V144L83 138L72 144L61 138L50 144L39 138L28 144L17 138L6 144Z"
          className="model-window-back"
        />
        <path
          d="M0 0H88V150L77 144L66 150L55 144L44 150L33 144L22 150L11 144L0 150Z"
          className="model-window"
        />
        <path
          d="M16 26H70M16 46H48M16 70H70M16 86H70M16 112H44"
          className="model-ink"
        />
        <path d="M56 110L64 118L76 102" className="model-accent-stroke" />
      </g>
      <g className="model-callouts" aria-hidden="true">
        <path d="M322 176V96H380" />
        <text x="330" y="82" className="model-label">
          Scheduled · approved · recorded
        </text>
      </g>
    </>
  );
}

function CommerceDrawing() {
  return (
    <>
      <IsometricBlock
        x={300}
        y={180}
        width={220}
        depth={192}
        height={20}
        className="iso-platform"
      />
      {/* The order travels along a belt through the payment checkpoint. */}
      <IsometricBlock x={196} y={206} width={244} depth={64} height={24} />
      <g className="model-belt-rollers">
        {Array.from({ length: 9 }, (_, index) => (
          <path
            key={index}
            d={`M${148 + index * 26} ${238 + index * 13}l48-24`}
          />
        ))}
      </g>
      <IsometricBlock
        x={218}
        y={132}
        width={92}
        depth={76}
        height={68}
        className="iso-accent"
      >
        <path
          d="M180 151L272 197L272 265L258 258V204L166 158Z"
          className="model-parcel-tape"
        />
        <path
          d="M152 198L174 209V237L152 226Z"
          className="model-parcel-label"
        />
        <path
          d="M184 219L202 228M184 229L210 242"
          className="model-code model-api-slots"
        />
      </IsometricBlock>
      <path d="M278 290L328 315L386 286" className="model-active-route" />
      <g transform="matrix(1 0.5 0 1 314 84)">
        <rect
          x="6"
          y="-6"
          width="124"
          height="80"
          rx="6"
          className="model-window-back"
        />
        <rect width="124" height="80" rx="6" className="model-window" />
        <rect
          x="16"
          y="20"
          width="20"
          height="16"
          rx="3"
          className="model-payment-chip"
        />
        <path d="M16 56H52M64 56H82M94 56H108" className="model-ink" />
        <path d="M92 22L98 28L108 16" className="model-accent-stroke" />
      </g>
      <g transform="matrix(1 -0.5 0 1 448 200)">
        <path
          d="M4 -4H80V112L70 106L60 112L50 106L40 112L30 106L20 112L10 106L4 112Z"
          className="model-window-back"
        />
        <path
          d="M0 0H76V116L66 110L56 116L46 110L36 116L26 110L16 116L6 110L0 116Z"
          className="model-window"
        />
        <path d="M14 24H62M14 42H50M14 60H62M14 88H40" className="model-ink" />
      </g>
      <path d="M400 276L426 289L448 278" className="model-active-route" />
    </>
  );
}

export default function ProjectIllustration({ kind }: { kind: ProjectVisual }) {
  const visual = visuals[kind];

  return (
    <figure className={`project-illustration illustration-${kind}`}>
      <div className="project-plate-heading" aria-hidden="true">
        <span>
          {kind === "civic" ? "01" : kind === "payroll" ? "02" : "03"} / System
          study
        </span>
      </div>
      <svg
        viewBox="20 40 560 360"
        className="project-cutaway"
        role="img"
        aria-label={visual.description}
      >
        {kind === "civic" ? (
          <CivicDrawing />
        ) : kind === "payroll" ? (
          <PayrollDrawing />
        ) : (
          <CommerceDrawing />
        )}
      </svg>
      <figcaption>
        <span className="project-visual-caption">{visual.title}</span>
        <ol className="project-flow" aria-label="Project workflow">
          {visual.flow.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
