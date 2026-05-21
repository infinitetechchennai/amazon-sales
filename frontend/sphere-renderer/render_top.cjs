const { createCanvas } = require('canvas');
const { spawn } = require('child_process');
const path = require('path');

const W = 1920, H = 1080, FPS = 30, DUR = 8, TOTAL = FPS * DUR;
const OUT = path.join(__dirname, '..', 'public', 'background_top.mp4');

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
  console.log(`\n✅ Top video done! Saved: ${OUT} (exit ${code})`);
});

const TAU = Math.PI * 2;

// ── Floating light orbs ──
const ORBS = [];
for (let i = 0; i < 8; i++) {
  ORBS.push({
    x: W * 0.2 + Math.random() * W * 0.6,
    y: H * 0.2 + Math.random() * H * 0.6,
    r: 60 + Math.random() * 120,
    phase: Math.random() * TAU,
    speedX: 0.3 + Math.random() * 0.5,
    speedY: 0.2 + Math.random() * 0.4,
    driftX: 30 + Math.random() * 60,
    driftY: 20 + Math.random() * 40,
    alpha: 0.04 + Math.random() * 0.08,
    hue: 245 + Math.random() * 35,
    sat: 35 + Math.random() * 30,
    light: 72 + Math.random() * 20,
  });
}

// ── Bokeh background ──
const BOKEH = [];
for (let i = 0; i < 90; i++) {
  BOKEH.push({
    x: Math.random() * W, y: Math.random() * H,
    r: 10 + Math.random() * 55, phase: Math.random() * TAU,
    speed: 0.15 + Math.random() * 0.45,
    alpha: 0.03 + Math.random() * 0.1,
    hue: 248 + Math.random() * 30,
    sat: 25 + Math.random() * 45,
    light: 68 + Math.random() * 28,
  });
}

// ── Light streams / ribbons ──
const RIBBONS = [];
for (let i = 0; i < 5; i++) {
  RIBBONS.push({
    startX: Math.random() * W,
    startY: H * 0.3 + Math.random() * H * 0.4,
    length: 300 + Math.random() * 500,
    width: 40 + Math.random() * 80,
    phase: Math.random() * TAU,
    speed: 0.2 + Math.random() * 0.3,
    angle: -0.3 + Math.random() * 0.6,
    alpha: 0.02 + Math.random() * 0.04,
  });
}

// ── Sparkle dust ──
const DUST = [];
for (let i = 0; i < 50; i++) {
  DUST.push({
    x: Math.random() * W, y: Math.random() * H,
    r: 1 + Math.random() * 2.5, phase: Math.random() * TAU,
    speed: 0.5 + Math.random() * 1.5, alpha: 0.2 + Math.random() * 0.55
  });
}

