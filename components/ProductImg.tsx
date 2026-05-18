interface ProductImgProps {
  shape: string;
  bg: string;
  ratio?: string;
}

const shapes: Record<string, React.ReactNode> = {
  lumbar: (
    <>
      <ellipse cx="100" cy="158" rx="74" ry="20" fill="#1A1814" opacity="0.08"/>
      <path d="M48 138 Q 100 96, 152 138 L148 168 Q 100 154, 52 168 Z" fill="#3A362F"/>
      <path d="M52 142 Q 100 104, 148 142" fill="none" stroke="#1A1814" strokeWidth="1" opacity="0.5"/>
    </>
  ),
  cushion: (
    <>
      <ellipse cx="100" cy="172" rx="74" ry="14" fill="#1A1814" opacity="0.08"/>
      <rect x="38" y="100" width="124" height="68" rx="14" fill="#3A362F"/>
      <ellipse cx="100" cy="148" rx="22" ry="10" fill="#1A1814"/>
    </>
  ),
  mouse: (
    <>
      <ellipse cx="100" cy="172" rx="58" ry="10" fill="#1A1814" opacity="0.08"/>
      <path d="M70 80 Q 100 60, 130 90 L132 160 Q 100 170, 68 160 Z" fill="#3A362F"/>
      <circle cx="100" cy="108" r="3" fill="#B8674A"/>
    </>
  ),
  arm: (
    <>
      <line x1="60" y1="80" x2="60" y2="180" stroke="#1A1814" strokeWidth="6"/>
      <line x1="60" y1="84" x2="148" y2="84" stroke="#3A362F" strokeWidth="6"/>
      <line x1="148" y1="84" x2="148" y2="120" stroke="#3A362F" strokeWidth="6"/>
      <rect x="120" y="118" width="56" height="40" rx="3" fill="#1A1814"/>
    </>
  ),
  glasses: (
    <>
      <circle cx="72" cy="130" r="28" fill="none" stroke="#1A1814" strokeWidth="5"/>
      <circle cx="132" cy="130" r="28" fill="none" stroke="#1A1814" strokeWidth="5"/>
      <line x1="100" y1="130" x2="104" y2="130" stroke="#1A1814" strokeWidth="5"/>
      <line x1="44" y1="120" x2="30" y2="106" stroke="#1A1814" strokeWidth="5"/>
      <line x1="160" y1="120" x2="174" y2="106" stroke="#1A1814" strokeWidth="5"/>
    </>
  ),
  gun: (
    <>
      <rect x="80" y="44" width="40" height="78" rx="6" fill="#3A362F"/>
      <rect x="64" y="120" width="72" height="40" rx="8" fill="#1A1814"/>
      <rect x="88" y="160" width="24" height="24" rx="4" fill="#3A362F"/>
      <circle cx="100" cy="82" r="14" fill="#1A1814"/>
    </>
  ),
  mat: (
    <>
      <rect x="34" y="84" width="132" height="92" rx="6" fill="#4E5A48"/>
      <g fill="#6E7B68">
        {[60,80,100,120,140].flatMap(x =>
          [106,126,146].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="2"/>)
        )}
      </g>
    </>
  ),
  pad: (
    <>
      <rect x="36" y="84" width="128" height="92" rx="16" fill="#4E5A48"/>
      <rect x="46" y="92" width="108" height="76" rx="12" fill="#6E7B68" opacity="0.6"/>
      <circle cx="100" cy="168" r="4" fill="#1A1814"/>
    </>
  ),
  mask: (
    <>
      <path d="M40 110 Q 100 70, 160 110 L 156 142 Q 100 162, 44 142 Z" fill="#1A1814"/>
      <path d="M64 122 Q 78 134, 92 122" stroke="#3A362F" strokeWidth="2" fill="none"/>
      <path d="M108 122 Q 122 134, 136 122" stroke="#3A362F" strokeWidth="2" fill="none"/>
    </>
  ),
  speaker: (
    <>
      <circle cx="100" cy="130" r="52" fill="#3A362F"/>
      <circle cx="100" cy="130" r="32" fill="#1A1814"/>
      <circle cx="100" cy="130" r="6" fill="#3A362F"/>
    </>
  ),
  blanket: (
    <>
      <path d="M30 80 L 170 80 L 174 180 L 26 180 Z" fill="#1A1814"/>
      <g stroke="#3A362F" strokeWidth="1" fill="none">
        <path d="M30 110 Q 100 100, 170 110"/>
        <path d="M30 140 Q 100 130, 170 140"/>
        <path d="M30 168 Q 100 158, 170 168"/>
      </g>
    </>
  ),
  diffuser: (
    <>
      <path d="M70 174 Q 100 80, 130 174 Z" fill="#3A362F"/>
      <ellipse cx="100" cy="76" rx="14" ry="6" fill="#1A1814"/>
      <circle cx="100" cy="50" r="6" fill="#3A362F" opacity="0.4"/>
      <circle cx="92" cy="36" r="4" fill="#3A362F" opacity="0.25"/>
    </>
  ),
};

export function ProductImg({ shape, bg, ratio = '4/5' }: ProductImgProps) {
  return (
    <div style={{ aspectRatio: ratio, background: bg, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {shapes[shape] ?? null}
      </svg>
    </div>
  );
}
