// SE307T Software Quality Engineering — shared site behaviour

(function () {
  const root = document.documentElement;
  const THEME_KEY = "sqe-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuBtn = document.getElementById("menuToggle");
    if (!sidebar || !menuBtn) return;

    function open() {
      sidebar.classList.add("open");
      overlay.classList.add("open");
    }
    function close() {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    }
    menuBtn.addEventListener("click", () => {
      sidebar.classList.contains("open") ? close() : open();
    });
    overlay && overlay.addEventListener("click", close);

    sidebar.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", close)
    );
  }

  function highlightActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href").split("/").pop();
      if (href === path) link.classList.add("active");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSidebar();
    highlightActiveNav();
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  });
})();
