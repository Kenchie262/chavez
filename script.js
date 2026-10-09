(() => {
  const message = "WELCOME TO CHAVEZ";
  const typing = document.getElementById("typing");
  const transition = document.getElementById("transition");
  let character = 0;
  let redirected = false;

  function typeNextCharacter() {
    if (!typing || character >= message.length) return;
    typing.textContent += message.charAt(character++);
    window.setTimeout(typeNextCharacter, 82);
  }

  function enterHome() {
    if (redirected) return;
    redirected = true;
    transition?.classList.add("active");
    window.setTimeout(() => {
      // The entrance song begins on home.html, after the loading screen finishes.
      try { sessionStorage.setItem("chavezStartEntranceMusic", "yes"); } catch (_) {}
      window.location.href = "home.html";
    }, 700);
  }

  window.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(typeNextCharacter, 550);
    window.setTimeout(enterHome, 5200);
  });
})();
