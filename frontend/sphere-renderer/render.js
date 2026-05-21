const { createCanvas } = require('canvas');
const { spawn } = require('child_process');
const path = require('path');

const W = 1920, H = 1080, FPS = 30, DUR = 8, TOTAL = FPS * DUR;
const OUT = path.join(__dirname, '..', 'public', 'background_middle.mp4');

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ─── FFmpeg pipe ───
const ffmpeg = spawn('ffmpeg', [
  '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba',
  '-s', `${W}x${H}`, '-r', `${FPS}`,
  '-i', 'pipe:0',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
  '-pix_fmt', 'yuv420p', '-b:v', '6M', '-maxrate', '8M', '-bufsize', '12M',
  '-movflags', '+faststart',
  '-an', OUT
]);
ffmpeg.stderr.on('data', d => {});
ffmpeg.on('close', code => {
  console.log(`\n✅ Done! Saved to: ${OUT}`);
  console.log(`   Exit code: ${code}`);
});

// ─── Easing helpers ───
const TAU = Math.PI * 2;
function ease(t) { return t * t * (3 - 2 * t); }

// ─── Bokeh data ───
const BOKEH = [];
for (let i = 0; i < 55; i++) {
  BOKEH.push({
    x: Math.random() * W, y: Math.random() * H,
    r: 15 + Math.random() * 60,
    phase: Math.random() * TAU,
    speed: 0.3 + Math.random() * 0.6,
    alpha: 0.03 + Math.random() * 0.12,
    color: ['rgba(220,200,255,', 'rgba(255,255,255,', 'rgba(180,150,230,'][Math.floor(Math.random() * 3)]
  });
}

// ─── Dust sparkles ───
const DUST = [];
for (let i = 0; i < 30; i++) {
  DUST.push({
    x: W * 0.2 + Math.random() * W * 0.6,
    y: H * 0.2 + Math.random() * H * 0.6,
    r: 1 + Math.random() * 2.5,
    phase: Math.random() * TAU,
    speed: 0.5 + Math.random() * 1.2,
    alpha: 0.2 + Math.random() * 0.5
  });
}

