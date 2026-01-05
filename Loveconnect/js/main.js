// js/main.js (starter)
// Basic UI helpers + Firebase stub
document.getElementById('year')?.innerText = new Date().getFullYear();

// Simple logger
console.log('LoveConnect frontend loaded');

// FIREBASE config placeholder
// When ready, replace `firebaseConfig` with your project's config
const firebaseConfig = null; // <-- paste your firebaseConfig object here later

// We'll initialize Firebase when you paste the config. For now we export placeholders:
export let auth = null;
export let db = null;

// Page-specific mounts (will be extended later)
if (document.getElementById('loginForm')) {
  console.log('Login form present (not active until firebase is configured).');
}
