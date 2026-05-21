const { createCanvas } = require('canvas');
const { spawn } = require('child_process');
const path = require('path');

const W = 1920, H = 1080, FPS = 30, DUR = 8, TOTAL = FPS * DUR;
const OUT = path.join(__dirname, '..', 'public', 'background_bottom.mp4');

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
  console.log(`\n✅ Bottom video done! Saved: ${OUT} (exit ${code})`);
});

const TAU = Math.PI * 2;

// ── Aurora wave layers ──
const WAVES = [];
for (let i = 0; i < 6; i++) {
  WAVES.push({
    yBase: H * 0.3 + i * (H * 0.08),
    amplitude: 30 + Math.random() * 50,
    frequency: 0.003 + Math.random() * 0.004,
    phase: Math.random() * TAU,
    speed: 0.3 + Math.random() * 0.5,
    thickness: 80 + Math.random() * 120,
    alpha: 0.025 + Math.random() * 0.04,
    hue: 250 + i * 8 + Math.random() * 10,
    sat: 30 + Math.random() * 35,
    light: 65 + Math.random() * 25,
  });
}

// ── Bokeh ──
const BOKEH = [];
for (let i = 0; i < 75; i++) {
  BOKEH.push({
    x: Math.random() * W, y: Math.random() * H,
    r: 12 + Math.random() * 50, phase: Math.random() * TAU,
    speed: 0.15 + Math.random() * 0.4,
    alpha: 0.03 + Math.random() * 0.09,
    hue: 245 + Math.random() * 35,
    sat: 28 + Math.random() * 40,
    light: 70 + Math.random() * 25,
  });
}

// ── Floating particles ──
const PARTICLES = [];
for (let i = 0; i < 55; i++) {
  PARTICLES.push({
    x: Math.random() * W, y: Math.random() * H,
    r: 0.8 + Math.random() * 2.5, phase: Math.random() * TAU,
    speed: 0.4 + Math.random() * 1.2,
    alpha: 0.15 + Math.random() * 0.5,
    riseDrift: 5 + Math.random() * 15,
  });
}

// ── Nebula clouds ──
const NEBULAE = [];
for (let i = 0; i < 4; i++) {
  NEBULAE.push({
    x: W * 0.15 + Math.random() * W * 0.7,
    y: H * 0.25 + Math.random() * H * 0.5,
    r: 200 + Math.random() * 250,
    phase: Math.random() * TAU,
    speed: 0.15 + Math.random() * 0.2,
    driftX: 40 + Math.random() * 60,
    driftY: 20 + Math.random() * 35,
    alpha: 0.025 + Math.random() * 0.035,
    hue: 255 + Math.random() * 25,
  });
}

