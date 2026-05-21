const { createCanvas } = require('canvas');
const { spawn } = require('child_process');
const path = require('path');

const W = 1920, H = 1080, FPS = 30, DUR = 8, TOTAL = FPS * DUR;
const OUT = path.join(__dirname, '..', 'public', 'background_middle.mp4');

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

const ffmpeg = spawn('ffmpeg', [
  '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba',
  '-s', `${W}x${H}`, '-r', `${FPS}`,
  '-i', 'pipe:0',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
  '-pix_fmt', 'yuv420p', '-b:v', '7M', '-maxrate', '8M', '-bufsize', '14M',
  '-movflags', '+faststart', '-an', OUT
]);
ffmpeg.stderr.on('data', () => {});
ffmpeg.on('close', code => {
  console.log(`\n✅ Done! Saved: ${OUT} (exit ${code})`);
});

const TAU = Math.PI * 2;

// Bokeh particles
const BOKEH = [];
for (let i = 0; i < 70; i++) {
  BOKEH.push({
    x: Math.random() * W, y: Math.random() * H,
    r: 20 + Math.random() * 80, phase: Math.random() * TAU,
    speed: 0.2 + Math.random() * 0.5,
    alpha: 0.04 + Math.random() * 0.14,
    hue: 250 + Math.random() * 30,
    sat: 30 + Math.random() * 40,
    light: 70 + Math.random() * 25,
  });
}

// Dust
const DUST = [];
for (let i = 0; i < 45; i++) {
  DUST.push({
    x: W * 0.15 + Math.random() * W * 0.7,
    y: H * 0.15 + Math.random() * H * 0.7,
    r: 1 + Math.random() * 3, phase: Math.random() * TAU,
    speed: 0.4 + Math.random() * 1, alpha: 0.15 + Math.random() * 0.5
  });
}