function drawFrame(f) {
  const t = f / TOTAL, a = t * TAU;

  // ── Background gradient ──
  const cx = W / 2 + Math.sin(a * 0.4) * 25;
  const cy = H * 0.42;
  const bg = ctx.createRadialGradient(cx, cy - 60, 100, cx, cy + 50, 1000);
  bg.addColorStop(0, '#E8DCF5');
  bg.addColorStop(0.08, '#DDD0F0');
  bg.addColorStop(0.18, '#CFBCE8');
  bg.addColorStop(0.30, '#BDA5DD');
  bg.addColorStop(0.42, '#A88CCE');
  bg.addColorStop(0.55, '#9272BE');
  bg.addColorStop(0.68, '#7C5AAE');
  bg.addColorStop(0.82, '#64429A');
  bg.addColorStop(1.0, '#3A2268');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Ambient warm patches ──
  const patches = [
    [W * 0.25, H * 0.3, 400, 0.06],
    [W * 0.72, H * 0.38, 350, 0.05],
    [W * 0.5, H * 0.55, 500, 0.04],
    [W * 0.15, H * 0.65, 280, 0.035],
    [W * 0.85, H * 0.6, 300, 0.03],
  ];
  patches.forEach(([px, py, pr, pa]) => {
    const g = ctx.createRadialGradient(px, py, 0, px, py, pr);
    g.addColorStop(0, `rgba(225,210,250,${pa})`);
    g.addColorStop(1, 'rgba(225,210,250,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  });

  // ── Light ribbons (flowing streams) ──
  RIBBONS.forEach(rb => {
    const rx = rb.startX + Math.sin(a * rb.speed + rb.phase) * 100;
    const ry = rb.startY + Math.cos(a * rb.speed * 0.6 + rb.phase) * 50;
    const ra = rb.alpha * (0.5 + Math.sin(a * 1.2 + rb.phase) * 0.5);
    
    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(rb.angle + Math.sin(a * 0.3 + rb.phase) * 0.08);
    
    const rg = ctx.createLinearGradient(-rb.length / 2, 0, rb.length / 2, 0);
    rg.addColorStop(0, `rgba(220,205,255,0)`);
    rg.addColorStop(0.2, `rgba(220,205,255,${ra})`);
    rg.addColorStop(0.5, `rgba(240,230,255,${ra * 1.3})`);
    rg.addColorStop(0.8, `rgba(220,205,255,${ra})`);
    rg.addColorStop(1, `rgba(220,205,255,0)`);
    ctx.fillStyle = rg;
    
    ctx.beginPath();
    // Draw a smooth ribbon shape using curves
    const hw = rb.width / 2;
    const hl = rb.length / 2;
    const wave1 = Math.sin(a * 0.8 + rb.phase) * 15;
    const wave2 = Math.cos(a * 0.6 + rb.phase) * 10;
    ctx.moveTo(-hl, -hw + wave1);
    ctx.bezierCurveTo(-hl * 0.3, -hw * 0.6 + wave2, hl * 0.3, -hw * 0.4 - wave1, hl, -hw + wave2);
    ctx.lineTo(hl, hw + wave2);
    ctx.bezierCurveTo(hl * 0.3, hw * 0.6 - wave1, -hl * 0.3, hw * 0.4 + wave2, -hl, hw + wave1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // ── Bokeh particles ──
  BOKEH.forEach(b => {
    const bx = b.x + Math.sin(a * b.speed + b.phase) * 28;
    const by = b.y + Math.cos(a * b.speed * 0.7 + b.phase) * 20;
    const ba = b.alpha * (0.5 + Math.sin(a * 1.8 + b.phase) * 0.5);
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
    const c = `hsla(${b.hue},${b.sat}%,${b.light}%,`;
    g.addColorStop(0, c + ba.toFixed(4) + ')');
    g.addColorStop(0.25, c + (ba * 0.65).toFixed(4) + ')');
    g.addColorStop(0.6, c + (ba * 0.2).toFixed(4) + ')');
    g.addColorStop(1, c + '0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx, by, b.r, 0, TAU); ctx.fill();
  });

  // ── Floating light orbs (main focal elements) ──
  ORBS.forEach(orb => {
    const ox = orb.x + Math.sin(a * orb.speedX + orb.phase) * orb.driftX;
    const oy = orb.y + Math.cos(a * orb.speedY + orb.phase) * orb.driftY;
    const oa = orb.alpha * (0.6 + Math.sin(a * 1.5 + orb.phase) * 0.4);
    
    // Outer soft glow
    const g1 = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * 2);
    g1.addColorStop(0, `hsla(${orb.hue},${orb.sat}%,${orb.light}%,${(oa * 0.5).toFixed(4)})`);
    g1.addColorStop(0.3, `hsla(${orb.hue},${orb.sat}%,${orb.light}%,${(oa * 0.2).toFixed(4)})`);
    g1.addColorStop(1, `hsla(${orb.hue},${orb.sat}%,${orb.light}%,0)`);
    ctx.fillStyle = g1;
    ctx.beginPath(); ctx.arc(ox, oy, orb.r * 2, 0, TAU); ctx.fill();

    // Core bright center
    const g2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * 0.6);
    g2.addColorStop(0, `rgba(255,250,255,${(oa * 1.5).toFixed(4)})`);
    g2.addColorStop(0.3, `hsla(${orb.hue},${orb.sat - 10}%,${Math.min(95, orb.light + 15)}%,${(oa * 0.8).toFixed(4)})`);
    g2.addColorStop(1, `hsla(${orb.hue},${orb.sat}%,${orb.light}%,0)`);
    ctx.fillStyle = g2;
    ctx.beginPath(); ctx.arc(ox, oy, orb.r * 0.6, 0, TAU); ctx.fill();
  });

  // ── Central diffused glow (focal point) ──
  const glowPulse = 0.06 + Math.sin(a * 0.8) * 0.02;
  const cg = ctx.createRadialGradient(W / 2, H / 2 - 30, 0, W / 2, H / 2, 350);
  cg.addColorStop(0, `rgba(240,230,255,${glowPulse})`);
  cg.addColorStop(0.3, `rgba(220,205,250,${glowPulse * 0.4})`);
  cg.addColorStop(0.7, `rgba(200,180,240,${glowPulse * 0.1})`);
  cg.addColorStop(1, 'rgba(200,180,240,0)');
  ctx.fillStyle = cg;
  ctx.beginPath(); ctx.arc(W / 2, H / 2 - 30, 350, 0, TAU); ctx.fill();

  // ── Sparkle dust ──
  DUST.forEach(d => {
    const dx = d.x + Math.sin(a * d.speed + d.phase) * 20;
    const dy = d.y + Math.cos(a * d.speed * 0.6 + d.phase) * 15;
    const da = d.alpha * (0.3 + Math.sin(a * 4 + d.phase) * 0.7);
    if (da < 0.03) return;
    const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, d.r * 2.5);
    g.addColorStop(0, `rgba(255,255,255,${da.toFixed(4)})`);
    g.addColorStop(0.3, `rgba(240,230,255,${(da * 0.35).toFixed(4)})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(dx, dy, d.r * 2.5, 0, TAU); ctx.fill();
  });

  // ── Vignette ──
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(0.5, 'rgba(20,10,35,0.04)');
  vig.addColorStop(1, 'rgba(20,10,35,0.32)');
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
}

// ── Render ──
console.log(`[TOP] Rendering ${TOTAL} frames at ${W}x${H} @ ${FPS}fps...`);
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
      process.stdout.write(`\r[TOP] Frame ${f + 1}/${TOTAL} [${((f / (TOTAL - 1)) * 100).toFixed(1)}%]`);
  }
  ffmpeg.stdin.end();
}

renderAll().catch(err => { console.error('Error:', err); process.exit(1); });
