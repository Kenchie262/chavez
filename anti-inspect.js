
(() => {
  if (window.__chavezBasicGuardInstalled) return;
  window.__chavezBasicGuardInstalled = true;

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  }, true);

  document.addEventListener("keydown", (event) => {
    const key = String(event.key || "").toLowerCase();
    const blocked =
      key === "f12" ||
      (event.ctrlKey && event.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
      (event.ctrlKey && ["u", "s"].includes(key)) ||
      (event.metaKey && event.altKey && ["i", "j", "c"].includes(key)) ||
      (event.metaKey && event.key.toLowerCase() === "u");

    if (blocked) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("selectstart", (event) => {
    if (!event.target.closest("input, textarea, [contenteditable='true']")) {
      event.preventDefault();
    }
  }, true);
})();
