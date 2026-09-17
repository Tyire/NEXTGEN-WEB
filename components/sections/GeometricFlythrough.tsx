import { Container } from "@/components/ui";

type ShapeConfig = {
  id: number;
  type: "square" | "diamond" | "rectangle-h" | "rectangle-v";
  color: string;
  size: number;
  left: number;
  top: number;
  rotateZ: number;
  delay: number;
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const COLORS = [
  "rgba(212,168,67,VAL)",
  "rgba(212,168,67,VAL)",
  "rgba(255,107,44,VAL)",
  "rgba(255,107,44,VAL)",
  "rgba(255,31,77,VAL)",
  "rgba(238,241,248,VAL)",
];
const TYPES: ShapeConfig["type"][] = ["square", "diamond", "rectangle-h", "rectangle-v"];

function buildShapes(count: number): ShapeConfig[] {
  const rand = seeded(0xdeadbeef);
  return Array.from({ length: count }, (_, i) => {
    const colorTemplate = COLORS[Math.floor(rand() * COLORS.length)];
    const opacity = 0.25 + rand() * 0.55;
    const color = colorTemplate.replace("VAL", opacity.toFixed(2));
    return {
      id: i,
      type: TYPES[Math.floor(rand() * TYPES.length)],
      color,
      size: 18 + Math.floor(rand() * 44),
      left: 5 + rand() * 90,
      top: 5 + rand() * 90,
      rotateZ: rand() * 360,
      delay: rand() * 0.28,
    };
  });
}

const SHAPES = buildShapes(40);

function shapeStyle(s: ShapeConfig): React.CSSProperties {
  const base: React.CSSProperties = {
    left: `${s.left}%`,
    top: `${s.top}%`,
    backgroundColor: s.type !== "diamond" ? s.color : "transparent",
    opacity: 0.18,
    transform: `rotate(${s.rotateZ}deg)`,
    transformStyle: "preserve-3d",
  };
  if (s.type === "square") {
    base.width = `${s.size}px`;
    base.height = `${s.size}px`;
  } else if (s.type === "diamond") {
    base.width = `${s.size}px`;
    base.height = `${s.size}px`;
    base.border = `2px solid ${s.color}`;
    base.transform = `rotate(${s.rotateZ + 45}deg)`;
  } else if (s.type === "rectangle-h") {
    base.width = `${s.size * 2.2}px`;
    base.height = `${s.size * 0.55}px`;
  } else {
    base.width = `${s.size * 0.55}px`;
    base.height = `${s.size * 2.2}px`;
  }
  return base;
}

export function GeometricFlythrough() {
  return (
    <section
      data-flythrough=""
      className="cinema-dark flythrough relative"
      aria-label="Animated fiber-network data visualization"
    >
      <div className="flythrough-panel flex items-center justify-center overflow-hidden">

        <div
          className="flythrough-stage absolute inset-0"
          data-flythrough-stage=""
          aria-hidden="true"
        >
          {SHAPES.map((s) => (
            <div
              key={s.id}
              className="flythrough-shape"
              data-flythrough-shape=""
              data-shape-delay={s.delay}
              data-shape-index={s.id}
              style={shapeStyle(s)}
            />
          ))}
        </div>

        <div
          className="relative z-10 text-center"
          data-flythrough-text=""
        >
          <Container>
            <p className="eyebrow mb-4">GPON — Metro Ethernet — VoIP</p>
            <h2
              className="display mx-auto max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 2px 32px rgba(0,0,0,0.7)" }}
            >
              Data in{" "}
              <span
                style={{
                  background: "linear-gradient(115deg,#ff1f4d,#ff6b2c 48%,#ffa70f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                motion.
              </span>
            </h2>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-white/60 md:text-base">
              Lagos · Lekki · Ikate · Ajah · Ilasan · Orchid
            </p>
          </Container>
        </div>
      </div>
    </section>
  );
}