// ─── Draw one frame ───
function drawFrame(f) {
  const t = f / TOTAL;
  const a = t * TAU; // 0 → 2π seamless

  // Background gradient
  const cx = W / 2 + Math.sin(a * 0.5) * 20;
  const cy = H / 2 - 60;
  const bgGrad = ctx.createRadialGradient(cx, cy - 80, 100, cx, cy, 900);
  bgGrad.addColorStop(0, '#DCC8F0');
  bgGrad.addColorStop(0.12, '#CBADE4');
  bgGrad.addColorStop(0.28, '#B48DD4');
  bgGrad.addColorStop(0.45, '#9B72C0');
  bgGrad.addColorStop(0.62, '#8058A8');
  bgGrad.addColorStop(0.80, '#643E8E');
  bgGrad.addColorStop(1.0, '#3D2060');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Soft warm glow patches
  const glows = [
    [W * 0.3, H * 0.35, 350, 0.06],
    [W * 0.7, H * 0.45, 280, 0.05],
    [W * 0.5, H * 0.5, 450, 0.04],
  ];
  glows.forEach(([gx, gy, gr, ga]) => {
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
    g.addColorStop(0, `rgba(230,210,255,${ga})`);
    g.addColorStop(1, 'rgba(230,210,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  });

  // Bokeh particles (behind sphere)
  BOKEH.forEach(b => {
    const bx = b.x + Math.sin(a * b.speed + b.phase) * 30;
    const by = b.y + Math.cos(a * b.speed * 0.7 + b.phase) * 20;
    const ba = b.alpha * (0.7 + Math.sin(a * 2 + b.phase) * 0.3);
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
    g.addColorStop(0, b.color + ba.toFixed(3) + ')');
    g.addColorStop(0.4, b.color + (ba * 0.5).toFixed(3) + ')');
    g.addColorStop(1, b.color + '0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(bx, by, b.r, 0, TAU);
    ctx.fill();
  });

  // ─── Sphere ───
  const sphX = W / 2 + Math.sin(a * 0.5) * 8;
  const sphY = H / 2 + Math.sin(a) * 18 + Math.sin(a * 2) * 4;
  const breathe = 1 + Math.sin(a) * 0.02 + Math.sin(a * 2) * 0.005;
  const baseR = 180;
  const sphR = baseR * breathe;

  // Shadow
  const shadowG = ctx.createRadialGradient(sphX, sphY + sphR + 30, 0, sphX, sphY + sphR + 30, sphR * 1.2);
  shadowG.addColorStop(0, 'rgba(40,20,60,0.15)');
  shadowG.addColorStop(1, 'rgba(40,20,60,0)');
  ctx.fillStyle = shadowG;
  ctx.beginPath();
  ctx.ellipse(sphX, sphY + sphR + 30, sphR * 0.8, sphR * 0.15, 0, 0, TAU);
  ctx.fill();

  // Main sphere body (translucent glass)
  ctx.save();
  const bodyGrad = ctx.createRadialGradient(
    sphX - sphR * 0.25, sphY - sphR * 0.3, sphR * 0.05,
    sphX, sphY, sphR
  );
  bodyGrad.addColorStop(0, 'rgba(245,235,255,0.55)');
  bodyGrad.addColorStop(0.2, 'rgba(220,200,245,0.35)');
  bodyGrad.addColorStop(0.5, 'rgba(190,160,225,0.22)');
  bodyGrad.addColorStop(0.7, 'rgba(160,130,210,0.18)');
  bodyGrad.addColorStop(0.9, 'rgba(140,110,195,0.25)');
  bodyGrad.addColorStop(1.0, 'rgba(120,90,180,0.35)');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.arc(sphX, sphY, sphR, 0, TAU);
  ctx.fill();

  // Glass refraction effect (inner distortion look)
  const innerGrad = ctx.createRadialGradient(
    sphX + sphR * 0.1, sphY + sphR * 0.15, sphR * 0.1,
    sphX, sphY, sphR * 0.85
  );
  const innerPulse = 0.08 + Math.sin(a * 1.5 + 0.8) * 0.04;
  innerGrad.addColorStop(0, `rgba(230,210,255,${innerPulse})`);
  innerGrad.addColorStop(0.5, `rgba(200,175,240,${innerPulse * 0.6})`);
  innerGrad.addColorStop(1, 'rgba(180,150,220,0)');
  ctx.fillStyle = innerGrad;
  ctx.beginPath();
  ctx.arc(sphX, sphY, sphR * 0.85, 0, TAU);
  ctx.fill();

  // Core glow
  const corePulse = 0.12 + Math.sin(a * 1.3 + 0.5) * 0.06;
  const coreGrad = ctx.createRadialGradient(sphX, sphY, 0, sphX, sphY, sphR * 0.45);
  coreGrad.addColorStop(0, `rgba(248,240,255,${corePulse})`);
  coreGrad.addColorStop(0.3, `rgba(220,200,250,${corePulse * 0.5})`);
  coreGrad.addColorStop(1, 'rgba(200,180,240,0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(sphX, sphY, sphR * 0.45, 0, TAU);
  ctx.fill();

  // ─── Specular highlights ───
  // Primary highlight (top-left)
  const hlX = sphX - sphR * 0.32;
  const hlY = sphY - sphR * 0.35;
  const hlR = sphR * 0.35;
  const hlGrad = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, hlR);
  hlGrad.addColorStop(0, 'rgba(255,255,255,0.85)');
  hlGrad.addColorStop(0.15, 'rgba(255,255,255,0.55)');
  hlGrad.addColorStop(0.4, 'rgba(255,250,255,0.2)');
  hlGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hlGrad;
  ctx.beginPath();
  ctx.arc(hlX, hlY, hlR, 0, TAU);
  ctx.fill();

  // Small sharp highlight
  const hl2X = sphX - sphR * 0.22;
  const hl2Y = sphY - sphR * 0.42;
  const hl2Grad = ctx.createRadialGradient(hl2X, hl2Y, 0, hl2X, hl2Y, sphR * 0.08);
  hl2Grad.addColorStop(0, 'rgba(255,255,255,0.95)');
  hl2Grad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
  hl2Grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl2Grad;
  ctx.beginPath();
  ctx.arc(hl2X, hl2Y, sphR * 0.08, 0, TAU);
  ctx.fill();

  // Secondary rim highlight (bottom-right)
  const rimX = sphX + sphR * 0.35;
  const rimY = sphY + sphR * 0.38;
  const rimGrad = ctx.createRadialGradient(rimX, rimY, 0, rimX, rimY, sphR * 0.25);
  rimGrad.addColorStop(0, 'rgba(220,200,255,0.25)');
  rimGrad.addColorStop(0.5, 'rgba(200,180,240,0.1)');
  rimGrad.addColorStop(1, 'rgba(200,180,240,0)');
  ctx.fillStyle = rimGrad;
  ctx.beginPath();
  ctx.arc(rimX, rimY, sphR * 0.25, 0, TAU);
  ctx.fill();

  // ─── Fresnel edge rim ───
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(sphX, sphY, sphR - 1, 0, TAU);
  ctx.stroke();

  // Outer glow
  const outerGlow = ctx.createRadialGradient(sphX, sphY, sphR * 0.95, sphX, sphY, sphR * 1.15);
  outerGlow.addColorStop(0, 'rgba(210,190,245,0.08)');
  outerGlow.addColorStop(0.5, 'rgba(200,175,240,0.03)');
  outerGlow.addColorStop(1, 'rgba(190,160,230,0)');
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(sphX, sphY, sphR * 1.15, 0, TAU);
  ctx.fill();

  // ─── Caustic light refraction (animated arc) ───
  const causticAngle = a * 0.15;
  ctx.save();
  ctx.translate(sphX, sphY);
  ctx.rotate(causticAngle);
  ctx.strokeStyle = `rgba(255,255,255,${0.04 + Math.sin(a * 3) * 0.02})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, sphR * 0.92, -0.8, 0.8);
  ctx.stroke();
  ctx.restore();

  // ─── Rainbow subtle refraction edge ───
  ctx.save();
  ctx.globalAlpha = 0.06 + Math.sin(a * 2) * 0.02;
  const rainGrad = ctx.createLinearGradient(
    sphX - sphR, sphY - sphR,
    sphX + sphR, sphY + sphR
  );
  rainGrad.addColorStop(0, 'rgba(200,180,255,0)');
  rainGrad.addColorStop(0.3, 'rgba(180,200,255,1)');
  rainGrad.addColorStop(0.5, 'rgba(200,220,255,1)');
  rainGrad.addColorStop(0.7, 'rgba(220,200,255,1)');
  rainGrad.addColorStop(1, 'rgba(200,180,255,0)');
  ctx.strokeStyle = rainGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sphX, sphY, sphR - 4, 0, TAU);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.restore();

  ctx.restore();

  // ─── Dust sparkles (in front) ───
  DUST.forEach(d => {
    const dx = d.x + Math.sin(a * d.speed + d.phase) * 15;
    const dy = d.y + Math.cos(a * d.speed * 0.6 + d.phase) * 12;
    const da = d.alpha * (0.5 + Math.sin(a * 3 + d.phase) * 0.5);
    const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, d.r);
    g.addColorStop(0, `rgba(255,255,255,${da.toFixed(3)})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(dx, dy, d.r, 0, TAU);
    ctx.fill();
  });

  // ─── Subtle vignette ───
  const vigGrad = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
  vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
  vigGrad.addColorStop(1, 'rgba(20,10,35,0.3)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, W, H);
}

// ─── Render all frames ───
console.log(`Rendering ${TOTAL} frames at ${W}x${H} @ ${FPS}fps...`);
console.log(`Output: ${OUT}\n`);

let written = 0;

function writeFrame(f) {
  drawFrame(f);
  const buf = Buffer.from(ctx.getImageData(0, 0, W, H).data.buffer);
  
  return new Promise((resolve, reject) => {
    const ok = ffmpeg.stdin.write(buf, (err) => {
      if (err) reject(err);
      else resolve();
    });
    if (!ok) {
      ffmpeg.stdin.once('drain', resolve);
    }
  });
}

async function renderAll() {
  for (let f = 0; f < TOTAL; f++) {
    await writeFrame(f);
    written++;
    if (f % 10 === 0 || f === TOTAL - 1) {
      const pct = ((f / (TOTAL - 1)) * 100).toFixed(1);
      process.stdout.write(`\rFrame ${f + 1}/${TOTAL} [${pct}%]`);
    }
  }
  ffmpeg.stdin.end();
}

renderAll().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
