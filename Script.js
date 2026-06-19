/*
  Fire Widget
  Designed & Developed by 3EPRRR
  Kick      : https://kick.com/3eprrr
  Twitch    : https://www.twitch.tv/3eprrr
  Instagram : https://www.instagram.com/3eprrr/
  Discord   : https://discord.gg/PgWMMbz3Cp
  Donate    : https://streamelements.com/3eprrr-24216/tip
*/
/* ─────────────────────────────────────────
   Fire Widget — script.js
   ───────────────────────────────────────── */

// ══════════════════════════════════════════
//  CONFIG from KickBot userVariables
//  (fallback defaults used when running outside KickBot)
// ══════════════════════════════════════════
function cfg(key, fallback) {
  try {
    const v = userVariables[key] && userVariables[key].value;
    return (v !== undefined && v !== '') ? v : fallback;
  } catch(e) { return fallback; }
}

const W      = 1920;
const ZONE_H = 360;   // 1/3 of 1080

// ── DOM ──
const cvBottom = document.getElementById('fireBottom');
const ctxB     = cvBottom.getContext('2d');
const cvTop    = document.getElementById('fireTop');
const ctxT     = cvTop.getContext('2d');

cvBottom.width  = W;  cvBottom.height = ZONE_H;
cvTop.width     = W;  cvTop.height    = ZONE_H;

// ── State ──
let particlesB   = [];
let particlesT   = [];
let fireActive   = false;
let animating    = false;
let fireStartTime = 0;
// lastFireTime stored in localStorage so it persists across reloads


// ══════════════════════════════════════════
//  COOLDOWN
// ══════════════════════════════════════════
function getCooldownMs() {
  return cfg('cooldown_minutes', 15) * 60 * 1000;
}

function getLastFireTime() {
  return parseInt(localStorage.getItem('fireWidget_lastFire') || '0');
}
function setLastFireTime() {
  localStorage.setItem('fireWidget_lastFire', Date.now().toString());
}
function getRemainingCooldown() {
  const last = getLastFireTime();
  if (!last) return 0;
  return Math.max(0, getCooldownMs() - (Date.now() - last));
}

function formatTime(ms) {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
});