function drawFrame(f) {
  const t = f / TOTAL, a = t * TAU;

  // ── Background ──
  const cx = W / 2 + Math.sin(a * 0.5) * 15;
  const cy = H / 2 - 50;
  const bg = ctx.createRadialGradient(cx, cy - 100, 80, cx, cy, 950);
  bg.addColorStop(0, '#E2D4F2');
  bg.addColorStop(0.10, '#D4BDE8');
  bg.addColorStop(0.25, '#C0A0DA');
  bg.addColorStop(0.40, '#A880C8');
  bg.addColorStop(0.55, '#9068B5');
  bg.addColorStop(0.70, '#7550A0');
  bg.addColorStop(0.85, '#5A3888');
  bg.addColorStop(1.0, '#35205A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Ambient glow patches
  [[W*.32, H*.3, 380, .07], [W*.68, H*.4, 320, .06], [W*.5, H*.48, 500, .05]].forEach(([gx, gy, gr, ga]) => {
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
    g.addColorStop(0, `rgba(220,200,250,${ga})`);
    g.addColorStop(1, 'rgba(220,200,250,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  });

  // ── Bokeh (behind sphere) ──
  BOKEH.forEach(b => {
    const bx = b.x + Math.sin(a * b.speed + b.phase) * 35;
    const by = b.y + Math.cos(a * b.speed * 0.7 + b.phase) * 25;
    const ba = b.alpha * (0.6 + Math.sin(a * 1.5 + b.phase) * 0.4);
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
    const c = `hsla(${b.hue},${b.sat}%,${b.light}%,`;
    g.addColorStop(0, c + ba.toFixed(3) + ')');
    g.addColorStop(0.3, c + (ba * 0.6).toFixed(3) + ')');
    g.addColorStop(0.7, c + (ba * 0.15).toFixed(3) + ')');
    g.addColorStop(1, c + '0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx, by, b.r, 0, TAU); ctx.fill();
  });

  // ── Sphere ──
  const sX = W / 2 + Math.sin(a * 0.5) * 6;
  const sY = H / 2 + Math.sin(a) * 16 + Math.sin(a * 2) * 3;
  const br = 1 + Math.sin(a) * 0.018 + Math.sin(a * 2) * 0.004;
  const R = 195 * br;

  // Shadow
  ctx.save();
  const shG = ctx.createRadialGradient(sX, sY + R + 35, 0, sX, sY + R + 35, R * 1.1);
  shG.addColorStop(0, 'rgba(30,15,50,0.18)');
  shG.addColorStop(0.5, 'rgba(30,15,50,0.06)');
  shG.addColorStop(1, 'rgba(30,15,50,0)');
  ctx.fillStyle = shG;
  ctx.beginPath(); ctx.ellipse(sX, sY + R + 35, R * 0.7, R * 0.12, 0, 0, TAU); ctx.fill();
  ctx.restore();

  // Outer atmospheric glow
  const atm = ctx.createRadialGradient(sX, sY, R * 0.8, sX, sY, R * 1.6);
  atm.addColorStop(0, 'rgba(200,175,240,0.08)');
  atm.addColorStop(0.5, 'rgba(180,155,225,0.03)');
  atm.addColorStop(1, 'rgba(180,155,225,0)');
  ctx.fillStyle = atm;
  ctx.beginPath(); ctx.arc(sX, sY, R * 1.6, 0, TAU); ctx.fill();

  // Main body
  const body = ctx.createRadialGradient(sX - R * 0.28, sY - R * 0.3, R * 0.03, sX + R * 0.05, sY + R * 0.05, R);
  body.addColorStop(0, 'rgba(255,250,255,0.52)');
  body.addColorStop(0.12, 'rgba(240,228,255,0.42)');
  body.addColorStop(0.3, 'rgba(215,195,245,0.30)');
  body.addColorStop(0.5, 'rgba(195,170,235,0.22)');
  body.addColorStop(0.7, 'rgba(175,150,220,0.20)');
  body.addColorStop(0.85, 'rgba(155,130,210,0.25)');
  body.addColorStop(0.95, 'rgba(140,115,200,0.32)');
  body.addColorStop(1.0, 'rgba(125,100,190,0.38)');
  ctx.fillStyle = body;
  ctx.beginPath(); ctx.arc(sX, sY, R, 0, TAU); ctx.fill();

  // Secondary glass layer (depth)
  const glass2 = ctx.createRadialGradient(sX + R * 0.15, sY + R * 0.2, R * 0.05, sX, sY, R * 0.9);
  const gp = 0.06 + Math.sin(a * 1.5) * 0.03;
  glass2.addColorStop(0, `rgba(230,215,255,${gp})`);
  glass2.addColorStop(0.6, `rgba(210,190,245,${gp * 0.4})`);
  glass2.addColorStop(1, 'rgba(200,180,240,0)');
  ctx.fillStyle = glass2;
  ctx.beginPath(); ctx.arc(sX, sY, R * 0.9, 0, TAU); ctx.fill();

  // Core glow
  const cp = 0.14 + Math.sin(a * 1.3 + 0.5) * 0.07;
  const core = ctx.createRadialGradient(sX - R * 0.05, sY - R * 0.05, 0, sX, sY, R * 0.4);
  core.addColorStop(0, `rgba(250,242,255,${cp})`);
  core.addColorStop(0.4, `rgba(225,210,250,${cp * 0.4})`);
  core.addColorStop(1, 'rgba(210,195,245,0)');
  ctx.fillStyle = core;
  ctx.beginPath(); ctx.arc(sX, sY, R * 0.4, 0, TAU); ctx.fill();

  // ── Specular highlights ──
  // Primary (top-left)
  const h1x = sX - R * 0.30, h1y = sY - R * 0.33, h1r = R * 0.32;
  const hl1 = ctx.createRadialGradient(h1x, h1y, 0, h1x, h1y, h1r);
  hl1.addColorStop(0, 'rgba(255,255,255,0.92)');
  hl1.addColorStop(0.08, 'rgba(255,255,255,0.75)');
  hl1.addColorStop(0.25, 'rgba(255,253,255,0.40)');
  hl1.addColorStop(0.5, 'rgba(255,250,255,0.12)');
  hl1.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl1;
  ctx.beginPath(); ctx.arc(h1x, h1y, h1r, 0, TAU); ctx.fill();

  // Sharp pinpoint
  const h2x = sX - R * 0.20, h2y = sY - R * 0.40, h2r = R * 0.06;
  const hl2 = ctx.createRadialGradient(h2x, h2y, 0, h2x, h2y, h2r);
  hl2.addColorStop(0, 'rgba(255,255,255,1.0)');
  hl2.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  hl2.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl2;
  ctx.beginPath(); ctx.arc(h2x, h2y, h2r, 0, TAU); ctx.fill();

  // Secondary highlight (right side, subtle)
  const h3x = sX + R * 0.28, h3y = sY - R * 0.15, h3r = R * 0.18;
  const hl3 = ctx.createRadialGradient(h3x, h3y, 0, h3x, h3y, h3r);
  hl3.addColorStop(0, 'rgba(255,255,255,0.18)');
  hl3.addColorStop(0.5, 'rgba(240,230,255,0.06)');
  hl3.addColorStop(1, 'rgba(240,230,255,0)');
  ctx.fillStyle = hl3;
  ctx.beginPath(); ctx.arc(h3x, h3y, h3r, 0, TAU); ctx.fill();

  // Bottom-right rim light
  const h4x = sX + R * 0.38, h4y = sY + R * 0.35, h4r = R * 0.22;
  const hl4 = ctx.createRadialGradient(h4x, h4y, 0, h4x, h4y, h4r);
  hl4.addColorStop(0, 'rgba(220,205,255,0.22)');
  hl4.addColorStop(0.5, 'rgba(200,185,245,0.08)');
  hl4.addColorStop(1, 'rgba(200,185,245,0)');
  ctx.fillStyle = hl4;
  ctx.beginPath(); ctx.arc(h4x, h4y, h4r, 0, TAU); ctx.fill();

  // ── Fresnel rim ──
  ctx.save();
  // Graduated rim - stronger at edges
  for (let i = 0; i < 3; i++) {
    const rOff = i * 0.5;
    ctx.strokeStyle = `rgba(255,255,255,${0.08 - i * 0.02})`;
    ctx.lineWidth = 2.5 - i * 0.5;
    ctx.beginPath(); ctx.arc(sX, sY, R - 1 - rOff, 0, TAU); ctx.stroke();
  }

  // Brighter rim at top
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(sX, sY, R - 1, -2.2, -0.8); ctx.stroke();
  ctx.restore();

  // ── Caustic arcs ──
  ctx.save();
  ctx.translate(sX, sY);
  // Arc 1
  ctx.rotate(a * 0.12);
  ctx.strokeStyle = `rgba(255,255,255,${0.05 + Math.sin(a * 3) * 0.025})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(0, 0, R * 0.88, -0.6, 0.6); ctx.stroke();
  // Arc 2 
  ctx.rotate(1.8);
  ctx.strokeStyle = `rgba(230,215,255,${0.03 + Math.sin(a * 2 + 1) * 0.015})`;
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.arc(0, 0, R * 0.82, -0.4, 0.5); ctx.stroke();
  ctx.restore();

  // ── Rainbow refraction edge ──
  ctx.save();
  ctx.globalAlpha = 0.04 + Math.sin(a * 2) * 0.015;
  const rain = ctx.createLinearGradient(sX - R, sY - R, sX + R, sY + R);
  rain.addColorStop(0, 'rgba(200,180,255,0)');
  rain.addColorStop(0.2, 'rgba(180,200,255,1)');
  rain.addColorStop(0.4, 'rgba(190,220,255,1)');
  rain.addColorStop(0.6, 'rgba(220,200,255,1)');
  rain.addColorStop(0.8, 'rgba(200,190,255,1)');
  rain.addColorStop(1, 'rgba(200,180,255,0)');
  ctx.strokeStyle = rain;
  ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(sX, sY, R - 3, 0, TAU); ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.restore();

  // ── Dust sparkles ──
  DUST.forEach(d => {
    const dx = d.x + Math.sin(a * d.speed + d.phase) * 18;
    const dy = d.y + Math.cos(a * d.speed * 0.6 + d.phase) * 14;
    const da = d.alpha * (0.4 + Math.sin(a * 3.5 + d.phase) * 0.6);
    if (da < 0.02) return;
    const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, d.r * 2);
    g.addColorStop(0, `rgba(255,255,255,${da.toFixed(3)})`);
    g.addColorStop(0.3, `rgba(240,230,255,${(da * 0.4).toFixed(3)})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(dx, dy, d.r * 2, 0, TAU); ctx.fill();
  });

  // ── Vignette ──
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.88);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(0.6, 'rgba(20,10,35,0.05)');
  vig.addColorStop(1, 'rgba(20,10,35,0.35)');
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
}

// ── Render ──
console.log(`Rendering ${TOTAL} frames at ${W}x${H} @ ${FPS}fps...`);
console.log(`Output: ${OUT}\n`);

async function renderAll() {
  for (let f = 0; f < TOTAL; f++) {
    drawFrame(f);
    const buf = Buffer.from(ctx.getImageData(0, 0, W, H).data.buffer);
    await new Promise((res, rej) => {
      const ok = ffmpeg.stdin.write(buf, err => err ? rej(err) : res());
      if (!ok) ffmpeg.stdin.once('drain', res);
    });
    if (f % 10 === 0 || f === TOTAL - 1)
      process.stdout.write(`\rFrame ${f + 1}/${TOTAL} [${((f / (TOTAL - 1)) * 100).toFixed(1)}%]`);
  }
  ffmpeg.stdin.end();
}

renderAll().catch(err => { console.error('Error:', err); process.exit(1); });
