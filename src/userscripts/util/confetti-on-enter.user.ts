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
// @source       https://github.com/winniethejedi/silly-internet-repo/blob/main/src/userscripts/util/confetti-on-enter.user.ts
// @downloadUrl  https://gist.github.com/winniethejedi/bbf6219637ae423a234b56182bbf26c8/raw/fa304ea2d93d8aac1f5fc7c4f1c382f0b7ba9080/confetti-on-enter.user.js
// @updateUrl    https://gist.github.com/winniethejedi/bbf6219637ae423a234b56182bbf26c8/raw/fa304ea2d93d8aac1f5fc7c4f1c382f0b7ba9080/confetti-on-enter.meta.js
// ==/UserScript==

(function confettiOnEnter() {
 document.addEventListener('keypress', (e) => {
  // eslint-disable-next-line no-undef
  if (e.code === 'Enter') {
   console.log('MOAR CONFETTI!');
  confetti({
   origin: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
   },
   particleCount: 100,
   spread: 360,
  });
  }
 });
})();
