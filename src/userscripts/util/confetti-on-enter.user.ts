// ==UserScript==
// @name         Confetti On Enter
// @namespace    http://tampermonkey.net/
// @version      2024-04-24
// @description  show confetti (from the awesome canvas-confetti library) wherever you enter!
// @author       Craig Parker
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jsdelivr.com
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js
// ==/UserScript==

(function confettiOnEnter() {
 document.addEventListener('keypress', (e) => {
  // eslint-disable-next-line no-undef
  if (e.code !== 'Enter') return;

  confetti({
   origin: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
   },
   particleCount: 100,
   spread: 360,
  });
 });
})();