function drawFrame(f) {
  const t = f / TOTAL, a = t * TAU;

  // ── Background gradient (deeper/moodier) ──
  const cx = W / 2 + Math.sin(a * 0.35) * 20;
  const cy = H * 0.45;
  const bg = ctx.createRadialGradient(cx, cy - 80, 80, cx, cy + 30, 980);
  bg.addColorStop(0, '#D8C8EE');
  bg.addColorStop(0.08, '#CDB8E6');
  bg.addColorStop(0.18, '#BEA2DC');
  bg.addColorStop(0.30, '#AD8ACF');
  bg.addColorStop(0.42, '#9A72C2');
  bg.addColorStop(0.55, '#855CB4');
  bg.addColorStop(0.68, '#6E44A2');
  bg.addColorStop(0.82, '#553090');
  bg.addColorStop(1.0, '#2E1858');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Nebula clouds ──
  NEBULAE.forEach(nb => {
    const nx = nb.x + Math.sin(a * nb.speed + nb.phase) * nb.driftX;
    const ny = nb.y + Math.cos(a * nb.speed * 0.7 + nb.phase) * nb.driftY;
    const na = nb.alpha * (0.6 + Math.sin(a * 0.8 + nb.phase) * 0.4);
    
    const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, nb.r);
    g.addColorStop(0, `hsla(${nb.hue},40%,75%,${(na * 1.2).toFixed(4)})`);
    g.addColorStop(0.25, `hsla(${nb.hue},35%,70%,${(na * 0.7).toFixed(4)})`);
    g.addColorStop(0.6, `hsla(${nb.hue},30%,65%,${(na * 0.2).toFixed(4)})`);
    g.addColorStop(1, `hsla(${nb.hue},30%,60%,0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(nx, ny, nb.r, 0, TAU); ctx.fill();
  });

  // ── Aurora waves ──
  WAVES.forEach(w => {
    ctx.save();
    const wa = w.alpha * (0.6 + Math.sin(a * 1.2 + w.phase) * 0.4);
    
    ctx.beginPath();
    ctx.moveTo(0, H);
    
    for (let x = 0; x <= W; x += 4) {
      const waveY = w.yBase +
        Math.sin(x * w.frequency + a * w.speed + w.phase) * w.amplitude +
        Math.sin(x * w.frequency * 2.3 + a * w.speed * 0.7 + w.phase * 1.5) * (w.amplitude * 0.3);
      if (x === 0) ctx.moveTo(x, waveY);
      else ctx.lineTo(x, waveY);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    
    const wg = ctx.createLinearGradient(0, w.yBase - w.thickness, 0, w.yBase + w.thickness);
    wg.addColorStop(0, `hsla(${w.hue},${w.sat}%,${w.light}%,0)`);
    wg.addColorStop(0.3, `hsla(${w.hue},${w.sat}%,${w.light}%,${(wa * 0.6).toFixed(4)})`);
    wg.addColorStop(0.5, `hsla(${w.hue},${w.sat + 5}%,${w.light + 5}%,${wa.toFixed(4)})`);
    wg.addColorStop(0.7, `hsla(${w.hue},${w.sat}%,${w.light}%,${(wa * 0.6).toFixed(4)})`);
    wg.addColorStop(1, `hsla(${w.hue},${w.sat}%,${w.light}%,0)`);
    ctx.fillStyle = wg;
    ctx.fill();
    ctx.restore();
  });

  // ── Bokeh particles ──
  BOKEH.forEach(b => {
    const bx = b.x + Math.sin(a * b.speed + b.phase) * 25;
    const by = b.y + Math.cos(a * b.speed * 0.7 + b.phase) * 18;
    const ba = b.alpha * (0.5 + Math.sin(a * 1.6 + b.phase) * 0.5);
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
    const c = `hsla(${b.hue},${b.sat}%,${b.light}%,`;
    g.addColorStop(0, c + ba.toFixed(4) + ')');
    g.addColorStop(0.3, c + (ba * 0.55).toFixed(4) + ')');
    g.addColorStop(0.65, c + (ba * 0.12).toFixed(4) + ')');
    g.addColorStop(1, c + '0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx, by, b.r, 0, TAU); ctx.fill();
  });

  // ── Horizon glow line ──
  const horizonY = H * 0.48 + Math.sin(a * 0.3) * 8;
  const horizonAlpha = 0.04 + Math.sin(a * 0.6) * 0.015;
  const hg = ctx.createLinearGradient(0, horizonY - 100, 0, horizonY + 100);
  hg.addColorStop(0, 'rgba(220,205,255,0)');
  hg.addColorStop(0.35, `rgba(220,205,255,${horizonAlpha})`);
  hg.addColorStop(0.5, `rgba(240,230,255,${horizonAlpha * 1.5})`);
  hg.addColorStop(0.65, `rgba(220,205,255,${horizonAlpha})`);
  hg.addColorStop(1, 'rgba(220,205,255,0)');
  ctx.fillStyle = hg;
  ctx.fillRect(0, horizonY - 100, W, 200);

  // ── Floating particles ──
  PARTICLES.forEach(p => {
    const px = p.x + Math.sin(a * p.speed + p.phase) * 18;
    const py = p.y + Math.cos(a * p.speed * 0.5 + p.phase) * p.riseDrift;
    const pa = p.alpha * (0.3 + Math.sin(a * 3.5 + p.phase) * 0.7);
    if (pa < 0.02) return;
    const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 2.5);
    g.addColorStop(0, `rgba(255,255,255,${pa.toFixed(4)})`);
    g.addColorStop(0.25, `rgba(230,220,255,${(pa * 0.4).toFixed(4)})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(px, py, p.r * 2.5, 0, TAU); ctx.fill();
  });

  // ── Central soft glow ──
  const gp = 0.05 + Math.sin(a * 0.7) * 0.02;
  const cg = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, 400);
  cg.addColorStop(0, `rgba(230,215,255,${gp})`);
  cg.addColorStop(0.4, `rgba(210,195,245,${gp * 0.35})`);
  cg.addColorStop(1, 'rgba(200,180,240,0)');
  ctx.fillStyle = cg;
  ctx.beginPath(); ctx.arc(W / 2, H * 0.45, 400, 0, TAU); ctx.fill();

  // ── Vignette ──
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.9);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(0.5, 'rgba(18,8,32,0.05)');
  vig.addColorStop(1, 'rgba(18,8,32,0.38)');
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
}

// ── Render ──
console.log(`[BOTTOM] Rendering ${TOTAL} frames at ${W}x${H} @ ${FPS}fps...`);
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
      process.stdout.write(`\r[BOTTOM] Frame ${f + 1}/${TOTAL} [${((f / (TOTAL - 1)) * 100).toFixed(1)}%]`);
  }
  ffmpeg.stdin.end();
}

renderAll().catch(err => { console.error('Error:', err); process.exit(1); });
