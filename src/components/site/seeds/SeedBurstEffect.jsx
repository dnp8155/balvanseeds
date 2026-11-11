import React, { useEffect, useRef } from "react";

// Crop specific seed visual properties
const SEED_PROFILES = {
  cumin: {
    color: "#8B6B43", // Warm golden brown jeera
    stroke: "#5C4033",
    type: "cumin", // Elongated ribbed seed
    size: [6, 16],
    count: 36,
  },
  jeera: {
    color: "#8B6B43",
    stroke: "#5C4033",
    type: "cumin",
    size: [6, 16],
    count: 36,
  },
  mustard: {
    color: "#2C1B18", // Dark brown/black round rai
    stroke: "#7A3E26",
    type: "round",
    size: [6, 8],
    count: 48,
  },
  rai: {
    color: "#2C1B18",
    stroke: "#7A3E26",
    type: "round",
    size: [6, 8],
    count: 48,
  },
  bajra: {
    color: "#A8A37E", // Greyish olive-gold pearl millet
    stroke: "#6E6B4F",
    type: "oval",
    size: [7, 10],
    count: 40,
  },
  wheat: {
    color: "#D4A359", // Rich golden wheat grain
    stroke: "#9E6F28",
    type: "wheat", // Grain with center groove
    size: [8, 16],
    count: 36,
  },
  castor: {
    color: "#6D5344", // Mottled castor bean
    stroke: "#3A2920",
    type: "mottled",
    size: [10, 14],
    count: 24,
  },
  fennel: {
    color: "#8F9779", // Light greenish-yellow saunf
    stroke: "#5A6546",
    type: "cumin",
    size: [6, 15],
    count: 36,
  },
  saunf: {
    color: "#8F9779",
    stroke: "#5A6546",
    type: "cumin",
    size: [6, 15],
    count: 36,
  },
  isabgol: {
    color: "#E6D7C3", // Pale pinkish translucent husk grain
    stroke: "#B8A38E",
    type: "oval",
    size: [5, 9],
    count: 45,
  },
  groundnut: {
    color: "#A44A3F", // Red-brown kernel
    stroke: "#6B271F",
    type: "oval",
    size: [10, 16],
    count: 25,
  },
  sesame: {
    color: "#EFE6D5", // Off-white/cream til seed
    stroke: "#C4B59D",
    type: "flat_teardrop",
    size: [5, 9],
    count: 45,
  },
  default: {
    color: "#C49A45", // Generic golden agriculture seed
    stroke: "#7A591C",
    type: "wheat",
    size: [7, 14],
    count: 36,
  },
};

function getProfile(seedName = "", cropName = "", categoryName = "") {
  const text = `${seedName} ${cropName} ${categoryName}`.toLowerCase();
  for (const key of Object.keys(SEED_PROFILES)) {
    if (key !== "default" && text.includes(key)) {
      return SEED_PROFILES[key];
    }
  }
  return SEED_PROFILES.default;
}

export default function SeedBurstEffect({ seedName, cropName, categoryName }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const profile = getProfile(seedName, cropName, categoryName);

    // Spawn particles springing up from bottom-center
    const particles = [];
    const count = profile.count;

    for (let i = 0; i < count; i++) {
      // Launch spread from bottom
      const startX = width * 0.5 + (Math.random() - 0.5) * (width * 0.4);
      const startY = height + 20;

      // Launch velocity: powerful upward explosion with arc
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.1; // -90 deg +/- 30 deg
      const speed = Math.random() * 12 + 18; // 18 to 30 px/frame initial burst

      const [minS, maxS] = profile.size;
      const size = minS + Math.random() * (maxS - minS);

      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.55 + Math.random() * 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        size,
        opacity: 1,
        profile,
        life: 0,
        maxLife: 120 + Math.random() * 40,
      });
    }

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeParticles = 0;

      for (let p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985; // air resistance
        p.rotation += p.rotSpeed;

        if (p.life > p.maxLife * 0.7) {
          p.opacity = Math.max(0, (p.maxLife - p.life) / (p.maxLife * 0.3));
        }

        if (p.opacity > 0 && p.y < height + 50) {
          activeParticles++;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;

          ctx.fillStyle = p.profile.color;
          ctx.strokeStyle = p.profile.stroke;
          ctx.lineWidth = 1;

          // Draw specific seed shape
          if (p.profile.type === "round") {
            // Mustard / Rai (Spherical seed with shine)
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Tiny highlight
            ctx.fillStyle = "rgba(255,255,255,0.35)";
            ctx.beginPath();
            ctx.arc(-p.size * 0.15, -p.size * 0.15, p.size * 0.18, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.profile.type === "cumin") {
            // Cumin / Jeera / Fennel (Curved elongated ribbed seed)
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Ribbed stripes on cumin
            ctx.strokeStyle = "rgba(255,255,255,0.3)";
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 0.8);
            ctx.lineTo(0, p.size * 0.8);
            ctx.stroke();
          } else if (p.profile.type === "wheat") {
            // Wheat grain with iconic center crease
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Wheat groove down the middle
            ctx.strokeStyle = p.profile.stroke;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 0.85);
            ctx.lineTo(0, p.size * 0.85);
            ctx.stroke();
          } else {
            // Oval / Pearl millet / General seed
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.4, p.size * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      if (activeParticles > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [seedName, cropName, categoryName]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
