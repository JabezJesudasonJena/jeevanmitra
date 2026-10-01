// JeevanMitra - Animated Bike Rider
// Responsibility:
// Provides the animated rider visual used in the homepage hero.
// The animation is decorative and should respect prefers-reduced-motion.
// Future:
// The visual can later be replaced with a production Lottie/Rive/SVG asset.
//
// Design approach — posture first:
//   1. Seated human figure placed with correct proportions
//   2. Scooter body built around that posture, not the other way
//   3. Flat illustration style (Humaaans / unDraw inspired)
//   4. Palette: 2 blues (body), slate grays (mechanical), light gray (helmet),
//      ONE warm orange accent (skin). No scattered arbitrary colors.
//
// Coordinate system (viewBox 0 0 520 300):
//   Ground y=250. Wheels r=26: rear cx=184 cy=224, front cx=344 cy=224.
//   Rider hips at (222,172). Shoulders at (228,120). Head cx=236 cy=100 r=13.
//   Arms reach handlebar at y=140: elbow (268,130), grip (308,140).
//   Legs: knee (256,202), ankle (260,222), foot on floorboard at y=225.

export default function AnimatedBikeRider() {
  return (
    <div
      className="w-full select-none"
      role="img"
      aria-label="Illustration of a scooter rider travelling to access government services"
    >
      <svg
        viewBox="0 0 520 300"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ maxHeight: "340px", overflow: "hidden" }}
      >
        {/* ── SKY ─────────────────────────────────────────────────────────── */}
        <rect x="0" y="0" width="520" height="204" fill="#EFF6FF" />

        {/* ── CLOUDS (slowest, 5 s) ────────────────────────────────────────── */}
        <g className="jm-cloud-drift">
          {[0, 520].map((dx) => (
            <g key={dx} transform={`translate(${dx},0)`}>
              <ellipse cx="54"  cy="48" rx="30" ry="13" fill="white" opacity="0.95" />
              <ellipse cx="76"  cy="40" rx="22" ry="12" fill="white" opacity="0.95" />
              <ellipse cx="36"  cy="44" rx="18" ry="11" fill="white" opacity="0.95" />
              <ellipse cx="306" cy="34" rx="26" ry="11" fill="white" opacity="0.85" />
              <ellipse cx="328" cy="27" rx="19" ry="10" fill="white" opacity="0.85" />
              <ellipse cx="288" cy="31" rx="16" ry="9"  fill="white" opacity="0.85" />
            </g>
          ))}
        </g>

        {/* ── BACKGROUND HILLS + TREES (parallax, 2.4 s) ─────────────────── */}
        <g className="jm-bg-parallax">
          {[0, 520].map((dx) => (
            <g key={dx} transform={`translate(${dx},0)`}>
              <ellipse cx="88"  cy="172" rx="102" ry="38" fill="#BFDBFE" />
              <ellipse cx="300" cy="178" rx="86"  ry="30" fill="#BFDBFE" opacity="0.65" />
              <rect    x="172" y="154"  width="6"  height="26" fill="#86EFAC" opacity="0.8" />
              <ellipse cx="175" cy="151" rx="14"  ry="13" fill="#4ADE80" opacity="0.8" />
              <rect    x="400" y="158"  width="5"  height="22" fill="#86EFAC" opacity="0.7" />
              <ellipse cx="402" cy="155" rx="12"  ry="11" fill="#4ADE80" opacity="0.7" />
            </g>
          ))}
        </g>

        {/* ── ROAD ────────────────────────────────────────────────────────── */}
        <rect x="0" y="202" width="520" height="98" fill="#CBD5E1" />
        <rect x="0" y="202" width="520" height="4"  fill="#E2E8F0" />
        <rect x="0" y="246" width="520" height="5"  fill="#94A3B8" />

        {/* ── ROAD CENTRE-LINE DASHES (medium speed, 0.55 s) ─────────────── */}
        <clipPath id="jm-road-clip">
          <rect x="0" y="206" width="520" height="40" />
        </clipPath>
        <g className="jm-road-marks" clipPath="url(#jm-road-clip)">
          {[0, 80, 160, 240, 320, 400, 480, 560].map((x) => (
            <rect key={x} x={x} y="223" width="44" height="6" rx="3" fill="#E2E8F0" opacity="0.85" />
          ))}
        </g>

        {/* ── SPEED STREAKS ────────────────────────────────────────────────── */}
        <line x1="74" y1="188" x2="20" y2="188" stroke="#BFDBFE" strokeWidth="3.5" strokeLinecap="round" className="jm-streak-1" />
        <line x1="82" y1="200" x2="26" y2="200" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" className="jm-streak-2" />
        <line x1="66" y1="211" x2="12" y2="211" stroke="#BFDBFE" strokeWidth="2"   strokeLinecap="round" className="jm-streak-3" />

        {/* ── GROUND SHADOW ───────────────────────────────────────────────── */}
        <ellipse cx="264" cy="252" rx="110" ry="6" fill="#94A3B8" opacity="0.26" />

        {/* ══════════════════════════════════════════════════════════════════
            BIKE + RIDER — one group that bobs (jm-bike-bob)
            Draw order (painter's algorithm, back → front):
            wheels → delivery box → exhaust → swing arm → scooter body →
            seat → floorboard → front fork → handlebar → far leg → far arm →
            torso → near leg → near arm → hand grips → neck → head → helmet →
            headlamp
        ══════════════════════════════════════════════════════════════════ */}
        <g className="jm-bike-bob">

          {/* ── REAR WHEEL  cx=184 cy=224 r=26 ─────────────────────────── */}
          <g transform="translate(184,224)">
            <circle r="26" fill="#0F172A" />
            <circle r="20" fill="#F1F5F9" />
            <circle r="14" fill="#CBD5E1" />
            <g className="jm-wheel">
              <line x1="0" y1="-14" x2="0"   y2="14"  stroke="#475569" strokeWidth="2.5" />
              <line x1="-14" y1="0" x2="14"  y2="0"   stroke="#475569" strokeWidth="2.5" />
              <line x1="-10" y1="-10" x2="10" y2="10" stroke="#475569" strokeWidth="1.8" />
              <line x1="10" y1="-10" x2="-10" y2="10" stroke="#475569" strokeWidth="1.8" />
            </g>
            <circle r="5"   fill="#1E293B" />
            <circle r="2.2" fill="#CBD5E1" />
          </g>

          {/* ── FRONT WHEEL  cx=344 cy=224 r=26 ─────────────────────────── */}
          <g transform="translate(344,224)">
            <circle r="26" fill="#0F172A" />
            <circle r="20" fill="#F1F5F9" />
            <circle r="14" fill="#CBD5E1" />
            <g className="jm-wheel">
              <line x1="0" y1="-14" x2="0"   y2="14"  stroke="#475569" strokeWidth="2.5" />
              <line x1="-14" y1="0" x2="14"  y2="0"   stroke="#475569" strokeWidth="2.5" />
              <line x1="-10" y1="-10" x2="10" y2="10" stroke="#475569" strokeWidth="1.8" />
              <line x1="10" y1="-10" x2="-10" y2="10" stroke="#475569" strokeWidth="1.8" />
            </g>
            <circle r="5"   fill="#1E293B" />
            <circle r="2.2" fill="#CBD5E1" />
          </g>

          {/* ── DELIVERY BOX (behind rider — drawn before swing arm) ─────── */}
          {/* Rack rails */}
          <line x1="162" y1="186" x2="198" y2="186" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <line x1="166" y1="186" x2="166" y2="198" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <line x1="194" y1="186" x2="194" y2="198" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          {/* Box body — kept small, proportional */}
          <rect x="155" y="155" width="38" height="30" rx="5" fill="#1D4ED8" />
          {/* JM brand stripe */}
          <rect x="155" y="172" width="38" height="9"  fill="#DBEAFE" />
          <text x="174" y="179" textAnchor="middle" fontSize="6" fontWeight="bold"
                fill="#1D4ED8" fontFamily="system-ui,sans-serif">JM</text>
          {/* Package icon on box */}
          <rect x="163" y="158" width="22" height="13" rx="2" fill="white" opacity="0.88" />
          <line x1="163" y1="164" x2="185" y2="164" stroke="#2563EB" strokeWidth="1.5" />
          <line x1="174" y1="158" x2="174" y2="171" stroke="#2563EB" strokeWidth="1.5" />

          {/* ── EXHAUST PIPE ─────────────────────────────────────────────── */}
          <path d="M 186,220 Q 170,224 156,222 Q 148,222 148,226"
                stroke="#64748B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <line x1="146" y1="226" x2="160" y2="226" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />

          {/* ── SWING ARM (rear wheel → chassis) ────────────────────────── */}
          <line x1="184" y1="224" x2="216" y2="208" stroke="#334155" strokeWidth="8" strokeLinecap="round" />

          {/* ── MAIN SCOOTER BODY / FAIRING ─────────────────────────────── */}
          {/*
            Shape: rear bottom → curves up to seat → front upper body →
                   front leg shield → floorboard → back to start.
            All coordinates verified against wheel positions and rider anchors.
          */}
          <path
            fill="#2563EB"
            d="
              M 160,220
              Q 162,194 183,182
              Q 198,174 220,172
              L 250,170
              Q 274,166 300,166
              Q 318,166 324,180
              Q 328,196 320,212
              Q 312,222 298,224
              L 218,224
              Q 186,222 160,220
              Z
            "
          />
          {/* Body depth shadow — darker blue on lower-front portion */}
          <path
            fill="#1D4ED8"
            d="
              M 220,172 L 250,170
              Q 272,167 296,168
              Q 312,170 320,182
              L 314,194
              Q 302,188 276,188
              L 228,190
              Q 210,192 202,198
              Z
            "
          />
          {/* Rear mudguard arc over rear wheel */}
          <path d="M 158,224 A 28 28 0 0 1 212,210"
                stroke="#1D4ED8" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Front mudguard arc over front wheel */}
          <path d="M 318,210 A 28 28 0 0 1 372,224"
                stroke="#1D4ED8" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* ── SEAT ─────────────────────────────────────────────────────── */}
          {/* Seat is a softly rounded lens shape on top of the rear body */}
          <path
            fill="#1E293B"
            d="M 198,170 C 202,162 248,162 252,170 C 248,178 202,178 198,170 Z"
          />
          {/* Seat highlight — thin lighter edge on top */}
          <path d="M 202,165 C 212,161 240,161 248,165"
                stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* ── FLOORBOARD ───────────────────────────────────────────────── */}
          <rect x="220" y="222" width="90" height="9" rx="4" fill="#334155" />

          {/* ── FRONT FORK ───────────────────────────────────────────────── */}
          {/* Primary fork leg: front wheel hub (344,224) → steering head (326,163) */}
          <line x1="344" y1="224" x2="328" y2="163" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          {/* Secondary fork leg (parallel, slightly offset) */}
          <line x1="338" y1="224" x2="322" y2="163" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          {/* Steering head cap */}
          <circle cx="324" cy="163" r="6" fill="#475569" />

          {/* ── HANDLEBAR ────────────────────────────────────────────────── */}
          {/* Stem: steering head (324,163) → bar center (322,140) */}
          <line x1="324" y1="163" x2="322" y2="140" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          {/* Bar: horizontal across */}
          <line x1="302" y1="140" x2="344" y2="140" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          {/* Grips at each end */}
          <circle cx="302" cy="140" r="7" fill="#0F172A" />
          <circle cx="344" cy="140" r="6" fill="#0F172A" />
          {/* Mirror */}
          <line x1="310" y1="140" x2="308" y2="125" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="306" cy="123" rx="5" ry="4" fill="#94A3B8" />

          {/* ── HEADLAMP ─────────────────────────────────────────────────── */}
          <ellipse cx="350" cy="186" rx="9" ry="11" fill="#FEF9C3" stroke="#2563EB" strokeWidth="2" />
          {/* Subtle light cone */}
          <polygon points="359,186 434,168 434,208" fill="#FEFCE8" opacity="0.11" />

          {/* ═══════════════════════════════════════════════════════════════
              RIDER — drawn back-to-front
              Anchor summary:
                Hip (seat contact):   (222, 172)
                Shoulder centre:      (228, 120)   ← 8px forward, 52px up = ~9° lean
                Head centre:          (236, 100)   r=13
                Helmet fits on head.
                
                Far arm  (right, away from viewer): shoulder (238,124) → elbow (272,132) → grip (308,140)
                Near arm (left, toward viewer):     shoulder (218,124) → elbow (262,130) → grip (302,140)
                
                Legs: hip (220,174) → knee (258,203) → ankle (262,222)
          ═══════════════════════════════════════════════════════════════ */}

          {/* FAR LEG (right, partially behind torso) */}
          {/* Thigh: hip → knee */}
          <line x1="224" y1="174" x2="262" y2="204" stroke="#1E293B" strokeWidth="18" strokeLinecap="round" />
          {/* Shin: knee → ankle */}
          <line x1="262" y1="204" x2="266" y2="224" stroke="#1E293B" strokeWidth="15" strokeLinecap="round" />
          {/* Far shoe */}
          <ellipse cx="270" cy="229" rx="15" ry="6" fill="#0F172A" />

          {/* FAR ARM (right arm — behind torso, drawn before torso) */}
          {/* Upper arm: right shoulder → elbow */}
          <line x1="238" y1="126" x2="272" y2="134" stroke="#1D4ED8" strokeWidth="14" strokeLinecap="round" />
          {/* Forearm: elbow → handlebar grip */}
          <line x1="272" y1="134" x2="308" y2="140" stroke="#1D4ED8" strokeWidth="12" strokeLinecap="round" />

          {/* ── TORSO / JACKET ─────────────────────────────────────────── */}
          {/*
            Jacket shape: trapezoid-ish, wider at shoulders, correct lean.
            Shoulders x-span: 210→248 (38px). Hips x-span: 202→240 (38px).
            Torso height: shoulder y=120 to hip y=174 = 54px.
            All connected to seat position at (222,172).
          */}
          <path
            fill="#2563EB"
            d="
              M 210,122
              C 202,136 200,155 202,174
              L 240,174
              C 242,155 244,136 248,122
              Z
            "
          />
          {/* Jacket chest fold / lapel (darker stripe) */}
          <path
            fill="#1D4ED8"
            d="M 226,122 L 240,122 C 242,138 240,156 238,174 L 226,174 C 228,156 228,138 226,122 Z"
          />
          {/* Hi-vis safety stripe — one accent, horizontal */}
          <line x1="204" y1="154" x2="242" y2="154" stroke="#FEF08A" strokeWidth="6" strokeLinecap="round" />
          {/* Jacket collar V-shape */}
          <path d="M 216,122 L 228,134 L 240,122"
                stroke="#1D4ED8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* NEAR LEG (left, closer to viewer — drawn over far leg) */}
          <line x1="218" y1="174" x2="254" y2="204" stroke="#1E293B" strokeWidth="21" strokeLinecap="round" />
          <line x1="254" y1="204" x2="258" y2="224" stroke="#1E293B" strokeWidth="18" strokeLinecap="round" />
          {/* Near shoe */}
          <ellipse cx="263" cy="229" rx="16" ry="7" fill="#0F172A" />

          {/* NEAR ARM (left arm, toward viewer — drawn over torso) */}
          {/* Upper arm: left shoulder → elbow */}
          <line x1="214" y1="126" x2="258" y2="134" stroke="#2563EB" strokeWidth="17" strokeLinecap="round" />
          {/* Forearm: elbow → handlebar grip */}
          <line x1="258" y1="134" x2="302" y2="140" stroke="#2563EB" strokeWidth="15" strokeLinecap="round" />
          {/* Near gloved hand on grip */}
          <circle cx="303" cy="141" r="9" fill="#0F172A" />
          {/* Far gloved hand on grip */}
          <circle cx="309" cy="141" r="7" fill="#1E293B" />

          {/* ── NECK ─────────────────────────────────────────────────────── */}
          {/*
            Base: top of jacket collar at (228,120).
            Top: connects to head at (234,106).
            Short and correctly placed between torso top and head bottom.
          */}
          <line x1="228" y1="120" x2="234" y2="107" stroke="#FB923C" strokeWidth="13" strokeLinecap="round" />

          {/* ── HEAD (skin — mostly covered by helmet, small ear visible) ── */}
          <circle cx="236" cy="100" r="13" fill="#FB923C" />
          {/* Ear (near side, visible at rim of helmet) */}
          <circle cx="224" cy="101" r="5" fill="#F97316" />

          {/* ── HELMET ───────────────────────────────────────────────────── */}
          {/*
            Helmet sits directly on head centre (236, 100).
            Outer shell r≈22, bottom edge at y≈118 (chin guard).
            Visor occupies front-lower quadrant of helmet (rider faces right).
            Back of helmet extends left.
          */}
          {/* Main dome — light gray, covers entire head */}
          <path
            fill="#F1F5F9"
            d="
              M 216,108
              C 214,88 222,75 236,74
              C 250,73 260,84 260,100
              L 258,112
              C 250,120 226,120 218,114
              Z
            "
          />
          {/* Front face / right section — slightly darker to show facing direction */}
          <path
            fill="#E2E8F0"
            d="
              M 246,78
              C 256,84 262,94 260,106
              L 256,114
              C 252,120 248,120 244,118
              L 242,80
              Z
            "
          />
          {/* VISOR — dark tinted window, front-lower of helmet */}
          <path
            fill="#334155"
            opacity="0.88"
            d="
              M 246,83
              C 256,88 263,100 258,112
              L 250,116
              C 248,108 248,94 246,83
              Z
            "
          />
          {/* Visor glint (single thin arc) */}
          <line x1="250" y1="88" x2="256" y2="97"
                stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.72" />
          {/* Helmet top glint */}
          <path d="M 226,80 C 230,75 240,74 244,77"
                stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.72" />
          {/* Chin guard (lower extension of helmet) */}
          <path
            fill="#E2E8F0"
            d="M 218,112 C 220,120 228,124 236,122 C 230,120 222,116 218,112 Z"
          />
          {/* Helmet chin strap */}
          <line x1="218" y1="112" x2="220" y2="124"
                stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

        </g>{/* end jm-bike-bob */}

      </svg>
    </div>
  );
}
